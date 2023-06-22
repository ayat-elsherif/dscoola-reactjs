import React, { useState } from 'react';

import { ArrowIcon } from '../../../assets/svg';
import StatusFilter from '../../../components/common/dashboard/components/statusFilter';
import SearchInput from '../../../components/common/dashboard/components/serachInput';
import QATable from './components/table';
import './index.scss';

const QA = () => {
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    courses: null,
    date: '',
  });
  const Filtermenu = [
    { id: 1, value: 'Happening' },
    { id: 2, value: 'Upcoming' },
    { id: 3, value: 'Expired' },
  ];
  return (
    <div className='qa'>
      <div className='dashboard-page-header-container'>
        <div className='page-header-left'>
          <h3 className='dashboard-page-title'>
            Courses <ArrowIcon /> <span>Q&A</span>
          </h3>
        </div>
        <div className='page-header-right'>
          <SearchInput />
          {/* <Filter palceholder='Status' /> */}
          <StatusFilter
            menuOption={Filtermenu}
            callback={(status) => {
              setFilters((s) => ({ ...s, status: status }));
            }}
            palceholder='Select Status'
          />
        </div>
      </div>
      <QATable />
    </div>
  );
};

export default QA;
