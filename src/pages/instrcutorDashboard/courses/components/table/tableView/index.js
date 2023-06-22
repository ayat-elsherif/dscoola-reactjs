/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Dropdown, InputNumber, Menu, Pagination, Table } from 'antd';
import React, { useState } from 'react';
import { ceil } from 'lodash';
import {
  ArrowBackIcon,
  ArrowNextIcon,
  EllipsIcon,
} from '../../../../../../assets/svg';
import DeleteConfirm from '../../delete/DeleteConfirm';
import { useGetCourses } from '../hooks/useGetCourses';
import './index.scss';
import { useNavigate } from 'react-router-dom';
import EllipsisDropdown from 'helpers/EllipsisDropdown';
import dayjs from 'dayjs';

const renderStatusColor = (status) => {
  switch (status) {
    case 1:
      return <div className={`status Active`}>Active</div>;
    case 0:
      return <div className={`status Pendding`}>Pending</div>;
    case 2:
      return <div className={`status Rejected`}>Rejected</div>;
    default:
      <div className={`status Active`}>Active</div>;
  }
};
const OnGoTable = ({ filters }) => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [courseId, setCourseId] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const onPageNumberChange = (value) => {
    setPage(value);
  };
  const handlePageChange = (page) => {
    setPage(page);
  };
  const { data: cousrses, isLoading } = useGetCourses(
    page,
    filters['search'],
    filters['status'],
  );
  console.log('cousrses', cousrses);
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
  const actionMenu = (id) => {
    console.log(id, 'eprgfmjer');
    return (
      <Menu
        onClick={(item) => {
          if (item.key == 1) {
            localStorage.setItem('live-course-id', id.id);
            navigate('add/course-structure');
          }
          if (item.key == 2) {
            setCourseId(id);
            setShowDeleteModal(true);
          }
        }}
      >
        <Menu.Item key="1">
          <span>Edit</span>
        </Menu.Item>
        <Menu.Item key="2">
          <span>Delete</span>
        </Menu.Item>
      </Menu>
    );
  };
  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Course Name',
      dataIndex: 'title',
      key: 'title',
      render: (_, elm) => {
        console.log(elm, 'pdijg');
        return (
          <div className="course-title">
            <div>
              <img src={elm.thumbnailurl} />
            </div>
            <div>{elm.title}</div>
          </div>
        );
      },
    },
    {
      title: 'Category',
      dataIndex: 'category_name',
      key: 'category_name',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Student',
      dataIndex: 'totalEnrolled',
      key: 'totalEnrolled',
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
        return <>{renderStatusColor(elm?.status)}</>;
      },
    },
    {
      title: 'Featured',
      dataIndex: 'is_featured',
      key: 'is_featured',
      render: (_, elm) => {
        return <>{elm.is_featured ? 'Yes' : 'No'}</>;
      },
    },
    {
      title: 'Created',
      dataIndex: '',
      key: 'index',
      render: (_, elm) => {
        return (
          <div style={{ whiteSpace: 'nowrap' }}>
            {dayjs(elm?.created_at).format('MM/DD/YYYY HH:MM')}
          </div>
        );
      },
    },
    // {
    //   title: 'Last Update',
    //   dataIndex: '1',
    //   key: 'index',
    //   render: (_, elm) => {
    //     return (
    //       <div style={{ whiteSpace: 'nowrap' }}>
    //         {dayjs(elm?.updated_at).format('MM/DD/YYYY HH:MM')}
    //       </div>
    //     );
    //   },
    // },
    {
      title: ' ',
      dataIndex: 'action',
      key: 'x',
      width: 50,
      render: (_, elm) => <EllipsisDropdown menu={actionMenu(elm)} />,
    },
  ];

  return (
    <div className="main-table">
      <Table
        pagination={false}
        columns={columns}
        loading={isLoading}
        dataSource={cousrses?.data}
        bordered
      />
      <div className="main-table_footer">
        <div className="change-page">
          <span>Go to page :</span>{' '}
          <InputNumber
            min={1}
            value={page}
            max={cousrses?.meta && ceil(cousrses?.meta?.total / 10)}
            onChange={onPageNumberChange}
          />{' '}
        </div>
        {ceil(cousrses?.meta?.total / 10) > 1 && (
          <Pagination
            size="small"
            total={cousrses?.meta?.total}
            defaultPageSize={10}
            current={page}
            onChange={handlePageChange}
            itemRender={itemRender}
          />
        )}
      </div>
      <DeleteConfirm
        isOpen={showDeleteModal}
        cancel={() => setShowDeleteModal(false)}
        id={courseId}
      />
    </div>
  );
};

export default OnGoTable;
