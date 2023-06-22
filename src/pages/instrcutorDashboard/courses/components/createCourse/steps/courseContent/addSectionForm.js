import { Button, Col, Form, Input, message, Row } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchOpenSectionForm } from '../../../../../../../features/courseContent/courseContentSlice';
import fetch from '../../../../../../../auth/AuthInterceptor';
import { useQueryClient } from '@tanstack/react-query';
import DashboardButton from 'components/common/dashboard/components/button';

export default function AddSectionForm() {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const [postLoading, setPostLoading] = useState(false);
  const onFinish = (values) => {
    setPostLoading(true);
    fetch({
      url: `api/lecture/course/${localStorage.getItem(
        'live-course-id',
      )}/section`,
      method: 'post',
      headers: {
        'public-request': 'true',
      },
      data: values,
    })
      .then(() => {
        setPostLoading(false);
        message.success('add successfully!');
        dispatch(fetchOpenSectionForm(false));
        queryClient.invalidateQueries([`get-course-content`]);
      })
      .catch((err) => {
        setPostLoading(false);
        message.erroe('somthing went wrong!');
      });
  };

  return (
    <Form
      name="create-folder"
      layout="vertical"
      onFinish={onFinish}
      // className='dashboard-form'
    >
      <Row>
        <Col style={{ fontSize: '17px', fontWeight: '500' }} span={4}>
          New section:
        </Col>
        <Col span={20}>
          <Form.Item
            name="section_name"
            //   label='Title'
            rules={[
              {
                required: true,
                message: 'Please Enter Section Name',
              },
            ]}
          >
            <Input placeholder="Please Enter Your Title" />
          </Form.Item>
          <Form.Item
            name="objective"
            label="What will students be able to do at the end of this section?"
            rules={[
              {
                required: true,
                message: 'Please Enter Section Objective',
              },
            ]}
          >
            <Input placeholder="Enter a learning objective" />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item>
        <Row className="pt-5" justify="end">
          <Col>
            <Button
              className="cancel-btn"
              onClick={() => {
                dispatch(fetchOpenSectionForm(false));
              }}
              type="link"
            >
              Cancle
            </Button>
          </Col>
          <Col>
            <DashboardButton
              text={'Add Section'}
              htmlType={'submit'}
              loading={postLoading}
            ></DashboardButton>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
}
