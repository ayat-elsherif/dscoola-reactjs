import { useQueryClient } from '@tanstack/react-query';
import { Button, Form, Input, message, Row } from 'antd';
import useApi from 'network/useApi';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchaddDesc } from '../../../../../../../../features/courseContent/courseContentSlice';

export default function ExternalResourceFile({ lectuer, sectionId }) {
  const queryClient = useQueryClient();
  const [postLoading, setPostLoading] = useState(false);
  const dispatch = useDispatch();
  const api = useApi();
  const onFinish = (values) => {
    setPostLoading(true);
    api
      .put(`lecture/${lectuer.id}/resource`, values)
      .then(() => {
        setPostLoading(false);
        message.success('add successfully!');
        queryClient.invalidateQueries([`get-course-content`]);
        dispatch(fetchaddDesc('close'));
      })
      .catch((err) => {
        setPostLoading(false);
      });
  };

  return (
    <Form layout="vertical" onFinish={onFinish}>
      <Form.Item
        label="Title:"
        name="title"
        rules={[
          {
            required: true,
            message: 'Please Enter Title!',
          },
        ]}
      >
        <Input placeholder="Enter Lectuer Title" />
      </Form.Item>
      <Form.Item
        label="URL:"
        name="file_url"
        rules={[
          {
            required: true,
            message: 'Please Enter Resource URL!',
          },
        ]}
      >
        <Input placeholder="Enter https://example.com" />
      </Form.Item>

      <Form.Item>
        <Row className="pt-5" justify="end">
          <Button
            className="cancel-btn"
            onClick={() => dispatch(fetchaddDesc('close'))}
            type="link"
          >
            Cancle
          </Button>
          <Button htmlType="submit" loading={postLoading} type="primary">
            Save
          </Button>
        </Row>
      </Form.Item>
    </Form>
  );
}
