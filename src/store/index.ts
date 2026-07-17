import { configureStore } from "@reduxjs/toolkit";
import currencyConversionSlice from "./converstion";

export const store = configureStore({
  reducer: {
    conversion: currencyConversionSlice.reducer,
  },
});
