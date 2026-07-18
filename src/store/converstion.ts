import { createSlice } from "@reduxjs/toolkit";

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
} = currencyConversionSlice.actions;
