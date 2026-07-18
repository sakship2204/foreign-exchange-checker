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
        receiveVal: action.payload.receiveVal,
        logTime: Date.now(),
        sendCurrency: action.payload.sendCurrency,
        receiveCurrency: action.payload.receiveCurrency,
      });
    },
    removeFromLogsData(state, action) {
      state.logsData = state.logsData.filter(
        (data) => data.logTime !== action.payload,
      );
    },
  },
});

export default LogsSlice.reducer;

export const { addToLogsData, removeFromLogsData } = LogsSlice.actions;
