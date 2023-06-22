import { Select } from 'antd';
import React from 'react';
import './formControls.scss';

function CategoryBox({ txt }) {
  return (
    <div className="sortBy mClass">
      <Select aria-label="Default select example">
        <Select.Option>{txt}</Select.Option>
        <Select.Option>{txt}</Select.Option>
        <Select.Option>{txt}</Select.Option>
        <Select.Option>{txt}</Select.Option>
        <Select.Option>{txt}</Select.Option>
      </Select>
    </div>
  );
}

export default CategoryBox;
