import { useDispatch, useSelector } from "react-redux";
import classes from "./Compare.module.css";
import Star from "/public/images/icon-star-filled.svg";
import UnStar from "/public/images/icon-star.svg";
import { addToFavoritesData, removeFromFavorites } from "../../store/favorite";
import { get24hRateChange, type LiveRateData } from "../../services/util";

export const Compare = () => {
  const sendVal = useSelector((state: any) => state.conversion.sendValue);
  const sendCurrency = useSelector((state: any) => state.conversion.send);
  const compareData = useSelector((state: any) => state.conversion.compareData);
  const favoriteData = useSelector((state: any) => state.favorite.favoriteData);
  const dispatch = useDispatch();

  const isFavorite = (base: string, quote: string) => {
    return favoriteData.some((item: LiveRateData) => {
      return item.quote === quote && item.base === base;
    });
  };

  const toggleStar = async (item: LiveRateData) => {
    if (!isFavorite(item.base, item.quote)) {
      const percentageChange = await get24hRateChange({
        ...item,
      });
      dispatch(
        addToFavoritesData({
          base: item.base,
          quote: item.quote,
          percentageChange,
          conversionRate: item.rate,
        }),
      );
    } else {
      dispatch(removeFromFavorites(item));
    }
  };

  return (
    <>
      {compareData.length == 0 && (
        <div className="empty">
          No comparison available Enter an amount in Send above to see what your
          money is worth in other currencies.
        </div>
      )}
      {compareData.length > 0 && (
        <>
          {" "}
          <div className={classes.baseContainer}>
            Send Amount: {sendVal}, from {sendCurrency}
          </div>
          <div className={classes.numRows}>
            Number of comparisons: {compareData.length}
          </div>
          <table className={classes.table}>
            <thead>
              <tr>
                <th>Currency</th>
                <th>Converted amount</th>
                <th>Rate</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {compareData.map((item: LiveRateData, index: string) => (
                <tr key={index}>
                  <td>
                    {" "}
                    <img
                      src={`/public/images/flags/${item.quote.slice(0, 2).toLowerCase()}.webp`}
                      alt={item.quote.slice(0, 2).toLowerCase()}
                      className={classes.imageClass}
                    />
                    {item.quote}
                  </td>
                  <td>{(Number(item.rate) * sendVal).toFixed(2)}</td>
                  <td>{item.rate}</td>
                  <td>
                    <button onClick={() => toggleStar(item)}>
                      <img
                        src={isFavorite(item.base, item.quote) ? Star : UnStar}
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
};
