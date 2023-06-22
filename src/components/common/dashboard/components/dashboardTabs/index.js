import React from 'react';
import { Tabs } from 'antd';
const { TabPane } = Tabs;
function DashboardTabs() {
  return (
    <Tabs defaultActiveKey='1' className='dashboard-tabs'>
      <TabPane tab='All Courses' key='1'>
        All Courses
      </TabPane>
      <TabPane tab='In progress Courses' key='2'>
        In progress Courses
      </TabPane>
      <TabPane tab='Completed Courses' key='3'>
        Completed Courses
      </TabPane>
    </Tabs>
  );
}

export default DashboardTabs;
