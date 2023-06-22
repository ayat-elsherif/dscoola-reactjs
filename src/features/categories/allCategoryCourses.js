import { createSlice } from "@reduxjs/toolkit";

export const allCatgoryCoursesSlice = createSlice({
  name: "categories",
  initialState: {
    allCategoryCourses: [],
    categoryId: 0,
    loading: false,
  },
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
    },
    fetchAllCategoryCourses: (state, { payload }) => {
      state.allCategoryCourses = payload;
      state.loading = false;
    },
    getCategoryId: (state, { payload }) => {
      state.categoryId = payload;
      state.loading = false;
    },
  },
});
export const { fetchAllCategoryCourses, getCategoryId, fetchStart } =
  allCatgoryCoursesSlice.actions;
export default allCatgoryCoursesSlice.reducer;
