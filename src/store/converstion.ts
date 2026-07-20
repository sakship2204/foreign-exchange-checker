import { createSlice } from "@reduxjs/toolkit";

export const CompareCountries = [
  "INR",
  "EUR",
  "USD",
  "ZAR",
  "VND",
  "CHD",
  "NZD",
  "PED",
  "CAD",
  "KWD",
];

const currencyConversionSlice = createSlice({
  name: "currencyConversion",
  initialState: {
    send: "USD",
    receive: "EUR",
    sendValue: "0",
    receiveValue: "",
    conversionRate: "",
    ratesData: [],
    rateDate: "",
    compareData: [],
    lightMode: false,
  },
  reducers: {
    setSend(state, action) {
      state.send = action.payload;
    },

    setReceive(state, action) {
      state.receive = action.payload;
    },

    setSendValue(state, action) {
      state.sendValue = action.payload;
    },

    setReceiveValue(state, action) {
      state.receiveValue = action.payload;
    },

    setRatesData(state, action) {
      state.ratesData = action.payload;
    },

    setConversionRateAndDate(state, action) {
      state.conversionRate = action.payload.rate;
      state.rateDate = action.payload.date;
    },

    toggleSendReceive(state) {
      [state.send, state.receive] = [state.receive, state.send];
      [state.sendValue, state.receiveValue] = [
        state.receiveValue,
        state.sendValue,
      ];
    },

    setCompareData(state, action) {
      state.compareData = action.payload.filter((item: any) =>
        CompareCountries.includes(item.quote),
      );
    },

    toggleLightMode(state) {
      state.lightMode = !state.lightMode;
    },
  },
});
export default currencyConversionSlice;

export const {
  setRatesData,
  setReceiveValue,
  setSend,
  setSendValue,
  setReceive,
  toggleSendReceive,
  setConversionRateAndDate,
  setCompareData,
  toggleLightMode,
} = currencyConversionSlice.actions;
