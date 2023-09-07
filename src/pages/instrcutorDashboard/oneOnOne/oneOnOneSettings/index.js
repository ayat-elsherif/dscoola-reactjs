import React from 'react';
import { Tabs } from 'antd';
import './index.scss';
import GeneralRequests from './components/generalRequests';
import CourseRequests from './components/coursesRequest';
import CourseList from './components/courseList';

const { TabPane } = Tabs;
const OneOnOneSettings = () => {
  return (
    <div className="one-on-one-settings">
      <div className="dashboard-page-header-container">
        <div className="page-header-left">
          <h3 className="dashboard-page-title">One-on-one settings</h3>
        </div>
      </div>
      <Tabs defaultActiveKey="1" className="dashboard-tabs">
        <TabPane tab="General requests" key="1">
          <div className="course-requests-form">
            <GeneralRequests />
          </div>
        </TabPane>
        <TabPane tab="Courses request" key="2">
          <CourseRequests />
        </TabPane>
        <TabPane tab="Courses List" key="3">
          <CourseList />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default OneOnOneSettings;
