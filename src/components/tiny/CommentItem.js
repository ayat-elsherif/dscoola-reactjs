import { css } from '@emotion/css';
import { Col, Row } from 'antd';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import UserAvatar from 'components/tiny/UserAvatar';
import { getProfileUrl } from 'utils';

function CommentItem({ comment }) {
  // console.log('CommentItem  comment', comment);
  const CommentItemStyles = css`
    padding-bottom: 1.5rem;

    .avatar {
      img {
        width: 2rem;
        margin: auto;
      }
    }
    .content-wrapper {
      display: flex;
      flex-direction: column;
      gap: 0.7rem;
      .header {
        font-size: 1.3rem;
        line-height: 1.9rem;
        color: #2a2a2a;
        a {
          font-size: 1.5rem;
          line-height: 1.9rem;
          text-transform: capitalize;
        }
      }
      .desc {
        font-size: 1.4rem;
        line-height: 2.4rem;
        color: #6a6f73;
        max-inline-size: 95%;
      }
    }
  `;

  return (
    <div className={CommentItemStyles}>
      <Row gutter={10} wrap={false}>
        <Col>
          <UserAvatar img={comment?.commenter?.photo_url} />
        </Col>
        <Col flex="auto">
          <div className="content-wrapper">
            <div className="header">
              <Link
                to={getProfileUrl(
                  comment?.commenter?.role_id,
                  comment?.commenter?.id,
                )}
              >
                {comment?.commenter?.name}
              </Link>{' '}
              . <span>{dayjs(comment?.created_at).fromNow()}</span>
            </div>

            {!!comment?.comment && (
              <div
                className="desc"
                dangerouslySetInnerHTML={{
                  __html: comment?.comment,
                }}
              />
            )}
            {!!comment?.voice_url && (
              <audio src={comment?.voice_url} controls />
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default CommentItem;
