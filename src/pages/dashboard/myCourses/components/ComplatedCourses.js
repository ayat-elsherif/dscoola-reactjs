import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, Grid, Skeleton, Card } from 'antd';

import Utils from '../../../../utils';
import { useGetMyComplatedCourses } from '../hooks/useCourses';
import CourseCard from './courseCard';
import OwnPagination from 'components/own/OwnPagination';

const { useBreakpoint } = Grid;

const ComplatedCourses = ({ search }) => {
  const screens = Utils.getBreakPoint(useBreakpoint());
  const isxxlap = screens.includes('xxl');
  const [page, setPage] = useState(1);
  const handleChange = (page) => {
    setPage(page);
  };
  const { data: complatedCourses, isLoading } = useGetMyComplatedCourses(
    page,
    search,
  );

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
          {complatedCourses?.data?.length > 0 ? (
            <>
              <Row gutter={!isxxlap ? 32 : 55}>
                {complatedCourses?.data?.map((course, index) => {
                  return (
                    <Col xs={24} sm={24} md={12} xxl={10} key={index}>
                      <CourseCard data={course} />
                    </Col>
                  );
                })}
              </Row>
              <OwnPagination
                pagination={{
                  total: complatedCourses.meta?.total,
                  currentPage: complatedCourses.meta?.current_page,
                  perPage: complatedCourses.meta?.per_page,
                }}
                onChange={handleChange}
              />
              {/* {ceil(complatedCourses?.meta?.total / 4) > 1 && (
                <Pagination
                  className="custom-pagination"
                  count={ceil(complatedCourses?.meta?.total / 4)}
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

export default ComplatedCourses;
