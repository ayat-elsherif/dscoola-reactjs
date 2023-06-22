/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Dropdown, InputNumber, Menu, Pagination, Table } from 'antd';
import React, { useState } from 'react';
import {
  ArrowBackIcon,
  ArrowNextIcon,
  EllipsIcon,
} from '../../../../../assets/svg';

import './index.scss';

const renderStatusColor = (status) => {
  return <div className={`status ${status}`}>{status}</div>;
};
const ReportsTable = () => {
  const [page, setPage] = useState(1);
  const onPageNumberChange = (value) => {
    setPage(value);
  };
  const handlePageChange = (page) => {
    setPage(page);
  };
  const itemRender = (_, type, originalElement) => {
    if (type === 'prev') {
      return (
        <a>
          <ArrowBackIcon />
        </a>
      );
    }

    if (type === 'next') {
      return (
        <a>
          <ArrowNextIcon />
        </a>
      );
    }

    return originalElement;
  };
  const actionMenu = (
    <Menu
      onClick={(item) => {
        if (item.key == 1) {
          // setEditIsOpen(true);
        }
        if (item.key == 2) {
          // setDeleteIsOpen(true);
        }
      }}
    >
      <Menu.Item key='1'>
        <span>Edit</span>
      </Menu.Item>
      <Menu.Item key='2'>
        <span>Delete</span>
      </Menu.Item>
    </Menu>
  );
  const columns = [
    {
      title: 'Course Name',
      dataIndex: 'courseName',
      key: 'courseName',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Course Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Points',
      dataIndex: 'points',
      key: 'points',
    },
    {
      title: 'Total pay',
      dataIndex: 'total_pay',
      key: 'total_pay',
    },
    {
      title: 'Students',
      dataIndex: 'students',
      key: 'students',
    },
    {
      title: 'Revenu',
      dataIndex: 'revenu',
      key: 'revenu',
    },
  ];
  const data = [
    {
      courseName: 'UI/UX Design Adobe xd',
      type: 'Recorded',
      price: '$500',
      points: '- $20',
      total_pay: '$480',
      students: '3265',
      revenu: '$1554',
    },
    {
      courseName: 'UI/UX Design Adobe xd',
      type: 'Recorded',
      price: '$500',
      points: '- $20',
      total_pay: '$480',
      students: '3265',
      revenu: '$1554',
    },
    {
      courseName: 'UI/UX Design Adobe xd',
      type: 'Recorded',
      price: '$500',
      points: '- $20',
      total_pay: '$480',
      students: '3265',
      revenu: '$1554',
    },
    {
      courseName: 'UI/UX Design Adobe xd',
      type: 'Recorded',
      price: '$500',
      points: '- $20',
      total_pay: '$480',
      students: '3265',
      revenu: '$1554',
    },
    {
      courseName: 'UI/UX Design Adobe xd',
      type: 'Recorded',
      price: '$500',
      points: '- $20',
      total_pay: '$480',
      students: '3265',
      revenu: '$1554',
    },
  ];
  return (
    <div className='main-table report-table'>
      <Table pagination={false} columns={columns} dataSource={data} bordered />
      <div className='main-table_footer'>
        <div className='change-page'>
          <span>Go to page :</span>{' '}
          <InputNumber min={1} defaultValue={1} onChange={onPageNumberChange} />{' '}
        </div>
        <Pagination
          size='small'
          total={100}
          defaultPageSize={10}
          current={page}
          onChange={handlePageChange}
          itemRender={itemRender}
        />
      </div>
    </div>
  );
};

export default ReportsTable;
