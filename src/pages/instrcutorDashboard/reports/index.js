import React, { useState } from 'react';
import SearchInput from '../../../components/common/dashboard/components/serachInput';
import StatusFilter from '../../../components/common/dashboard/components/statusFilter';
import Table from './components/table';
import './index.scss';
const Reports = () => {
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    export: '',
  });
  const typemenu = [
    { id: 1, value: 'Webinner' },
    { id: 2, value: 'Recorded' },
    { id: 3, value: 'live' },
  ];
  const exportMenu = [
    { id: 1, value: 'Pdf' },
    { id: 2, value: 'Excel' },
    { id: 3, value: 'Print' },
  ];
  return (
    <div className="reports">
      <div className="dashboard-page-header-container">
        <div className="page-header-left">
          <h3 className="dashboard-page-title">Revenu report</h3>
        </div>
        <div className="page-header-right">
          <SearchInput />
          <StatusFilter
            menuOption={typemenu}
            callback={(status) => {
              setFilters((s) => ({ ...s, status: status }));
            }}
            palceholder="Select Type"
          />
          <StatusFilter
            menuOption={exportMenu}
            callback={(exportVal) => {
              setFilters((s) => ({ ...s, export: exportVal }));
            }}
            palceholder="Export"
          />
        </div>
      </div>
      <Table />
    </div>
  );
};

export default Reports;
