import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Checkbox, Divider, message } from 'antd';
import logo from '../../logo.svg';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Local } from '../../assets/svg';
import useApi from 'network/useApi';
import { facebookIcon } from './svgs';
import googleLogo from './googleIcon.png';

const SignUp = () => {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const [loading, setloading] = useState(false);
  const [socialLoading, setSocialLoading] = useState(null);

  const api = useApi();

  useEffect(() => {
    document.getElementById('myTextField').focus();
  }, []);
  const onFinish = (values) => {
    setloading(true);
    values.email = values.email.toLowerCase();
    api
      .post(
        `register?name=${values?.name}&email=${values?.email}&password=${values?.password}&password_confirmation=${values?.password_confirmation}`,
        values,
      )
      .then((data) => {
        setloading(false);
        message.success(
          'Check Youe Email! we have send you a confirmation email',
          5,
        );
        setTimeout(function () {
          navigate('/sign-in');
        }, 500);
      })
      .catch((err) => {
        setloading(false);
        message.error('The email has already been taken', 5);
        // console.log(err?.response?.data?.errors?.[0]?.message?.email, '222');
        // message.error(err?.response?.data?.errors?.[0]?.message?.email);
      });
  };

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

  const onCheckboxChange = async (e) => {
    await setChecked(e.target.checked);
  };
  const validation = (rule, value, callback) => {
    if (checked) {
      return callback();
    }
    return callback('Please accept the terms and conditions');
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
                <h1 className="auth-title">Sign up to Dscoola</h1>
                <p className="auth-account-text">
                  Already have an account?<Link to="/sign-in">Sign in</Link>{' '}
                </p>
                <div className="auth-form-content">
                  <Form layout="vertical" name="basic" onFinish={onFinish}>
                    <Form.Item
                      className="input-holder"
                      id="myTextField"
                      label="Full name"
                      name="name"
                      rules={[
                        {
                          required: true,
                          message: 'Please Enter Your Full Name!',
                        },
                        {
                          min: 3,
                        },
                        {
                          max: 40,
                        },
                        {
                          pattern: new RegExp('^[A-Za-z0-9 ]+$'),
                          message: 'Full name Contain special characters',
                        },
                      ]}
                    >
                      <Input
                        id="myTextField"
                        size="large"
                        placeholder="Enter Your Full Name"
                      />
                    </Form.Item>
                    <Form.Item
                      className="input-holder"
                      label="Email"
                      name="email"
                      // hasFeedback
                      rules={[
                        {
                          required: true,
                          message: 'Please Enter your Email!',
                        },
                        {
                          type: 'email',
                          message: 'Email Address is invalid',
                        },
                      ]}
                    >
                      <Input size="large" placeholder="Enter Your Email" />
                    </Form.Item>{' '}
                    <Form.Item
                      className="input-holder"
                      label="Password"
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: 'Please Create Password!',
                        },

                        {
                          pattern: new RegExp(
                            '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})',
                          ),

                          message:
                            'Password must be at least 8 character, 1 uppercase, 1 lowercase,and 1 number',
                        },
                      ]}
                    >
                      <Input.Password
                        size="large"
                        placeholder="Enter Your Password"
                      />
                    </Form.Item>{' '}
                    <Form.Item
                      className="input-holder"
                      label="Confirm password"
                      name="password_confirmation"
                      rules={[
                        {
                          required: true,
                          message: 'Please Confirm Password!',
                        },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
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
                        placeholder="Enter Your Password"
                      />
                    </Form.Item>
                    <Form.Item
                      name="checkbox"
                      className="terms-holder input-holder"
                      rules={[{ validator: validation }]}
                    >
                      <Checkbox checked={checked} onChange={onCheckboxChange}>
                        By signing up, I agree that I have read and accepted the{' '}
                        <Link to="/terms">Terms of Use </Link>
                        and <Link to="/privacy">Privacy Policy </Link>.
                      </Checkbox>
                    </Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={loading}
                      size="large"
                      block
                    >
                      Sign up
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

                      {/* <Link to="#">
                  <Col>
                    <img
                      src="/assets/images/icons/Group 14400 (1).svg"
                      alt=""
                    />{" "}
                  </Col>
                </Link>

                <Link to="#">
                  {" "}
                  <Col>
                    <img
                      src="/assets/images/icons/Group 14401 (1).svg"
                      alt=""
                    />{" "}
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

      {/* <div>
        <Row>
          <Col span={12}>
            <div className="left-side-containrt">
              <img
                src="/assets/images/authHero.png"
                alt=""
                className="left-side-img"
              />
              <div className="logo">
                <Link to="/">
                  {' '}
                  <img src={logo} alt="" />
                </Link>
              </div>
              <span className="Welcome-to-Dscoola">Welcome to Dscoola</span>
              <span className="Discover-a-world-of-Knowledge">
                Discover a world of Knowledge
              </span>
              <div className="left-side-background">
                <img src="/assets/images/icons/_x33_.svg" alt="" />
              </div>
            </div>
          </Col>
          <Col className="sign-up-form-container" span={12}>
            <div className="signUp-form">
              <span className="forget-pass-header">Sign up to Dscoola</span>
              <Row className="local">
                <Col>
                  <span className="local-padding">English (USA)</span>
                </Col>
                <Col>
                  <Local />
                </Col>
              </Row>

              <span className="already-have">
                Already have an account?{' '}
                <Link to="/sign-in">
                  <Button type="link">Sign in</Button>
                </Link>
              </span>
              <Form
                className="form-layout"
                layout="vertical"
                name="basic"
                onFinish={onFinish}
              >
                <Form.Item
                  className="input-holder"
                  id="myTextField"
                  label="Full name"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: 'Please Enter Your Full Name!',
                    },
                    {
                      pattern: new RegExp(
                        '^(?![_. ])(?!.*[_.]{2})[a-zA-Z._ ]+(?<![_. ])$',
                      ),

                      message:
                        'Full name Contain letters and white spaces only',
                    },
                  ]}
                >
                  <Input
                    id="myTextField"
                    size="large"
                    placeholder="Enter Your Full Name"
                  />
                </Form.Item>
                <Form.Item
                  className="input-holder"
                  label="Email"
                  name="email"
                  // hasFeedback
                  rules={[
                    {
                      required: true,
                      message: 'Please Enter your Email!',
                    },
                    {
                      type: 'email',
                      message: 'Email Address is invalid',
                    },
                  ]}
                >
                  <Input size="large" placeholder="Enter Your Email" />
                </Form.Item>{' '}
                <Form.Item
                  className="input-holder"
                  label="Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: 'Please Create Password!',
                    },

                    {
                      pattern: new RegExp(
                        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})',
                      ),

                      message:
                        'Password must be at least 8 character, 1 uppercase, 1 lowercase,and 1 number',
                    },
                  ]}
                >
                  <Input.Password
                    size="large"
                    placeholder="Enter Your Password"
                  />
                </Form.Item>{' '}
                <Form.Item
                  className="input-holder"
                  label="Confirm password"
                  name="password_confirmation"
                  rules={[
                    {
                      required: true,
                      message: 'Please Confirm Password!',
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
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
                    placeholder="Enter Your Password"
                  />
                </Form.Item>
                <Form.Item
                  name="checkbox"
                  className="termsAgreement"
                  rules={[{ validator: validation }]}
                >
                  <Checkbox checked={checked} onChange={onCheckboxChange}>
                    By signing up, I agree that I have read and accepted the{' '}
                    <Button onClick={goToTerms} type="link">
                      Terms of Use{' '}
                    </Button>{' '}
                    and{' '}
                    <Button onClick={goToPrivacy} type="link">
                      {' '}
                      Privacy Policy
                    </Button>
                    .
                  </Checkbox>
                </Form.Item>
                <Form.Item>
                  <Button
                    className="sign-up-ptn"
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                  >
                    Sign up
                  </Button>
                </Form.Item>
                <Divider>Or Continue with</Divider>
                <Row justify="center" gutter={[30, 16]}>
                  <Link to="#">
                    <Col>{googleIcon}</Col>
                  </Link>

                  <Link to="#">
                    {' '}
                    <Col>
                      <img src="/assets/images/icons/facebookIcon.svg" alt="" />{' '}
                    </Col>
                  </Link>
                </Row>
              </Form>
            </div>
          </Col>
        </Row>
      </div> */}
    </>
  );
};

export default SignUp;
