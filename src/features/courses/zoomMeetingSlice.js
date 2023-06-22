import { createSlice } from "@reduxjs/toolkit";

export const zoomMeetingSlice = createSlice({
  name: "webinars",
  initialState: {
    zoomMeeting: [],
    zoomMeetingPage: [],
    singleZoomMeeting: {},
    loading: false,
    totalNum: 0,
  },
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
    },

    showZoomMeeting: (state, action) => {
      state.zoomMeeting = action.payload;
      state.loading = false;
    },
    showZoomMeetingPage: (state, action) => {
      state.zoomMeetingPage = action.payload;
      state.loading = false;
    },
    showSingleZoomMeeting: (state, action) => {
      state.singleZoomMeeting = action.payload;
      state.loading = false;
    },
    getTotalNum: (state, action) => {
      state.totalNum = action.payload;
      state.loading = false;
    },
  },
});

export const {
  showZoomMeeting,
  showZoomMeetingPage,
  showSingleZoomMeeting,
  fetchStart,
  getTotalNum,
} = zoomMeetingSlice.actions;
export default zoomMeetingSlice.reducer;
