import React from 'react';
import { Col, Divider, Row, Tabs } from 'antd';

import ZoomMeetingCard from '../../../helpers/cards/zoomMeetingCard';

import fetch from '../../../auth/AuthInterceptor';
import { useEffect } from 'react';

import { useState } from 'react';
import { EmptyWorkEx, NoCoursrsIcon } from '../../../assets/svg';
import { levelsList } from '../../../apis/levelsList';

import useApi from 'network/useApi';
import CourseCard from 'helpers/cards/courseCard/courseCard';
import WebinarCard from 'helpers/cards/WebinarCard/WebinarCard';
import OwnPagination from 'components/own/OwnPagination';
import dayjs from 'dayjs';

const { TabPane } = Tabs;

function InstructorCourses({
  instructorData,
  instructorId,
  instructorWebinar,
}) {
  console.log(instructorData, 's;odkfef');

  const { certificates } = instructorData?.data;
  const { pervious_jobs } = instructorData?.data;
  let recordedCards = [];
  let liveCards = [];
  let talksCards = [];
  const api = useApi();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const access_token = localStorage.getItem('access_token');
    access_token
      ? fetch({
          url: `api/courses/auth/filter?perpage=1000&instructor[]=${instructorId}`,
          method: 'get',
          headers: {
            'public-request': 'true',
          },
        })
          .then((res) => {
            setCourses(res.data);
          })
          .catch((err) => {})
      : fetch({
          url: `api/courses/filter?perpage=1000&instructor[]=${instructorId}`,

          method: 'get',
          headers: {
            'public-request': 'true',
          },
        })
          .then((res) => {
            setCourses(res.data);
          })
          .catch((err) => {});
  }, []);

  const recordedCourse = courses.map((item, index) => {
    if (item.type === ('recorded' || 'mixed')) {
      recordedCards.push(item);
      return (
        <Col span={6}>
          <CourseCard course={item} />
        </Col>
      );
    }
  });

  const mixedCourse = courses.map((item, index) => {
    if (item.type === 'liveClass') {
      liveCards.push(item);

      return (
        <Col span={6}>
          <CourseCard course={item} />
        </Col>
      );
    }
  });
  const talks = courses.map((item, index) => {
    if (item.type == 'webinar') {
      talksCards.push(item);
      return (
        <div className="col-lg-4">
          {' '}
          <ZoomMeetingCard course={item} />
        </div>
      );
    }
  });

  return (
    <div className="container userCourses">
      <div className="tabsSection">
        <div className="bodySection">
          <Tabs defaultActiveKey="1" className="scoolaInnerTabs">
            <TabPane tab="My Experience" key="1">
              <div className="Certifications-container">
                <div className="cer-title">Experience</div>
                {pervious_jobs?.length < 1 && (
                  <Row>
                    {' '}
                    <Col style={{ width: '100%' }}>
                      {' '}
                      <Row className="pt-5 pb-3" justify="center">
                        <Col>
                          <EmptyWorkEx />
                        </Col>
                      </Row>
                      <Row className=" pb-5" justify="center">
                        <Col style={{ fontSize: '14px' }}>
                          No Experience To Show
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                )}
                {pervious_jobs?.map((i) => {
                  let startTime = dayjs(i.start_date);
                  let endTime = dayjs(i.end_date);
                  const totalDuration = endTime.diff(startTime, 'month');

                  return (
                    <Row key={i.id} gutter={[16, 16]}>
                      <Col>
                        <img
                          src={
                            'https://dscoola-files.s3.eu-west-1.amazonaws.com/' +
                            i.company_logo
                          }
                          alt="Certificate"
                          className="certificate-image"
                        />
                      </Col>
                      <Col>
                        <div className="certificate-title"> {i.job_title}</div>
                        <div className="certificate-description">
                          {i.company_name}
                        </div>
                        <div className="certificate-description">
                          {dayjs(i.start_date).format('MMM YYYY')} -{' '}
                          {dayjs(i.start_date).format('MMM YYYY')
                            ? dayjs(i.end_date).format('MMM YYYY')
                            : null}{' '}
                          . {totalDuration} mos
                        </div>
                      </Col>
                      <Col span={24}>
                        <Divider></Divider>
                      </Col>
                    </Row>
                  );
                })}
              </div>
              <div className="Certifications-container">
                <div className="cer-title">Certifications</div>
                {certificates?.length < 1 && (
                  <Row>
                    {' '}
                    <Col style={{ width: '100%' }}>
                      {' '}
                      <Row className="pt-5 pb-3" justify="center">
                        <Col>
                          <EmptyWorkEx />
                        </Col>
                      </Row>
                      <Row className=" pb-5" justify="center">
                        <Col style={{ fontSize: '14px' }}>
                          No certificates To Show
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                )}
                {certificates.map((i) => {
                  return (
                    <Row key={i.id} gutter={[16, 16]}>
                      <Col>
                        <img
                          src={
                            'https://dscoola-files.s3.eu-west-1.amazonaws.com/' +
                            i.image
                          }
                          alt="Certificate"
                          className="certificate-image"
                        />
                      </Col>
                      <Col>
                        <div className="certificate-title">
                          {i.certificate_name}
                        </div>
                        <div className="certificate-description">
                          Provider : {i.provider}
                        </div>
                        <div className="certificate-description">
                          Issued : {dayjs(i.issue_date).format('MMM YYYY')}
                        </div>
                      </Col>
                      <Col span={24}>
                        <Divider></Divider>
                      </Col>
                    </Row>
                  );
                })}
              </div>
            </TabPane>

            <TabPane tab={`Recorded Courses (${recordedCards.length})`} key="2">
              <Row gutter={[16, 16]}>
                {recordedCourse}
                {recordedCards.length === 0 && (
                  <Col className="pt-5" span={24}>
                    <Row justify="center">
                      <Col>
                        {' '}
                        <NoCoursrsIcon style={{ width: '100%' }} />
                        <div className="no-courses">
                          No Recent Recorded Courses
                        </div>
                      </Col>
                    </Row>
                  </Col>
                )}
              </Row>
              {console.log(recordedCards.length, 'recordedCards.length==0')}
            </TabPane>
            <TabPane tab={`Live Courses (${liveCards.length})`} key="3">
              <Row gutter={[16, 16]}>
                {mixedCourse}
                {liveCards.length === 0 && (
                  <Col className="pt-5" span={24}>
                    <Row justify="center">
                      <Col>
                        {' '}
                        <NoCoursrsIcon style={{ width: '100%' }} />
                        <div className="no-courses">
                          No Recent Live Or Mixed Courses
                        </div>
                      </Col>
                    </Row>
                  </Col>
                )}
              </Row>
            </TabPane>
            <TabPane
              tab={`My Talks (${instructorWebinar?.data?.length || 0})`}
              key="4"
            >
              <Row gutter={[16, 16]}>
                {instructorWebinar?.data?.map((item) => (
                  <Col key={item?.id} span={6}>
                    <WebinarCard course={item} sliderToggle={false} />
                  </Col>
                ))}
                {instructorWebinar?.data?.length === 0 && (
                  <Col className="pt-5" span={24}>
                    <Row justify="center">
                      <Col>
                        {' '}
                        <NoCoursrsIcon style={{ width: '100%' }} />
                        <div className="no-courses">No Recent Talks</div>
                      </Col>
                    </Row>
                  </Col>
                )}
                {/* <Col span={24}>
                  {' '}
                  <OwnPagination pagination={instructorWebinar?.pagination} />
                </Col> */}
              </Row>
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default InstructorCourses;
