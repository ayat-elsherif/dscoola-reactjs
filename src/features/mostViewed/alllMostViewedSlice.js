import { createSlice } from "@reduxjs/toolkit";

export const allMostViewedSlice = createSlice({
  name: "viewed",
  initialState: {
    allMostViewed: [],
    totalNum: 0,
    loading: false,
  },
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
    },
    getAllMostViewed: (state, action) => {
      state.allMostViewed = action.payload;
      state.loading = false;
    },
    getTotalNum: (state, action) => {
      state.totalNum = action.payload;
    },
  },
});

export const { getAllMostViewed, getTotalNum, fetchStart } =
  allMostViewedSlice.actions;
export default allMostViewedSlice.reducer;
