import React, { useEffect, useState } from 'react';
import StepHeader from '../components/stepHeader';
import {
  FilmIcon,
  PointFlagIcon,
  TipFlagIcon,
} from '../../../../../../../assets/svg/index';
import data from '../../data.json';
import fetch from '../../../../../../../auth/AuthInterceptor';
import './index.scss';
import { Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
const CourseStructure = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  useEffect(() => {
    fetch({
      url: `api/lecture/courses/info/film_and_edit`,
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
  ///lecture/courses/{id}/info/seen_film_and_edit
  const onFinish = () => {
    setLoading(true);
    fetch({
      url: `api/lecture/courses/${localStorage.getItem(
        'live-course-id',
      )}/info/seen_film_and_edit`,
      method: 'put',
      headers: {
        'public-request': 'true',
      },
    })
      .then((res) => {
        setLoading(false);
        navigate('/instructor-dashboard/courses/add/course-content');
        queryClient.invalidateQueries([`add-course`]);
      })
      .catch((err) => {
        setLoading(false);
        message.error('something went wrong');
      });
  };
  return (
    <div className="course-structure">
      <StepHeader data={{ title: 'Film&Edit' }} />
      <div className="course-structure_body">
        <div className="instructor-message">
          <div className="message">
            <h4>You’re ready to share your knowledge.</h4>
            <p>
              It is a long established fact that a reader will be long
              distracted by the readable content of a page when looking at its
              layout. The point of using Ipsum.
            </p>
          </div>
          <div className="message-flag">
            <FilmIcon />
          </div>
        </div>
        <div className="tips">
          <h4 className="title">{data?.film?.tips?.title}</h4>
          {data?.film?.tips?.items.map((item, index) => {
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
          <h4 className="title">{data?.film?.requirements?.title}</h4>
          {data?.film?.requirements?.items.map((item, index) => {
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
        onClick={onFinish}
        type="link"
        className="btn-step-next"
      >
        Next Step
      </Button>
    </div>
  );
};

export default CourseStructure;
