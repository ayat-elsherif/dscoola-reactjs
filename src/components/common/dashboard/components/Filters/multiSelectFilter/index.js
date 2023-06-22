import React from 'react';
import { Select, Tag } from 'antd';
import './index.scss';

const { Option } = Select;

const tagRender = (props) => {
  const { label, closable, onClose } = props;

  const onPreventMouseDown = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <Tag
      color={'#7E59D1'}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{
        marginRight: 3,
      }}
    >
      {label}
    </Tag>
  );
};

const MultiSelectFilter = ({ selectOPtions, placeholder, callback }) => {
  const handleChange = (value) => {
    callback(value);
  };
  return (
    <div className='multi-select-container multiSelect-filter'>
      {' '}
      <Select
        mode='multiple'
        showArrow
        tagRender={tagRender}
        maxTagCount='responsive'
        // suffixIcon={<DownArrowIcon />}
        placeholder={placeholder}
        onChange={handleChange}
      >
        {' '}
        {selectOPtions?.map((item) => {
          return (
            <Option value={item} key={item}>
              {item}
            </Option>
          );
        })}
      </Select>
    </div>
  );
};

export default MultiSelectFilter;
