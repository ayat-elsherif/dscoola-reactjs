import { createSlice } from '@reduxjs/toolkit';

export const currentBundleSlice = createSlice({
  name: 'currentBundle',
  initialState: {
    currentBundle: '',
  },
  reducers: {
    currentBundle: (state, action) => {
      state.currentBundle = action.payload;
    },
  },
});

export const { currentBundle } = currentBundleSlice.actions;
export default currentBundleSlice.reducer;
