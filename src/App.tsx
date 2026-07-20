import { useEffect, useState } from "react";
import "./App.css";
import logo from "/public/images/logo.svg";
import { CurrencyConversion } from "./components/CurrencyConversion";
import React from "react";
import PercentageIndicator from "./components/PercentageIndicator";
import { AdditionalFunctionalities } from "./components/Additionals/AdditionalFunctionalities";
import { useDispatch, useSelector } from "react-redux";
import { setRatesData, toggleLightMode } from "./store/converstion";
import { get24hRateChange, type LiveRateData } from "./services/util";
import { FaSun, FaMoon } from "react-icons/fa6";

function App() {
  const [currentRates, setCurrentRates] = useState([]);
  const [numOfCurrencies, setNumOfCurrencies] = useState([]);
  const light = useSelector((state: any) => state.conversion.lightMode);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchCurrentRates();
  }, []);

  const fetchCurrentRates = async () => {
    try {
      const response = await fetch("https://api.frankfurter.dev/v2/rates");

      const data = await response.json();
      setCurrentRates(data);

      setNumOfCurrencies(data.length);

      const ratesData = await Promise.all(
        data.map(async (item: LiveRateData) => {
          const percentageChange = await get24hRateChange(item);
          return { ...item, percentageChange };
        }),
      );

      setCurrentRates(ratesData);
      dispatch(setRatesData(ratesData));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <div className={`app-container ${light && "light-mode"}`}>
        <section className="nav-bar">
          <img src={logo} alt="FX Checker" />
          <div className="right-actions">
            <div onClick={() => dispatch(toggleLightMode())} tabIndex={1}>
              {!light ? (
                <FaSun className="themeBtn" />
              ) : (
                <FaMoon className="themeBtn" />
              )}
            </div>
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
