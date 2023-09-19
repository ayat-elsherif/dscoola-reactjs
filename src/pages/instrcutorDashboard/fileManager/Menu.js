import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Progress, Tabs } from 'antd';

import {
  HomeIcon,
  FilesIcon,
  DriveIcon,
  StarredIcon,
  ShareIcon,
  RecoveryIcon,
  StorageIcon,
} from '../../../assets/svg';
import Icon from '../../../components/common/dashboard/components/Icon';
import useScreens from 'Hooks/ui/useScreens';

const FileManagerMenu = () => {
  const navigate = useNavigate();
  const { isLg } = useScreens();
  const menuList = [
    {
      label: 'Home',
      path: 'home',
      key: 'home',
      icon: HomeIcon,
    },
    {
      label: 'My Files',
      path: 'my-files',
      key: 'my-files',
      icon: FilesIcon,
    },
    {
      label: 'Google Drive',
      path: 'google-drive',
      key: 'google-drive',
      icon: DriveIcon,
    },
    {
      label: 'Starred',
      path: 'starred',
      key: 'starred',
      icon: StarredIcon,
    },
    {
      label: 'Shared',
      path: 'shared',
      key: 'shared',
      icon: ShareIcon,
    },
    {
      label: 'Recovery',
      path: 'Recovery',
      key: 'Recovery',
      icon: RecoveryIcon,
    },
  ];

  return (
    <div className="file-Manager-menu">
      <div className="file-Manager-nav">
        {isLg ? (
          menuList.map((elm, index) => {
            return (
              <NavLink to={elm.path} key={index}>
                <span>
                  <Icon type={elm.icon} />
                  <span>{elm.label}</span>
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
      <div className="menu-footer">
        <div className="header">
          <StorageIcon />
          <span>Storage</span>
        </div>
        <Progress percent={30} size="small" showInfo={false} />
        <div className="used-data">12.47 GB of 50 GB used</div>
        <div className="upgrade">Upgrade Storage</div>
      </div>
    </div>
  );
};

export default FileManagerMenu;
