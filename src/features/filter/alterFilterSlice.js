import { createSlice } from "@reduxjs/toolkit";

export const alterFilterSlice = createSlice({
  name: "filters",
  initialState: {
    alterFilterResult: [],
    totalNum: 0,
    loading: false,
  },
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
    },
    getAlterFilterResult: (state, { payload }) => {
      state.alterFilterResult = payload;
      state.loading = false;
    },
    getTotalNum: ({ totalNum }, action) => {
      totalNum = action.payload;
    },
  },
});

export const { getAlterFilterResult, getTotalNum, fetchStart } =
  alterFilterSlice.actions;
export default alterFilterSlice.reducer;
