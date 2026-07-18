import { createSlice } from "@reduxjs/toolkit";

const FavoriteSlice = createSlice({
  name: "favorite",
  initialState: {
    favoriteData: [],
  },
  reducers: {
    addToFavoritesData(state, action) {
      state.favoriteData.push(action.payload);
    },
    removeFromFavorites(state, action) {
      state.favoriteData = state.favoriteData.filter(
        (data) =>
          data.base !== action.payload.base ||
          data.quote !== action.payload.quote,
      );
    },
  },
});

export default FavoriteSlice.reducer;

export const { addToFavoritesData, removeFromFavorites } =
  FavoriteSlice.actions;
