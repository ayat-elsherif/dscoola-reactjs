import { Col, Row } from 'antd';
import React, { useState } from 'react';
import { filesData } from '../data';
import MyFileCard from './components/card';
import MyFilesFilter from './components/filter';
import './index.scss';
function MyFiles() {
  const [filters, setFilters] = useState({
    filter: '',
  });
  return (
    <div className='my-files'>
      <h3>My Files</h3>
      <MyFilesFilter
        callback={(value) => {
          setFilters((s) => ({ ...s, filter: value }));
        }}
      />
      <Row gutter={18}>
        {filesData.map((item) => {
          return (
            <Col xs={12} md={6} key={item.id}>
              <MyFileCard data={item} />
            </Col>
          );
        })}
      </Row>
    </div>
  );
}

export default MyFiles;
