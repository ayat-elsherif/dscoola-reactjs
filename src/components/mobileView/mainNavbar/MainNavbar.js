import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Drawer } from 'antd';
import HomeIcon from '../../../assets/svg/HomeIcon';
import AccountHomeIcon from '../../../assets/svg/AccountHomeIcon';
import CartHomeIcon from '../../../assets/svg/CartHomeIcon';
import CourseMutedIcon from '../../../assets/svg/CourseMutedIcon';

import HubDropdown from './HubDropdown';
import './mainNavbar.scss';
import AccountHome from '../account/AccountHome';
export default function MainNavbar() {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <div className={'main-navbar'}>
        <div className={'main-navbar-container'}>
          <Link to="/" className={'navbar-item'}>
            <HomeIcon /> <span>Home</span>
          </Link>
          <Link to="/mycourses" className={'navbar-item'}>
            <CourseMutedIcon /> <span>course</span>
          </Link>

          <HubDropdown />
          <Link to="/cart" className={'navbar-item'}>
            <CartHomeIcon /> <span>cart</span>
          </Link>
          <Link to="/" className={'navbar-item'} onClick={showDrawer}>
            <AccountHomeIcon /> <span>account</span>
          </Link>
        </div>
      </div>
      <Drawer
        // title="Basic Drawer"
        placement="right"
        // closable={false}
        onClose={onClose}
        open={open}
        rootClassName="account-drawer"
      >
        <AccountHome />
      </Drawer>
    </>
  );
}
