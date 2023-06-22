import React from 'react';
import { NavLink } from 'react-router-dom';
import { Progress } from 'antd';

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

const FileManagerMenu = () => {
  const menuList = [
    {
      name: 'Home',
      path: 'home',
      key: 'home',
      icon: HomeIcon,
    },
    {
      name: 'My Files',
      path: 'my-files',
      key: 'my-files',
      icon: FilesIcon,
    },
    {
      name: 'Google Drive',
      path: 'google-drive',
      key: 'google-drive',
      icon: DriveIcon,
    },
    {
      name: 'Starred',
      path: 'starred',
      key: 'starred',
      icon: StarredIcon,
    },
    {
      name: 'Shared',
      path: 'shared',
      key: 'shared',
      icon: ShareIcon,
    },
    {
      name: 'Recovery',
      path: 'Recovery',
      key: 'Recovery',
      icon: RecoveryIcon,
    },
  ];

  return (
    <div className='file-Manager-menu'>
      <div className='file-Manager-nav'>
        {menuList.map((elm, index) => {
          return (
            <NavLink to={elm.path} key={index}>
              <span>
                <Icon type={elm.icon} />
                <span>{elm.name}</span>
              </span>
            </NavLink>
          );
        })}
      </div>
      <div className='menu-footer'>
        <div className='header'>
          <StorageIcon />
          <span>Storage</span>
        </div>
        <Progress percent={30} size='small' showInfo={false} />
        <div className='used-data'>12.47 GB of 50 GB used</div>
        <div className='upgrade'>Upgrade Storage</div>
      </div>
    </div>
  );
};

export default FileManagerMenu;
