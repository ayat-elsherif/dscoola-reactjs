import React from 'react';

import './index.scss';

const StatisticsCard = ({ Icon, data }) => {
  return (
    <div className='statistics-card'>
      <div className='icon'>
        <Icon />
      </div>
      <div className='data'>
        <span>{data?.number}</span>
        <span>{data?.text}</span>
      </div>
    </div>
  );
};

export default StatisticsCard;
