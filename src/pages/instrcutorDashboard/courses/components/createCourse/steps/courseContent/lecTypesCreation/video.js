import { Tabs } from 'antd';
import React from 'react';
import AddFromLibrary from './addVideoWayes/addFromLibrary';
import ExternalVideo from './addVideoWayes/externalVideo';
import UploadVideo from './addVideoWayes/uploadVideo';

export default function Video({ lectuer, sectionId, onEdit }) {
  return (
    <div className="lec-video-taps-container">
      <Tabs className="dashboard-tabs">
        <Tabs.TabPane tab="Upload Video" key="1">
          <UploadVideo
            lectuer={lectuer}
            sectionId={sectionId}
            onEdit={onEdit}
          />
        </Tabs.TabPane>
        {/* <Tabs.TabPane tab="Add From Library" key="2">
          <AddFromLibrary />
        </Tabs.TabPane> */}
        <Tabs.TabPane tab="External Video" key="3">
          <ExternalVideo
            lectuer={lectuer}
            sectionId={sectionId}
            onEdit={onEdit}
          />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}
