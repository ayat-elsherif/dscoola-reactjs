import { Col, Row } from 'antd';
import React from 'react';
import StatisticsWidget from '../../../components/common/dashboard/components/statisticsWidget';
import { statistics_data } from './data';

const Statistics = () => {
  return (
    <div className='statistics-container'>
      <Row gutter={20}>
        {statistics_data.map((item, index) => {
          return (
            <Col xs={24} md={12} key={index}>
              <StatisticsWidget data={item} />
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default Statistics;
