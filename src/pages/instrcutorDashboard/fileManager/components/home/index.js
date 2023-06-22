import React from 'react';
import { Row, Col } from 'antd';
import FolderCard from '../folderCard';
import './index.scss';
import { foldersData, filesData } from '../data';
import FileCard from '../fileCard';

function Home() {
  return (
    <div className='files-home'>
      <div className='header'>
        <h3>Home</h3>
      </div>
      <div className='content'>
        <h4>Quick Access</h4>
        <Row gutter={18}>
          {foldersData.map((item) => {
            return (
              <Col xs={12} md={6} key={item.id}>
                <FolderCard data={item} />
              </Col>
            );
          })}
        </Row>
        <div className='files'>
          <h4>Files</h4>
          <Row gutter={18}>
            {filesData.map((item) => {
              return (
                <Col xs={12} md={8} key={item.id}>
                  <FileCard data={item} />
                </Col>
              );
            })}
          </Row>
        </div>
      </div>
    </div>
  );
}

export default Home;
