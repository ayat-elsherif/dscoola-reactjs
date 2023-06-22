import React from 'react';
import { Avatar } from 'antd';
import Utils from '../../../../../utils';
import './index.scss';
import { useSelector } from 'react-redux';

const ProfileAvatar = () => {
  const { currentUser } = useSelector((state) => state?.user);
  return (
    <div className="profile-avatar">
      <Avatar size={39} src={currentUser?.photo_url}>
        {Utils.getNameInitial(currentUser?.name)}
      </Avatar>
      <div className="profile-info">
        <div className="title">{currentUser?.name}</div>
        <div className="name">{currentUser?.email}</div>
      </div>
    </div>
  );
};

export default ProfileAvatar;
