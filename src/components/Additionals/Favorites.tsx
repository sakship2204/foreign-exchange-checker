import { useSelector, useDispatch } from "react-redux";
import classes from "./Favorites.module.css";
import PercentageIndicator from "../PercentageIndicator";

import { removeFromFavorites } from "../../store/favorite";

export const Favorites = () => {
  const favoritesConversion = useSelector(
    (state: any) => state.favorite.favoriteData,
  );
  const dispatch = useDispatch();

  const removeFromFavoritesHandler = (data) => {
    dispatch(
      removeFromFavorites({
        quote: data.quote,
        base: data.base,
      }),
    );
  };
  return (
    <>
      <div>
        {favoritesConversion.length === 0 && (
          <div className={classes.empty}>No data to show.</div>
        )}
        {favoritesConversion.map((data, index) => {
          return (
            <div className={classes.rows} key={index}>
              <span>
                <label>Quote: </label>
                {data.quote}
              </span>
              <span>
                <label>Base: </label>
                {data.base}
              </span>
              <span>
                <label>Rate: </label>
                {data.conversionRate}
              </span>
              <span>
                <label>24h change</label>:{" "}
                <PercentageIndicator value={data.percentageChange} />
              </span>

              <button
                className="customBtn"
                onClick={() => removeFromFavoritesHandler({ ...data })}
              >
                Unpin
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};
