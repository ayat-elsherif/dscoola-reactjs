/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Dropdown, InputNumber, Menu, Pagination, Switch, Table } from 'antd';
import React, { useState } from 'react';
import {
  ArrowBackIcon,
  ArrowNextIcon,
  EllipsIcon,
} from '../../../../../assets/svg';
import CustomRating from '../../../../../components/common/dashboard/components/rating';

import './index.scss';

const renderStatusColor = (status) => {
  return <div className={`status ${status}`}>{status}</div>;
};
const OnGoTable = () => {
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
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'N Of Units',
      dataIndex: 'units',
      key: 'units',

      render: (_, elem) => {
        return (
          <div className='units-number'>
            <div>{elem.units} Units</div>
            <a href='#'>View More</a>
          </div>
        );
      },
    },
    {
      title: 'Student',
      dataIndex: 'student',
      key: 'student',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 84,
      render: (_, elm) => {
        return <>{renderStatusColor(elm.status)}</>;
      },
    },

    {
      title: '',
      dataIndex: 'action',
      key: 'x',
      width: 50,
      render: (_, elm) => (
        <div
          className='text-center'
          onClick={(event) => event.stopPropagation()}
          style={{ cursor: 'pointer' }}
        >
          <Dropdown
            overlay={actionMenu}
            trigger={['click']}
            placement='bottomRight'
            arrow={{
              pointAtCenter: true,
            }}
            overlayClassName='table-actions-menu'
          >
            <EllipsIcon />
          </Dropdown>
        </div>
      ),
    },
  ];
  const data = [
    {
      courseName: 'UI/UX Design Adobe xd',
      category: 'UI /X Design',
      units: 5,
      student: '2500',
      price: '$200',
      status: 'Active',
    },
    {
      courseName: 'UI/UX Design Adobe xd',
      category: 'UI /X Design',
      units: 5,
      student: '2500',
      price: '$200',
      status: 'Rejected',
    },
    {
      courseName: 'UI/UX Design Adobe xd',
      category: 'UI /X Design',
      units: 5,
      student: '2500',
      price: '$200',
      status: 'Pending',
    },
    {
      courseName: 'UI/UX Design Adobe xd',
      category: 'UI /X Design',
      units: 5,
      student: '2500',
      price: '$200',
      status: 'Active',
    },
    {
      courseName: 'UI/UX Design Adobe xd',
      category: 'UI /X Design',
      units: 5,
      student: '2500',
      price: '$200',
      status: 'Active',
    },
  ];
  return (
    <div className='main-table'>
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

export default OnGoTable;
