import { Col, Row } from 'antd';
import React from 'react';
import StatisticsCard from './statisticsCard';

const Groups = ({ data }) => {
  return (
    <div className='groups'>
      <h3 className='dashboard-page-title'>Yalla online groups</h3>
      <Row gutter={24}>
        {data?.map((course, index) => {
          return (
            <Col xs={24} sm={24} lg={8} xxl={8} key={index}>
              <StatisticsCard Icon={course.icon} data={course.data} />
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default Groups;
