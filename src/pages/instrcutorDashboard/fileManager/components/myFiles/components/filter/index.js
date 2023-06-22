import React from 'react';
import { Select } from 'antd';
import './index.scss';
import { DownArrowIcon } from '../../../../../../../assets/svg';

const { Option } = Select;
const menuOption = [
  { id: 1, value: 'Last Opened' },
  { id: 2, value: 'Name' },
  { id: 3, value: 'Size' },
];
const MyFilesFilter = ({ callback }) => {
  const handleChange = (value) => {
    console.log(`selected ${value}`);
    callback(value);
  };
  return (
    <div className='myfiles-filter'>
      <Select
        onChange={handleChange}
        placeholder=''
        suffixIcon={<DownArrowIcon />}
        defaultValue={1}
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

export default MyFilesFilter;
