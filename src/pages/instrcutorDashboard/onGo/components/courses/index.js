import React, { useState } from 'react';
import { Row, Col, Pagination } from 'antd';
import { courses } from './data';
import SearchInput from '../../../../../components/common/dashboard/components/serachInput';
import './index.scss';
import MultiSelectFilter from '../../../../../components/common/dashboard/components/Filters/multiSelectFilter';
import CourseCard from '../../../../../components/common/dashboard/components/courseCard';
const CourseFilterOption = [
  'UI/UX Design Adobe xd',
  'Figma UX design',
  'Web design using Xd',
  'User Research',
  'Design Thinking',
  'Empathy Map',
];
const NumberFilterOption = ['1-5', '6-10', '11-15', 'more than 15'];
function OnGoCourses() {
  const [page, setPage] = useState(1);

  const [filters, setFilters] = useState({
    search: '',
    status: '',
    numbers: '',
  });
  const handleChange = (page) => {
    setPage(page);
  };

  return (
    <div className="on-go-courses">
      {' '}
      <div className="dashboard-page-header-container">
        <div className="page-header-left">
          <h3 className="dashboard-page-title">On GO Courses</h3>
          <p>You have total 20 Courses</p>
        </div>
        <div className="page-header-right">
          <MultiSelectFilter
            selectOPtions={NumberFilterOption}
            placeholder="Select Number"
            callback={(numbers) => {
              setFilters((s) => ({ ...s, numbers }));
            }}
          />
          <MultiSelectFilter
            selectOPtions={CourseFilterOption}
            placeholder="Select Course"
            callback={(coursesFilter) => {
              setFilters((s) => ({ ...s, courses: coursesFilter }));
            }}
          />
          <SearchInput />
        </div>
      </div>
      <div className="courses-body">
        <Row gutter={30}>
          {courses.map((course) => {
            return (
              <Col xs={24} sm={24} md={8} xl={6} xxl={4} key={course.id}>
                <CourseCard data={course} />
              </Col>
            );
          })}
        </Row>
        <Pagination
          className="custom-pagination"
          total={10}
          current={page}
          pageSize={15}
          onChange={handleChange}
          hideOnSinglePage
        />
      </div>
    </div>
  );
}

export default OnGoCourses;
