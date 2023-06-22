import { css } from '@emotion/css';
import { Col, Row } from 'antd';
import Rating from 'components/Rating/Rating';
import UserAvatar from 'components/tiny/UserAvatar';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { getProfileUrl } from 'utils';

function ReviewItem({ item }) {
  const ReviewItemStyles = css`
    padding-bottom: 1.5rem;
    margin-bottom: 1.5rem;
    width: 63rem;
    max-width: 100%;
    border-bottom: 1px solid #e0e0f5;

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
          display: inline-block;
          margin-bottom: 0.5rem;
          font-size: 1.5rem;
          line-height: 1.9rem;
          text-transform: capitalize;
          color: #2a2a2a;
        }
        .info {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
      }
      .desc {
        font-size: 1.4rem;
        line-height: 2.4rem;
        color: #6a6f73;
      }
    }
  `;

  return (
    <div className={ReviewItemStyles}>
      <Row gutter={10} wrap={false}>
        <Col>
          <UserAvatar img={item?.creator_photo_url} />
        </Col>
        <Col flex="auto">
          <div className="content-wrapper">
            <div className="header">
              <Link to={getProfileUrl(item?.creator_role_id, item?.creator_id)}>
                {item?.creator_name}
              </Link>{' '}
              <div className="info">
                <Rating defaultValue={item?.rating} disabled />
                <span>{dayjs(item?.created_at).fromNow()}</span>
              </div>
            </div>

            {!!item?.comment && <div className="desc">{item?.comment}</div>}
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default ReviewItem;
