import { createSlice } from "@reduxjs/toolkit";

export const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    allCategories: [],
  },
  reducers: {
    fetchAllCategories: (state, { payload }) => {
      state.allCategories = payload;
    },
  },
});

export const { fetchAllCategories } = categoriesSlice.actions;
export default categoriesSlice.reducer;
