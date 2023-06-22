import React from 'react';
import { Link } from 'react-router-dom';
import { ChatLogoIcon, ClockIcon } from '../../../assets/svg';
import './index.scss';
const RoomNavbar = () => {
  return (
    <div className='room-navbar'>
      <div className='chat-name'>
        <Link>
          <ChatLogoIcon />
        </Link>
        <h5>Discussion about Agile and Scrum for Product Owners</h5>
      </div>
      <div className='timer'>
        <ClockIcon />
      </div>
    </div>
  );
};

export default RoomNavbar;
