import { createSlice } from "@reduxjs/toolkit";

export const zoomSDKSlice = createSlice({
  name: "zoomSDK",
  initialState: {
    zoomSDK: {},
    zoomObj: {},
    loading: false,
  },
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
    },
    getZoomSDK: (state, action) => {
      state.zoomSDK = action.payload;
      state.loading = false;
    },
    getZoomObj: (state, action) => {
      state.zoomObj = action.payload;
      state.loading = false;
    },
  },
});

export const { getZoomSDK, getZoomObj, fetchStart } = zoomSDKSlice.actions;
export default zoomSDKSlice.reducer;
