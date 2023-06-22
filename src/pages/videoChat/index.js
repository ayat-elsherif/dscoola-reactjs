/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatServices from '../../services/ChatServices';
import Room from './Room';
import RoomNavbar from './roomNavbar';
import './index.scss';
import { useSelector } from 'react-redux';
const VideoChat = () => {
  const [roomName, setRoomName] = useState('');
  const [token, setToken] = useState(null);

  const navigate = useNavigate();
  const chatData = useSelector((s) => s.chatData);

  useEffect(() => {
    if (!chatData.room_name && !chatData.booking_id) {
      navigate(-1);
    }
  });
  useEffect(() => {
    if (chatData.room_name || chatData.booking_id) {
      ChatServices.createRoom(chatData).then((res) => {
        setToken(res.room_token);
        setRoomName(res.room_name);
      });
    }
  }, [chatData]);

  const handleLogout = () => {
    setToken(null);
    navigate(-1);
  };

  return (
    <div className='room-container'>
      {token ? (
        <>
          <RoomNavbar />
          <Room roomName={roomName} token={token} handleLogout={handleLogout} />
        </>
      ) : null}
    </div>
  );
};

export default VideoChat;
