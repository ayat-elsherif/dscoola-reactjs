import React from 'react';
import { Menu, Tabs } from 'antd';
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
import useScreens from 'Hooks/ui/useScreens';

const ProfileMenu = () => {
  const menuList = [
    {
      label: 'Personal Information',
      path: 'personal-information',
      key: 'personal-information',
      icon: ProfileIcon,
    },

    {
      label: 'My Wallet',
      path: 'my-wallet',
      key: 'my-wallet',
      icon: PaymentsMethodsIcon,
    },
    {
      label: 'Payment Methods',
      path: 'credit-cards',
      key: 'credit-cards',
      icon: PaymentsMethodsIcon,
    },
    {
      label: 'Notification Settings',
      path: 'notification-settings',
      key: 'notification-settings',
      icon: BillIcon,
    },
    {
      label: 'Security Settings',
      path: 'security-settings',
      key: 'security-settings',
      icon: SecurityIcon,
    },
    {
      label: 'Login Activity',
      path: 'login-activity',
      key: 'login-activity',
      icon: SecurityIcon,
    },
    {
      label: 'Deactivate Account',
      path: 'deactivate-account',
      key: 'deactivate-account',
      icon: DeactivateAccountIcon,
    },
  ];

  const { isLg } = useScreens();
  const navigate = useNavigate();
  function insertAt(array, index, ...elementsArray) {
    array.splice(index, 0, ...elementsArray);
  }
  const { currentUser } = useSelector((state) => state?.user);
  console.log(currentUser, 'asfwefgwef');
  if (currentUser?.role_id === 2) {
    insertAt(menuList, 1, {
      label: 'Work Experiences',
      path: 'Work-Experiences',
      key: 'Work-Experiences',
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
        {isLg ? (
          menuList.map((elm, index) => {
            return (
              <NavLink to={elm.path} key={index}>
                <span>
                  <Icon type={elm.icon} />
                  <span>{elm.label}</span>
                </span>
                <span>
                  <ArrowIcon />
                </span>
              </NavLink>
            );
          })
        ) : (
          <Tabs
            defaultActiveKey="1"
            items={menuList.map((elm, index) => {
              return {
                label: (
                  <NavLink to={elm.path} key={index}>
                    {/* <Icon type={elm.icon} /> */}
                    {elm.label}
                  </NavLink>
                ),
                key: elm.key,
              };
            })}
            onChange={(key) => navigate(key)}
          ></Tabs>
        )}
      </div>
    </div>
  );
};

export default ProfileMenu;
