import { createSlice } from "@reduxjs/toolkit";

export const allYallaOnlineSlice = createSlice({
  name: "allYallaOnline",
  initialState: {
    allYallaOnline: {},
    loading: false,
  },
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
    },
    fetchAllYallaOnline: (state, action) => {
      state.allYallaOnline = action.payload;
      state.loading = false;
    },
  },
});

export const { fetchAllYallaOnline, fetchStart } = allYallaOnlineSlice.actions;
export default allYallaOnlineSlice.reducer;
