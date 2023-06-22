import React from 'react';
import FileManagerTable from './components/table';
import './index.scss';
function Starred() {
  return (
    <div className='starred'>
      <h3>Starred</h3>
      <FileManagerTable />
    </div>
  );
}

export default Starred;
