import React from 'react';
import ShardTable from './components/table';
import './index.scss';
function Shared() {
  return (
    <div className='shared'>
      <h3>Shared</h3>
      <ShardTable />
    </div>
  );
}

export default Shared;
