import { createSlice } from "@reduxjs/toolkit";

export const levelsSlice = createSlice({
  name: "levels",
  initialState: {
    levels: [],
  },
  reducers: {
    allLevels: (state, { payload }) => {
      state.levels = payload;
    },
  },
});

export const { allLevels } = levelsSlice.actions;
export default levelsSlice.reducer;
