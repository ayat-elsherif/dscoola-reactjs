import { Form, message, Select, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import './index.scss';
import GeneralRequests from '../../generalRequests/index';
import useApi from 'Hooks/network/useApi';
import { useSelector } from 'react-redux';

const { Option } = Select;

const tagRender = (props) => {
  const { label, closable, onClose } = props;
  const onPreventMouseDown = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <Tag
      color={'#7E59D1'}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{
        marginRight: 3,
      }}
    >
      {label}
    </Tag>
  );
};
function Index() {
  const api = useApi();
  const { currentUser } = useSelector((state) => state?.user);
  const [courses, setCoursesList] = useState([]);
  const [courseId, setCourseId] = useState();
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('values', values);
  };

  const HandleGEtCourses = () => {
    api
      .get(`courses/filter?perpage=100000&instructor[]=${currentUser?.user_id}`)
      .then((res) => {
        setCoursesList(res?.data);
      })
      .catch(() => message.error('Something went wrong'));

    // api.get('appointment/calendar');
    //

    // 30;
  };

  useEffect(() => {
    HandleGEtCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="course-requests-form">
      <Form
        layout="vertical"
        className="dashboard-form"
        name="course-requests"
        form={form}
        onFinish={onFinish}
        initialValues={{ prefix: 'EGP' }}
      >
        <Form.Item
          name="course"
          className="multi-select-container"
          label="Choose Course To Active One On One Request"
        >
          <Select
            showArrow
            className="course-one-o-one"
            placeholder="Select Course"
            onChange={(value) => setCourseId(value)}
          >
            {courses?.map((item) => {
              return (
                <Option value={item?.id} key={item?.id}>
                  {item?.title}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <GeneralRequests isGeneral={true} courseId={courseId} />
      </Form>
    </div>
  );
}

export default Index;
