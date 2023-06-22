import React, { useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import fetch from '../../../../../auth/AuthInterceptor';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import './courseView.scss';
import { useDispatch, useSelector } from 'react-redux';
import { singleCourse } from '../../../../../features/singleCourse/singleCourse';
import Footer from '../../../../common/footer';
import PreviewHeader from './PreviewHeader';
import { Col, Row, Tabs } from 'antd';
import PresentationCourse from './PresentationCourse/PresentationCourse';
import CourseContent from './tabs/CourseContent/CourseContent';
import QAndA from './tabs/QAndA/QAndA';
import Announcements from './tabs/Announcements/Announcements';
import OneOnOne from './tabs/OneOnOne/OneOnOne';
import YallaOnline from './tabs/YallaOnline/YallaOnline';
import useSearchQuery from 'Hooks/utils/useSearchQuery';
import { css } from '@emotion/css';
import Loading from 'components/common/dashboard/shared-components/Loading';

// http://localhost:3000/course/selenium-webdriver-with-java-basics-to-advancedframeworks/1/section/1/preview/1

const CoursePreview = ({ tab }) => {
  // console.log('CoursePreview  tab', tab);
  const { currentUser } = useSelector((s) => s?.user);
  // console.log('CoursePreview  currentUser', currentUser);
  const CoursePreviewStyles = css`
    padding: 4rem 0;
    .tabs-wrapper {
      .tabs {
        > .ant-tabs-nav {
          /* &::before {
            display: none;
          } */

          color: #6a6f73;
          .ant-tabs-tab {
            font-weight: 500;
            font-size: 1.5rem;
            line-height: 2.4rem;
            text-transform: capitalize;

            &.ant-tabs-tab-active {
              .ant-tabs-tab-btn {
                color: #7e59d1;
              }
            }
          }

          .ant-tabs-ink-bar {
            background-color: #7e59d1;
          }
        }
        > .ant-tabs-content-holder {
        }
      }
      .tab-wrapper {
        padding: 2.1rem 1.8rem;
        border: 1px solid #efeff6;
        .announcements-wrapper {
          /* max-height: 60vh;
          overflow: auto; */
        }
      }
    }
  `;

  const smallVideoRef = useRef();

  const handleNavigation = (e) => {
    const VideoWrapper = document.getElementById('video-height-wrapper');
    const smallVideo = document.getElementById('video-presentation-container');
    const videoHeight = VideoWrapper?.offsetHeight;
    const window = e.currentTarget;

    if (window.scrollY > videoHeight)
      smallVideo?.classList?.add('sticky-video-wrapper');
    else smallVideo?.classList?.remove('sticky-video-wrapper');
  };

  useEffect(() => window.scrollTo(0, 0), []);

  useEffect(() => {
    window.addEventListener('scroll', (e) => handleNavigation(e));
    return () => {
      // return a cleanup function to unregister our function since its gonna run multiple times
      window.removeEventListener('scroll', (e) => handleNavigation(e));
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [smallVideoRef]);

  // setLecType(lectureType);
  let slug = useParams();
  const dispatch = useDispatch();

  const onSuccess = (data) => {
    dispatch(singleCourse(data.data));
  };

  const onError = (data) => {};

  // eslint-disable-next-line no-unused-vars
  const { data } = useQuery(
    [`course-preview`],
    () => {
      return fetch({
        url: `api/lecture/course/${slug.course_id}?includes=author,reviews,author.reviews`,
        method: 'get',
        headers: {
          'public-request': 'true',
        },
      });
    },
    {
      onSuccess: onSuccess,
      onError: onError,
    },
  );

  // const { course_id } = useParams();
  // // console.log('CoursePreview  params', params);
  const location = useLocation();
  // console.log('CoursePreview  location', location);
  const navigate = useNavigate();
  const showCourse = useSelector((state) => state.singleCourse.singleCourse);
  const { searchQueryStr } = useSearchQuery();
  const courseContent = useSelector(
    (state) => state.courseContentState?.courseContentState,
  );
  const items = [
    {
      key: 'course-content',
      label: 'course content',
      children: <CourseContent />,
    },
    {
      key: 'Q&A',
      label: 'Q&A',
      children: <QAndA />,
    },
    {
      key: 'announcements',
      label: 'announcements',
      children: <Announcements />,
    },
    // {
    //   key: 'one-on-one',
    //   label: 'one-on-one',
    //   children: <OneOnOne />,
    // },
    currentUser?.role_id === 3 && {
      key: 'yalla-online',
      label: 'yalla online',
      children: <YallaOnline />,
    },
  ];
  const { tab: activeTab } = useParams();
  // console.log('CoursePreview  activeTab', tab || activeTab || 'course-content');
  const handleTabChange = (key) => {
    navigate(
      `/course/${slug?.course_slug}/${slug?.course_id}/section/${slug?.section_id}/preview/${slug?.lecture_id}/${key}?course_id=${slug?.course_id}`,
    );
  };

  if (!courseContent) return <Loading />;

  return (
    <>
      <PreviewHeader title={showCourse?.course?.title} />
      <div className={CoursePreviewStyles}>
        <div className="container">
          <div className="course-preview-inner">
            <PresentationCourse
              courseContent={courseContent}
              showCourse={showCourse}
            />
            <Row>
              <Col lg={16}>
                <div className="tabs-wrapper">
                  <Tabs
                    items={items}
                    activeKey={tab || activeTab || 'course-content'}
                    onChange={handleTabChange}
                    tabBarGutter={20}
                    className="tabs"
                  />
                </div>
              </Col>
              <Col lg={8}>
                {/* {small && ( */}
                <div className="small-video-preview" ref={smallVideoRef}></div>
                {/* )} */}
              </Col>
            </Row>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CoursePreview;
