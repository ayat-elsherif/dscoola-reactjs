import { createSlice } from '@reduxjs/toolkit';

export const courseLectureSlice = createSlice({
  name: 'courseLecture',
  initialState: {
    courseLecture: {},
  },
  reducers: {
    courseLecture: (state, action) => {
      state.courseLecture = action.payload;
    },
  },
});

export const { courseLecture } = courseLectureSlice.actions;
export default courseLectureSlice.reducer;
