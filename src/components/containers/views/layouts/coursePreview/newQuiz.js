import React, { useState, useEffect } from 'react';
import { Col, Row, Radio, Space, Button, Skeleton, Steps } from 'antd';
import { useDispatch } from 'react-redux';
import swal from 'sweetalert';
import { CorrectIcon, WrongIcon } from '../../../../../assets/svg';
import useApi from 'network/useApi';
import { useParams } from 'react-router-dom';

export default function Quiz({ quizId }) {
  let { course_slug } = useParams();
  const { Step } = Steps;
  const [value, setValue] = useState(null);
  const [finishQuiz, setFinishQuiz] = useState(false);
  const [question, setQuestion] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [questionsLoading, setuestionsLoading] = useState(false);
  const [hadAnswerdColor, setHadAnswerdColor] = useState(0);
  const [attemptAnswers, setAttemptAnswers] = useState([]);
  const [checkResult, setCheckResult] = useState([]);
  const [current, setCurrent] = useState(0);
  const [quesCount, setQuesCount] = useState(0);
  const total = attemptAnswers.length;
  const rightCount = attemptAnswers.filter((item) => item.is_correct).length;
  const wrongCount = total - rightCount;
  const api = useApi();

  const next = (questionId) => {
    if (finishQuiz) {
      setCurrent(current + 1);
    } else {
      setLoading(true);

      setAnswers((s) => [...s, { myAnswer: value, quesId: questionId }]);

      api
        .post(
          `courses/${course_slug}/quizes/${quizId}/questions/${questionId}?answer=${value}`,
        )
        .then((res) => {
          setHadAnswerdColor(questionId);
          setCurrent(current + 1);
          setLoading(false);
          setQuesCount(quesCount + 1);
        })

        .catch((err) => {
          swal('Oops!', err.response.data.msg, 'warning');
        });
    }
  };
  const prev = () => {
    setCurrent(current - 1);
    setQuesCount(quesCount - 1);
  };

  const finish = (questionId) => {
    if (finishQuiz) {
    } else {
      setLoading(true);
      setAnswers((s) => [...s, { myAnswer: value, quesId: questionId }]);

      api
        .post(
          `courses/${course_slug}/quizes/${quizId}/questions/${questionId}?answer=${value}`,
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
                    setAttemptAnswers(res?.attempt_answers);
                    // setCorrectAnswers(res.data.attempt_answers);
                    setCheckResult(res?.choosed_options);
                  });

                setFinishQuiz(true);

                const passing_score = res.data.quiz.passing_score;
                const earned_score = res.data.quiz.attempt_info.earned_score;
                const total_score = res.data.quiz.attempt_info.total_score;

                const compareScore = (earned_score / total_score) * 100;
                console.log(passing_score, 'passing_score');
                console.log(earned_score, 'earned_score');
                console.log(total_score, 'total_score');
                console.log(compareScore, 'compareScore');

                compareScore >= passing_score
                  ? swal(
                      'congratulations',
                      `You have passed ${res.data.quiz.attempt_info.earned_percent}% of the quiz`,
                      'success',
                    )
                  : swal(
                      'Sorry',
                      `You get only ${res.data.quiz.attempt_info.earned_percent}% of the quiz you should get ${passing_score}% to passed it`,
                      'warning',
                    );
                setLoading(false);
              });
            });
        });
    }
  };

  const onChange = (e) => {
    e.preventDefault();

    setValue(e.target.value);
  };

  useEffect(() => {
    setuestionsLoading(true);
    api.post(`courses/${course_slug}/quizes/${quizId}/start`);

    const fetchQuestons = async () => {
      const response = await api

        .get(`courses/${course_slug}/quizes/${quizId}/questions`)
        .then((res) => {
          setuestionsLoading(false);
          setQuestion(res.data.questions);
        })
        .catch((err) => swal('Oops!', err.response.data.msg, 'warning'));
    };
    fetchQuestons();
  }, []);

  return (
    <>
      {questionsLoading ? (
        <>
          <Skeleton active style={{ padding: '0 1.5rem' }} />
          {/* <Skeleton active style={{ padding: '0 1.5rem' }} />
          <Skeleton active style={{ padding: '0 1.5rem' }} /> */}
        </>
      ) : (
        <>
          <div className="quize-container">
            <div className="question-container"></div>
            <Steps current={current}>
              {question?.map((item, index) => (
                <Step key={index} />
              ))}
            </Steps>

            <Row gutter={[16, 16]}>
              <Col span={16}>
                <div className="steps-content">
                  {
                    <div className="single-question">
                      <div className="question-flex">
                        <div className="question-numper">
                          <span className="question-numper-span">
                            {question[current]?.sort_order}
                          </span>{' '}
                        </div>
                        <div
                          className="question-title"
                          dangerouslySetInnerHTML={{
                            __html: question[current]?.title,
                          }}
                        ></div>
                      </div>

                      {finishQuiz ? (
                        <Radio.Group
                          onChange={onChange}
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
                          onChange={onChange}
                          value={value}
                          defaultChecked={true}
                        >
                          <Space direction="vertical">
                            {question[current]?.answers?.map(
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
                            {current < question?.length - 1 && (
                              <Button
                                loading={loading}
                                type="primary"
                                className="next-btn"
                                onClick={() => next(question[current].id)}
                              >
                                Next
                              </Button>
                            )}
                            {current === question?.length - 1 && (
                              <Button
                                className="next-btn"
                                loading={loading}
                                type="primary"
                                disabled={finishQuiz}
                                onClick={() => finish(question[current].id)}
                              >
                                Finish
                              </Button>
                            )}
                          </div>
                        </Col>
                      </Row>
                    </div>
                  }
                </div>
              </Col>
              <Col span={1}>
                <div className="answers-divider"> </div>
              </Col>
              <Col span={7} className="answers-container">
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
                          {question.length - quesCount}
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
                        {question.map((item, index) => {
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
            </Row>
          </div>
        </>
      )}
    </>
  );
}
