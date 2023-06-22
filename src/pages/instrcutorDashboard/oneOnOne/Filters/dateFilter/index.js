import React from 'react';
import { DatePicker } from 'antd';
import './index.scss';
function DateFilter({ callback }) {
  const onChange = (date, dateString) => {
    console.log(date, dateString);
    callback(dateString);
  };
  return (
    <div className='date-filter'>
      <DatePicker onChange={onChange} />
    </div>
  );
}

export default DateFilter;
