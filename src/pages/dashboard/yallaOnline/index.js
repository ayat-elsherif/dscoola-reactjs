import React, { useState } from 'react';
import { Tabs } from 'antd';

import SearchInput from '../../../components/common/dashboard/components/serachInput';
import './index.scss';
import EnrolledGroups from './enrolledGroups';
import MyGroups from './myGroups';
import Filter from '../../../components/common/dashboard/components/filter';
import AvaliablePoints from './avaliablePoints';

const { TabPane } = Tabs;
const MyCourses = () => {
  const [groupLength, setGroupLength] = useState(0);
  const [currentTab, setCurrentTab] = useState(1);
  const [filters, setFilters] = useState({
    search: '',
    status: '',
  });

  const onTabChange = (key) => {
    setCurrentTab(key);
    setFilters({
      search: '',
      status: '',
    });
  };

  return (
    <div className="yalla-online">
      <div className="dashboard-page-header-container">
        <div className="page-header-left">
          <h3 className="dashboard-page-title">Yalla Online</h3>
          <p>
            You have total {groupLength} {groupLength > 1 ? 'Groups' : 'Group'}
          </p>
        </div>
        {+currentTab !== 3 && (
          <div className="page-header-right">
            <SearchInput
              callback={(searchValue) => {
                setFilters((s) => ({ ...s, search: searchValue }));
              }}
              reset={filters.search}
            />
            <Filter
              palceholder="Filter groups by"
              callBack={(status) => {
                setFilters((s) => ({ ...s, status }));
              }}
              reset={filters.status}
            />
          </div>
        )}
      </div>
      <Tabs
        defaultActiveKey="1"
        className="dashboard-tabs"
        onChange={onTabChange}
      >
        <TabPane tab="Enrolled Groups" key="1">
          <EnrolledGroups setGroupLength={setGroupLength} filters={filters} />
        </TabPane>
        <TabPane tab="My Groups" key="2">
          <MyGroups setGroupLength={setGroupLength} filters={filters} />
        </TabPane>
        <TabPane tab="Avaliable Points" key="3">
          <AvaliablePoints setGroupLength={setGroupLength} />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default MyCourses;
