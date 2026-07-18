import { configureStore } from "@reduxjs/toolkit";
import currencyConversionSlice from "./converstion";
import FavoriteSlice from "./favorite";

export const store = configureStore({
  reducer: {
    conversion: currencyConversionSlice.reducer,
    favorite: FavoriteSlice,
  },
});
