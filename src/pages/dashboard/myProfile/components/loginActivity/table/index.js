import { Button, message, Table } from 'antd';
import React from 'react';
import { Loading } from 'components/common/Loading';
import useApi from 'network/useApi';
import './index.scss';

const LoginActivityTable = ({ loginData, refetechList, total }) => {
  const api = useApi();
  const columns = [
    {
      title: 'Browser',
      dataIndex: 'device',
    },
    {
      title: 'IP',
      dataIndex: 'ip_address',
    },
    {
      title: 'Time',
      dataIndex: 'logged_in_at',
    },

    {
      title: 'action',
      dataIndex: 'action',
      render: (_, elm) => (
        <Button
          type="primary"
          onClick={() => handleLogoutActivity(elm)}
          className="save"
        >
          Logout
        </Button>
      ),
    },
  ];

  const handleLogoutActivity = (log) => {
    const body = new FormData();
    body.append('login_id', log.id);
    api.post('user/login-activity/revoke', body).then(() => {
      message.success('Logout from the device successfully');
      refetechList();
    });
  };

  if (!loginData) return <Loading />;

  return (
    <div className="login-activity-table">
      <Table
        columns={columns}
        dataSource={loginData}
        bordered
        total={total}
        pagination={{ pageSize: 10, total: total }}
      />
    </div>
  );
};

export default LoginActivityTable;
