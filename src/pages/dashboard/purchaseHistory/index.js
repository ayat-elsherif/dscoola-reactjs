import React from 'react';
import EmptyCard from '../../../helpers/emptyCard';
import PurchaseHistroyTable from './components/table';

import './index.scss';
const PurchaseHistory = () => {
  return (
    <div className='purchase-history'>
      <div className='dashboard-page-header-container'>
        <div className='page-header-left'>
          <h3 className='dashboard-page-title'>Purchase History</h3>
        </div>
      </div>
      {/* <EmptyCard text='No purchase history available.' /> */}
      <PurchaseHistroyTable />
    </div>
  );
};

export default PurchaseHistory;
