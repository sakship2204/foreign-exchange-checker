import { createSlice } from "@reduxjs/toolkit";

const LogsSlice = createSlice({
  name: "logs",
  initialState: {
    logsData: [],
  },
  reducers: {
    addToLogsData(state, action) {
      state.logsData.push({
        sendVal: action.payload.sendVal,
        rate: action.payload.rate,
        timeStamp: action.payload.time,
        id: Date.now(),
        sendCurrency: action.payload.sendCurrency,
        receiveCurrency: action.payload.receiveCurrency,
      });
    },
  },
});

export default LogsSlice.reducer;

export const actions = LogsSlice.actions;
