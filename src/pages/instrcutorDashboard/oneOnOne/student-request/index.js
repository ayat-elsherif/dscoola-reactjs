import React, { useState } from 'react';
import DropDownFilter from '../../../../components/common/dashboard/components/dropdownFilter';
import SearchInput from '../../../../components/common/dashboard/components/serachInput';
import CourseFilter from '../Filters/courseFilter';
import DateFilter from '../Filters/dateFilter';
import Table from './components/table';
import './index.scss';
const StudentRequest = () => {
  const [filters, setFilters] = useState({
    search: '',
    courses: null,
    date: '',
  });

  return (
    <div className='student-request'>
      <div className='dashboard-page-header-container'>
        <div className='page-header-left'>
          <h3 className='dashboard-page-title'>student-request</h3>
        </div>
        <div className='page-header-right'>
          <CourseFilter
            callback={(coursesFilter) => {
              setFilters((s) => ({ ...s, courses: coursesFilter }));
            }}
          />
          <DateFilter
            callback={(date) => {
              setFilters((s) => ({ ...s, date: date }));
            }}
          />
          <SearchInput
            callback={(searchValue) => {
              setFilters((s) => ({ ...s, search: searchValue }));
            }}
          />
        </div>
      </div>
      <Table />
    </div>
  );
};

export default StudentRequest;
