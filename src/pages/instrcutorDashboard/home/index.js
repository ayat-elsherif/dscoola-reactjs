import { Col, Row } from 'antd';
import { RatingFeedback } from 'helpers/RatingFeedback';
import React from 'react';
import MyCourses from './components/myCourses';
import OneOnOneRequest from './components/one-on-OneRequest';
import './index.scss';
import Revenue from './revenue';
import RevenueByLocation from './revenueByLocation';
import Statistics from './Statistics';
import StudentEnrollmentViews from './studentEnrollmentViews';
function index() {
  return (
    <div className="instructor-dashboard">
      <Row gutter={20}>
        <Col xs={24} md={12}>
          <Statistics />
        </Col>
        <Col xs={24} md={12}>
          <StudentEnrollmentViews />
        </Col>
      </Row>
      <Row gutter={32}>
        <Col xs={24} md={16}>
          <Revenue />
        </Col>
        <Col xs={24} md={8}>
          <RevenueByLocation />
        </Col>
      </Row>
      <Row gutter={20}>
        <Col xs={24} md={10} lg={8}>
          <MyCourses />
        </Col>
        <Col xs={24} md={7} lg={8}>
          <RatingFeedback />
        </Col>
        <Col xs={24} md={7} lg={8}>
          <OneOnOneRequest />
        </Col>
      </Row>
    </div>
  );
}

export default index;
