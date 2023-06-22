import React, { useState } from 'react';
import DropDownFilter from '../../../../components/common/dashboard/components/dropdownFilter';
import SearchInput from '../../../../components/common/dashboard/components/serachInput';
import StatusFilter from '../../../../components/common/dashboard/components/statusFilter';
import CourseFilter from '../Filters/courseFilter';
import DateFilter from '../Filters/dateFilter';
import Table from './components/table';
import './index.scss';
const OneOnOne = () => {
  const Filtermenu = [
    { id: 2, value: 'Happening' },
    { id: 1, value: 'Upcoming' },
    { id: 3, value: 'Expired' },
  ];
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    courses: null,
    date: '',
  });

  return (
    <div className='one-on-one-list'>
      <div className='dashboard-page-header-container'>
        <div className='page-header-left'>
          <h3 className='dashboard-page-title'>One on One</h3>
        </div>
        <div className='page-header-right'>
          <SearchInput
            callback={(searchValue) => {
              setFilters((s) => ({ ...s, search: searchValue }));
            }}
          />
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
          <StatusFilter
            menuOption={Filtermenu}
            callback={(status) => {
              setFilters((s) => ({ ...s, status: status }));
            }}
            palceholder='Select Status'
          />
        </div>
      </div>
      <Table filters={filters} />
    </div>
  );
};

export default OneOnOne;
