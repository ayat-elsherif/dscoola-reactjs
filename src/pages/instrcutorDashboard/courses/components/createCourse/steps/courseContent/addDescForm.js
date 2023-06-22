import { useQueryClient } from '@tanstack/react-query';
import { Button, Col, Form, message, Row } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchaddDesc } from '../../../../../../../features/courseContent/courseContentSlice';
import fetch from '../../../../../../../auth/AuthInterceptor';
import useApi from 'network/useApi';
import DashboardButton from 'components/common/dashboard/components/button';
import OwnTextEditor from 'components/own/OwnTextEditor/OwnTextEditor';

const AddDescForm = ({ sectionId, lectuer }) => {
  const api = useApi();
  const dispatch = useDispatch();
  const [postLoading, setPostLoading] = useState(false);
  const [description, setDescription] = useState(lectuer?.text);
  const queryClient = useQueryClient();

  const onFinish = (values) => {
    setPostLoading(true);
    values.description = description;
    api
      .put(`lecture/${lectuer.id}/description`, values)
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
    <Form layout="vertical" style={{ width: '100%' }} onFinish={onFinish}>
      <Form.Item name="description" label="Description">
        <OwnTextEditor
          textEdit={description}
          setTextEdit={setDescription}
          placeholder="Enter Description"
          isRecordable={false}
          // record={record}
          // setRecord={setRecord}
        />
      </Form.Item>

      <Form.Item className="actions-form-items">
        <Row justify="end" className="pt-5">
          <Col>
            <Button onClick={() => dispatch(fetchaddDesc('close'))} type="link">
              Cancle
            </Button>
          </Col>
          <Col>
            <Button loading={postLoading} type="primary" htmlType="submit">
              Save
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};

export default AddDescForm;
