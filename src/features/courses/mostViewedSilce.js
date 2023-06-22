import { createSlice } from "@reduxjs/toolkit";

export const mostViewedSlice = createSlice({
  name: "viewed",
  initialState: {
    studentsViewing: {
      mostViewed: [],
      loading: false,
    },
  },
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
    },
    fetchStudentsViewing: (state, action) => {
      state.studentsViewing.mostViewed = action.payload;
      state.loading = false;
    },
  },
});

export const { fetchStudentsViewing, fetchStart } = mostViewedSlice.actions;
export default mostViewedSlice.reducer;
