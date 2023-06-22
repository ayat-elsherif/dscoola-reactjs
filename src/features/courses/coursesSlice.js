import { createSlice } from "@reduxjs/toolkit";

export const coursesSlice = createSlice({
  name: "courses",
  initialState: {
    topCourses: [],
    freeCourses: [],
    allCourses: [],
    loading: false,
  },

  reducers: {
    fetchStart: (state) => {
      state.loading = true;
    },
    topCourses: (state, { payload }) => {
      state.topCourses = payload;
      state.loading = false;
    },
    fetchFreeCourses: (state, { payload }) => {
      state.freeCourses = payload;
      state.loading = false;
    },
    fetchAllCourses: (state, { payload }) => {
      state.allCourses = payload;
      state.loading = false;
    },
  },
});

export const { topCourses, fetchFreeCourses, fetchStart } =
  coursesSlice.actions;
export default coursesSlice.reducer;
