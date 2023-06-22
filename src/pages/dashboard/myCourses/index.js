import React, { useState } from 'react';
import { Tabs } from 'antd';

import SearchInput from '../../../components/common/dashboard/components/serachInput';
import AllCourses from './components/AllCourses';
import InprogressCourses from './components/InprograssCourses';
import ComplatedCourses from './components/ComplatedCourses';
import './index.scss';
import { useSelector } from 'react-redux';

const { TabPane } = Tabs;
const MyCourses = () => {
  const [search, setSearch] = useState('');
  const { coursesNum } = useSelector((state) => state.coursesNum);
  const onTabChange = (key) => {
    setSearch('');
  };
  return (
    <div className='my-courses'>
      <div className='dashboard-page-header-container'>
        <div className='page-header-left'>
          <h3 className='dashboard-page-title'>Enrolled Courses</h3>
          <p>You have total {coursesNum} course</p>
        </div>
        <div className='page-header-right'>
          <SearchInput
            callback={(searchValue) => {
              setSearch(searchValue);
            }}
            reset={search}
          />
        </div>
      </div>
      <Tabs
        defaultActiveKey='1'
        className='dashboard-tabs'
        onChange={onTabChange}
      >
        <TabPane tab='All Courses' key='1'>
          <AllCourses search={search} />
        </TabPane>
        <TabPane tab='In progress Courses' key='2'>
          <InprogressCourses search={search} />
        </TabPane>
        <TabPane tab='Completed Courses' key='3'>
          <ComplatedCourses search={search} />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default MyCourses;
