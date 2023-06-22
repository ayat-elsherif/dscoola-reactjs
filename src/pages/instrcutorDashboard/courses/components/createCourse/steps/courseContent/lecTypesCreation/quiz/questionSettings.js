import { InfoCircleOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import {
  Col,
  Form,
  Input,
  InputNumber,
  message,
  Radio,
  Row,
  Switch,
  Tooltip,
} from 'antd';
import DashboardButton from 'components/common/dashboard/components/button';
import useApi from 'network/useApi';
import React, { useState } from 'react';

const QuestionSettings = ({ lectuer, sectionId }) => {
  const api = useApi();
  const courseId = localStorage.getItem('live-course-id');
  const [form] = Form.useForm();

  const [showTime, setShowTime] = useState(false);
  const [gradable, setGradable] = useState(false);
  const [loading, setLoading] = useState(false);
  const onFinish = (values) => {
    setLoading(true);
    const data = {
      quiz_option: {
        show_time: showTime,
        time_limit: values.time_limit,
        passing_score: values.passing_score,
        questions_limit: values.questions_limit,
      },
      quiz_gradable: gradable,
      section_id: sectionId,
    };
    api
      .put(`quizes/${lectuer.id}`, data)
      .then(() => {
        setLoading(false);
        message.success('add successfully');
      })
      .catch(() => {
        setLoading(false);
        message.error('something went wrong');
      });
  };
  const onShowTimeChange = (checked) => {
    setShowTime(checked);
  };
  const onGradableChange = (checked) => {
    setGradable(checked);
  };
  const onSuccess = (data) => {
    console.log(data.data.quiz, 'c,[efpkwgef');
    form.setFieldsValue({
      passing_score: data.data.quiz.passing_score,
      questions_limit: data.data.quiz.questions_limit,
      time_limit: data.data.quiz.time_limit,
    });
  };
  const onError = () => {};
  const { isLoading } = useQuery(
    [`get-quiz-info`],
    () => {
      return api.get(`courses/${courseId}/quizes/${lectuer.id}/questions`);
    },
    {
      onSuccess,
      onError,
    },
  );

  return (
    <Form onFinish={onFinish} layout="vertical" form={form}>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Form.Item
            label="Passing Score"
            name="passing_score"
            rules={[
              {
                required: true,
                message: 'Please Enter Passing Score',
              },
            ]}
          >
            <Input
              size="large"
              suffix={
                <Tooltip title="Student have to collect this score in percent for the pass this quiz.">
                  <InfoCircleOutlined
                    style={{
                      color: '#7E59D1',
                    }}
                  />
                </Tooltip>
              }
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Questions Limit"
            name="questions_limit"
            rules={[
              {
                required: true,
                message: 'Please Enter questions limit',
              },
            ]}
          >
            <Input
              size="large"
              suffix={
                <Tooltip title="The number of questions student have to answer in this quiz.">
                  <InfoCircleOutlined
                    style={{
                      color: '#7E59D1',
                    }}
                  />
                </Tooltip>
              }
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Time Limit"
            name="time_limit"
            rules={[
              {
                required: true,
                message: 'Please Enter Time limit',
              },
            ]}
          >
            <Input
              size="large"
              suffix={
                <Tooltip title="Set zero to disable time limit.">
                  <InfoCircleOutlined
                    style={{
                      color: '#7E59D1',
                    }}
                  />
                </Tooltip>
              }
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Quiz Gradable" name="quiz_gradable">
            <Switch onChange={onGradableChange} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Show Time" name="show_time">
            <Switch onChange={onShowTimeChange} />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item className="actions-form-items">
            <DashboardButton
              text=" Save"
              htmlType={'submit'}
              type="link"
              loading={loading}
              cssStyle={{
                width: '100px',
              }}
            />
          </Form.Item>
        </Col>
        <Col></Col>
      </Row>
    </Form>
  );
};

export default QuestionSettings;
