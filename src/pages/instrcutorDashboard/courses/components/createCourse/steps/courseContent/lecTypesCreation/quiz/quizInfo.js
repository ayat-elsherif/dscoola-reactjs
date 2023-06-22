import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Col, message, Modal, Row, Skeleton, Spin } from 'antd';
import { DeleteIcon, EditIcon } from 'assets/svg';
import Loading from 'components/common/dashboard/shared-components/Loading';
import {
  fetchlecTypesBtnText,
  fetchlecTypeToggel,
  fetchopenAddQuizTypesForm,
} from 'features/courseContent/courseContentSlice';
import useApi from 'network/useApi';
import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import QuestionSettings from './questionSettings';
import SingleChoisQuiz from './SingleChoisQuiz';
import { LoadingOutlined } from '@ant-design/icons';

const QuizInfo = ({ lectuer, arrIndex, lecIndex, sectionId }) => {
  const [open, setOpen] = useState(false);
  const [openEditQues, setOpenEditQues] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const api = useApi();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const courseId = localStorage.getItem('live-course-id');
  const lecType = useSelector((state) => state.courseContent.lecTypeToggel);
  const onSuccess = () => {};
  const onError = () => {};
  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 20,
      }}
      spin
    />
  );
  const { data, isLoading } = useQuery(
    [`get-quiz-info`],
    () => {
      return api.get(`courses/${courseId}/quizes/${lectuer.id}/questions`);
    },
    {
      onSuccess,
      onError,
    },
  );
  const deleteQues = (ques) => {
    setDeleteLoading(true);
    api
      .delete(`questions/delete-question`, { data: { question_id: ques.id } })
      .then(() => {
        queryClient.invalidateQueries([`get-quiz-info`]);
        message.success('Deleted Successsfully');
        setDeleteLoading(false);
      })
      .catch(() => {
        message.error('SomeTing Went Wrong!');
        setDeleteLoading(false);
      });
  };
  return (
    <>
      {lecType == `[${arrIndex}][${lecIndex}]quiz-single-choise` ? (
        <>
          <SingleChoisQuiz
            arrIndex={arrIndex}
            lecIndex={lecIndex}
            lectuer={lectuer}
            sectionId={sectionId}
          />
        </>
      ) : (
        <>
          <Row className="lec-info-containrt">
            <Row
              gutter={[16]}
              justify="end"
              className="quiz-info-containrt-btn"
            >
              <Col>
                <button
                  onClick={() => {
                    dispatch(fetchlecTypesBtnText('Select Questions type'));
                    dispatch(
                      fetchlecTypeToggel(
                        `[${arrIndex}][${lecIndex}]quiz-single-choise`,
                      ),
                    );
                  }}
                  className="add-lec-btn"
                >
                  New Question
                </button>
              </Col>
              <Col>
                <button
                  onClick={() => {
                    setOpen(true);
                  }}
                  className="add-lec-btn"
                >
                  Settings
                </button>
              </Col>
            </Row>
            <Row
              // justify="space-between"
              style={{ width: '100%' }}
              gutter={[16, 16]}
            >
              <Col className="question-title-list-header" span={24}>
                Questions
              </Col>
              {isLoading ? (
                <Col span={24}>
                  <Skeleton active />
                </Col>
              ) : (
                <>
                  {' '}
                  {data?.data?.questions?.map((item, index) => {
                    return (
                      <Col span={24}>
                        <Row justify="space-between">
                          {' '}
                          <Col key={index} className="question-title-list">
                            {
                              <p
                                dangerouslySetInnerHTML={{
                                  __html: `${index + 1}.${item.title}`,
                                }}
                              />
                            }
                          </Col>
                          <Col>
                            {' '}
                            <EditIcon
                              className="delete-res"
                              style={{ marginRight: '20px' }}
                              onClick={() => setOpenEditQues(item.id)}
                            />
                            {deleteLoading ? (
                              <Spin indicator={antIcon} />
                            ) : (
                              <DeleteIcon
                                className="delete-res"
                                onClick={() => deleteQues(item)}
                              />
                            )}
                          </Col>
                        </Row>
                      </Col>
                    );
                  })}
                </>
              )}
            </Row>
          </Row>
        </>
      )}
      <Modal
        title="Question Settings"
        centered
        destroyOnClose
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={600}
        footer={null}
      >
        <QuestionSettings lectuer={lectuer} sectionId={sectionId} />
      </Modal>
      <Modal
        title="Edit Question :"
        centered
        destroyOnClose
        open={openEditQues}
        onOk={() => setOpenEditQues(false)}
        onCancel={() => setOpenEditQues(false)}
        width={600}
        footer={null}
      >
        <SingleChoisQuiz lectuer={lectuer} openEditQues={openEditQues} />
      </Modal>
    </>
  );
};

export default QuizInfo;
