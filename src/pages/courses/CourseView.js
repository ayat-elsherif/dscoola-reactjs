import { message } from 'antd';
import './courseView.scss';
import { singleCourse } from 'features/singleCourse/singleCourse';
import BreadCrumbsMultiple from 'helpers/breadCrumbs/BreadCrumbsMultiple';
import UserCard from 'helpers/cards/userCard/UserCard';
import useApi from 'Hooks/network/useApi';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import Courseheadersection from './courseView/CourseHeaderSection';
import AboutCourseSection from './courseView/AboutCourseSection';
import Cartsidebar from './courseView/CartSidebar';
import Coursecontent from './courseView/CourseContent';
import DatesAvailability from './courseView/liveCourses/DatesAvailability';
import StartDate from './courseView/liveCourses/StartDate';
import Requirementssection from './courseView/RequirementsSection';
import Reviewings from './courseView/Reviewings';
import StudentsAlsoBought from './courseView/StudentsAlsoBought';
import WhatWillLearnSection from './courseView/WhatWillLearnSection';
import './style.scss';
import { RatingFeedback } from 'helpers/RatingFeedback';
import OneOnOneSection from './courseView/OneOnOneSection';

export const CourseView = () => {
  const { state } = useLocation();
  const { currentUser } = useSelector((state) => state?.user);
  const [authorCourses, setAuthorCourses] = useState(0);
  const [loading, setLoading] = useState(true);
  const api = useApi();
  const { course_id } = useParams();
  const dispatch = useDispatch();

  const myCourse = useSelector((state) => state.singleCourse?.singleCourse);

  const handleFetchCourseDetails = () => {
    api
      .get(
        `lecture/course/${course_id}/basic-info?includes=author,reviews,author.reviews`,
      )
      .then((res) => {
        dispatch(singleCourse(res.data));
        handleGetAuthorCourses(res.data);
        setLoading(false);
      })
      .catch((err) => {
        currentUser && message.error('Something went wrong');
      });
  };

  const handleGetAuthorCourses = (course) => {
    api
      .get(
        `courses/auth/filter?perpage=1000&instructor[]=${course?.course?.author?.id}`,
      )
      .then((res) => {
        setAuthorCourses(res?.total);
        setLoading(false);
      })
      .catch((err) => {
        currentUser && message.error('Something went wrong');
      });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    handleFetchCourseDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="single-course single-course-wrapper">
      <div className="headr-wrapper">
        <BreadCrumbsMultiple
          params={[{ label: myCourse?.course?.slug }]}
        ></BreadCrumbsMultiple>
        <Courseheadersection myCourse={myCourse} isLoading={loading} />
      </div>

      <div className="container over-visible">
        <div className="course-sections">
          <div className="course-sections-details">
            {myCourse?.course?.isOneOnOne ||
            myCourse?.course?.approve_ono === 1 ? (
              <OneOnOneSection myCourse={myCourse} />
            ) : null}

            {!loading && myCourse?.course?.type === 'liveClass' && (
              <>
                <StartDate myCourse={myCourse} />
                <div className="different-bundles">
                  Different bundles to Start From
                </div>
                <DatesAvailability myCourse={myCourse.course} />
              </>
            )}

            <AboutCourseSection myCourse={myCourse} isLoading={loading} />

            <WhatWillLearnSection myCourse={myCourse} isLoading={loading} />

            <Requirementssection myCourse={myCourse} isLoading={loading} />

            {!loading && (
              <section className="course-content">
                <div className="course-container">
                  <div className="course-content-headline">Course content</div>
                  <Coursecontent myCourse={myCourse} />
                </div>
              </section>
            )}

            <StudentsAlsoBought isLoading={loading} />

            <UserCard
              authorCourses={authorCourses}
              creatorInfo={myCourse?.course?.author}
              isLoading={loading}
              instructor="Your instructor"
            />
            <RatingFeedback showPercentage rating={myCourse?.get_ratings} />
            <Reviewings
              myCourse={myCourse}
              slug={course_id}
              type={myCourse?.type}
              isLoading={loading}
            />
          </div>

          <div className="course-sections-card">
            <Cartsidebar
              isPreview={state?.isPreview}
              isAuth={currentUser}
              isLoading={loading}
              myCourse={myCourse}
              liveCourse={myCourse?.course?.type === 'liveClass'}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
