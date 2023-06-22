import { css } from '@emotion/css';
import { Col, Row, Skeleton } from 'antd';
import { Link } from 'react-router-dom';
import { crtArray } from 'utils';
import SectionHeader from '../SectionHeader';

function TopCategories({ data, loading }) {
  const TopCategoriesStyles = css`
    margin: 8rem 0;
    .list-wrapper {
    }
    .list-item {
      width: 27.5rem;
      height: 6.4rem;
      background-color: #efeff6;
      border-radius: 0.6rem;
      padding: 1rem 1rem;

      display: flex;
      align-items: center;
      gap: 1.6rem;

      transition: all ease-in-out 0.3s;
      &:hover {
        transition: all ease-in-out 0.3s;
        background-color: #e0e0f5;
      }

      img {
        width: 4.6rem;
        height: 4.15rem;
        object-fit: contain;
      }
      span {
        font-size: 1.7rem;
        line-height: 2.5rem;
        color: #2a2a2a;
        letter-spacing: 0;
        text-transform: capitalize;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-weight: 500;
      }
    }
  `;

  return (
    <div className={TopCategoriesStyles}>
      <SectionHeader title="Top Categories" />
      <Row gutter={[23, 23]} className="list-wrapper">
        {loading
          ? crtArray(8).map((_, i) => (
              <Col key={i}>
                <Skeleton.Avatar active className="list-item" />
              </Col>
            ))
          : data?.slice(0, 8)?.map((el) => (
              <Col key={el?.id}>
                <Link
                  to={`/categories/${el?.id}/${el?.slug}`}
                  className="list-item"
                >
                  <img src={el?.thumbnail} alt={el?.slug} />{' '}
                  <span>{el?.title}</span>
                </Link>
              </Col>
            ))}
      </Row>
    </div>
  );
}

export default TopCategories;
