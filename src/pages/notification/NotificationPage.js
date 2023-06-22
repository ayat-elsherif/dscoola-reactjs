import React, { useEffect } from 'react';
import { Card, Skeleton } from 'antd';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';

import relativeTime from 'dayjs/plugin/relativeTime';
import { notifiCommentIcon } from '../../SVGs';
import { Link } from 'react-router-dom';
import useNotifInfo from 'api-hooks/notifications/useNotifInfo';
import useApi from 'network/useApi';
import { useQueryClient } from '@tanstack/react-query';
import { queryKeys } from 'services/react-query/queryKeys';

dayjs.extend(relativeTime);
function NotificationPage() {
  const { notifList, notifListLod } = useNotifInfo();
  const { currentUser } = useSelector((state) => state?.user);
  const queryClient = useQueryClient();
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
  const allNotifications = notifList?.map((item) => (
    <>
      <Link
        to={item?.data?.link?.replace('livecourses', 'course-view')}
        className={`notification-item ${
          item?.read_at ? ' ' : ' newNotification'
        } `}
        key={item?.id}
      >
        <img src={item?.data?.avatar} alt="Christian" />
        <div>
          <p
            dangerouslySetInnerHTML={{
              __html: item?.data?.message,
            }}
          ></p>
          <span>
            {notifiCommentIcon}
            {dayjs(item?.created_at).fromNow()}
          </span>
        </div>
      </Link>
    </>
  ));

  return (
    <div style={{ minHeight: '600px' }}>
      <div className="notificationPage">
        <div className="container">
          {notifListLod ? (
            <>
              <Skeleton active /> <Skeleton active /> <Skeleton active />
            </>
          ) : allNotifications.length > 0 ? (
            <Card
              title="Your Notifications"
              extra={
                <>
                  {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                  <a onClick={handelMakeNotifyRead}>Mark all as read</a>
                  {/*  eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                  <Link
                    to={
                      +currentUser?.role_id === 3
                        ? '/student-dashboard/my-profile/notification-settings'
                        : '/instructor-dashboard/my-profile/notification-settings'
                    }
                  >
                    Notification settings
                  </Link>
                </>
              }
            >
              {allNotifications}
            </Card>
          ) : (
            'No notifications found'
          )}
        </div>
      </div>
    </div>
  );
}

export default NotificationPage;
