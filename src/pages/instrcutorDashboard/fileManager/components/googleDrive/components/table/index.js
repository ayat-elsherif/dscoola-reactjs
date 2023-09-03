import { Table } from 'antd';
import React from 'react';
import { EllipsIcon, FolderIcon } from '../../../../../../../assets/svg';
import './index.scss';
function GoogleDriveTable() {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (_, elm) => (
        <div className="name-container">
          <FolderIcon />
          <span>{elm.name}</span>
        </div>
      ),
    },
    {
      title: 'Size',
      dataIndex: 'size',
    },
    {
      title: 'Upload on',
      dataIndex: 'upload_on',
    },
    {
      title: ' ',
      dataIndex: 'action',
      key: 'x',
      width: 50,
      render: (_, elm) => (
        <div className="text-center">
          <EllipsIcon />
        </div>
      ),
    },
  ];
  const data = [
    {
      name: 'UI/Ux Design',
      size: '350.65',
      upload_on: '10/1/2022 5:29 PM',
    },
    {
      name: 'Graphic Design.txt',
      size: '350.65',
      upload_on: '10/1/2022 5:29 PM',
    },
    {
      name: 'Tasks to do.xlsx',
      size: '350.65',
      upload_on: '10/1/2022 5:29 PM',
    },
    {
      name: 'Pattern Design.txt',
      size: '350.65',
      upload_on: '10/1/2022 5:29 PM',
    },
  ];
  return (
    <div className="file-manager-table">
      <Table pagination={false} columns={columns} dataSource={data} bordered />
    </div>
  );
}

export default GoogleDriveTable;
