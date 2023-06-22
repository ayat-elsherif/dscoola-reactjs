import React, { useState } from 'react';
import { passChangeImage } from './svgs';
import { Button, message } from 'antd';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import useApi from 'network/useApi';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUser } from 'features/user/user';

const Verification = () => {
  const navigate = useNavigate();
  let { number, id } = useParams();
  const [loading, setloading] = useState(false);
  const [searchParams] = useSearchParams();
  const api = useApi();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state?.user);

  useEffect(() => {
    const expires = searchParams.get('expires');
    const signature = searchParams.get('signature');
    setloading(true);
    api
      .get(
        `verification/email/verify/${number}/${id}?expires=${expires}&signature=${signature}`,
      )
      .then((data) => {
        setloading(false);
        dispatch(setCurrentUser({ ...currentUser, isVerified: true }));
      })
      .catch((err) => {
        setloading(false);
        message.error(err?.response?.data?.msg);
      });
  }, []);

  return (
    <div className="pass-done-wrapper">
      <div className="container-fluid">
        <div className="pass-done-content">
          <div className="pass-changed-pic">{passChangeImage}</div>
          <h1 className="auth-title">verified</h1>
          <p className="auth-account-text">
            you have successfully verified your account
          </p>
          <Button
            onClick={() => navigate('/')}
            size="large"
            type="primary"
            block
          >
            Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Verification;
