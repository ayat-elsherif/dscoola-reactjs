import { Switch } from 'antd';
import React, { useEffect, useState } from 'react';

const Notifications = ({ data, title, isLoading, onChange }) => {
  const [dataChecked, setDataChecked] = useState();


  useEffect(() => {
    const mappedData = {}

    data?.forEach((item) => {
      mappedData[item.option_key] = +item.option_value
    });
 
    setDataChecked(mappedData)
  }, [data]) 

  if (isLoading) return null;

  return (
    <>
      <div className='form-section-title'>{title}</div>
      {data?.map((notifi) => {
        return (
          <div className='notifications-container' key={notifi.id}>
            <div>{notifi?.meta?.body}</div>
            <Switch onChange={(val) => { 
                const updatedData = {...dataChecked, [notifi.option_key]: val ?  1 : 0 }
                setDataChecked(updatedData);
                onChange(notifi.option_key, val)
             }} checked={!!dataChecked?.[notifi.option_key]} />
          </div>
        );
      })}
    </>
  );
};

export default Notifications;
