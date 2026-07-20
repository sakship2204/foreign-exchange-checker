import { useEffect, useState } from "react";
import Chart from "react-google-charts";
import { useSelector } from "react-redux";
import { calculatePercentage, priorDate } from "../../services/util";
import { DataCard } from "./DataCard";

const TimeValue = {
  day: "day",
  week: "week",
  month: "month",
  threeM: "3m",
  year: "year",
  fiveY: "5y",
};

type HistoryRateData = {
  date: string;
  rate: number;
};

export const History = () => {
  const lightMode = useSelector((state: any) => state.conversion.lightMode);
  const sendCurrency = useSelector((state: any) => state.conversion.send);
  const receiveCurrency = useSelector((state: any) => state.conversion.receive);

  const chartBackground = lightMode ? "#dbdbdb" : "#2f2e2e";
  const chartTextColor = lightMode ? "#000" : "#fff";
  const highlight = lightMode ? "rgb(27, 68, 3)" : "yellowgreen";

  const [historyData, setHistoryData] = useState<HistoryRateData[]>([]);

  const [timeSeries, setTimeSeries] = useState(TimeValue.day);

  const getToday = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Months are 0-indexed
    const day = date.getDate();

    return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  };

  const getFromDate = () => {
    const today = getToday();
    if (timeSeries === TimeValue.day) {
      return priorDate(today, 1);
    } else if (timeSeries === TimeValue.week) {
      return priorDate(today, 7);
    } else if (timeSeries === TimeValue.month) {
      return priorDate(today, 30);
    } else if (timeSeries === TimeValue.threeM) {
      return priorDate(today, 3 * 30);
    } else if (timeSeries === TimeValue.year) {
      return priorDate(today, 365);
    } else if (timeSeries === TimeValue.fiveY) {
      return priorDate(today, 365 * 5);
    }

    return today;
  };

  const BtnLabels = {
    day: "1D",
    week: "1W",
    month: "1M",
    "3m": "3M",
    year: "1Y",
    "5y": "5Y",
  };

  const chartData = [
    ["Date", `${sendCurrency}/${receiveCurrency}`],
    ...historyData.map((item) => [item.date, Number(item.rate)]),
  ];

  const fetchHistoryData = async () => {
    try {
      const response = await fetch(
        `https://api.frankfurter.dev/v2/rates?from=${getFromDate()}&to=${getToday()}&quotes=${receiveCurrency}&base=${sendCurrency}`,
      );

      const data = await response.json();

      setHistoryData(data);
    } catch (e) {
      console.error(e);
    }
  };

  const xAxisTicks = () => {
    return historyData
      .filter((_, index) => index % 5 === 0)
      .map((item) => item.date);
  };

  useEffect(() => {
    fetchHistoryData();
  }, [sendCurrency, receiveCurrency, timeSeries]);
  return (
    <>
      {historyData.length === 0 ? (
        <div className="empty">Loading data...</div>
      ) : (
        <>
          <div className="v-center sb">
            <div className="v-center">
              <DataCard title="Open" value={historyData[0].rate} />
              <DataCard
                title="Close"
                value={historyData[historyData.length - 1].rate}
              />

              <DataCard
                title="Change"
                value={(
                  historyData[historyData.length - 1].rate - historyData[0].rate
                ).toFixed(4)}
                isPercent
                withoutPercent
              />

              <DataCard
                title="%Change"
                value={calculatePercentage(
                  historyData[historyData.length - 1].rate -
                    historyData[0].rate,
                  historyData[historyData.length - 1].rate,
                )}
                isPercent
              />
            </div>
            <div>
              {Object.values(TimeValue).map((value) => (
                <button
                  key={value}
                  onClick={() => setTimeSeries(value)}
                  className={`customBtn bg-1 ${timeSeries === value && "bg-2"}`}
                >
                  {BtnLabels[value]}
                </button>
              ))}
            </div>
          </div>
          <Chart
            chartType="AreaChart"
            data={chartData}
            width="100%"
            height="400px"
            legendToggle
            className="chart-history"
            options={{
              backgroundColor: chartBackground,
              legend: {
                textStyle: { color: chartTextColor },
              },
              hAxis: {
                ticks: xAxisTicks() as any,
                textStyle: { color: chartTextColor },
                titleTextStyle: { color: chartTextColor },
              },
              vAxis: {
                textStyle: { color: chartTextColor },
                titleTextStyle: { color: chartTextColor },
              },
              colors: [highlight],
              chartArea: {
                backgroundColor: chartBackground,
              },
            }}
          />
        </>
      )}
    </>
  );
};
