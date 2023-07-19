import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import HomeIcon from '../../../assets/svg/HomeIcon';
import AccountHomeIcon from '../../../assets/svg/AccountHomeIcon';
import CartHomeIcon from '../../../assets/svg/CartHomeIcon';
import CourseMutedIcon from '../../../assets/svg/CourseMutedIcon';

import HubDropdown from './HubDropdown';
import './mainNavbar.scss';
export default function MainNavbar() {
  return (
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
        <Link to="/account" className={'navbar-item'}>
          <AccountHomeIcon /> <span>account</span>
        </Link>
      </div>
    </div>
  );
}
