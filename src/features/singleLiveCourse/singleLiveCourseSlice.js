import { createSlice } from "@reduxjs/toolkit";

export const singleLiveCourseSlice = createSlice({
  name: "singleLiveCourse",
  initialState: {
    singleLiveCourse: {},
    loading: false,
  },
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
    },
    fetchSingleLiveCourse: (state, action) => {
      state.singleLiveCourse = action.payload;
      state.loading = false;
    },
  },
});

export const { fetchSingleLiveCourse, fetchStart } =
  singleLiveCourseSlice.actions;
export default singleLiveCourseSlice.reducer;
