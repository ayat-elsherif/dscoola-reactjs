import { Table } from 'antd';
import React from 'react';

import './index.scss';

const InvoiceTable = ({ data, isLoading }) => {
  const columns = [
    {
      title: 'Course Name',
      dataIndex: 'title',
    },

    {
      title: 'Price',
      dataIndex: 'price',
    },
  ];

  return (
    <div className='InvoiceTable-table'>
      <Table
        pagination={false}
        columns={columns}
        dataSource={data}
        loading={isLoading}
        bordered
      />
    </div>
  );
};

export default InvoiceTable;
