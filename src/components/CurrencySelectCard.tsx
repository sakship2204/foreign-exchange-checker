import { useState } from "react";
import classes from "./CurrencySelectCard.module.css";
import DownArrow from "../assets/images/icon-chevron-down.svg";

export const CurrencySelectCard = ({ country, type }) => {
  const [value, setValue] = useState("");

  return (
    <div className={classes.container}>
      {type}
      <div className={classes.main}>
        {value || 0}
        <button>
          {/* <img src={''}/> */}
          {country}
          <img src={DownArrow} />
        </button>
      </div>
    </div>
  );
};
