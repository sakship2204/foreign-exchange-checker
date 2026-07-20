import PercentageIndicator from "../PercentageIndicator";
import classes from "./History.module.css";

type DataCardProps = {
  title: string;
  value: number | string;
  isPercent?: boolean;
  withoutPercent?: boolean;
};

export const DataCard = ({
  title,
  value,
  isPercent = false,
  withoutPercent = false,
}: DataCardProps) => {
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
