import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  navCollapsed: false,
  mobileNav: false,
};
const themSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleCollapsedNav: (state, action) => {
      state.navCollapsed = action.payload;
    },
    onMobileNavToggle: (state, action) => {
      state.mobileNav = action.payload;
    },
  },
});
export default themSlice.reducer;

export const { toggleCollapsedNav, onMobileNavToggle } = themSlice.actions;
