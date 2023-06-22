import React, { useEffect, useState } from 'react';
import { Input } from 'antd';
import { Searchcon } from '../../../../../assets/svg';
import './index.scss';

const SearchInput = ({ callback, reset }) => {
  const [search, setSearch] = useState('');
  const onChange = (e) => {
    setSearch(e.target.value);
    callback(e.target.value);
  };
  useEffect(() => {
    setSearch(reset);
  }, [reset]);
  return (
    <div className='input-search-container'>
      <Input
        size='large'
        placeholder='Search by name'
        className='search-input'
        value={search}
        onChange={(e) => onChange(e)}
      />
      <span className='search-icon'>
        <Searchcon />
      </span>
    </div>
  );
};

export default SearchInput;
