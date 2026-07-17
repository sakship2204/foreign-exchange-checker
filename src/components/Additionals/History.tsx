import Chart from "react-google-charts";

export const History = () => {
  const chartBackground = getComputedStyle(document.documentElement)
    .getPropertyValue("--background-color-2")
    .trim();
  return (
    <>
      <Chart
        chartType="AreaChart"
        data={[
          ["USD/EUR", "Time"],
          [4, 5.5],
          [8, 12],
        ]}
        width="100%"
        height="400px"
        legendToggle
        className="chart-history"
        options={{
          backgroundColor: chartBackground,
          color: "white",
        }}
      />
    </>
  );
};
