import fetch from '../auth/AuthInterceptor';

const ChatServices = {};

ChatServices.createRoom = function (data) {
  const formData = new FormData();
  data.booking_id && formData.append('booking_id', data.booking_id);
  data.room_name && formData.append('room_name', data.room_name);
  return fetch({
    url: 'api/twilio/video-room',
    method: 'post',
    headers: {
      'public-request': 'true',
    },
    data: formData,
  });
};
ChatServices.changeStatus = function (id) {
  return fetch({
    url: `api/twilio/room-status/${id}`,
    method: 'post',
    headers: {
      'public-request': 'true',
    },
  });
};
export default ChatServices;
