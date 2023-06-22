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
import TextArea from 'antd/es/input/TextArea';
import DashboardButton from 'components/common/dashboard/components/button';

export default function AddQuizTitleForm({ arrIndex }) {
  const dispatch = useDispatch();
  const api = useApi();
  const queryClient = useQueryClient();
  const [postLoading, setPostLoading] = useState(false);
  const sectionId = localStorage.getItem('section-id-add');
  const onFinish = (values) => {
    values.item_type = 'quiz';
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
      })
      .catch(() => {
        message.error('The title has already been taken!');
        setPostLoading(false);
      });
  };
  return (
    <div className="add-lec-title-form-container">
      <Form layout="horizontal" onFinish={onFinish}>
        <Row>
          <Col span={3}>
            <h4>New Quiz :</h4>
          </Col>
          <Col span={21}>
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Form.Item
                  name="title"
                  rules={[
                    {
                      required: true,
                      message: 'Please Enter your Title!',
                    },
                  ]}
                >
                  <Input placeholder="Please Enter Your Title" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name="objective"
                  rules={[
                    {
                      required: true,
                      message: 'Please Enter description!',
                    },
                  ]}
                >
                  <TextArea placeholder="Please Enter Description" />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item>
              <Row justify="end">
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
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={postLoading}
                  >
                    Add Quiz
                  </Button>
                </Col>
              </Row>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
