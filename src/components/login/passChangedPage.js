import React from 'react';
import { passChangeImage } from './svgs';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const Passchangedpage = () => {
  const navigate = useNavigate();
  return (
    <div className="pass-done-wrapper">
      <div className="container-fluid">
        <div className="pass-done-content">
          <div className="pass-changed-pic">{passChangeImage}</div>
          <h1 className="auth-title">Password Reset</h1>
          <p className="auth-account-text">
            Your password has been successfully reset
          </p>
          <Button
            onClick={() => navigate('/sign-in')}
            size="large"
            type="primary"
            block
          >
            continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Passchangedpage;
