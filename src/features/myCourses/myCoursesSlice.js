import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  coursesNum: 0,
};
const myCoursesSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    saveCourseLength: (state, action) => {
      state.coursesNum = action.payload;
    },
  },
});
export default myCoursesSlice.reducer;

export const { saveCourseLength } = myCoursesSlice.actions;
