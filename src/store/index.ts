import { configureStore } from "@reduxjs/toolkit";
import currencyConversionSlice from "./converstion";
import FavoriteSlice from "./favorite";
import LogsSlice from "./logs";

export const store = configureStore({
  reducer: {
    conversion: currencyConversionSlice.reducer,
    favorite: FavoriteSlice,
    logs: LogsSlice,
  },
});
