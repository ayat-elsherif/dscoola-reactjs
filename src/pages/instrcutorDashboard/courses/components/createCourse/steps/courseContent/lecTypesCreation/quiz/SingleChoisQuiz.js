import { MinusCircleOutlined } from '@ant-design/icons';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Col, Form, Input, message, Radio, Row } from 'antd';
import { AddIconForCourseContent } from 'assets/svg';
import DashboardButton from 'components/common/dashboard/components/button';
import {
  fetchaddDesc,
  fetchlecTypeToggel,
  fetchopenAddQuizTypesForm,
} from 'features/courseContent/courseContentSlice';
import useApi from 'network/useApi';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import './singleChoisQuiz.scss';
import OwnTextEditor from 'components/own/OwnTextEditor/OwnTextEditor';
import Loading from 'components/common/dashboard/shared-components/Loading';

const SingleChoisQuiz = ({ lectuer, openEditQues }) => {
  const [questionTitle, setQuestionTitle] = useState('');
  const [value, setValue] = useState(null);
  const api = useApi();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const onChange = (e) => {
    setValue(e.target.value);
  };
  const onFinish = (values) => {
    if (!(value + 1)) {
      message.error('Please Select Correct Answer!');
      return;
    }
    if (!questionTitle) {
      message.error('Please Enter Question Title!');
      return;
    }
    setLoading(true);
    values.question_title = questionTitle;
    values.question_type = 'radio';
    values.options.map((i) => (i.is_correct = 0));
    values.options[value].is_correct = value != null ? 1 : 0;

    if (openEditQues) {
      values.question_id = openEditQues;
    }

    openEditQues
      ? api
          .put(`questions/update-question`, values)
          .then(() => {
            setLoading(false);
            message.success('add successfully!');
            queryClient.invalidateQueries([`get-course-content`]);
            dispatch(fetchaddDesc('close'));
            dispatch(fetchopenAddQuizTypesForm('close'));
            dispatch(fetchlecTypeToggel('close'));
          })
          .catch(() => {
            setLoading(false);
          })
      : api
          .post(`quizes/${lectuer.id}/create-question`, values)
          .then(() => {
            setLoading(false);
            message.success('add successfully!');
            queryClient.invalidateQueries([`get-course-content`]);
            dispatch(fetchaddDesc('close'));
            dispatch(fetchopenAddQuizTypesForm('close'));
            dispatch(fetchlecTypeToggel('close'));
          })
          .catch(() => {
            setLoading(false);
          });
  };
  useEffect(() => {
    form.setFieldsValue({
      options: [''],
    });
  }, []);

  const onGetQuesSuccess = (data) => {
    console.log(data.data, 'a;odjpwiqjf');
    setQuestionTitle(data?.data?.question?.title);
    form.setFieldsValue({
      options: data?.data?.question?.options,
      score: data?.data?.question?.score,
    });
  };
  const { data: questionData, isLoading } = useQuery(
    [`get-question-info`, openEditQues],
    () => {
      return api.get(`questions/${openEditQues}`);
    },
    { onSuccess: onGetQuesSuccess, enabled: !!openEditQues },
  );

  return (
    <>
      {openEditQues && isLoading ? (
        <Loading />
      ) : (
        <div className="add-file-container quiz-ques-container">
          <h4>Questions</h4>

          <OwnTextEditor
            textEdit={questionTitle}
            setTextEdit={setQuestionTitle}
            placeholder="Please Enter Your Description here"
            isRecordable={false}
          />
          <div className="answers-title">Answers</div>
          <Form.Item
            rules={[
              {
                required: true,
                message: 'Please Select Correct Answer',
              },
            ]}
          >
            <Radio.Group onChange={onChange} value={value}>
              <Form onFinish={onFinish} form={form}>
                <Form.List
                  name="options"
                  rules={[
                    {
                      validator: async (_, names) => {
                        if (!names || names.length < 2) {
                          return Promise.reject(
                            new Error('At least 2 answers'),
                          );
                        }
                      },
                    },
                  ]}
                >
                  {(fields, { add, remove }, { errors }) => (
                    <>
                      {fields.map(({ key, name, ...restField }) => (
                        <>
                          <Radio value={key}>
                            <Row>
                              <Col span={22}>
                                <Row gutter={[8, 16]}>
                                  <Col span={24}>
                                    <Form.Item
                                      className="answer-option"
                                      {...restField}
                                      name={[name, 'title']}
                                      rules={[
                                        {
                                          required: true,
                                          message: 'Please Enter Answer',
                                        },
                                      ]}
                                    >
                                      <Input placeholder="Add your answer" />
                                    </Form.Item>
                                  </Col>
                                  <Col span={24}>
                                    <Form.Item
                                      {...restField}
                                      name={[name, 'explain']}
                                      className="explain answer-option"
                                      rules={[
                                        {
                                          required: true,
                                          message: 'Please Enter Explain',
                                        },
                                      ]}
                                    >
                                      <Input placeholder="Explain why this is or isn`t the best answer" />
                                    </Form.Item>
                                  </Col>
                                </Row>
                              </Col>
                              <Col span={2} className="delete-btn">
                                {' '}
                                {fields.length > 2 ? (
                                  <MinusCircleOutlined
                                    className="dynamic-delete-button"
                                    onClick={() => remove(name)}
                                  />
                                ) : null}
                              </Col>
                            </Row>
                          </Radio>
                        </>
                      ))}
                      <Row>
                        <Col>
                          <Form.Item>
                            {fields.length < 4 ? (
                              <Button
                                type="link"
                                className="add-input"
                                onClick={() => add()}
                              >
                                <AddIconForCourseContent />
                                Add Another Answer
                              </Button>
                            ) : null}
                            <Form.ErrorList errors={errors} />
                          </Form.Item>
                        </Col>
                      </Row>
                    </>
                  )}
                </Form.List>
                <h4>Score</h4>
                <Form.Item
                  name="score"
                  rules={[
                    {
                      required: true,
                      message: 'Please Enter Score',
                    },
                  ]}
                >
                  <Input placeholder="Input Question Score" />
                </Form.Item>
                <Row justify="end" className="pt-5">
                  <Col>
                    {' '}
                    <Button
                      className="cancel-btn"
                      type="link"
                      onClick={() => {
                        dispatch(fetchopenAddQuizTypesForm('close'));
                        dispatch(fetchlecTypeToggel('close'));

                        dispatch(fetchaddDesc('close'));
                      }}
                    >
                      Cancel
                    </Button>
                  </Col>
                  <Col>
                    <Form.Item>
                      <DashboardButton
                        text=" Save"
                        htmlType="submit"
                        type="link"
                        loading={loading}
                        cssStyle={{
                          width: '100px',
                        }}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </Radio.Group>
          </Form.Item>
        </div>
      )}
    </>
  );
};

export default SingleChoisQuiz;
