import React, { useEffect, useState } from 'react';
import { Row, Col, Select, Form, Button, message } from 'antd';
import {
  courseTypesIcon,
  instructorLevelIcon,
  instructorSignShape,
  studentsNoIcon,
} from '../../SVGs';
import useApi from 'network/useApi';
import { setCurrentUser } from 'features/user/user';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import swal from 'sweetalert';

const { Option } = Select;
function InstructorSign() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state?.user);

  const api = useApi();
  window.scroll(0, 0);

  const handelRegisterInstructor = (values) => {
    if (!currentUser) {
      swal('Oops!', 'You Must Register First', 'warning');
      return false;
    }
    setLoading(true);
    api
      .post(`instructor/became-instructor`, values)
      .then((res) => {
        if (res?.success) {
          handelChangeUserToInstractor(res?.data?.id);
        }
      })
      .catch((err) => {
        message.error(err?.response?.data?.errors?.[0]?.message);
        setLoading(false);
      });
  };

  const handelChangeUserToInstractor = (user_id) => {
    const values = {
      instructor_request_id: user_id,
    };
    api
      .post(`instructor/became-instructor/approve`, values)
      .then((res) => {
        setLoading(false);
        message.success('register successfully');
        localStorage.setItem('role', 2);
        dispatch(setCurrentUser({ ...currentUser, role_id: 2 }));
        setTimeout(() => {
          navigate('/instructor-dashboard/my-profile');
        }, 500);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (!currentUser) {
      swal('Oops!', 'You Must Register First', 'warning');
      navigate('/sign-up');
    }
  }, []);

  return (
    <div className="instructorForm">
      <div className="container">
        <Row justify="center">
          <Col lg={10}>
            <div className="instructorForm-brief">
              {instructorSignShape}
              <h3>Let's Grow Your skills</h3>
              <p>
                Tell us a bit more about yourself so we can help you create the
                prefect course
              </p>
            </div>
          </Col>
          <Col lg={13} offset={1}>
            <Form name="basic" onFinish={handelRegisterInstructor}>
              <div className="instructorForm-block">
                <div className="instructorForm-title">
                  {instructorLevelIcon}
                  <h4>What's your level of experience hosting courses?</h4>
                </div>
                <Form.Item
                  name="experience_level"
                  rules={[{ required: true, message: 'You Must Pick a Level' }]}
                >
                  <Select placeholder="Select Your Experience" allowClear>
                    <Option value="beginner">Beginner</Option>
                    <Option value="intermediate">intermediate</Option>
                    <Option value="advanced">advanced</Option>
                  </Select>
                </Form.Item>
              </div>
              <div className="instructorForm-block">
                <div className="instructorForm-title">
                  {studentsNoIcon}
                  <h4>How many students you can study to?</h4>
                </div>
                <Form.Item
                  name="student_count"
                  rules={[
                    { required: true, message: 'You Must Pick a Quantity' },
                  ]}
                >
                  <Select placeholder="Select Quantity">
                    <Option value="small">less than 50</Option>
                    <Option value="medium">more than 50</Option>
                    <Option value="large">more than 100</Option>
                  </Select>
                </Form.Item>
              </div>
              <div className="instructorForm-block">
                <div className="instructorForm-title">
                  {courseTypesIcon}
                  <h4>what type of courses you have done?</h4>
                </div>
                <Form.Item
                  name="courses_type"
                  rules={[
                    { required: true, message: 'You Must Pick an Experience' },
                  ]}
                >
                  <Select placeholder="Select Your Experience">
                    <Option value="live">live courses</Option>
                    <Option value="recorded">recorded courses</Option>
                    <Option value="both">both types</Option>
                  </Select>
                </Form.Item>
              </div>
              <div className="instructorForm-submit">
                <Button type="primary" htmlType="submit" loading={loading}>
                  submit
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default InstructorSign;
