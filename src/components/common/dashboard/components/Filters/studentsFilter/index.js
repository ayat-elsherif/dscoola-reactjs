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

function Index({ callback }) {
  const handleChange = (value) => {
    callback(value);
  };
  return (
    <div className='multi-select-container filter-students'>
      {' '}
      <Select
        mode='multiple'
        showArrow
        tagRender={tagRender}
        maxTagCount='responsive'
        // suffixIcon={<DownArrowIcon />}
        placeholder='Select Students'
        onChange={handleChange}
      >
        {' '}
        {[
          'Emilee Logan',
          'Donald Logan',
          'Emilee Logan',
          'Donald Logan',
          'Emilee Logan',
          'Donald Logan',
        ].map((item) => {
          return (
            <Option value={item} key={item}>
              {item}
            </Option>
          );
        })}
      </Select>
    </div>
  );
}

export default Index;
