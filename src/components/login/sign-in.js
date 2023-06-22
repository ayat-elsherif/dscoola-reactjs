import React, { useEffect, useState } from 'react';
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Checkbox,
  Divider,
  message,
} from 'antd';
import './Login.scss';
import logo from '../../logo.svg';
import { facebookIcon } from './svgs';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Local } from '../../assets/svg';
import { setCurrentUser } from 'features/user/user';
import useApi from 'network/useApi';
import googleLogo from './googleIcon.png';

const SignIn = () => {
  const navigate = useNavigate();
  const api = useApi();

  const [loading, setloading] = useState(false);
  const [socialLoading, setSocialLoading] = useState(null);

  const dispatch = useDispatch();
  const location = useLocation();
  const params = useParams();
  // console.log(location, 'location');
  // console.log(params, 'params');

  useEffect(() => {
    document.getElementById('myTextField').focus();
    if (params?.provider) {
      fetch(
        `https://staging-api.dscoola.com/api/auth/${params?.provider}/callback${location?.search}`,
        { headers: new Headers({ accept: 'application/json' }) },
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Something went wrong!');
        })
        .then((data) => {
          dispatch(setCurrentUser(data?.user));
          localStorage.setItem('access_token', data.authorisation.token);
          localStorage.setItem('role', data.user.role_id);
          setTimeout(function () {
            navigate('/');
          }, 500);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  const onGoogleLoginSuccess = (provider) => {
    setSocialLoading(provider);
    fetch(`https://staging-api.dscoola.com/api/auth/${provider}/url`, {
      headers: new Headers({ accept: 'application/json' }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Something went wrong!');
      })
      .then((data) => {
        console.log(data);
        window.location.replace(data?.url);
      })
      .catch((error) => console.error(error));
  };

  const onFinish = (values) => {
    setloading(true);
    api
      .post('/login', values)
      .then((data) => {
        setloading(false);
        dispatch(
          setCurrentUser({
            ...data?.user,
            isUserInstractor: data?.user?.role_id === 2,
          }),
        );
        localStorage.setItem('access_token', data.authorisation.token);
        localStorage.setItem('role', data.user.role_id);
        setTimeout(function () {
          navigate('/');
        }, 500);
      })
      .catch((err) => {
        setloading(false);
        message.error(err?.response?.data?.errors?.[0]?.message);
      });
  };

  return (
    <>
      <div className="auth-wrapper">
        <div className="container-fluid">
          <div className="auth-content">
            <div className="auth-content--header">
              <Link to="/">
                <img src={logo} alt="logo" />
              </Link>
              <span className="lang-holder">
                English (USA) <Local />{' '}
              </span>
            </div>
            <div className="auth-content-body">
              <div className="auth-welcome-holder">
                <h5 className="welcome--title">Welcome to Dscoola</h5>
                <h3 className="welcome--desc">Discover a world of Knowledge</h3>
              </div>
              <div className="auth-form-holder">
                <h1 className="auth-title">Sign in to Dscoola</h1>
                <p className="auth-account-text">
                  Do not have an account? <Link to="/sign-up">Sign up</Link>{' '}
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
                          message: 'Please input Email!',
                        },
                        {
                          type: 'email',
                          message: 'Email Address Is Invalid',
                        },
                      ]}
                    >
                      <Input id="myTextField" placeholder="Enter Your Email" />
                    </Form.Item>
                    <Form.Item
                      className="input-holder"
                      label="Password"
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: 'Please Input Password!',
                        },
                      ]}
                    >
                      <Input.Password
                        size="large"
                        placeholder="Enter Your Password"
                      />
                    </Form.Item>

                    <Row justify="space-between" className="check-Row">
                      <Col>
                        <Form.Item>
                          <Checkbox>Remember Me.</Checkbox>
                        </Form.Item>
                      </Col>
                      <Col>
                        <Link to="/forget-password">Forget password?</Link>
                      </Col>
                    </Row>

                    <Button
                      // className="sign-up-ptn"
                      type="primary"
                      size="large"
                      htmlType="submit"
                      loading={loading}
                      block
                    >
                      Sign In
                    </Button>

                    <Divider>Or Continue with</Divider>
                    <div className="social-btns-holder">
                      <Button
                        // shape="circle"
                        icon={facebookIcon}
                        loading={socialLoading === 'facebook'}
                        onClick={() => onGoogleLoginSuccess('facebook')}
                      />
                      <Button
                        loading={socialLoading === 'google'}
                        icon={<img src={googleLogo} />}
                        onClick={() => onGoogleLoginSuccess('google')}
                      />
                      {/* 
                      <Link to="#">
                        <Col>{googleIcon}</Col>
                      </Link>

                      <Link to="#">
                        {' '}
                        <Col>
                          <img
                            src="/assets/images/icons/facebookIcon.svg"
                            alt=""
                          />{' '}
                        </Col>
                      </Link> */}
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
