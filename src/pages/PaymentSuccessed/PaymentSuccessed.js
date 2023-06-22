import React from 'react';
import { Button, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import PaymentImage from '../../assets/svg/PaymentImage.svg';
import { useSelector } from 'react-redux';
const PaymentSuccessed = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state?.user);

  return (
    <div className="pass-done-wrapper">
      <div className="container-fluid">
        <div className="pass-done-content">
          <div className="pass-changed-pic">
            <img src={PaymentImage} alt="" />
          </div>
          <h1 className="auth-title" style={{ marginTop: 0 }}>
            Payment Successed
          </h1>
          <p className="auth-account-text">Your Payment has been successful</p>
          <div className="btns-group-holder">
            <Button
              onClick={() => navigate('/')}
              size="large"
              type="primary"
              block
            >
              Back to Home
            </Button>

            <Button
              onClick={() => {
                navigate(
                  +currentUser?.role_id === 3
                    ? '/student-dashboard/my-courses'
                    : '/instructor-dashboard/courses',
                );
              }}
              size="large"
              // type="primary"
              block
              gost
            >
              My Courses
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessed;
