import React, { useEffect, useState } from 'react';
import StepHeader from '../components/stepHeader';
import {
  PointFlagIcon,
  SetupCuateIcon,
  TipFlagIcon,
} from '../../../../../../../assets/svg/index';
import data from '../../data.json';
import './index.scss';
import { Button, message } from 'antd';
import fetch from '../../../../../../../auth/AuthInterceptor';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
const CourseStructure = () => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    fetch({
      url: `api/lecture/course/info/course-structure`,
      method: 'get',
      headers: {
        'public-request': 'true',
      },
    })
      .then((res) => {})
      .catch((err) => {
        message.error('something went wrong');
      });
  }, []);

  const nextStep = () => {
    setLoading(true);
    fetch({
      url: `api/lecture/course/${localStorage.getItem(
        'live-course-id',
      )}/info/seen_course_structure`,
      method: 'put',
      headers: {
        'public-request': 'true',
      },
    })
      .then((res) => {
        setLoading(false);
        queryClient.invalidateQueries([`add-course`]);
        navigate('/instructor-dashboard/courses/add/setup');
      })
      .catch((err) => {
        setLoading(false);
        message.error('something went wrong');
      });
  };

  return (
    <div className="course-structure">
      <StepHeader data={{ title: 'Course structure' }} />
      <div className="course-structure_body">
        <div className="instructor-message">
          <div className="message">
            <h4>Awaken the instructor with in you</h4>
            <p>
              It is a long established fact that a reader will be long
              distracted by the readable content of a page when looking at its
              layout. The point of using Ipsum.
            </p>
          </div>
          <div className="message-flag">
            <SetupCuateIcon />
          </div>
        </div>
        <div className="tips">
          <h4 className="title">{data?.tips?.title}</h4>
          {data?.tips?.items.map((item, index) => {
            return (
              <div className="tip-container" key={index}>
                <TipFlagIcon />
                <div>
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="requirements">
          <h4 className="title">{data?.requirements?.title}</h4>
          {data?.requirements?.items.map((item, index) => {
            return (
              <div className="requirements-container" key={index}>
                <PointFlagIcon />
                <p>{item}</p>
              </div>
            );
          })}
        </div>
      </div>
      <Button
        loading={loading}
        onClick={nextStep}
        type="link"
        className="btn-step-next"
      >
        Next Step
      </Button>
    </div>
  );
};

export default CourseStructure;
