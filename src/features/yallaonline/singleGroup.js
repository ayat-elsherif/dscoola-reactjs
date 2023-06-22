import { createSlice } from "@reduxjs/toolkit";

export const singleGroupSlice = createSlice({
  name: "singleGroup",
  initialState: {
    singleGroup: {},
    loading: false,
  },
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
    },
    fetchSingleGroup: (state, action) => {
      state.singleGroup = action.payload;
      state.loading = false;
    },
  },
});

export const { fetchSingleGroup, fetchStart } = singleGroupSlice.actions;
export default singleGroupSlice.reducer;
