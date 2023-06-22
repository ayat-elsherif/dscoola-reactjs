import React from 'react';
import { Outlet } from 'react-router-dom';

import ProfileMenu from './Menu';
import './index.scss';
import { Row } from 'antd';

const Index = () => {
  return (
    <div className="my-profile">
      <h3 className="dashboard-page-title">My profile</h3>
      <div className="profile-card">
        <ProfileMenu />
        <div className="my-info">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Index;
