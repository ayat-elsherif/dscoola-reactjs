import React from 'react';
import { Progress } from 'antd';

import './index.scss';
import { useNavigate } from 'react-router-dom';

const CourseCard = ({ data }) => {
  const navigate = useNavigate();
  const goToCourse = () => {
    navigate(`/course-view/${data.id}`);
  };
  return (
    <div className="course-card" onClick={goToCourse}>
      <div className="course-photo">
        <img src={data?.image} alt="coursePhoto" />
      </div>
      <div className="course-details">
        <h4> {data?.title}</h4>
        <div className="total-lessons">
          Total Lessons : {data?.total_lessons}
        </div>
        <Progress percent={data?.progress_percent} showInfo={false} />
        <div className="completed">
          You completed {data?.progress_percent} %
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
