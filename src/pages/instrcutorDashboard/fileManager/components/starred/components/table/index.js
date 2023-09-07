import { Table } from 'antd';
import React, { useState } from 'react';
import {
  EllipsIcon,
  FolderIcon,
  PDFIcon,
} from '../../../../../../../assets/svg';
import ItemMember from '../../../../../../../components/common/dashboard/components/members';
import './index.scss';
function StarredTable() {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (_, elm) => (
        <div className="name-container">
          <PDFIcon />
          <span>{elm.name}</span>
        </div>
      ),
    },
    {
      title: 'Last Opened',
      dataIndex: 'last_opened',
    },
    {
      title: 'Members',
      dataIndex: 'members',
      render: (_, elm) => <ItemMember members={elm.members} />,
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
      key: 1,
      name: 'Presentation.Pdf',
      last_opened: '07/04/ 2022, 07:15 PM',
      members: [
        {
          src: '/assets/images/avatar.png',
          name: 'mizar',
        },
        {
          src: '/assets/images/avatar.png',
          name: 'mizar2',
        },
        {
          src: '',
          name: 'mizar3',
        },
        {
          src: '/assets/images/avatar.png',
          name: 'mizar4',
        },
        {
          src: '/assets/images/avatar.png',
          name: 'mizar5',
        },
        {
          src: '/assets/images/avatar.png',
          name: 'mizar6',
        },
      ],
    },
    {
      key: 2,
      name: 'Presentation.Pdf',
      last_opened: '07/04/ 2022, 07:15 PM',
      members: [
        {
          src: '/assets/images/avatar.png',
          name: 'mizar',
        },
        {
          src: '/assets/images/avatar.png',
          name: 'mizar2',
        },
        {
          src: '',
          name: 'mizar3',
        },
        {
          src: '/assets/images/avatar.png',
          name: 'mizar4',
        },
        {
          src: '/assets/images/avatar.png',
          name: 'mizar5',
        },
        {
          src: '/assets/images/avatar.png',
          name: 'mizar6',
        },
      ],
    },
    {
      key: 3,
      name: 'Presentation.Pdf',
      last_opened: '07/04/ 2022, 07:15 PM',
      members: [
        {
          src: '/assets/images/avatar.png',
          name: 'mizar',
        },
        {
          src: '/assets/images/avatar.png',
          name: 'mizar2',
        },
        {
          src: '',
          name: 'mizar3',
        },
        {
          src: '/assets/images/avatar.png',
          name: 'mizar4',
        },
        {
          src: '/assets/images/avatar.png',
          name: 'mizar5',
        },
        {
          src: '/assets/images/avatar.png',
          name: 'mizar6',
        },
      ],
    },
    {
      key: 4,
      name: 'Presentation.Pdf',
      last_opened: '07/04/ 2022, 07:15 PM',
      members: [
        {
          src: '/assets/images/avatar.png',
          name: 'mizar',
        },
        {
          src: '/assets/images/avatar.png',
          name: 'mizar2',
        },
        {
          src: '',
          name: 'mizar3',
        },
        {
          src: '/assets/images/avatar.png',
          name: 'mizar4',
        },
        {
          src: '/assets/images/avatar.png',
          name: 'mizar5',
        },
        {
          src: '/assets/images/avatar.png',
          name: 'mizar6',
        },
      ],
    },
  ];

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <div className="starred-table">
      <Table
        rowSelection={rowSelection}
        pagination={false}
        columns={columns}
        dataSource={data}
        bordered
      />
    </div>
  );
}

export default StarredTable;
