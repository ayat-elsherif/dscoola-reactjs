/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Menu, Dropdown, Avatar } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

import ProfileAvatar from '../profileAvatar';
import Icon from '../Icon';

import {
  CoursesIcon,
  HelptIcon,
  LogoutIcon,
  ProfileIcon,
  PurchaseIcon,
  SettingsIcon,
  WishlistIcon,
} from '../../../../../assets/svg';
import './index.scss';
import Utils from '../../../../../utils';
import { useSelector } from 'react-redux';

const menuItem = [
  {
    title: 'View Profile',
    icon: ProfileIcon,
    path: '/student-dashboard/my-profile/personal-information',
  },
  {
    title: 'My Courses',
    path: '/student-dashboard/my-courses',
  },
  {
    title: 'My Wishlist',
    icon: WishlistIcon,
    path: '/student-dashboard/my-wishlist',
  },
  {
    title: 'Purchase History',
    icon: PurchaseIcon,
    path: '/student-dashboard/invoices',
  },
  {
    title: 'Help & Support',
    icon: HelptIcon,
    path: '/student-dashboard',
  },
  {
    title: 'Account Settings',
    icon: SettingsIcon,
    path: '/student-dashboard',
  },
];

export const NavProfile = ({ hideName }) => {
  const { currentUser } = useSelector((state) => state?.user);
  const navigate = useNavigate();
  const onLogout = () => {
    localStorage.removeItem('access_token');
    navigate('/sign-in');
  };

  const profileMenu = (
    <Menu>
      <div className="nav-profile-header">
        <ProfileAvatar />
      </div>
      {menuItem.map((el, i) => {
        console.log('{menuItem.map  el', el);

        return (
          <Menu.Item key={i}>
            <Link to={el.path}>
              <span className="sid-icon">
                <Icon type={el.icon} />
              </span>

              <span>{el.title}</span>
            </Link>
          </Menu.Item>
        );
      })}
      <div className="custom-divider"></div>
      <Menu.Item key={menuItem.length + 1} onClick={onLogout}>
        <span>
          <span className="sid-icon">
            <LogoutIcon />
          </span>
          <span>Log out</span>
        </span>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown
      placement="bottomRight"
      overlay={profileMenu}
      trigger={['click']}
      overlayClassName="profile-dropdown"
    >
      <div className="my-profile-menu">
        <Avatar
          size={34}
          className={`cursor-pointer `}
          src={currentUser?.photo_url}
        >
          <span className="text">
            {Utils.getNameInitial(currentUser?.name)}
          </span>
        </Avatar>

        {!hideName && (
          <div className="details">
            <span>Student</span>
            <span>{currentUser?.name}</span>
          </div>
        )}
      </div>
    </Dropdown>
  );
};

export default NavProfile;
