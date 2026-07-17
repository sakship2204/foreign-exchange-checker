import { use, useEffect, useState } from "react";
import "./App.css";
import logo from "/public/images/logo.svg";
import { CurrencyConversion } from "./components/CurrencyConversion";
import React from "react";
import PercentageIndicator from "./components/PercentageIndicator";
import { AdditionalFunctionalities } from "./components/Additionals/AdditionalFunctionalities";
import { useDispatch } from "react-redux";
import { setRatesData } from "./store/converstion";

type LiveRateData = {
  date: string;
  rate: string;
  base: string;
  quote: string;
  percentageChange?: string;
};
function App() {
  const [currentRates, setCurrentRates] = useState([]);
  const [numOfCurrencies, setNumOfCurrencies] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    fetchCurrentRates();
  }, []);

  const yesterdayDate = (today: string) => {
    const date = new Date(today);
    const previousDate = new Date(date.getTime() - 24 * 60 * 60 * 1000);

    return previousDate.toISOString().split("T")[0];
  };

  function calculatePercentage(value: number, total: number, decimals = 2) {
    if (total === 0) return 0;
    const percentage = (value / total) * 100;

    return Number(percentage.toFixed(decimals));
  }

  async function getYesterdayRate(item: LiveRateData) {
    try {
      const yesterdayRateResponse = await fetch(
        `https://api.frankfurter.dev/v2/rates?quotes=${item.quote}&base=${item.base}&date=${yesterdayDate(item.date)}`,
      );

      const yesterdayRate: LiveRateData = await yesterdayRateResponse.json();

      const percentageChange = calculatePercentage(
        Number(item.rate) - Number(yesterdayRate[0].rate),
        Number(item.rate),
      );

      return {
        ...item,
        percentageChange,
      };
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  const fetchCurrentRates = async () => {
    try {
      const response = await fetch("https://api.frankfurter.dev/v2/rates");

      const data = await response.json();
      setCurrentRates(data);

      dispatch(setRatesData(data));
      setNumOfCurrencies(data.length);

      const ratesData = await Promise.all(
        data.map(async (item: LiveRateData) => {
          const yesterdayResp = await getYesterdayRate(item);
          return yesterdayResp;
        }),
      );

      setCurrentRates(ratesData);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <div className="app-container">
        <section className="nav-bar">
          <img src={logo} alt="FX Checker" />
          <div className="right-actions">
            <li>{numOfCurrencies} CURRENCIES</li>
            <li>EOD</li>
            <li>ECB DATA</li>
          </div>
        </section>
        <section className="nav-bottom">
          <div className="live-market">&middot; LIVE MARKETS</div>
          <div className="live-data">
            <div className="live-data-track">
              {currentRates.map((item: LiveRateData, index) => (
                <React.Fragment key={index}>
                  <span>
                    {item.base}/{item.quote}
                  </span>
                  <span>{item.rate}</span>
                  <PercentageIndicator value={item.percentageChange} />
                </React.Fragment>
              ))}
            </div>
          </div>
        </section>

        <section className="main-container">
          <div>CHECK THE RATE</div>
          <CurrencyConversion />

          <AdditionalFunctionalities />
        </section>
      </div>
    </>
  );
}

export default App;
