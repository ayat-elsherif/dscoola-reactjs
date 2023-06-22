import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { resetPassImage } from './svgs';
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';
import './authReset.scss';
import useApi from 'network/useApi';

const Resetpass = () => {
  let resetToken = useParams();
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const api = useApi();

  const onFinish = (values) => {
    setloading(true);
    api
      .post(
        `forgot-password/reset/${resetToken.resetToken}?password=${values.Password}&password_confirmation=${values.ConfirmPassword}`,
        {},
      )
      .then((data) => {
        setloading(false);
        navigate('/successfully-pass-changed');
      })
      .catch((err) => {
        setloading(false);
        message.error(err?.response?.data?.msg);
      });
  };
  return (
    <>
      <div className="auth-forget-wrapper">
        <div className="container-fluid">
          <div className="auth-forget-body">
            <div className="auth-hero-holder">{resetPassImage}</div>
            <div className="auth-form-holder">
              <h1 className="auth-title">Set New Password</h1>
              <p className="auth-account-text">
                Your new password must be different to previously one
              </p>
              <div className="auth-form-content">
                <Form layout="vertical" name="basic" onFinish={onFinish}>
                  <Form.Item
                    className="input-holder"
                    label="Password"
                    name="Password"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your Password!',
                      },
                      {
                        pattern: new RegExp(
                          '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&_*])(?=.{8,})',
                        ),

                        message:
                          'Password must be at least 8 character, 1 uppercase, 1 lowercase, 1 number, and 1 special character',
                      },
                    ]}
                  >
                    <Input.Password
                      size="large"
                      placeholder="enter your Password"
                    />
                  </Form.Item>
                  <Form.Item
                    className="input-holder"
                    label="Confirm password"
                    name="ConfirmPassword"
                    rules={[
                      {
                        required: true,
                        message: 'Please input Confirm password!',
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('Password') === value) {
                            return Promise.resolve();
                          }

                          return Promise.reject(
                            new Error('The password does not match'),
                          );
                        },
                      }),
                    ]}
                  >
                    <Input.Password
                      size="large"
                      placeholder="enter Confirm password"
                      // iconRender={(visible) =>
                      //     visible ? (
                      //         <EyeTwoTone />
                      //     ) : (
                      //         <EyeInvisibleOutlined />
                      //     )
                      // }
                    />
                  </Form.Item>

                  <Button
                    type="primary"
                    size="large"
                    htmlType="submit"
                    loading={loading}
                    block
                  >
                    Reset password
                  </Button>
                  <div className="back-btn-holder">
                    <img src="/assets/images/icons/Mask Group 747.svg" alt="" />
                    <Link to="/sign-in">
                      <span className="back-to-btn">Back to log in</span>
                    </Link>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Resetpass;
