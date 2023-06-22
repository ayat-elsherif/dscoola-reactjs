import { Tabs } from 'antd';
import React, { useState } from 'react';

import Filter from '../../../components/common/dashboard/components/filter';
import SearchInput from '../../../components/common/dashboard/components/serachInput';
import AllAppointments from './components/AllAppointments';
import HappeningAppointments from './components/Happening';
import './index.scss';

const { TabPane } = Tabs;

const OneToOne = () => {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [tabeKey, setTabeKey] = useState(1);
  const onTabChange = (key) => {
    setSearch('');
    setTabeKey(+key);
  };
  return (
    <div className='one-to-one'>
      {' '}
      <div className='dashboard-page-header-container'>
        <div className='page-header-left'>
          <h3 className='dashboard-page-title'>My appointment</h3>
          {/* <p>You have {oneToOneList?.data?.length} appointment</p> */}
        </div>
        <div className='page-header-right'>
          <SearchInput
            callback={(searchValue) => {
              setSearch(searchValue);
            }}
          />
          {tabeKey === 1 && (
            <Filter
              palceholder='Filter appointment by'
              callBack={(status) => {
                setStatus(status);
              }}
            />
          )}
        </div>
      </div>
      <Tabs
        defaultActiveKey='1'
        className='dashboard-tabs'
        onChange={onTabChange}
      >
        <TabPane tab='All Appointments' key='1'>
          <AllAppointments search={search} status={status} />
        </TabPane>
        <TabPane tab='Happening Appointments' key='2'>
          <HappeningAppointments search={search} />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default OneToOne;
