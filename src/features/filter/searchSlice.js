import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
  name: "filters",
  initialState: {
    searchResult: [],
    loading: false,
  },
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
    },
    getSearchResult: (state, { payload }) => {
      state.searchResult = payload;
      state.loading = false;
    },
  },
});

export const { getSearchResult, fetchStart } = searchSlice.actions;
export default searchSlice.reducer;
