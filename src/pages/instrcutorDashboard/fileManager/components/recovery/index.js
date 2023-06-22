import React from 'react';
import Filter from './components/filter';
import RecoveryTable from './components/table';
import './index.scss';
function Recovery() {
  return (
    <div className='recovery'>
      <h3>Recovery</h3>
      <div className='recovery-content'>
        <Filter />
        <RecoveryTable />
      </div>
    </div>
  );
}

export default Recovery;
