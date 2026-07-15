import classes from "./CurrencyConverstion.module.css";
import IconExchange from "../assets/images/icon-exchange.svg";
import { CurrencySelectCard } from "./CurrencySelectCard";
export const CurrencyConversion = () => {
  return (
    <>
      <div className={classes.container}>
        <div className={"v-center " + classes.main}>
          <CurrencySelectCard country="USD" type="Send" />
          <button>
            <img src={IconExchange} alt="exchange" />
          </button>
          <CurrencySelectCard country="USD" type="Receive" />
        </div>
        <div className={classes.footer}></div>
      </div>
    </>
  );
};
