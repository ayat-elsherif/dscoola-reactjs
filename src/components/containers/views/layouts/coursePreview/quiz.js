import React, { useState, useEffect } from 'react';
import { Radio, Button, Skeleton, message } from 'antd';
import { backArrow, passMark } from '../../../../../helpers/cards/SVGs';
import { useDispatch, useSelector } from 'react-redux';
import { quiz } from '../../../../../features/quizes/quiz';

import MainButton from '../../../../../helpers/Buttons/MainButton';
import { authAxios, protectAxios } from '../../../../../apis/coursesAPI';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { CorrectIcon, WrongIcon } from '../../../../../assets/svg';
import useApi from 'network/useApi';
import { useParams } from 'react-router-dom';

export default function Quiz({ activesection, quizId }) {
  let { course_slug } = useParams();
  const dispatch = useDispatch();
  const [questionsAnswer, setQuestioAsnwer] = useState(null);
  const [finishQuiz, setFinishQuiz] = useState(false);
  const [questionList, setQuestionList] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [questionsLoading, setuestionsLoading] = useState(false);
  const [hadAnswerdColor, setHadAnswerdColor] = useState(0);
  const [attemptAnswers, setAttemptAnswers] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [checkResult, setCheckResult] = useState([]);
  const [current, setCurrent] = useState(0);
  const [quesCount, setQuesCount] = useState(0);
  const api = useApi();
  const total = attemptAnswers.length;
  const rightCount = attemptAnswers.filter((item) => item.is_correct).length;
  const wrongCount = total - rightCount;

  const next = (questionId) => {
    if (finishQuiz) {
      setCurrent(current + 1);
    } else {
      setLoading(true);
      setAnswers((s) => [
        ...s,
        { myAnswer: questionsAnswer, quesId: questionId },
      ]);
      api
        .post(
          `courses/${course_slug}/quizes/${quizId}/questions/${questionId}?answer=${questionsAnswer}`,
        )
        .then((res) => {
          setHadAnswerdColor(questionId);
          setCurrent(current + 1);
          setLoading(false);
          setQuesCount(quesCount + 1);
        })

        .catch((err) => {
          message.error('Oops!', err.response.data.msg, 'warning');
        });
    }
  };
  const prev = () => {
    setCurrent(current - 1);
  };

  const finish = (questionId) => {
    if (finishQuiz) {
    } else {
      setLoading(true);
      setAnswers((s) => [
        ...s,
        { myAnswer: questionsAnswer, quesId: questionId },
      ]);

      api
        .post(
          `courses/${course_slug}/quizes/${quizId}/questions/${questionId}?answer=${questionsAnswer}`,
        )
        .then(() => {
          setQuesCount(quesCount + 1);
          setHadAnswerdColor(questionId);
          api
            .post(`courses/${course_slug}/quizes/${quizId}/finish`)
            .then(() => {
              api.get(`courses/${course_slug}/quizes/${quizId}`).then((res) => {
                //  setCurrent(current + 1);
                api
                  .get(
                    `courses/${course_slug}/quizes/${quizId}/questions/answers`,
                  )
                  .then((res) => {
                    setAttemptAnswers(res.data.attempt_answers);
                    setCorrectAnswers(res.data.attempt_answers);
                    setCheckResult(res.data.choosed_options);
                  });

                setFinishQuiz(true);

                const passing_score = res.data.data.passing_score;
                const earned_score = res.data.data.attempt_info.earned_score;
                const total_score = res.data.data.attempt_info.total_score;

                const compareScore = (passing_score / total_score) * 100;

                earned_score >= passing_score
                  ? message.success(
                      'congratulations',
                      `You have passed${res.data.data.attempt_info.earned_percent} % of the quiz`,
                      'success',
                    )
                  : message.error(
                      'Sorry',

                      `You get only ${res.data.data.attempt_info.earned_percent}% of the quiz you should get ${compareScore}% to passed it`,

                      'warning',
                    );
                setLoading(false);
              });
            });
        });
    }
  };

  const handleAnswerChange = (e, id) => {
    const answers = { ...questionsAnswer } || {};
    answers[id] = e.target.value;
    setQuestioAsnwer(answers);
  };

  const handleGetTitle = (title) => {
    const doc = new DOMParser().parseFromString(title, 'text/xml');
    return doc.firstChild.innerHTML;
  };

  const fetchQuestons = async () => {
    api
      .get(`courses/${course_slug}/quizes/${quizId}/questions`)
      .then((res) => {
        console.log({ res });
        setuestionsLoading(false);
        setQuestionList(res?.data?.questions);
      })
      .catch((err) => message.error('Oops!', err.response.data.msg, 'warning'));
  };

  useEffect(() => {
    setuestionsLoading(true);
    api.post(`courses/${course_slug}/quizes/${quizId}/start`);

    fetchQuestons();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {questionsLoading ? (
        <>
          <Skeleton active style={{ padding: '0 1.5rem' }} />
          <Skeleton active style={{ padding: '0 1.5rem' }} />
          <Skeleton active style={{ padding: '0 1.5rem' }} />
        </>
      ) : (
        <>
          <div className="question-container">
            {questionList?.map((question, idx) => (
              <div className="question-wrapper">
                <p className="question-wrapper-title">
                  Question {idx + 1} : {handleGetTitle(question?.title)}
                </p>
                <div className="question-answer-wrapper">
                  {question?.answers?.map((ans) => (
                    <Radio
                      value={ans?.id}
                      onChange={(e) => handleAnswerChange(e, question?.id)}
                      disabled={finishQuiz}
                      checked={questionsAnswer?.[question?.id] === ans?.id}
                    >
                      {ans.title}
                    </Radio>
                  ))}
                </div>
              </div>
            ))}
            <div className="question-submit-wrapper">
              <Button type="primary">Submit </Button>
            </div>
          </div>
          {/* 
            <Row>
              <Col>
                <div className="steps-content">
                  {
                    <div className="single-question">
                      <div className="question-flex">
                         {attemptAnswers[current].is_correct?}  

                        <div className="question-numper">
                          <span className="question-numper-span">
                            {questionList?.[current]?.sort_order}
                          </span>{' '}
                        </div>
                        <div className="question-title">
                          {questionList?.[current]?.title}
                        </div>
                      </div>

                      {finishQuiz ? (
                        <Radio.Group
                          onChange={handleAnswerChange}
                          value={answers[current]?.myAnswer}
                        >
                          <Space direction="vertical">
                            {checkResult[current]?.options?.map(
                              (choise, index) => {
                                if (
                                  choise.is_correct == 0 &&
                                  choise.is_choosed == 1
                                ) {
                                  return (
                                    <div className="choies-container-wrong">
                                      <WrongIcon />
                                      <Radio
                                        disabled={finishQuiz}
                                        value={choise.id}
                                        checked
                                      >
                                        {choise.title}
                                      </Radio>{' '}
                                    </div>
                                  );
                                } else if (choise.is_correct == 1) {
                                  return (
                                    <div className="choies-container-correct">
                                      <CorrectIcon />
                                      <Radio
                                        disabled={finishQuiz}
                                        value={choise.id}
                                        checked
                                      >
                                        {choise.title}
                                      </Radio>{' '}
                                    </div>
                                  );
                                } else {
                                  return (
                                    <div className="choies-container">
                                      <Radio
                                        disabled={finishQuiz}
                                        value={choise.id}
                                      >
                                        {choise.title}
                                      </Radio>
                                    </div>
                                  );
                                }
                              },
                            )}
                          </Space>
                        </Radio.Group>
                      ) : (
                        <Radio.Group
                          onChange={handleAnswerChange}
                          value={questionsAnswer}
                          defaultChecked={true}
                        >
                          <Space direction="vertical">
                            {questionList?.[current]?.answers?.map(
                              (choise, index) => {
                                return (
                                  <div className="choies-container">
                                    <Radio
                                      defaultChecked={true}
                                      disabled={finishQuiz}
                                      value={choise.id}
                                    >
                                      {choise.title}
                                    </Radio>
                                  </div>
                                );
                              },
                            )}
                          </Space>
                        </Radio.Group>
                      )}

                      <Row className="actions-btn" justify="space-between">
                        <Col span={22}>
                          {current > 0 && (
                            <Button
                              type="primary"
                              className="prev-btn"
                              onClick={() => prev()}
                            >
                              Previous
                            </Button>
                          )}
                        </Col>
                        <Col span={2}>
                          {' '}
                          <div className="steps-action">
                            {current < questionList?.length - 1 && (
                              <Button
                                loading={loading}
                                type="primary"
                                className="next-btn"
                                onClick={() => next(questionList?.[current].id)}
                              >
                                Next
                              </Button>
                            )}
                            {current === questionList?.length - 1 && (
                              <Button
                                className="next-btn"
                                type="primary"
                                onClick={() =>
                                  finish(questionList?.[current].id)
                                }
                              >
                                Next
                              </Button>
                            )}
                          </div>
                        </Col>
                      </Row>
                    </div>
                  }
                </div>
              </Col>
              <Col>
                <div className="answers-divider"></div>
              </Col>
              <Col className="answers-container">
                <div className="answers-Legend">Legend</div>
                {finishQuiz ? (
                  <>
                    <div className="answers-count">
                      <div className="not-correct">
                        <span className="not-answered-span">{wrongCount}</span>
                      </div>
                      <div className="ans-span">not corrcet</div>
                    </div>
                    <div className="answers-count">
                      <div className="correct">
                        <span className="answered-span">{rightCount}</span>
                      </div>
                      <div className="ans-span">Corrcet</div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="answers-count">
                      <div className="not-answered">
                        <span className="not-answered-span">
                          {questionList?.length - quesCount}
                        </span>
                      </div>
                      <div className="ans-span">Not answered</div>
                    </div>
                    <div className="answers-count">
                      <div className="answered">
                        <span className="answered-span">{quesCount}</span>
                      </div>
                      <div className="ans-span">Answered</div>
                    </div>
                  </>
                )}

                <div className="answers-Legend">Questions</div>
                <div className="ques-numbers">
                  <div className="ques-margin">
                    {finishQuiz ? (
                      <>
                        {attemptAnswers.map((item, index) => {
                          return (
                            <>
                              {item.is_correct ? (
                                <div
                                  onClick={() => setCurrent(index)}
                                  key={index}
                                  className="answers-count-cyrcle-correct"
                                >
                                  <span className="answers-count-cyrcle-child">
                                    {index + 1}
                                  </span>
                                </div>
                              ) : (
                                <div
                                  onClick={() => setCurrent(index)}
                                  key={index}
                                  className="answers-count-cyrcle-not-correct"
                                >
                                  <span className="answers-count-cyrcle-child">
                                    {index + 1}
                                  </span>
                                </div>
                              )}
                            </>
                          );
                        })}
                      </>
                    ) : (
                      <>
                        {questionList?.map((item, index) => {
                          return (
                            <>
                              {hadAnswerdColor >= item.id ? (
                                <div
                                  key={index}
                                  className="answers-count-cyrcle"
                                >
                                  <span className="answers-count-cyrcle-child">
                                    {index + 1}
                                  </span>
                                </div>
                              ) : (
                                <div
                                  key={index}
                                  className="answers-count-cyrcle-not-answerd"
                                >
                                  <span className="answers-count-cyrcle-child">
                                    {index + 1}
                                  </span>
                                </div>
                              )}
                            </>
                          );
                        })}
                      </>
                    )}
                  </div>
                </div>
              </Col>
            </Row> */}
        </>
      )}
    </>
  );
}
