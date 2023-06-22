import { Avatar, Button, Col, Dropdown, Row } from 'antd';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import { avatarImg } from 'constant/constant';
import './UserMenu.scss';
import {
  CoursesIcon,
  HelptIcon,
  LogoutIcon,
  ProfileIcon,
  PurchaseIcon,
  SettingsIcon,
  WishlistIcon,
} from 'assets/svg';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from 'features/user/user';
import { useQueryClient } from '@tanstack/react-query';
import { queryKeys } from 'services/react-query/queryKeys';
import Utils from 'utils';
import LogoutModal from 'components/common/dashboard/components/logoutModal';
import { useState } from 'react';

function UserMenu({ dashboard }) {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state?.user);
  const [isModLogoutVis, setIsModLogoutVis] = useState(false);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const onLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    queryClient.removeQueries([queryKeys.cartInfo]);
    queryClient.removeQueries([queryKeys.notifList]);
    dispatch(setCurrentUser(null));
    navigate('/sign-in');
  };

  const menuItem = (item) => (
    <div className="menu-item">
      {/* <div className="image-wrapper">
        <img alt="url" src={item.thumbnail_url} />
      </div> */}
      <div className="text-wrapper">{item?.label}</div>
    </div>
  );

  const firstItem = {
    key: 'title',
    label: (
      <div className="menu-item-head">
        {/* <Avatar
          size={48}
          src={
            <Image
              preview={false}
              src={
                `https://dscoola-files.s3.eu-west-1.amazonaws.com/${currentUser?.photo_url}` ||
                avatarImg
              }
              fallback={avatarImg}
            />
          }
        /> */}
        <Avatar size={39} src={currentUser?.photo_url}>
          {Utils.getNameInitial(currentUser?.name)}
        </Avatar>

        <div className="text-wrapper">
          <div>{currentUser?.name}</div>
          <div className="lead">{currentUser?.email}</div>
        </div>
      </div>
    ),
    className: 'menu-item-head-wrapper',
  };

  const userMenuItemList = [
    {
      key: '/student-dashboard/my-profile',
      label: 'View Profile',
      icon: <ProfileIcon />,
    },
    // {
    //   key: '/instructor-dashboard/my-profile',
    //   label: 'Instructor Profile',
    //   icon: <ProfileIcon />,
    // },
    {
      key: '/student-dashboard/my-courses',
      label: 'My Courses',
      icon: <CoursesIcon />,
    },
    {
      key: '/student-dashboard/my-wishlist',
      label: 'My Wishlist',
      icon: <WishlistIcon />,
    },
    {
      key: '/student-dashboard/invoices',
      label: 'Purchase History',
      icon: <PurchaseIcon />,
    },
    {
      key: '/support',
      label: 'help & support',
      icon: <HelptIcon />,
    },
    {
      key: '/student-dashboard/my-profile/security-settings',
      label: 'Account Settings',
      icon: <SettingsIcon />,
    },
  ];
  const instructorMenuItemList = [
    {
      key: '/instructor-dashboard/my-profile',
      label: 'View Profile',
      icon: <ProfileIcon />,
    },
    {
      key: '/student-dashboard/my-profile',
      label: 'Student Profile',
      icon: <ProfileIcon />,
    },
    // {
    //   key: '/student-dashboard/my-profile',
    //   label: 'Purchase History',
    //   icon: <PurchaseIcon />,
    // },
    {
      key: '/instructor-dashboard/zoom-settings',
      label: 'Meeting Settings',
      icon: <ProfileIcon />,
    },
    {
      key: '/instructor-dashboard/my-profile/security-settings',
      label: 'Account Settings',
      icon: <SettingsIcon />,
    },
  ];

  const menuItems =
    currentUser?.role_id === 2
      ? instructorMenuItemList.map((el) => ({
          key: el?.key,
          label: menuItem(el),
          icon: el.icon,
          onClick: ({ key }) => {
            if (el.label === 'Student Profile') {
              dispatch(setCurrentUser({ ...currentUser, role_id: 3 }));
              localStorage.setItem('role', 3);
              setTimeout(() => {
                navigate('/student-dashboard/my-profile');
              }, 500);
              return false;
            }

            navigate(key);
          },
        }))
      : userMenuItemList?.map(
          (el) =>
            el && {
              key: el?.key,
              label: menuItem(el),
              icon: el.icon,
              onClick: ({ key }) => {
                if (el.label === 'Instructor Profile') {
                  dispatch(setCurrentUser({ ...currentUser, role_id: 2 }));
                  localStorage.setItem('role', 2);
                  setTimeout(() => {
                    navigate('/instructor-dashboard/my-profile');
                  }, 500);
                  return false;
                }

                navigate(key);
              },
            },
        );

  const lastItem = {
    key: 'logout',
    label: 'logout',
    icon: <LogoutIcon />,
    className: 'menu-item-tail',
    onClick: () => setIsModLogoutVis(true),
  };

  const items = [firstItem, ...menuItems, lastItem];

  if (!currentUser)
    return (
      <div className="user-action">
        <Row gutter={5} align="middle">
          <Col>
            <Link to="/sign-in">
              <Button type="link">Sign in</Button>
            </Link>
          </Col>
          <Col>
            <Link to="/sign-up">
              <Button type="primary">Sign Up</Button>
            </Link>
          </Col>
        </Row>
      </div>
    );

  return (
    <>
      <Dropdown
        menu={{
          items,
          className: 'user-menu-wrapper',
        }}
        arrow
      >
        {dashboard ? (
          <div className="dashboard-menu-btn">
            <Avatar size={39} src={currentUser?.photo_url}>
              {Utils.getNameInitial(currentUser?.name)}
            </Avatar>

            <div className="text-wrapper">
              <div>{currentUser?.name}</div>
              <div className="lead">{currentUser?.email}</div>
            </div>
          </div>
        ) : (
          <Avatar
            className="avatar-round-holder"
            size={39}
            src={currentUser?.photo_url}
          >
            {Utils.getNameInitial(currentUser?.name)}
          </Avatar>
        )}
      </Dropdown>
      <LogoutModal
        isOpen={isModLogoutVis}
        onsubmit={onLogout}
        cancel={() => setIsModLogoutVis(false)}
      />
    </>
  );
}

export default UserMenu;
