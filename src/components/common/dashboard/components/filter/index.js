import React, { useEffect, useState } from 'react';
import { Select } from 'antd';

import './index.scss';
import { DownArrowIcon } from '../../../../../assets/svg';
const { Option } = Select;
const Filter = ({ palceholder, callBack, reset }) => {
  const [value, setValue] = useState('');
  const handleChange = (value) => {
    setValue(value);
    callBack(value);
  };
  useEffect(() => {
    setValue(reset);
  }, [reset]);
  return (
    <div className='filter-container'>
      <Select
        onChange={handleChange}
        placeholder={palceholder}
        suffixIcon={<DownArrowIcon />}
        value={value}
      >
        <Option value=''>All meeting</Option>
        <Option value='1'>Upcoming</Option>
        <Option value='2'>Done</Option>
        <Option value='3'>Expired</Option>
      </Select>
    </div>
  );
};

export default Filter;
