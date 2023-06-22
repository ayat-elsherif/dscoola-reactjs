import React from 'react';
import { Input } from 'antd';
import './index.scss';
const { Search } = Input;

const TopbarSearch = () => {
  return (
    <Search placeholder="search" enterButton className="d-none d-xl-block" />
  );
};

export default TopbarSearch;
