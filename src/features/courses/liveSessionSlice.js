import { createSlice } from "@reduxjs/toolkit";

export const liveSessionSlice = createSlice({
  name: "lives",
  initialState: {
    liveSession: [],
    loading: false,
  },
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
    },
    liveSession: (state, action) => {
      state.liveSession = action.payload;
      state.loading = false;
    },
  },
});

export const { liveSession, fetchStart } = liveSessionSlice.actions;
export default liveSessionSlice.reducer;
