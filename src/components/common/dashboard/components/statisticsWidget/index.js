import React from 'react';
import { NarrowDownIcon, NarrowUpIcon } from '../../../../../assets/svg';
import Icon from '../Icon';
import './index.scss';
const StatisticsWidget = ({ data }) => {
  return (
    <div className='statistics-widget-card'>
      <div className='statistics-widget-card_header'>
        <div className='header-info'>
          <h3>{data?.title}</h3>
          <div className='numbers'>{data?.number}</div>
        </div>
        <div className='icon-container'>
          <Icon type={data.icon}></Icon>
        </div>
      </div>
      <div className='statistics-widget-card_footer'>
        <span>
          {data?.percentage}%{' '}
          {data.status === 1 ? <NarrowUpIcon /> : <NarrowDownIcon />}
        </span>
        <span>Since last Month</span>
      </div>
    </div>
  );
};

export default StatisticsWidget;
