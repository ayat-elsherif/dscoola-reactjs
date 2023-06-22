import React, { useEffect } from 'react';
import EmptyCard from '../../../../../../helpers/emptyCard';
import './index.scss';
import PointHistroyTable from './table';
import { Table } from 'antd';
import useApi from 'network/useApi';
const PointHistory = ({ data, isLoading, setcurrent_page }) => {
  const api = useApi();
  const columns = [
    {
      title: 'Points',
      dataIndex: 'points',
    },
    {
      title: 'Discount',
      dataIndex: 'cash',
    },
    {
      title: 'From',
      dataIndex: 'gained_from',
    },

    {
      title: 'Used In',
      dataIndex: 'used_in',
    },
  ];
  // useEffect(() => {

  //   api.post('my/points/give', {}).then(() => {});
  // }, []);
  const handelChangePage = (current) => {
    console.log(current, 'currentcurrent');
    setcurrent_page(current);
  };
  return (
    <div className="point-history">
      <h3>Point History</h3>
      {/* <EmptyCard text='Point History history available.' /> */}

      {/* <PointHistroyTable data={data} /> */}
      {/* current  : currentPage */}
      <div className="point-histroy-table">
        <Table
          columns={columns}
          dataSource={data?.data}
          loading={isLoading}
          bordered
          pagination={{
            total: data?.total,
            pageSize: data?.per_page,
            onChange: handelChangePage,
          }}
        />
      </div>
    </div>
  );
};

export default PointHistory;
