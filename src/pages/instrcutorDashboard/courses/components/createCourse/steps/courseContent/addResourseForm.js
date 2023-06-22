import { Col, Row, Tabs } from 'antd';
import React from 'react';
import AddResourceFromLibrary from './addResourceWayes/addResourceFromLibrary';
import ExternalResourceFile from './addResourceWayes/externalResourceFile';
import UploadResourceFile from './addResourceWayes/uploadResourceFile';

export default function AddResourseForm({ lectuer, sectionId }) {
  return (
    <>
      {' '}
      <Row className="lec-video-taps-container">
        <div class="resource-title">Resources</div>
        <Col span={24}>
          <Tabs>
            <Tabs.TabPane tab="Upload File" key="1">
              <UploadResourceFile lectuer={lectuer} sectionId={sectionId} />
            </Tabs.TabPane>
            {/* <Tabs.TabPane tab="Add From Library" key="2">
              <AddResourceFromLibrary />
            </Tabs.TabPane> */}
            <Tabs.TabPane tab="External File" key="3">
              <ExternalResourceFile lectuer={lectuer} sectionId={sectionId} />
            </Tabs.TabPane>
          </Tabs>
        </Col>
      </Row>
    </>
  );
}
