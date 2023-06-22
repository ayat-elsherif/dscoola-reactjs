import { Table, Pagination, InputNumber } from 'antd';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { ArrowBackIcon, ArrowNextIcon } from '../../../../../assets/svg';
import { useGetMyInvoices } from '../../hooks/useInvoices';
import dayjs from 'dayjs';
import { ceil } from 'lodash';

const InvoicesTable = ({ filters }) => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const { data: invoices, isLoading } = useGetMyInvoices(page, filters);

  const handlePageChange = (page) => {
    setPage(page);
  };
  const renderStatusColor = (status) => {
    return <div className={`status ${status}`}>{status}</div>;
  };
  const columns = [
    {
      title: 'Course Name',
      dataIndex: 'course_name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
    },
    {
      title: 'Method',
      dataIndex: 'method',
    },
    {
      title: 'Discount',
      dataIndex: 'discount',
    },
    {
      title: 'Payment date',
      dataIndex: 'created_at',
      render: (_, elm) => {
        return <>{dayjs(elm?.created_at)?.format('ll')}</>;
      },
    },
    {
      title: 'Total Pay',
      dataIndex: 'total_pay',
    },

    {
      title: 'Status',
      dataIndex: 'payment_status',
      key: 'payment_status',
      render: (_, elm) => {
        return <>{renderStatusColor(elm?.payment_status)}</>;
      },
    },
  ];

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
  const onPageNumberChange = (value) => {
    setPage(value);
  };

  return (
    <div className="main-table">
      <Table
        pagination={false}
        onRow={(record) => {
          return {
            onClick: (event) => {
              event.stopPropagation();
              navigate(`/student-dashboard/invoices/${record?.id}`, {
                state: 'Marwa Omar',
              });
            },
          };
        }}
        loading={isLoading}
        columns={columns}
        dataSource={invoices?.data}
        bordered
      />
      <div className="main-table_footer">
        <div className="change-page">
          <span>Go to page :</span>{' '}
          <InputNumber
            min={1}
            value={page}
            max={invoices?.meta && ceil(invoices?.meta?.total / 10)}
            onChange={onPageNumberChange}
          />{' '}
        </div>
        <Pagination
          size="small"
          total={invoices?.meta?.total}
          defaultPageSize={10}
          current={page}
          onChange={handlePageChange}
          itemRender={itemRender}
        />
      </div>
    </div>
  );
};

export default InvoicesTable;
