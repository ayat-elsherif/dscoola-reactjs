import { createSlice } from "@reduxjs/toolkit";

export const notificationsSlice = createSlice({
  name: "courses",
  initialState: {
    allNotifications: [],
    loading: false,
    pushNotification: {},
  },

  reducers: {
    fetchStart: (state) => {
      state.loading = true;
    },
    getAllNotifications: (state, { payload }) => {
      state.allNotifications = payload;
      state.loading = false;
    },
    getPushNotification: (state, { payload }) => {
      state.pushNotification = payload;
      state.loading = false;
    },
  },
});

export const { getAllNotifications, getPushNotification, fetchStart } =
  notificationsSlice.actions;
export default notificationsSlice.reducer;
