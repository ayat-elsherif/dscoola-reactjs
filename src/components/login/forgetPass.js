import { Form, Input, Button } from 'antd';
import { forgetPassImage } from './svgs';
import swal from 'sweetalert';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { forgetPass, fetchStart } from '../../features/auth/forgetPass';
import { authAxios } from '../../apis/coursesAPI';
import './authReset.scss';
import useApi from 'network/useApi';
import { useState } from 'react';
const Forgetpass = () => {
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch();
  // const loading = useSelector((state) => state.forgetPass.loading);
  const api = useApi();
  const navigate = useNavigate();

  const onFinish = (values) => {
    values.email = values.email.toLowerCase();
    setloading(true);
    api
      .post(`forgot-password?email=${values.email}`, {})
      .then((data) => {
        setloading(false);
        swal(
          'Check Your Email!',
          'we have send you a confirmation email',
          'success',
        );
        navigate('/sign-in');
      })
      .catch((err) => {
        setloading(false);
        swal(
          'Oops!',
          "We can't find a user with that email address.",
          'warning',
        );
      });

    // const forgetPassFun = async () => {
    //   dispatch(fetchStart());
    //   const response = await authAxios

    //     .post(`forgot-password?email=${values.email}`)
    //     .then((response) => {
    //       dispatch(forgetPass(response.data));
    //       swal(
    //         'Check Your Email!',
    //         'we have send you a confirmation email',
    //         'success',
    //       );
    //     })

    //     .catch((err) => {
    //       dispatch(forgetPass(err));
    //       swal(
    //         'Oops!',
    //         "We can't find a user with that email address.",
    //         'warning',
    //       );
    //     });
    // };
    // forgetPassFun();
  };
  return (
    <>
      <div className="auth-forget-wrapper">
        <div className="container-fluid">
          <div className="auth-forget-body">
            <div className="auth-hero-holder">{forgetPassImage}</div>
            <div className="auth-form-holder">
              <h1 className="auth-title">Forgot password</h1>
              <p className="auth-account-text">
                Enter email address associated with your account
              </p>
              <div className="auth-form-content">
                <Form layout="vertical" name="basic" onFinish={onFinish}>
                  <Form.Item
                    className="input-holder"
                    label="Email"
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your Email!',
                      },
                      {
                        type: 'email',
                        message: 'Email Address is invalid',
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      placeholder="enter your email address"
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
      {/* <div>
        <Row className="forget-pass-container">
          <Col span={12}>{forgetPassImage}</Col>
          <Col span={12} className="forgotPassword">
            <div className="forgotPassword-form">
              <span className="forget-pass-header">Forgot password</span>
              <span className="forget-pass-content">
                Enter email address associated with your account
              </span>
              <Form layout="vertical" name="basic" onFinish={onFinish}>
                <Form.Item
                  className="email-input"
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your Email!',
                    },
                    {
                      type: 'email',
                      message: 'Email Address is invalid',
                    },
                  ]}
                >
                  <Input size="large" placeholder="enter your email address" />
                </Form.Item>

                <Form.Item>
                  <Button
                    className="forgrt-ptn mt-5"
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                  >
                    Reset password
                  </Button>
                </Form.Item>
                <div className="back-to-container">
                  {' '}
                  <img src="/assets/images/icons/Mask Group 747.svg" alt="" />
                  <Link to="/sign-in">
                    <span className="back-to-btn">Back to log in</span>
                  </Link>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </div> */}
    </>
  );
};

export default Forgetpass;
