import { createSlice } from "@reduxjs/toolkit";

export type favoriteType = {
  base: string;
  quote: string;
  conversionRate?: string;
  percentageChange?: string;
};

const FavoriteSlice = createSlice({
  name: "favorite",
  initialState: {
    favoriteData: [] as any,
  },
  reducers: {
    addToFavoritesData(state, action) {
      state.favoriteData.push(action.payload);
    },
    removeFromFavorites(state, action) {
      state.favoriteData = state.favoriteData.filter(
        (data: favoriteType) =>
          data.base !== action.payload.base ||
          data.quote !== action.payload.quote,
      );
    },
  },
});

export default FavoriteSlice.reducer;

export const { addToFavoritesData, removeFromFavorites } =
  FavoriteSlice.actions;
