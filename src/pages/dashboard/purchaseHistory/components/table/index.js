import { Table } from 'antd';
import React from 'react';

import './index.scss';

const PurchaseHistroyTable = () => {
  const columns = [
    {
      title: 'Course Name',
      dataIndex: 'courseName',
    },
    {
      title: 'Date',
      dataIndex: 'date',
    },
    {
      title: 'Price',
      dataIndex: 'price',
    },

    {
      title: 'Methods',
      dataIndex: 'methods',
    },
    {
      title: 'Discount',
      dataIndex: 'discount',
    },
  ];
  const data = [
    {
      courseName: 'Adobe Illustrator 2022 Ultimate Course',
      date: 'Sep 9, 2021',
      price: '$100',
      methods: 'Paypal',
      discount: '$300',
    },
    {
      courseName: 'Product Owner PSPO 1 Scrum Product',
      date: 'Sep 9, 2021',
      price: '$0.00',
      methods: 'Free',
      discount: '-',
    },
    {
      courseName: 'Product Owner PSPO 1 Scrum Product',
      date: 'Sep 9, 2021',
      price: '$0.00',
      methods: 'Free',
      discount: '-',
    },
    {
      courseName: 'Product Owner PSPO 1 Scrum Product',
      date: 'Sep 9, 2021',
      price: '$0.00',
      methods: 'Free',
      discount: '-',
    },
    {
      courseName: 'Product Owner PSPO 1 Scrum Product',
      date: 'Sep 9, 2021',
      price: '$0.00',
      methods: 'Free',
      discount: '-',
    },
  ];
  return (
    <div className='purchase-histroy-table'>
      <Table pagination={false} columns={columns} dataSource={data} bordered />
    </div>
  );
};

export default PurchaseHistroyTable;
