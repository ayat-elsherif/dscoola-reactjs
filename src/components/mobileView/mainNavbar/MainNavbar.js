import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Drawer } from 'antd';
import HomeIcon from '../../../assets/svg/HomeIcon';
import AccountHomeIcon from '../../../assets/svg/AccountHomeIcon';
import CartHomeIcon from '../../../assets/svg/CartHomeIcon';
import CourseMutedIcon from '../../../assets/svg/CourseMutedIcon';

import HubDropdown from './HubDropdown';
import './mainNavbar.scss';
import AccountHome from '../account/AccountHome';
import { useSelector } from 'react-redux';
export default function MainNavbar() {
  const { currentUser } = useSelector((state) => state?.user);
  const navigate = useNavigate();
  console.log(currentUser, 'currentUser');
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const handleCollapsed = () => {
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
          {currentUser ? (
            <Link to="#" className={'navbar-item'} onClick={showDrawer}>
              <AccountHomeIcon /> <span>account</span>
            </Link>
          ) : (
            <Link to="/sign-in" className={'navbar-item'}>
              <AccountHomeIcon /> <span>account</span>
            </Link>
          )}
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
        <AccountHome handleCollapsed={handleCollapsed} />
      </Drawer>
    </>
  );
}
