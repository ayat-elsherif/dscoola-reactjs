import { createSlice } from "@reduxjs/toolkit";

export const filterSlice = createSlice({
  name: "filters",
  initialState: {
    filterResult: [],
    totalNum: 0,
    loading: false,
  },
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
    },
    getFilterResult: (state, { payload }) => {
      state.filterResult = payload;
      state.loading = false;
    },
    getTotalNum: ({ totalNum }, action) => {
      totalNum = action.payload;
    },
  },
});

export const { getFilterResult, getTotalNum, fetchStart } = filterSlice.actions;
export default filterSlice.reducer;
