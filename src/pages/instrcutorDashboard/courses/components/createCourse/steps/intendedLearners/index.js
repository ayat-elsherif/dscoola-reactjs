import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Form, Input, Button, Spin, message, Row, Col } from 'antd';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { ActivePlusIcon } from '../../../../../../../assets/svg';
import DashboardButton from '../../../../../../../components/common/dashboard/components/button';
import StepHeader from '../components/stepHeader';
import './index.scss';
import fetch from '../../../../../../../auth/AuthInterceptor';
import Loading from '../../../../../../../components/common/dashboard/shared-components/Loading';
import { useNavigate } from 'react-router-dom';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
import { normalizeDataToFields } from '../../../../../../dashboard/myProfile/components/personalInformation/Helpers';
const { TextArea } = Input;
const IntendedLearners = () => {
  const [fields, setFields] = useState([]);

  const [requirement, setRequirement] = useState('');
  const [error, setError] = useState(false);
  const [postLoading, setPostLoading] = useState(false);
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const pipeline = useSelector(
    (state) => state.courseAddPipline.courseAddPipline,
  );
  const navigate = useNavigate();
  const loading = useSelector((state) => state.courseAddPipline.loading);
  console.log(pipeline?.plan?.goals, 'pipeline');
  const onsubmit = () => {
    form.submit();
  };
  const onSuccess = (data) => {
    console.log(data.data, 'sdcsdcef');
    setRequirement(data?.data?.requirements);

    if (data.data.benefits === null) {
      form.setFieldsValue({
        benefits: [''],
      });
    }
    if (data.data.for_whom === null) {
      form.setFieldsValue({
        for_whom: [''],
      });
    }
    if (data.data.for_whom && data.data.benefits) {
      setFields(normalizeDataToFields(data?.data));
    }
  };

  const onError = (data) => {};

  const { isLoading, data } = useQuery(
    [`get-intended-learners`],
    () => {
      return fetch({
        url: `api/lecture/course/${localStorage.getItem(
          'live-course-id',
        )}/goals`,
        method: 'get',
        headers: {
          'public-request': 'true',
        },
      });
    },
    {
      onSuccess: onSuccess,
      onError: onError,
    },
  );
  const onFinish = (values) => {
    if (requirement == '') {
      setError(true);
    } else {
      console.log(values, 'euwrfhow');
      values.requirements = requirement;
      setPostLoading(true);
      fetch({
        url: `api/lecture/course/${localStorage.getItem(
          'live-course-id',
        )}/goals`,
        method: 'put',
        headers: {
          'public-request': 'true',
        },
        data: values,
      })
        .then(() => {
          setPostLoading(false);
          message.success('add successfully!');
          queryClient.invalidateQueries([`add-course`]);
          navigate('/instructor-dashboard/courses/add/film');
        })
        .catch(() => {
          setPostLoading(false);
          message.error('someting went wrong!');
        });
    }
  };

  return (
    <div className="intended-learners">
      {' '}
      <StepHeader data={{ title: 'Intended Learners', preview: true }} />
      {isLoading || loading ? (
        <Loading />
      ) : (
        <div className="intended-learners_body">
          <p>
            The following descriptions will be publicly visible on your Course
            Landing Page and will have a direct impact on your course
            performance. These descriptions will help learners decide if your
            course is right for them.
          </p>
          <Form onFinish={onFinish} form={form} fields={fields}>
            <h4>What will students learn in your course?</h4>

            <Form.List
              name="benefits"
              rules={[
                {
                  validator: async (_, names) => {
                    if (!names || names.length < 1) {
                      return Promise.reject(new Error('At least 1 option'));
                    }
                  },
                },
              ]}
            >
              {(fields, { add, remove }, { errors }) => (
                <>
                  {fields.map((field, index) => (
                    <Form.Item required={false} key={field.key}>
                      <Form.Item
                        {...field}
                        validateTrigger={['onChange', 'onBlur']}
                        rules={[
                          {
                            required: true,
                            whitespace: true,
                            message:
                              'Please input What will students learn in your course',
                          },
                        ]}
                        noStyle
                      >
                        <Input placeholder="EX: You will be able to start earning money from your Illustrator Skills." />
                      </Form.Item>
                      {fields.length > 1 ? (
                        <MinusCircleOutlined
                          className="dynamic-delete-button"
                          onClick={() => remove(field.name)}
                        />
                      ) : null}
                    </Form.Item>
                  ))}
                  <Form.Item>
                    <Row>
                      <Col>
                        <Button
                          type="link"
                          className="add-input"
                          onClick={() => add()}
                        >
                          <ActivePlusIcon />
                          Add More to your Section
                        </Button>
                      </Col>
                    </Row>

                    <Form.ErrorList errors={errors} />
                  </Form.Item>
                </>
              )}
            </Form.List>
            <h4>
              What are the requirements or prerequisites for taking your course?
            </h4>
            <TextArea
              placeholder="EX: This course is designed to be an introduction to the topic and no prior knowledge nor experience is required. Nevertheless, an understanding of the basic principles that govern business organizations will let you grasp the concepts I present here quicker."
              value={requirement || ''}
              onChange={(e) => setRequirement(e.target.value)}
              autoSize={{
                minRows: 2.88,
                maxRows: 5,
              }}
            />
            {error && (
              <div className="intended-rule">please add a requirement!</div>
            )}

            <h4>Who is this course for?</h4>

            <Form.List
              name="for_whom"
              rules={[
                {
                  validator: async (_, names) => {
                    if (!names || names.length < 1) {
                      return Promise.reject(new Error('At least 1 option'));
                    }
                  },
                },
              ]}
            >
              {(fields, { add, remove }, { errors }) => (
                <>
                  {fields.map((field, index) => (
                    <Form.Item required={false} key={field.key}>
                      <Form.Item
                        {...field}
                        validateTrigger={['onChange', 'onBlur']}
                        rules={[
                          {
                            required: true,
                            whitespace: true,
                            message: 'Please input who is this course for',
                          },
                        ]}
                        noStyle
                      >
                        <Input placeholder="EX: Beginner UI/UX designer with adobe xd" />
                      </Form.Item>
                      {fields.length > 1 ? (
                        <MinusCircleOutlined
                          className="dynamic-delete-button"
                          onClick={() => remove(field.name)}
                        />
                      ) : null}
                    </Form.Item>
                  ))}
                  <Form.Item>
                    <Row>
                      <Col>
                        <Button
                          type="link"
                          className="add-input"
                          onClick={() => add()}
                        >
                          <ActivePlusIcon />
                          Add More to your Section
                        </Button>
                      </Col>
                    </Row>

                    <Form.ErrorList errors={errors} />
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Form>
          <div className="action-container">
            {' '}
            <DashboardButton
              text="Next Step"
              onclick={onsubmit}
              type="link"
              loading={postLoading}
              cssStyle={{ height: '41px', width: '120px' }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default IntendedLearners;
