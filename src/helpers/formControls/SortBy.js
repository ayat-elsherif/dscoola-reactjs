import React from 'react';
import './formControls.scss';
import { useDispatch } from 'react-redux';
import { sendSearchQuery } from '../sideFilter/sendSearchQuery';
import coursesAPI, { protectAxios } from '../../apis/coursesAPI';
import { useNavigate } from 'react-router-dom';
import { Select } from 'antd';
function SortBy({
  sortOptions,
  mClass,
  mainPath,
  filterBy,
  dispatchedAction,
  fetchStart,
  initialAPIs,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accesstoken = localStorage.getItem('access_token');

  let initialAPI = '';
  let initialAuthAPI = '';

  if (mainPath == '/webinars') {
    initialAuthAPI = '/webinar/filter?perpage=12&';
    initialAPI = '/webinar/filter?perpage=12&';
  } else {
    initialAuthAPI = '/courses/auth/filter?perpage=12&';
    initialAPI = '/courses/fiter?perpage=12&';
  }

  const changeUrlParam = (e) => {
    const result = sendSearchQuery(e.target.value, '', `sort[]`, filterBy);
    // console.log(e.target.value, "result in sort");

    const fetchCourses = async (result) => {
      dispatch(fetchStart());
      if (accesstoken) {
        const response = await protectAxios
          .get(initialAuthAPI + result, {
            headers: { Authorization: `bearer ${accesstoken}` },
          })
          .catch((err) => console.log('err', err));

        if (response) {
          console.log(response.data.data, 'result in sort');

          dispatch(dispatchedAction(response.data.data));
        }
      } else {
        const response = await protectAxios
          .get(initialAPI + result)
          .catch((err) => console.log('err', err));

        if (response) {
          dispatch(dispatchedAction(response.data.data));
        }
      }
    };

    fetchCourses(result);
    // navigate({ pathname: mainPath, search: result });
  };
  return (
    <div className={'sortBy ' + mClass}>
      <Select
        aria-label="Default select example"
        onChange={(e) => changeUrlParam(e)}
      >
        <Select.Option disabled selected key={0}>
          Sort By
        </Select.Option>
        {sortOptions.map((opt, i) => (
          <Select.Option value={opt.value} key={i + 1}>
            {opt.label}
          </Select.Option>
        ))}
      </Select>
    </div>
  );
}

export default SortBy;
