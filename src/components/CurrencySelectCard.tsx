import { useEffect, useRef, useState } from "react";
import classes from "./CurrencySelectCard.module.css";
import ChevronDown from "/public/images/icon-chevron-down.svg";
import { useDispatch, useSelector } from "react-redux";
import { setReceive, setSend } from "../store/converstion";

type CurrencySelectProps = {
  country: string;
  type: string;
  setValue?: (value: string) => void;
  value: string;
};

export const CurrencySelectCard = ({
  country,
  type,
  setValue,
  value,
}: CurrencySelectProps) => {
  const allAvailableRates = useSelector(
    (state: any) => state.conversion.ratesData,
  );

  const dispatch = useDispatch();

  const dropdownRef = useRef<any>(null);

  const [selected, setSelected] = useState(country);
  const [showDropDown, setShowDropDown] = useState(false);

  const selectionHandler = (val: string) => {
    setSelected(val);
    dispatch(type === "Send" ? setSend(val) : setReceive(val));
  };

  useEffect(() => {
    setSelected(country);
  }, [country]);

  useEffect(() => {
    const handleOutsideClick = (event: PointerEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        setShowDropDown(false);
      }
    };

    document.addEventListener("pointerdown", handleOutsideClick);

    return () => {
      document.removeEventListener("pointerdown", handleOutsideClick);
    };
  }, []);

  return (
    <div className={classes.container}>
      {type}
      <div className={classes.main}>
        <span
          contentEditable={type === "Send"}
          onInput={(event) =>
            setValue && setValue(event.currentTarget.textContent ?? "")
          }
          className={`${classes.value} ${type === "Receive" && classes.yellow}`}
        >
          {value}
        </span>
        <div className={classes.dropdown} ref={dropdownRef}>
          <button
            className={
              classes.customDropdownBtn + " customBtn " + classes.flagImgCurr
            }
            onClick={() => setShowDropDown(!showDropDown)}
          >
            {" "}
            <img
              src={`/public/images/flags/${selected.slice(0, 2).toLowerCase()}.webp`}
              alt={selected.slice(0, 2).toLowerCase()}
              className={classes.imageClass}
            />
            {selected}
            <img src={ChevronDown} alt={selected.slice(0, 2).toLowerCase()} />
          </button>
          {showDropDown && (
            <div className={classes.customDropdownContainer}>
              {allAvailableRates.map((rateItem: any, index: number) => (
                <div
                  className={classes.dropDownItem + " " + classes.flagImgCurr}
                  onClick={() => selectionHandler(rateItem.quote)}
                >
                  <img
                    src={`/public/images/flags/${rateItem.quote.slice(0, 2).toLowerCase()}.webp`}
                    alt={rateItem.quote.slice(0, 2).toLowerCase()}
                    className={classes.imageClass}
                  />
                  <span key={index}> {rateItem.quote}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
