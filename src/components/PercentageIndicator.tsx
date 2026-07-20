type PercentageIndicatorProps = {
  value: string | number;
  withoutPercent?: boolean;
};

const PercentageIndicator = ({
  value,
  withoutPercent,
}: PercentageIndicatorProps) => {
  const arrowIcon = Number(value) < 0 ? "▼" : "▲";
  const colorClass = Number(value) < 0 ? "--red-color" : "--green-color";

  return (
    <>
      <span style={{ color: `var(${colorClass})` }}>{arrowIcon}</span>
      <span
        style={{
          color: `var(${colorClass})`,
          marginInlineEnd: "1rem",
          marginInlineStart: "0.3rem",
        }}
        className="w-fit"
      >{`${value} ${!withoutPercent ? "%" : ""}`}</span>
    </>
  );
};

export default PercentageIndicator;
