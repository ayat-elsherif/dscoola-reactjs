import React, { useState } from 'react';
import { Menu, Dropdown, Avatar } from 'antd';
import { BillIcon, SettingsNotifIcon } from '../../../../../assets/svg';
import './index.scss';

const list = [
  {
    id: 1,
    name: 'Agile and Scrum for Product Owners',
    desc: 'You are Enrolled',
    icon: '/assets/images/avatar.png',
  },
  {
    id: 2,
    name: 'Instructor name make an announcement in Agile and...',
    desc: '1 day ago',
    icon: '/assets/images/avatar.png',
  },
  {
    id: 3,
    name: 'Agile and Scrum for Product Owners',
    desc: 'You are Enrolled',
    icon: '/assets/images/avatar.png',
  },
];

const menu = (
  <Menu>
    <div className="nav-notification-header d-flex justify-content-between align-items-center">
      <h4 className="mb-0">All Notifications</h4>
      <SettingsNotifIcon />
    </div>
    <div className="custom-divider"></div>
    {list.map((item) => {
      return (
        <>
          {' '}
          <Menu.Item key={item.id}>
            <div>
              <div className="avater-container">
                <Avatar src={item.icon} />
              </div>
              <div className="notification-content">
                <span>{item.name} </span>
                <span>{item.desc}</span>
              </div>
            </div>
          </Menu.Item>
          <div className="custom-divider"></div>
        </>
      );
    })}
    {list.length > 0 ? (
      <div className="nav-notification-footer">
        <a className="d-block" href="#/">
          View More Notification
        </a>
      </div>
    ) : null}
  </Menu>
);
const Notification = () => {
  const [visible, setVisible] = useState(false);

  const handleVisibleChange = (flag) => {
    setVisible(flag);
  };

  return (
    <Dropdown
      placement="bottomRight"
      overlay={menu}
      onVisibleChange={handleVisibleChange}
      open={visible}
      trigger={['click']}
      arrow
      className="notification-menu"
      overlayClassName="notification-dropdown"
    >
      <div className="bill">
        <span>
          <BillIcon />
        </span>
        <span className="notification-num">{list.length}</span>
      </div>
    </Dropdown>
  );
};

export default Notification;
