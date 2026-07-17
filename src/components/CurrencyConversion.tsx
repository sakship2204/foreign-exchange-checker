import classes from "./CurrencyConverstion.module.css";
import IconExchange from "/public/images/icon-exchange.svg";
import { CurrencySelectCard } from "./CurrencySelectCard";
import Unstar from "/public/images/icon-star.svg";
import Star from "/public/images/icon-star-filled.svg";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { useEffect, useState } from "react";
import {
  setConversionRate,
  setReceiveValue,
  setSendValue,
  toggleSendReceive,
} from "../store/converstion";

export const CurrencyConversion = () => {
  const [star, setStar] = useState(false);
  const dispatch = useDispatch();

  const sendVal = useSelector((state: any) => state.conversion.sendValue);
  const receiveVal = useSelector((state: any) => state.conversion.receiveValue);
  const conversionRate = useSelector(
    (state: any) => state.conversion.conversionRate,
  );

  const sendCurrency = useSelector((state: any) => state.conversion.send);
  const receiveCurrency = useSelector((state: any) => state.conversion.receive);

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

      dispatch(setConversionRate(data[0].rate));
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchRate();
  }, [sendCurrency, receiveCurrency]);

  useEffect(() => {
    dispatch(setReceiveValue((Number(sendVal) * conversionRate).toFixed(2)));
  }, [conversionRate, sendVal]);

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
              className="customBtn v-center"
              onClick={() => setStar(!star)}
            >
              <img src={star ? Star : Unstar} alt="" />
              FAVORITE
            </button>
            <button className="customBtn">LOG CONVERSION</button>
          </div>
        </div>
      </div>
    </>
  );
};
