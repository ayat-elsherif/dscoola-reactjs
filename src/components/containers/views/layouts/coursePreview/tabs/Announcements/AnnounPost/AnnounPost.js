import { css } from '@emotion/css';
import { Button, Col, Row, Skeleton } from 'antd';
import useCommentList from 'api-hooks/comment/useCommentList';
import { ArrowDownIcon } from 'assets/svg';
import CommentItem from 'components/tiny/CommentItem';
import ReplyItem from 'components/tiny/ReplyItem';
import UserAvatar from 'components/tiny/UserAvatar';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getProfileUrl, relativeTime } from 'utils';

function AnnounPost({ announ, borderLess, loading }) {
  // console.log('AnnounPost  announ', announ);
  const AnnounPostStyles = css`
    padding: 2rem 0;
    border-top: ${borderLess ? 'none' : '3px solid #e0e0f5'};

    .post-header {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1rem;

      .text-wrapper {
        font-size: 1.4rem;
        line-height: 1.9rem;
        color: #6a6f73;
        a {
          font-weight: 500;
          font-size: 1.6rem;
          line-height: 1.9rem;
          color: #7e59d1;
        }
      }
    }
    .post-body {
      .title {
        font-weight: 500;
        font-size: 1.5rem;
        line-height: 1.9rem;
        color: #2a2a2a;
        max-inline-size: 45ch;
        margin-bottom: 1.5rem;
      }

      .desc {
        font-size: 1.5rem;
        line-height: 2.6rem;
        color: #6a6f73;
        /* max-inline-size: 45ch; */
        margin-bottom: 0.5rem;
      }
    }
    .reply-wrapper {
      padding: 2rem 0;
      .btn-add-reply {
        margin-top: 2rem;
        margin-left: auto;
        font-size: 1.5rem;
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

  const [showAllComments, setShowAllComments] = useState(false);
  const query = `id=${announ?.id}&type=App\\Announcement`;
  const { commentList, commentListRefetch, commentListFetching } =
    useCommentList(showAllComments ? query : null);
  // console.log('AnnounPost  commentList', commentList);

  const onShowMore = () => {
    setShowAllComments(true);
    commentListRefetch();
  };

  if (loading) return <AnnounPostLoading borderLess={borderLess} />;
  return (
    <div className={AnnounPostStyles}>
      <div className="post-header">
        <UserAvatar img={announ?.creator_photo_url} />
        <div className="text-wrapper">
          <Link
            to={getProfileUrl(announ?.creator_role_id, announ?.instructor_id)}
          >
            {announ?.creator_name}
          </Link>
          <div>posted an announcement · {relativeTime(announ?.created_at)}</div>
        </div>
      </div>
      <div className="post-body">
        <div className="title">{announ?.title}</div>
        <div
          className="desc"
          dangerouslySetInnerHTML={{
            __html: announ?.description,
          }}
        />
        {announ?.voice_url && (
          <audio src={announ?.voice_url} controls>
            Your browser does not support the audio element.
          </audio>
        )}
      </div>

      <ReplyItem
        query={{ id: announ?.id, type: 'App\\Announcement' }}
        type="announcement"
      />

      {!!announ?.children?.length && (
        <div className="reply-list-wrapper">
          <Row>
            {(showAllComments ? commentList : announ?.children)?.map((el) => (
              <Col key={el?.id} span={24}>
                <CommentItem comment={el} />
              </Col>
            ))}
          </Row>
          <Button
            type="link"
            icon={<ArrowDownIcon />}
            loading={commentListFetching}
            className="btn-show-more"
            onClick={onShowMore}
          >
            Show more
          </Button>
        </div>
      )}
    </div>
  );
}

export default AnnounPost;

export function AnnounPostLoading({ borderLess }) {
  const AnnounPostLoadingStyles = css`
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
    <div className={AnnounPostLoadingStyles}>
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
