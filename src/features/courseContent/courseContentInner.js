import { createSlice } from '@reduxjs/toolkit';

export const courseContentInnerSlice = createSlice({
  name: 'courseContentInner',
  initialState: {
    courseContentInner: {},
  },
  reducers: {
    courseContentInner: (state, action) => {
      state.courseContentInner = action.payload;
    },
  },
});

export const { courseContentInner } = courseContentInnerSlice.actions;
export default courseContentInnerSlice.reducer;
