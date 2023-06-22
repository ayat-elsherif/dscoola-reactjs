import { useQueryClient } from '@tanstack/react-query';
import { Button, Col, Form, Input, message, Row, Skeleton } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import fetch from '../../../../../../../..//auth/AuthInterceptor';
import { normalizeDataToFields } from '../../../../../../../dashboard/myProfile/components/personalInformation/Helpers';

export default function EditLectuerForm({ sectionId, lectuer, closeModal }) {
  console.log(sectionId, lectuer.id, 'dfgfsd');
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const [postLoading, setPostLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [fields, setFields] = useState([]);
  const [fetchedData, setFetchedData] = useState({});

  const onFinish = (values) => {
    setPostLoading(true);
    fetch({
      url: `api/lecture/${lectuer?.id}/title`,
      method: 'put',
      headers: {
        'public-request': 'true',
      },
      data: values,
    })
      .then(() => {
        setPostLoading(false);
        closeModal();
        message.success('add successfully!');

        queryClient.invalidateQueries([`get-course-content`]);
      })
      .catch(() => {
        setPostLoading(false);
        message.error('something went wrong!');
      });

    localStorage.setItem('live-lectuer-title', values.title);
  };
  useEffect(() => {
    setLoading(true);

    fetch({
      url: `api/lecture/section/${sectionId}/lecture/${lectuer?.id}`,
      method: 'get',
      headers: {
        'public-request': 'true',
      },
    })
      .then((res) => {
        setFetchedData(res?.data[0]);

        setLoading(false);

        queryClient.invalidateQueries([`get-course-content`]);
      })
      .catch((err) => {
        message.error('something went wrong!');
      });
  }, []);
  useEffect(() => {
    setFields(normalizeDataToFields(fetchedData));
  }, [fetchedData]);
  return (
    <div>
      {loading ? (
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Skeleton active />
          </Col>
        </Row>
      ) : (
        <Form layout="vertical" onFinish={onFinish} form={form} fields={fields}>
          <Form.Item
            label="Title:"
            name="title"
            rules={[
              {
                required: true,
                message: 'Please Enter Lectuer Title!',
              },
            ]}
          >
            <Input size="large" placeholder="Please Enter Your Title" />
          </Form.Item>

          <Row justify="end" className="mt-5">
            <Col>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Save
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      )}
    </div>
  );
}
