import React, { useEffect, useState } from "react";
import { Row, Col, Form, Input, Button, Statistic } from "antd";
import { verifyCodeImage } from "./svgs";
import OTPInput from "otp-input-react";
import { Link } from "react-router-dom";

const Verifycode = () => {
  const [OTP, setOTP] = useState("");
  const [counter, setCounter] = useState(120);

  const onFinish = (values) => {
    values.otp = OTP;
    console.log("Success:", values);
  };
  const checkIfResendDisabled = () => {
    if (counter !== 0) {
      return true;
    } else {
      return false;
    }
  };
  useEffect(() => {
    if (!counter) return;
    let myInterval = setInterval(() => {
      setCounter(counter - 1);
    }, 1000);
    return () => clearInterval(myInterval);
  }, [counter]);
  return (
    <div>
      <Row className="forget-pass-container">
        <Col span={12}>{verifyCodeImage}</Col>
        <Col span={12} className="forgotPassword">
          <div className="forgotPassword-form">
            <span className="forget-pass-header">Verify Your Email</span>
            <span className="forget-pass-content">
              please enter the 4 Digital code sent to your email.
            </span>
            <Form layout="vertical" name="basic" onFinish={onFinish}>
              <Form.Item
                className="email-input"
                name="Otp"
                rules={[
                  {
                    required: true,
                    message: "Please input OTP!",
                  },
                ]}
              >
                <OTPInput
                  value={OTP}
                  onChange={setOTP}
                  autoFocus
                  OTPLength={4}
                  otpType="number"
                  disabled={false}
                  maxTime={120}
                  inputClassName="opt-input"
                  className="otp-container"
                />
              </Form.Item>

              <Form.Item>
                <Button className="forgrt-ptn" type="primary" htmlType="submit">
                  Verify
                </Button>
              </Form.Item>
              <div className="resend-code-container">
                {" "}
                <Button
                  type="link"
                  disabled={checkIfResendDisabled()}
                  onClick={() => setCounter(120)}
                >
                  click to resend
                </Button>
                <span> {counter} sec left </span>
              </div>
              <div className="back-to-container">
                {" "}
                <img src="/assets/images/icons/Mask Group 747.svg" alt="" />
                <Link to="/sign-in">
                  <span className="back-to-btn">Back to log in</span>
                </Link>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Verifycode;
