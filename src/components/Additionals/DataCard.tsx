import PercentageIndicator from "../PercentageIndicator";
import classes from "./History.module.css";

export const DataCard = ({
  title,
  value,
  isPercent = false,
  withoutPercent = false,
}) => {
  return (
    <>
      <div className={classes.container}>
        {title}
        {isPercent ? (
          <div className={classes.value}>
            {" "}
            <PercentageIndicator
              value={value}
              withoutPercent={withoutPercent}
            />
          </div>
        ) : (
          <div className={classes.value}>{value}</div>
        )}
      </div>
    </>
  );
};
