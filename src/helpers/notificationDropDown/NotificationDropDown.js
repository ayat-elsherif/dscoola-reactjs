import React from 'react';
import { Badge, Dropdown, Button } from 'antd';
import './style.scss';
import { BillIcon } from 'assets/svg';
import useNotifInfo from 'api-hooks/notifications/useNotifInfo';

const NotificationDropdown = () => {
  const { notifList, notifListLod } = useNotifInfo();

  const menuItem = (item) => (
    <div className="menu-item">
      <div className="image-wrapper">
        <img alt="url" src={item?.thumbnail_url} />
      </div>
      <div className="text-wrapper">
        <div className="title">{item?.title}</div>
        <div className="sub-title">{item?.slug}</div>

        <div className="title">
          {item?.price_plan === 'free'
            ? 'free'
            : item?.sale_price
            ? `$${item?.sale_price}`
            : `$${item?.price}`}
        </div>
      </div>
    </div>
  );

  const firstItem = {
    key: 'title',
    label: <div className="menu-title">Notifications</div>,
  };

  const menuItems = notifList?.map((el) => ({
    key: el?.id,
    label: menuItem(el),
  }));

  const emptyMsgItem = {
    key: 'empty',
    label: <div className="menu-msg">No Notifications found.</div>,
  };

  const items = notifList?.length
    ? [firstItem, ...menuItems]
    : [firstItem, emptyMsgItem];
  return (
    <Dropdown
      menu={{
        items,
        className: 'notifications-menu-wrapper',
      }}
      arrow
    >
      <Button
        type="link"
        style={{ padding: 0 }}
        icon={
          <Badge
            count={notifList?.length}
            showZero
            size="small"
            color="#7e59d1"
          >
            <BillIcon />
          </Badge>
        }
        loading={notifListLod}
      />
    </Dropdown>
  );
};

export default NotificationDropdown;
