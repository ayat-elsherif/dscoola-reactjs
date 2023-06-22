import React from 'react';
import { Badge, Dropdown, Button } from 'antd';
import './NotificationMenu.scss';
import { BillIcon } from 'assets/svg';
import useNotifInfo from 'api-hooks/notifications/useNotifInfo';
import { Link, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import useApi from 'network/useApi';
import { useQueryClient } from '@tanstack/react-query';
import { queryKeys } from 'services/react-query/queryKeys';

const NotificationMenu = () => {
  const { notifList, notifListLod } = useNotifInfo();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const api = useApi();
  const handelMakeNotifyRead = () => {
    api
      .delete('my/notifications/all/read')
      .then((res) => {
        console.log(res);
        if (res?.success) {
          queryClient.invalidateQueries([queryKeys.notifList]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handelMakeSingleNotifyRead = (id) => {
    api
      .delete(`my/notifications/${id}`)
      .then((res) => {
        console.log(res);
        if (res?.success) {
          queryClient.invalidateQueries([queryKeys.notifList]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const menuItem = (item) => (
    <div
      key={item?.id}
      className={`menu-item ${item?.read_at ? ' ' : ' newNotification'} `}
      onClick={() => {
        handelMakeSingleNotifyRead(item?.id);
        setTimeout(() => {
          navigate(item?.data?.link?.replace('livecourses', 'course-view'));
        }, 300);
      }}
    >
      <div className="image-wrapper">
        <img alt="url" src={item?.data?.avatar} />
      </div>
      <div className="text-wrapper">
        {/* <div className="title">{item?.data?.title}</div> */}
        <div
          className="sub-title"
          dangerouslySetInnerHTML={{
            __html: item?.data?.message,
          }}
        ></div>
        {item?.created_at && (
          <span className="notify-time">
            {dayjs(item?.created_at).fromNow()}
          </span>
        )}
        {/* <div className="title">
          {item?.price_plan === 'free'
            ? 'free'
            : item?.sale_price
            ? `$${item?.sale_price}`
            : `$${item?.price}`}
        </div> */}
      </div>
    </div>
  );

  const firstItem = {
    key: 'title',
    label: <div className="menu-title">Notifications</div>,
  };

  const lastItem = {
    key: 'title',
    className: 'notifications-footer-holder',
    label: (
      <>
        <Link to="/notifications" className="menu-link">
          View More Notifications
        </Link>
        <a onClick={handelMakeNotifyRead}>Mark all as read</a>
      </>
    ),
  };

  const menuItems = notifList?.map((el) => ({
    key: el?.id,
    label: menuItem(el),
  }));

  const emptyMsgItem = {
    key: 'empty',
    label: <div className="menu-msg">No Notification</div>,
  };

  const items = notifList?.length
    ? [firstItem, ...menuItems, lastItem]
    : [firstItem, emptyMsgItem];
  return (
    <Dropdown
      menu={{
        items,
        className: 'notifications-menu-wrapper',
      }}
      arrow
    >
      <Badge
        count={notifList?.filter((s) => !s?.read_at)?.length}
        showZero
        size="small"
        color="#7e59d1"
        offset={[-6, 10]}
      >
        <Button
          type="link"
          className="typ-btn-icon"
          icon={<BillIcon />}
          // loading={notifListLod}
        />
      </Badge>
    </Dropdown>
  );
};

export default NotificationMenu;
