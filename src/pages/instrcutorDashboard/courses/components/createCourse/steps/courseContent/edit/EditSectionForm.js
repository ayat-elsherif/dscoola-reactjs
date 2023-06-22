import { Button, Col, Form, Input, message, Row, Skeleton, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import '../index.scss';
import fetch from '../../../../../../../../auth/AuthInterceptor';
import { useQueryClient } from '@tanstack/react-query';
import Loading from '../../../../../../../../components/common/dashboard/shared-components/Loading';
import './edit.scss';
import { normalizeDataToFields } from '../../../../../../../dashboard/myProfile/components/personalInformation/Helpers';
import DashboardButton from 'components/common/dashboard/components/button';

export default function EditSectionForm({ section, closeModal }) {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const [postLoading, setPostLoading] = useState(false);
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchedData, setFetchedData] = useState({});
  const onFinish = (values) => {
    setPostLoading(true);
    fetch({
      url: `api/lecture/section/${section}`,
      method: 'put',
      headers: {
        'public-request': 'true',
      },
      data: values,
    })
      .then(() => {
        setPostLoading(false);
        message.success('edit successfully!');
        closeModal();
        queryClient.invalidateQueries([`get-course-content`]);
      })
      .catch((err) => {
        setPostLoading(false);
        message.error('something went wrong!');
      });
  };
  useEffect(() => {
    setLoading(true);

    fetch({
      url: `api/lecture/section/${section}`,
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
        setLoading(false);
        message.error('something went wrong!');
      });
  }, []);
  useEffect(() => {
    setFields(normalizeDataToFields(fetchedData));
  }, [fetchedData]);

  return (
    <>
      {loading ? (
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Skeleton active />
          </Col>
          <Col span={24}>
            <Skeleton active />
          </Col>
        </Row>
      ) : (
        <Form
          className="form-edit-section"
          form={form}
          fields={fields}
          name="create-folder"
          layout="vertical"
          onFinish={onFinish}
          // className='dashboard-form'
        >
          <Form.Item
            name="section_name"
            label="Title"
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
            // rules={[
            //   {
            //     required: true,
            //     message: 'Please Enter Section Objective',
            //   },
            // ]}
          >
            <Input placeholder="Enter a learning objective" />
          </Form.Item>
          <Form.Item className="actions-form-items">
            <Row justify="end">
              <Col>
                <DashboardButton
                  text=" Save"
                  htmlType={'submit'}
                  type="link"
                  loading={postLoading}
                  cssStyle={{
                    width: '100px',
                  }}
                />
              </Col>
            </Row>
          </Form.Item>
        </Form>
      )}
    </>
  );
}
