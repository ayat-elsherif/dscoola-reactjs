import { css } from '@emotion/css';
import { Button, Col, Row, Skeleton } from 'antd';
import useQAndADel from 'api-hooks/Q&A/useQAndADel';
import { EditIcon, ReplyIcon, TrashIcon } from 'assets/svg';
import ModalCrsQuestion from 'components/modals/ModalCrsQuestion';
import UserAvatar from 'components/tiny/UserAvatar';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getProfileUrl, limitedText } from 'utils';

function QuestionItem({ question, borderLess, loading }) {
  // console.log('QuestionItem  question', question);
  const QuestionItemStyles = css`
    padding: 2rem 0;
    border-top: ${borderLess ? 'none' : '1px solid #e0e0f5'};

    .content-wrapper {
      display: flex;
      flex-direction: column;
      gap: 0.7rem;
      .header {
        display: flex;
        justify-content: space-between;
        gap: 4rem;
        .title {
          font-weight: 500;
          font-size: 1.5rem;
          line-height: 1.9rem;
          color: #2a2a2a;
          max-inline-size: 45ch;
        }
        .btns-wrapper {
          display: flex;
          align-items: center;
          gap: 1.4rem;

          button {
            min-width: auto;
            min-height: auto;
            height: auto;
            width: auto;
            svg {
              width: 1.4rem;
              height: 1.4rem;
            }
          }
        }
      }
      .desc {
        font-size: 1.5rem;
        line-height: 2.5rem;
        color: #6a6f73;
        max-inline-size: 45ch;
        margin-bottom: 0.5rem;
      }
      .footer {
        .info-wrapper {
          a {
          }
          span {
          }
        }
        .btn-reply {
          min-width: auto;
          min-height: auto;
          height: auto;
          width: auto;
          padding: 0;
          svg {
            width: 1.6rem;
            margin-inline-end: 0.6rem;
          }
          font-size: 1.4rem;
          color: #9b9c9d;
        }
      }
    }
  `;
  const navigate = useNavigate();
  const params = useParams();
  const { currentUser } = useSelector((s) => s?.user);
  const { QAndADel, QAndADelLod } = useQAndADel();
  const [isModalAskQusOpen, setIsModalAskQusOpen] = useState(false);

  const onQAndADel = () => {
    QAndADel({ questionId: question?.id });
  };

  if (loading || QAndADelLod)
    return <QuestionItemLoading borderLess={borderLess} />;
  return (
    <>
      <div className={QuestionItemStyles}>
        <Row gutter={10} wrap={false}>
          <Col>
            <UserAvatar img={question?.creator_photo_url} />
          </Col>
          <Col flex="auto">
            <div className="content-wrapper">
              <div className="header">
                <div className="title">{question?.title}</div>
                {currentUser?.user_id === question?.user_id && (
                  <div className="btns-wrapper">
                    <Button
                      type="link"
                      icon={<EditIcon />}
                      onClick={() => setIsModalAskQusOpen(true)}
                    />
                    <Button
                      type="link"
                      icon={<TrashIcon />}
                      loading={QAndADelLod}
                      onClick={onQAndADel}
                    />
                  </div>
                )}
              </div>

              {!!question?.description && (
                <div
                  className="desc"
                  dangerouslySetInnerHTML={{
                    __html: limitedText(question?.description, 50),
                  }}
                />
              )}
              {!!question?.voice_url && (
                <audio src={question?.voice_url} controls />
              )}

              <div className="footer">
                <Row gutter={30} justify="space-between">
                  <Col>
                    <div className="info-wrapper">
                      <Link
                        to={getProfileUrl(
                          question?.creator_role_id,
                          question?.user_id,
                        )}
                      >
                        {question?.creator_name}
                      </Link>{' '}
                      . <span>{dayjs(question?.created_at).fromNow()}</span>
                    </div>
                  </Col>
                  <Col>
                    <Button
                      type="link"
                      icon={<ReplyIcon />}
                      className="btn-reply"
                      onClick={() =>
                        navigate(
                          `/course/${params?.course_slug}/${params?.course_id}/section/${params?.section_id}/preview/${params?.lecture_id}/Q&A?id=${question?.id}&type=App\\Thread`,
                        )
                      }
                    >
                      {question?.comments_count} reply
                    </Button>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <ModalCrsQuestion
        open={isModalAskQusOpen}
        setOpen={setIsModalAskQusOpen}
        editQues={question}
      />
    </>
  );
}

export default QuestionItem;

export function QuestionItemLoading({ borderLess }) {
  const QuestionItemLoadingStyles = css`
    padding: 2rem 0;
    border-top: ${borderLess ? 'none' : '1px solid #e0e0f5'};
    .content-wrapper {
      .header {
        display: flex;
        justify-content: space-between;
        gap: 4rem;
        margin-bottom: 1.4rem;
        .sk-title {
          max-inline-size: 35ch;
          h3 {
            height: 2.5rem;
          }
        }

        .btns-wrapper {
          display: flex;
          align-items: center;
          gap: 1.4rem;
          .sk-btn {
            span {
              min-width: auto;
              width: 2.5rem;
              height: 2.5rem;
            }
          }
        }
      }

      .sk-text {
        max-inline-size: 60ch;

        .ant-skeleton-paragraph > li + li {
          margin-block-start: 8px;
        }
      }
    }
  `;

  return (
    <div className={QuestionItemLoadingStyles}>
      <Row gutter={10} wrap={false}>
        <Col>
          <Skeleton.Avatar active />
        </Col>
        <Col flex="auto">
          <div className="content-wrapper">
            <div className="header">
              <Skeleton active paragraph={false} className="sk-title" />
              <div className="btns-wrapper">
                <Skeleton.Button className="sk-btn" />
                <Skeleton.Button className="sk-btn" />
              </div>
            </div>

            <Skeleton title={false} className="sk-text" />
          </div>
        </Col>
      </Row>
    </div>
  );
}
