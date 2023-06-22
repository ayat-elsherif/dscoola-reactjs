import { createSlice } from '@reduxjs/toolkit';

export const courseContentStateSlice = createSlice({
  name: 'courseContentState',
  initialState: {
    courseContentState: {},
    loading: false,
  },
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
    },
    courseContentState: (state, action) => {
      state.courseContentState = action.payload;
    },
  },
});

export const { courseContentState, fetchStart } =
  courseContentStateSlice.actions;
export default courseContentStateSlice.reducer;
