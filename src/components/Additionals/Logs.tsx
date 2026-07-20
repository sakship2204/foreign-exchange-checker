import { useDispatch, useSelector } from "react-redux";
import classes from "./Favorites.module.css";
import { removeFromLogsData } from "../../store/logs";
import DeleteIcon from "/public/images/icon-delete.svg";
import DeleteFilled from "/public/images/icon-delete.svg";

export const Logs = () => {
  const logsData = useSelector((state: any) => state.logs.logsData);
  const dispatch = useDispatch();

  function getRelativeTime(pastDate: string | number | Date) {
    const msPerUnit: Record<any, number> = {
      year: 31536000000,
      month: 2628000000,
      day: 86400000,
      hour: 3600000,
      minute: 60000,
      second: 1000,
    };

    const rtf = new Intl.RelativeTimeFormat("en", {
      numeric: "auto",
      style: "short",
    });

    const elapsed = new Date(pastDate).getTime() - Date.now();

    // Find the appropriate unit for the elapsed time
    for (const unit in msPerUnit) {
      if (Math.abs(elapsed) >= msPerUnit[unit] || unit === "second") {
        const value = Math.round(elapsed / msPerUnit[unit]);
        return rtf.format(value, unit as any);
      }
    }

    return "";
  }

  return (
    <>
      <div>
        {logsData.length === 0 && <div className="empty">No data to show.</div>}
        {[...logsData]
          .sort((a, b) => b.logTime - a.logTime)
          .map((data, index) => {
            return (
              <div className={classes.rows} key={index}>
                <span className={classes.time}>
                  {getRelativeTime(data.logTime)}
                </span>
                <span>
                  {data.sendCurrency} {"->"} {data.receiveCurrency}
                </span>
                <span>
                  <label>Send amount: </label>
                  {data.sendVal}
                </span>
                <span>
                  <label>Receive amount: </label>
                  {data.receiveVal}
                </span>

                <button
                  className="customBtn"
                  onClick={() => dispatch(removeFromLogsData(data.logTime))}
                >
                  <img src={DeleteIcon} alt="" className={classes.deleteBtn} />
                </button>
              </div>
            );
          })}
      </div>
    </>
  );
};
