import { createSlice } from "@reduxjs/toolkit";

export const categoryPageSlice = createSlice({
  name: "categories",
  initialState: {
    topCategories: [],
    startingCourses: {
      mostViewed: [],
    },
    featuredCourses: [],
    allCategoryCourses: [],
    categoryId: 0,
    loading: false,
  },
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
    },
    getTopCategories: (state, { payload }) => {
      state.topCategories = payload;
      state.loading = false;
    },
    fetchStartingCourses: (state, { payload }) => {
      state.startingCourses.mostViewed = payload;
      state.loading = false;
    },

    fetchFeaturedCourses: (state, { payload }) => {
      state.featuredCourses = payload;
      state.loading = false;
    },
    // fetchAllCategoryCourses: (state, { payload }) => {
    //   state.allCategoryCourses = payload;
    //   state.loading = false;
    // },
    getCategoryId: (state, { payload }) => {
      state.categoryId = payload;
      state.loading = false;
    },
  },
});

export const {
  fetchStartingCourses,
  fetchFeaturedCourses,
  // fetchAllCategoryCourses,
  getTopCategories,
  getCategoryId,
  fetchStart,
} = categoryPageSlice.actions;
export default categoryPageSlice.reducer;
