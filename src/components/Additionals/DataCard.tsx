import classes from "./History.module.css";

export const DataCard = ({ title, value }) => {
  return (
    <>
      <div className={classes.container}>
        {title}
        <div className={classes.value}>{value}</div>
      </div>
    </>
  );
};
