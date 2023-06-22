import React, { useEffect, useState } from 'react';
import useApi from '../../../../../network/useApi';
import LoginActivityTable from './table';
import { Loading } from '../../../../../components/common/Loading';

const LoginActivity = () => {
  const [loginData, setLoginData] = useState([]);
  const [total, setTotal] = useState([]);

  const api = useApi();

  const handleGetLoginActivities = (current_page = 1) => {
    api
      .get(`/user/login-activity`)
      .then((res) => {
        setLoginData(res?.data);
        setTotal(res?.total);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    handleGetLoginActivities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!loginData.length) return <Loading />;

  return (
    <div className="login-activity">
      <div className="info-header">
        <h3>Login Activity</h3>
        <h4>Here is your last 20 login activities log.</h4>
      </div>
      <LoginActivityTable
        total={total}
        refetechList={handleGetLoginActivities}
        loginData={loginData}
      />
    </div>
  );
};

export default LoginActivity;
