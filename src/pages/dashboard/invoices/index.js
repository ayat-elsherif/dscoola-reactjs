import React, { useState } from 'react';
import DropDownFilter from '../../../components/common/dashboard/components/dropdownFilter';
import SearchInput from '../../../components/common/dashboard/components/serachInput';
import InvoicesTable from './components/table';
import './index.scss';
const Invoices = () => {
  const [filters, setFilters] = useState({
    search: '',
    status: null,
  });
  const Filtermenu = [
    { id: 1, title: 'Pending' },
    { id: 2, title: 'Success' },
    { id: 3, title: 'Failed' },
  ];
  console.log('filters', filters);
  return (
    <div className='invoices'>
      <div className='dashboard-page-header-container'>
        <div className='page-header-left'>
          <h3 className='dashboard-page-title'>Students Invoices</h3>
        </div>
        <div className='page-header-right'>
          <SearchInput
            callback={(searchValue) => {
              setFilters((s) => ({ ...s, search: searchValue }));
            }}
          />
          <DropDownFilter
            menuItems={Filtermenu}
            callback={(status) => {
              setFilters((s) => ({ ...s, status }));
            }}
          />
        </div>
      </div>
      <InvoicesTable filters={filters} />
    </div>
  );
};

export default Invoices;
