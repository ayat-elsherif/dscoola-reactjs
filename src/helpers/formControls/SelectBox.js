import React, { useState } from 'react';
import './formControls.scss';
import { useDispatch } from 'react-redux';
import { protectAxios } from '../../apis/coursesAPI';
import { fetchAllYallaOnline } from '../../features/yallaonline/allYallaOnline';
import { Select } from 'antd';

function SelectBox({ options, singleCourseId, filterValue }) {
  const [searchValue, setSearchValue] = useState();
  const [totalItems, setTotalItems] = useState();

  const dispatch = useDispatch();
  const onChangeCheck = (value) => {
    filterValue(value);
    // console.log(value, "value in selectbox");
  };
  const optionsList = options.map((option) => (
    <>
      <option key={option.key} value={option.key}>
        {option.title}
      </option>
    </>
  ));
  return (
    <div className="SelectBox">
      <Select
        aria-label="Default select example"
        onChange={(e) => onChangeCheck(e.target.value)}
      >
        <Select.Option key={10} disabled selected>
          Filter By
        </Select.Option>
        {optionsList}
      </Select>
    </div>
  );
}

export default SelectBox;
