import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import SearchInput from '../../../components/common/dashboard/components/serachInput';
import StatusFilter from '../../../components/common/dashboard/components/statusFilter';
import Table from './components/table';
import './index.scss';
const OnGo = () => {
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    export: '',
  });
  const Filtermenu = [
    { id: 1, value: 'Active' },
    { id: 2, value: 'Pendding' },
    { id: 3, value: 'Rejected' },
  ];
  const exportMenu = [
    { id: 1, value: 'Pdf' },
    { id: 2, value: 'Excel' },
    { id: 3, value: 'Print' },
  ];
  return (
    <div className="on-go">
      <div className="dashboard-page-header-container">
        <div className="page-header-left">
          <h3 className="dashboard-page-title">On GO Courses</h3>
          <p>You have total 20 Courses</p>
        </div>
        <div className="page-header-right">
          <SearchInput />
          <StatusFilter
            menuOption={Filtermenu}
            callback={(status) => {
              setFilters((s) => ({ ...s, status: status }));
            }}
            palceholder="Select Status"
          />
          <StatusFilter
            menuOption={exportMenu}
            callback={(exportVal) => {
              setFilters((s) => ({ ...s, export: exportVal }));
            }}
            palceholder="Export"
          />
          <Link to="courses">Explore more</Link>
        </div>
      </div>
      <Table />
    </div>
  );
};

export default OnGo;
