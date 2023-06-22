import React from 'react';
import { Menu } from 'antd';
import {
  Link,
  NavLink,
  useLocation,
  useMatch,
  useNavigate,
  useRoutes,
} from 'react-router-dom';

import {
  ArrowIcon,
  ProfileIcon,
  PaymentsMethodsIcon,
  SecurityIcon,
  DeactivateAccountIcon,
  BillIcon,
  MoreIcon,
} from '../../../assets/svg';
import Icon from '../../../components/common/dashboard/components/Icon';
import ProfileAvatar from '../../../components/common/dashboard/components/profileAvatar';
import { useSelector } from 'react-redux';

const ProfileMenu = () => {
  const menuList = [
    {
      name: 'Personal Information',
      path: 'personal-information',
      key: 'PersonalInformation',
      icon: ProfileIcon,
    },

    {
      name: 'My Wallet',
      path: 'my-wallet',
      key: 'myWallet',
      icon: PaymentsMethodsIcon,
    },
    {
      name: 'Payment Methods',
      path: 'credit-cards',
      key: 'CreditCards',
      icon: PaymentsMethodsIcon,
    },
    {
      name: 'Notification Settings',
      path: 'notification-settings',
      key: 'NotificationSettings',
      icon: BillIcon,
    },
    {
      name: 'Security Settings',
      path: 'security-settings',
      key: 'SecuritySettings',
      icon: SecurityIcon,
    },
    {
      name: 'Login Activity',
      path: 'login-activity',
      key: 'LoginActivity',
      icon: SecurityIcon,
    },
    {
      name: 'Deactivate Account',
      path: 'deactivate-account',
      key: 'DeactivateAccount',
      icon: DeactivateAccountIcon,
    },
  ];

  function insertAt(array, index, ...elementsArray) {
    array.splice(index, 0, ...elementsArray);
  }
  const { currentUser } = useSelector((state) => state?.user);
  console.log(currentUser, 'asfwefgwef');
  if (currentUser?.role_id === 2) {
    insertAt(menuList, 1, {
      name: 'Work Experiences',
      path: 'Work-Experiences',
      key: 'workExperiences',
      icon: ProfileIcon,
    });
  }

  return (
    <div className="myprofile-menu">
      <div className="menu-header">
        <ProfileAvatar />
      </div>
      <div className="custom-divider"></div>
      <div className="myprofile-nav">
        {menuList.map((elm, index) => {
          return (
            <NavLink to={elm.path} key={index}>
              <span>
                <Icon type={elm.icon} />
                <span>{elm.name}</span>
              </span>
              <span>
                <ArrowIcon />
              </span>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default ProfileMenu;
