import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  room_name: null,
  booking_id: null,
  id: null,
};
const chatRoom = createSlice({
  name: 'chat-room',
  initialState,
  reducers: {
    saveBookingId: (state, action) => {
      state.booking_id = action.payload;
      state.id = action.payload;
    },
    saveChatRoomName: (state, action) => {
      state.room_name = action.payload.room_name;
      state.id = action.payload.id;
    },
  },
});
export default chatRoom.reducer;

export const { saveBookingId, saveChatRoomName } = chatRoom.actions;
