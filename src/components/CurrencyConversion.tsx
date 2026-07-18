import classes from "./CurrencyConverstion.module.css";
import IconExchange from "/public/images/icon-exchange.svg";
import { CurrencySelectCard } from "./CurrencySelectCard";
import Unstar from "/public/images/icon-star.svg";
import Star from "/public/images/icon-star-filled.svg";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { useEffect, useState } from "react";
import {
  setConversionRateAndDate,
  setReceiveValue,
  setSendValue,
  toggleSendReceive,
} from "../store/converstion";
import { addToFavoritesData, removeFromFavorites } from "../store/favorite";
import { get24hRateChange, type LiveRateData } from "../services/util";
import { addToLogsData } from "../store/logs";

export const CurrencyConversion = () => {
  const [star, setStar] = useState(false);
  const dispatch = useDispatch();

  const sendVal = useSelector((state: any) => state.conversion.sendValue);
  const receiveVal = useSelector((state: any) => state.conversion.receiveValue);
  const conversionRate = useSelector(
    (state: any) => state.conversion.conversionRate,
  );

  const date = useSelector((state: any) => state.conversion.rateDate);

  const sendCurrency = useSelector((state: any) => state.conversion.send);
  const receiveCurrency = useSelector((state: any) => state.conversion.receive);

  const favoritesData = useSelector(
    (state: any) => state.favorite.favoriteData,
  );

  const setSendValueFxn = (val: string | number) => {
    dispatch(setSendValue(val));
  };

  const toggleSendReceiveFxn = () => {
    dispatch(toggleSendReceive());
  };

  const fetchRate = async () => {
    try {
      const response = await fetch(
        `https://api.frankfurter.dev/v2/rates?base=${sendCurrency}&quotes=${receiveCurrency}`,
      );

      const data = await response.json();

      dispatch(setConversionRateAndDate(data[0]));
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchRate();

    setStar(
      favoritesData.some(
        (data: LiveRateData) =>
          data.quote === receiveCurrency && data.base === sendCurrency,
      ),
    );
  }, [sendCurrency, receiveCurrency]);

  useEffect(() => {
    setStar(
      favoritesData.some(
        (data: LiveRateData) =>
          data.quote === receiveCurrency && data.base === sendCurrency,
      ),
    );
  }, [favoritesData]);

  useEffect(() => {
    dispatch(setReceiveValue((Number(sendVal) * conversionRate).toFixed(2)));
  }, [conversionRate, sendVal]);

  const handleFavoriting = async () => {
    if (!star) {
      const percentageChange = await get24hRateChange({
        quote: receiveCurrency,
        base: sendCurrency,
        date: date,
        rate: conversionRate,
      });

      dispatch(
        addToFavoritesData({
          quote: receiveCurrency,
          base: sendCurrency,
          conversionRate,
          percentageChange,
        }),
      );
    } else {
      dispatch(
        removeFromFavorites({
          quote: receiveCurrency,
          base: sendCurrency,
        }),
      );
    }
    setStar(!star);
  };

  const addToLoggedData = () => {
    dispatch(
      addToLogsData({
        sendVal,
        receiveVal,
        sendCurrency,
        receiveCurrency,
      }),
    );
  };

  return (
    <>
      <div className={classes.container}>
        <div className={"v-center " + classes.main}>
          <CurrencySelectCard
            country={sendCurrency}
            type="Send"
            value={sendVal}
            setValue={setSendValueFxn}
          />
          <button onClick={toggleSendReceiveFxn} className="customBtn">
            <img src={IconExchange} alt="exchange" />
          </button>
          <CurrencySelectCard
            country={receiveCurrency}
            type="Receive"
            value={receiveVal}
          />
        </div>
        <div className={classes.footer}>
          <span>
            1 {sendCurrency} = {conversionRate} {receiveCurrency}
          </span>

          <div className={classes.buttons}>
            <button
              className={`${star && classes.favoriteBtn} customBtn v-center`}
              onClick={() => handleFavoriting()}
            >
              <img src={star ? Star : Unstar} alt="" />
              {star ? "FAVORITED" : "FAVORITE"}
            </button>
            <button
              className={"customBtn " + (sendVal <= 0 && classes.disabled)}
              onClick={addToLoggedData}
              disabled={sendVal <= 0}
            >
              LOG CONVERSION
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
