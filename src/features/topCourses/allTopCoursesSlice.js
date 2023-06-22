import { createSlice } from "@reduxjs/toolkit";

export const topCoursesSlice = createSlice({
  name: "courses",
  initialState: {
    allTopCourses: [],
    loading: false,
  },

  reducers: {
    fetchStart: (state) => {
      state.loading = true;
    },
    getAllTopCourses: (state, { payload }) => {
      state.allTopCourses = payload;
      state.loading = false;
    },
  },
});

export const { getAllTopCourses, fetchStart } = topCoursesSlice.actions;
export default topCoursesSlice.reducer;
