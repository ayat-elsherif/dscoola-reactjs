import { Dropdown, InputNumber, Menu, Pagination, Switch, Table } from 'antd';
import React, { useState } from 'react';
import {
  ArrowBackIcon,
  ArrowNextIcon,
  EllipsIcon,
} from '../../../../../assets/svg';
import CustomRating from '../../../../../components/common/dashboard/components/rating';

import './index.scss';

const ReviewsTable = () => {
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
      <Menu.Item key="1">
        <span>Edit</span>
      </Menu.Item>
      <Menu.Item key="2">
        <span>Delete</span>
      </Menu.Item>
    </Menu>
  );
  const columns = [
    {
      title: 'Student Name',
      dataIndex: 'studentName',
      key: 'studentName',
    },
    {
      title: 'Course Name',
      dataIndex: 'courseName',
      key: 'courseName',
    },
    {
      title: 'Review Date',
      dataIndex: 'reviewDate',
      key: 'reviewDate',
    },
    {
      title: 'Reviews & Rating',
      dataIndex: 'reviewsRating',
      key: 'reviewsRating',
      width: 400,
      render: (_, elem) => {
        return (
          <div className="reviews-rating">
            <CustomRating
              readOnly={true}
              ratingNumber={elem?.reviewsRating?.rateNum}
            />
            <div className="review">{elem?.reviewsRating?.review}</div>
          </div>
        );
      },
    },

    {
      title: ' ',
      dataIndex: 'action',
      key: 'x',
      width: 50,
      render: (_, elm) => (
        <div
          className="text-center"
          onClick={(event) => event.stopPropagation()}
          style={{ cursor: 'pointer' }}
        >
          <Dropdown
            overlay={actionMenu}
            trigger={['click']}
            placement="bottomRight"
            arrow={{
              pointAtCenter: true,
            }}
            overlayClassName="table-actions-menu"
          >
            <EllipsIcon />
          </Dropdown>
        </div>
      ),
    },
  ];
  const data = [
    {
      studentName: 'Mai Mohamed',
      courseName: 'UI/UX Design Adobe xd',
      reviewDate: '20 Feb 2020',
      reviewsRating: {
        rateNum: 5,
        review:
          'This was an informative course, if you’re a starting AI like I’m doing this course will surely help you good',
      },
    },
    {
      studentName: 'Mai Mohamed',
      courseName: 'UI/UX Design Adobe xd',
      reviewDate: '20 Feb 2020',
      reviewsRating: {
        rateNum: 5,
        review:
          'This was an informative course, if you’re a starting AI like I’m doing this course will surely help you good',
      },
    },
    {
      studentName: 'Mai Mohamed',
      courseName: 'UI/UX Design Adobe xd',
      reviewDate: '20 Feb 2020',
      reviewsRating: {
        rateNum: 5,
        review:
          'This was an informative course, if you’re a starting AI like I’m doing this course will surely help you good',
      },
    },
    {
      studentName: 'Mai Mohamed',
      courseName: 'UI/UX Design Adobe xd',
      reviewDate: '20 Feb 2020',
      reviewsRating: {
        rateNum: 5,
        review:
          'This was an informative course, if you’re a starting AI like I’m doing this course will surely help you good',
      },
    },
    {
      studentName: 'Mai Mohamed',
      courseName: 'UI/UX Design Adobe xd',
      reviewDate: '20 Feb 2020',
      reviewsRating: {
        rateNum: 5,
        review:
          'This was an informative course, if you’re a starting AI like I’m doing this course will surely help you good',
      },
    },
  ];
  return (
    <div className="reviews-table">
      <Table pagination={false} columns={columns} dataSource={data} bordered />
      <div className="main-table_footer">
        <div className="change-page">
          <span>Go to page :</span>{' '}
          <InputNumber min={1} defaultValue={1} onChange={onPageNumberChange} />{' '}
        </div>
        <Pagination
          size="small"
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

export default ReviewsTable;
