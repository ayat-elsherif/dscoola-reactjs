import React from 'react';
import { Select } from 'antd';
import './index.scss';
import { DownArrowIcon } from '../../../../../assets/svg';

const { Option } = Select;
const StatusFilter = ({ menuOption, palceholder, callback }) => {
  const handleChange = (value) => {
     
    callback(value);
  };
  return (
    <div className='status-filter'>
      <Select
        onChange={handleChange}
        placeholder={palceholder}
        suffixIcon={<DownArrowIcon />}
        allowClear
      >
        {menuOption?.map((option) => {
          return (
            <Option value={option.id} key={option.id}>
              {option.value}
            </Option>
          );
        })}
      </Select>
    </div>
  );
};

export default StatusFilter;
