import { Table } from 'antd';
import React from 'react';

import './index.scss';

const PointHistroyTable = () => {
  const columns = [
    {
      title: 'Points',
      dataIndex: 'points',
    },
    {
      title: 'Discount',
      dataIndex: 'discount',
    },
    {
      title: 'From',
      dataIndex: 'from',
    },

    {
      title: 'Used In',
      dataIndex: 'used_in',
    },
  ];
  const data = [
    {
      points: '200 Points',
      discount: '$20',
      from: 'Group one: Adobe Illustrator',
      used_in: 'Adobe Illustrator 2022 Ultimate Course',
    },
    {
      points: '200 Points',
      discount: '$20',
      from: 'Group one: Adobe Illustrator',
      used_in: 'Adobe Illustrator 2022 Ultimate Course',
    },
    {
      points: '200 Points',
      discount: '$20',
      from: 'Group one: Adobe Illustrator',
      used_in: 'Adobe Illustrator 2022 Ultimate Course',
    },
    {
      points: '200 Points',
      discount: '$20',
      from: 'Group one: Adobe Illustrator',
      used_in: 'Adobe Illustrator 2022 Ultimate Course',
    },
    {
      points: '200 Points',
      discount: '$20',
      from: 'Group one: Adobe Illustrator',
      used_in: 'Adobe Illustrator 2022 Ultimate Course',
    },
  ];
  return (
    <div className="point-histroy-table">
      <Table pagination={false} columns={columns} dataSource={data} bordered />
    </div>
  );
};

export default PointHistroyTable;
