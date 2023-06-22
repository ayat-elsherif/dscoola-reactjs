import { useQuery } from '@tanstack/react-query';
import { Button, Form, Input, message, Select } from 'antd';
import React from 'react';
import { useState } from 'react';

import './addInitCourseForm.scss';
import fetch from '../../../../../../auth/AuthInterceptor';
import { useNavigate } from 'react-router-dom';
import useApi from 'network/useApi';
const AddInitCoursForm = () => {
  const { Option } = Select;
  const api = useApi();
  const navigate = useNavigate();
  const [Categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  var categoriesArr = [];
  Categories?.map((item) => {
    categoriesArr.push({ label: item.category_name, value: item.id });
  });
  const onError = () => {
    message.error('something went wrong!');
  };
  const onGetCatSuccess = (categories) => {
    setCategories(categories.data);
  };
  useQuery(
    [`get-categories`],
    () => {
      return fetch({
        url: 'api/categories/parent/filter',
        method: 'get',
        headers: {
          'public-request': 'true',
        },
      });
    },
    {
      onSuccess: onGetCatSuccess,
      onError: onError,
    },
  );
  const onFinish = (values) => {
    api
      .post(`lecture/initial-course`, values)
      .then((res) => {
        localStorage.setItem('live-course-id', res.data.course_id);

        navigate('add/course-structure');
        localStorage.removeItem('is_featuerd');
        localStorage.removeItem('acceptTerms');
        localStorage.removeItem('premiumInstructor');
        setLoading(false);
      })
      .catch(() => {
        message.error('The title has already been taken', 5);
        setLoading(false);
      });
    setLoading(true);
  };

  return (
    <Form className="init-course-form" onFinish={onFinish} layout="vertical">
      <Form.Item
        label="Course Title"
        name="title"
        rules={[
          {
            required: true,
            message: 'Please input course title!',
          },
        ]}
      >
        <Input placeholder="Course Title" />
      </Form.Item>
      <Form.Item
        label="Category"
        name="parent_category_id"
        rules={[
          {
            required: true,
            message: 'Please select category!',
          },
        ]}
      >
        <Select placeholder="Category" options={categoriesArr} />
      </Form.Item>
      <Form.Item
        label="Course Type"
        name="type"
        rules={[
          {
            required: true,
            message: 'Please select type!',
          },
        ]}
      >
        <Select placeholder="Type">
          <Option value="recorded">Recorded</Option>
          <Option value="liveClass">Live</Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <Button
          className="create-course-btn"
          type="primary"
          htmlType="submit"
          loading={loading}
        >
          Create Course
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddInitCoursForm;
