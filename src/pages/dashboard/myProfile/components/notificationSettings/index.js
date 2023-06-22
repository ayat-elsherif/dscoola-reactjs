import { message } from 'antd';
import React from 'react';
import { Loading } from '../../../../../components/common/Loading';
import { useGetNotification, useUpdateNotification } from './Hooks/useGetNotification';
import './index.scss';
import Notifications from './Notifications';

const NotificationSettings = () => {

  const { data, isLoading, refetch } = useGetNotification();

  const { mutate: updataNotification } = useUpdateNotification(
    () => {
      message.success('Notification Updated successfully');
    },
    () => {
      refetch()
      message.error('Something went wrong')
    }
  );

  const handleNotificationChange = (key, value) => {
    const mappedData = {}
    data?.data?.security.map((item) => {
      return mappedData[item.option_key] = !!+item.option_value
    });
    data?.data?.news.map((item) => {
      return mappedData[item.option_key] = !!+item.option_value
    });

    mappedData[key] = value;
    updataNotification(mappedData);
  };

  if (!data?.data)
    return <Loading />

  return (
    <div className='notifications-settings'>
      <div className='info-header'>
        <h3>Notifications Settings</h3>
        <h4>You will get only notification what have enabled.</h4>
        <Notifications onChange={handleNotificationChange} isLoading={isLoading} data={data?.data?.security} title="Security Alerts" />
        <Notifications onChange={handleNotificationChange} isLoading={isLoading} data={data?.data?.news} title="News" />
      </div>
    </div>
  );
};

export default NotificationSettings;
