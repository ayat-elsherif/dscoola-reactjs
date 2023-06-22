import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, Grid, Skeleton, Card } from 'antd';

import Utils from '../../../../utils';
import { useGetMyAllCourses } from '../hooks/useCourses';
import CourseCard from './courseCard';
import { useDispatch } from 'react-redux';
import { saveCourseLength } from '../../../../features/myCourses/myCoursesSlice';
import { ceil } from 'lodash';
import OwnPagination from 'components/own/OwnPagination';

const { useBreakpoint } = Grid;

const AllCourses = ({ search }) => {
  const screens = Utils.getBreakPoint(useBreakpoint());
  const isxxlap = screens.includes('xxl');
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const handleChange = (page) => {
    setPage(page);
  };
  const onSuccess = (data) => {
    dispatch(saveCourseLength(data.data.length));
  };
  const { data: allMyCourses, isLoading } = useGetMyAllCourses(page, search);
  console.log('allMyCourses', allMyCourses);

  return (
    <>
      {isLoading ? (
        <Row gutter={!isxxlap ? 32 : 55}>
          <Col xs={24} sm={24} md={12} xxl={10}>
            <Card style={{ height: '152px' }}>
              {' '}
              <Skeleton avatar active />
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} xxl={10}>
            <Card style={{ height: '152px' }}>
              {' '}
              <Skeleton avatar active />
            </Card>
          </Col>
        </Row>
      ) : (
        <>
          {allMyCourses?.data?.length > 0 ? (
            <>
              <Row gutter={!isxxlap ? 32 : 55}>
                {allMyCourses?.data?.map((course, index) => {
                  return (
                    <Col xs={24} sm={24} md={12} xxl={10} key={index}>
                      <CourseCard data={course} />
                    </Col>
                  );
                })}
              </Row>
              <OwnPagination
                pagination={{
                  total: allMyCourses.meta?.total,
                  currentPage: allMyCourses.meta?.current_page,
                  perPage: allMyCourses.meta?.per_page,
                }}
                onChange={handleChange}
              />
              {/* {ceil(allMyCourses?.meta?.total / 4) > 1 && (
                <Pagination
                  className="custom-pagination"
                  count={ceil(allMyCourses?.meta?.total / 4)}
                  page={page}
                  onChange={handleChange}
                />
              )} */}
            </>
          ) : (
            <div className="empty-list">
              <img
                src="/assets/images/empty-background.png"
                alt="empty-background"
              />
              <Link to="#">Browse courses</Link>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default AllCourses;
