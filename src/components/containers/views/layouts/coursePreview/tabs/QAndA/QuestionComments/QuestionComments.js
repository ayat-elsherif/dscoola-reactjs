import { css } from '@emotion/css';
import { Button, Col, Row } from 'antd';
import { ArrowDownIcon } from 'assets/svg';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import useCommentList from 'api-hooks/comment/useCommentList';
import { crtArray, getProfileUrl } from 'utils';
import QuestionItem from '../QuestionItem/QuestionItem';
import UserAvatar from 'components/tiny/UserAvatar';
import CommentItem from 'components/tiny/CommentItem';
import ReplyItem from 'components/tiny/ReplyItem';

function QuestionComments({ question }) {
  // console.log('QuestionComments  question', question);
  const QuestionCommentsStyles = css`
    padding: 2rem 0;
    .avatar {
      img {
        width: 2rem;
        margin: auto;
      }
    }
    .question-wrapper {
      padding: 2rem 0 1rem;
      .content-wrapper {
        display: flex;
        flex-direction: column;
        gap: 0.7rem;
        .header {
          margin-bottom: 0.5rem;
          .title {
            font-weight: 500;
            font-size: 1.5rem;
            line-height: 1.9rem;
            color: #2a2a2a;
            max-inline-size: 45ch;
          }
          .label {
            font-size: 1.3rem;
            line-height: 1.9rem;
            color: #2a2a2a;
            a {
              font-size: 1.5rem;
              line-height: 1.9rem;
              text-transform: capitalize;
            }
          }
        }
        .desc {
          font-size: 1.5rem;
          line-height: 2.5rem;
          color: #6a6f73;
          max-inline-size: 45ch;
        }
      }
    }

    .reply-list-wrapper {
      padding: 2rem 0;
      border-top: 1px solid #e0e0f5;

      .btn-show-more {
        padding: 0;
        display: flex;
        flex-direction: row-reverse;

        gap: 1rem;
        font-size: 1.4rem;
        svg {
          width: 0.9rem;
          path {
            fill: #7e59d1;
          }
        }
      }
    }
  `;

  const { commentList, commentListLod } = useCommentList();
  // console.log('QuestionComments  commentList', commentList);

  const [replyCount, setReplyCount] = useState(3);
  const [showMoreLod, setShowMoreLod] = useState(false);

  const onShowMore = () => {
    setShowMoreLod(true);
    setTimeout(() => {
      setReplyCount((prev) => prev + 3);
      setShowMoreLod(false);
    }, 400);
  };

  return (
    <div className={QuestionCommentsStyles}>
      <div className="comment-wrapper">
        <Row gutter={10} wrap={false}>
          <Col>
            <UserAvatar img={question?.creator_photo_url} />
          </Col>
          <Col flex="auto">
            <div className="content-wrapper">
              <div className="header">
                <div className="title">{question?.title}</div>
                <div className="label">
                  <div className="header">
                    <Link
                      tto={getProfileUrl(
                        question?.creator_role_id,
                        question?.user_id,
                      )}
                    >
                      {question?.creator_name}
                    </Link>{' '}
                    . <span>{dayjs(question?.created_at).fromNow()}</span>
                  </div>
                </div>
              </div>
              {!!question?.description && (
                <div
                  className="desc"
                  dangerouslySetInnerHTML={{
                    __html: question?.description,
                  }}
                />
              )}
              {!!question?.voice_url && (
                <audio src={question?.voice_url} controls />
              )}
            </div>
          </Col>
        </Row>
      </div>

      <ReplyItem />

      {commentListLod ? (
        <div className="reply-list-wrapper">
          <Row>
            {crtArray(3)?.map((_, i) => (
              <Col key={i} span={24}>
                <QuestionItem loading borderLess={i === 0} />
              </Col>
            ))}
          </Row>
        </div>
      ) : (
        <div className="reply-list-wrapper">
          <Row>
            {commentList?.slice(0, replyCount)?.map((el) => (
              <Col key={el?.id} span={24}>
                <CommentItem comment={el} />
              </Col>
            ))}
          </Row>
          {commentList?.length > replyCount && (
            <Button
              type="link"
              icon={<ArrowDownIcon />}
              loading={showMoreLod}
              className="btn-show-more"
              onClick={onShowMore}
            >
              Show more
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

export default QuestionComments;
