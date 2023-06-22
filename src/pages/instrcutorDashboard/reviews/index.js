import React, { useState } from 'react';

import { ArrowIcon } from '../../../assets/svg';
import ReviewsTable from './components/table';
import DateFilter from '../../../components/common/dashboard/components/Filters/dateFilter';
import CourseFilter from '../../../components/common/dashboard/components/Filters/courseFilter';
import StudentsFilter from '../../../components/common/dashboard/components/Filters/studentsFilter';
import './index.scss';

function Reviews() {
  const [filters, setFilters] = useState({
    courses: null,
    students: null,
    date: '',
  });
  return (
    <div className="reviews">
      <div className="dashboard-page-header-container">
        <div className="page-header-left">
          <h3 className="dashboard-page-title">
            Courses <ArrowIcon /> <span>Reviews</span>
          </h3>
        </div>
        <div className="page-header-right">
          <CourseFilter
            callback={(coursesFilter) => {
              setFilters((s) => ({ ...s, courses: coursesFilter }));
            }}
          />
          <StudentsFilter
            callback={(studentsFilter) => {
              setFilters((s) => ({ ...s, students: studentsFilter }));
            }}
          />
          <DateFilter
            callback={(date) => {
              setFilters((s) => ({ ...s, date: date }));
            }}
          />
        </div>
      </div>
      <ReviewsTable />
    </div>
  );
}

export default Reviews;
