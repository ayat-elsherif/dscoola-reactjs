import { css } from '@emotion/css';
import { Col, Progress, Row, Skeleton } from 'antd';
import learnImg from 'assets/images/lets-learn.jpg';
import { Link } from 'react-router-dom';
import { limitedText } from 'utils';

function LetsLearningCard({ data, loading }) {
  // console.log('LetsLearningCard  data:', data);
  const LetsLearningCardStyles = css`
    background-color: #fff;
    box-shadow: 0px 3px 6px #00000029;
    border-radius: 8px;
    overflow: hidden;
    min-height: 152px;
    .image-wrapper {
      display: block;
      height: 100%;
      img {
        max-height: 152px;
        object-fit: contain;
      }
    }

    .text-wrapper {
      padding: 1.4rem 1.6rem;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .title {
        font-weight: 500;
        font-size: 1.6rem;
        line-height: 2.3rem;
        color: #2a2a2a;
        margin-bottom: 1rem;
        transition: all 0.2s;
        &:hover {
          color: #7e59d1;
        }
      }

      .progress-wrapper {
        line-height: 2.3rem;
        color: #2a2a2a;
        .total {
          font-weight: 500;
          font-size: 1.3rem;
        }
        .progress {
          margin: 3px 0;
          width: 100%;
          .ant-progress-inner {
            background-color: #efeff6;
          }
        }
        .complate {
          font-size: 1.2rem;
        }
      }
    }
  `;

  if (loading) return <LetsLearningCardLoding />;
  return (
    <div className={LetsLearningCardStyles}>
      <Row wrap={false} style={{ minHeight: 152 }}>
        <Col span={12}>
          <Link
            // to={`/course/${data?.slug}/${data?.id}/section/${data?.section_id}/preview/${data?.lecture_id}`}
            to={`/course-view/${data?.slug}`}
            className="image-wrapper"
          >
            <img src={data.image || learnImg} alt={data.title} />
          </Link>
        </Col>
        <Col span={12}>
          <div className="text-wrapper">
            <Link
              // to={`/course/${data?.slug}/${data?.id}/section/${data?.section_id}/preview/${data?.lecture_id}`}
              to={`/course-view/${data?.slug}`}
              className="title"
            >
              live session : {limitedText(data.title, 30)}
            </Link>
            <div className="progress-wrapper">
              <div className="total">Total Lessons : {data.total_lessons}</div>
              <Progress
                percent={data?.progress_percent}
                showInfo={false}
                strokeColor="#7E59D1"
                className="progress"
              />
              <div className="complate">
                You completed {data.progress_percent} %
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default LetsLearningCard;

function LetsLearningCardLoding() {
  const LetsLearningCardLodingStyles = css`
    height: 100%;
    .sk-img {
      width: 100%;
      .ant-skeleton-image {
        width: 100%;
        height: 152px;
      }
    }
  `;

  return (
    <div className={LetsLearningCardLodingStyles}>
      <Row gutter={20} align="middle" wrap={false} style={{ minHeight: 152 }}>
        <Col span={12}>
          <div>
            <Skeleton.Image className="sk-img" />
          </div>
        </Col>
        <Col span={12}>
          <Skeleton />
        </Col>
      </Row>
    </div>
  );
}
