import { createSlice } from "@reduxjs/toolkit";

export const singleCourseSlice = createSlice({
  name: "singleCourse",
  initialState: {
    singleCourse: {},
    loading: false,
  },
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
    },
    singleCourse: (state, action) => {
      state.singleCourse = action.payload;
      state.loading = false;
    },
  },
});

export const { singleCourse, fetchStart } = singleCourseSlice.actions;
export default singleCourseSlice.reducer;
