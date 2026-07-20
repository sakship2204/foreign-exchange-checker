import { createSlice } from "@reduxjs/toolkit";

const ProviderSlice = createSlice({
  name: "provider",
  initialState: {
    providers: "",
  },
  reducers: {
    setProviders(state, action) {
      state.providers = action.payload;
    },
  },
});

export default ProviderSlice.reducer;

export const { setProviders } = ProviderSlice.actions;
