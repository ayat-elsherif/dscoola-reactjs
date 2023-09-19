import React from 'react';
import { Row, Col, Rate, Progress } from 'antd';
import './styles.scss';

export const RatingFeedback = ({ rating, showPercentage }) => {
  if (!rating) return;

  return (
    <div>
      <h1 className="rating-header">Student Feedback</h1>
      <Row className="rating-container">
        <Col lg={7}>
          <div className="rating-summary">
            <h2 className="rating-number">{rating?.rating_avg | 0}</h2>
            <div className="rating-stars">
              <Rate disabled defaultValue={rating?.rating_avg | 0} />
              <p>Course Rating</p>
            </div>
          </div>
        </Col>

        <Col lg={16} xs={24}>
          <div className="rating-stats">
            <Stat
              stars={5}
              percent={rating?.stats?.five_stars?.percent}
              showPercentage={showPercentage}
            />
            <Stat
              stars={4}
              percent={rating?.stats?.four_stars?.percent}
              showPercentage={showPercentage}
            />
            <Stat
              stars={3}
              percent={rating?.stats?.three_stars?.percent}
              showPercentage={showPercentage}
            />
            <Stat
              stars={2}
              percent={rating?.stats?.two_stars?.percent}
              showPercentage={showPercentage}
            />
            <Stat
              stars={1}
              percent={rating?.stats?.one_stars?.percent}
              showPercentage={showPercentage}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

const Stat = ({ stars, percent, showPercentage }) => {
  return (
    <div className="rating-stat">
      <Rate disabled defaultValue={stars} />
      <div className="rating-stat-bar">
        <Progress percent={percent} showInfo={showPercentage} />
      </div>
    </div>
  );
};
