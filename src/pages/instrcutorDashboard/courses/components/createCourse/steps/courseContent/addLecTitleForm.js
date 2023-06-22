import { useQueryClient } from '@tanstack/react-query';
import { Button, Col, Form, Input, message, Row } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  fetchOpenAddLecOrQuiz,
  fetchOpenLecOrQuizForm,
  fetchshowAddLecIcon,
} from '../../../../../../../features/courseContent/courseContentSlice';
import useApi from 'network/useApi';
import DashboardButton from 'components/common/dashboard/components/button';

export default function AddLecTitleForm({ arrIndex }) {
  const dispatch = useDispatch();
  const api = useApi();
  const queryClient = useQueryClient();
  const [postLoading, setPostLoading] = useState(false);
  const sectionId = localStorage.getItem('section-id-add');
  const onFinish = (values) => {
    values.item_type = 'lecture';

    setPostLoading(true);
    api
      .post(`lecture/section/${sectionId}/initial-lecture`, values)
      .then(() => {
        message.success('add successfully!');
        dispatch(fetchOpenLecOrQuizForm(`closeAddLecForm`));
        dispatch(fetchOpenAddLecOrQuiz((arrIndex + 1) * -1));
        dispatch(fetchshowAddLecIcon(`show[${arrIndex}]`));
        queryClient.invalidateQueries([`get-course-content`]);
        setPostLoading(false);
        queryClient.invalidateQueries([`add-course`]);
      })
      .catch(() => {
        message.error('The title has already been taken!');
        setPostLoading(false);
      });
  };
  return (
    <div className="add-lec-title-form-container">
      <Form layout="horizontal" onFinish={onFinish}>
        <Form.Item
          label="New Lecture:"
          name="title"
          rules={[
            {
              required: true,
              message: 'Please Enter Lectuer Title!',
            },
          ]}
        >
          <Input placeholder="Please Enter Your Title" />
        </Form.Item>

        <Form.Item className="actions-form-items">
          <Row className="pt-5" justify="end">
            <Col>
              <Button
                className="cancel-btn"
                type="link"
                onClick={() => {
                  dispatch(fetchOpenAddLecOrQuiz((arrIndex + 1) * -1));
                  dispatch(fetchshowAddLecIcon(`show[${arrIndex}]`));
                  dispatch(fetchOpenLecOrQuizForm(`closeAddLecForm`));
                }}
              >
                Cancel
              </Button>
            </Col>
            <Col>
              <DashboardButton
                text={'Add Lecture'}
                htmlType={'submit'}
                loading={postLoading}
              ></DashboardButton>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </div>
  );
}
