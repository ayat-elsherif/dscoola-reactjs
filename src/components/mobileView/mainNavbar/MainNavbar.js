import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import HomeIcon from '../../../assets/svg/HomeIcon';
import AccountHomeIcon from '../../../assets/svg/AccountHomeIcon';
import CartHomeIcon from '../../../assets/svg/CartHomeIcon';
import CourseMutedIcon from '../../../assets/svg/CourseMutedIcon';
import NavbarLogo from '../../../assets/svg/NavbarLogo';

import HubDropdown from './HubDropdown';
import './mainNavbar.scss';
export default function MainNavbar() {
  const [isMenu, setIsMenu] = useState(false);
  const closeHubDropDown = () => {
    setIsMenu(() => false);
    if (isMenu) {
      window.removeEventListener('click', closeHubDropDown);
    }
  };
  const toggleDropdown = (e) => {
    e.stopPropagation();
    if (isMenu) {
      document.body.classList.remove('hubDropdownOpen');
      window.addEventListener('click', closeHubDropDown);
    } else {
      document.body.classList.add('hubDropdownOpen');
    }
    setIsMenu(() => !isMenu);
  };

  return (
    <div className={'main_navbar'}>
      <div className={'container'}>
        <Link to="/" className={'navbar_item'}>
          <HomeIcon /> <span>Home</span>
        </Link>
        <Link to="/mycourses" className={'navbar_item'}>
          <CourseMutedIcon /> <span>course</span>
        </Link>
        <div className={`navbar_logo navbar_item`}>
          <div className={'hub_container'} onClick={toggleDropdown}>
            <NavbarLogo /> Hub
          </div>
          <HubDropdown isMenuClicked={isMenu} />
        </div>
        <Link to="/cart" className={'navbar_item'}>
          <CartHomeIcon /> <span>cart</span>
        </Link>
        <Link to="/account" className={'navbar_item'}>
          <AccountHomeIcon /> <span>account</span>
        </Link>
      </div>
    </div>
  );
}
