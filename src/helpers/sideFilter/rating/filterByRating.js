import React from 'react';

import { Collapse, Checkbox } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { sendSearchQuery } from '../sendSearchQuery';
import { coursesSort } from '../sortFilterEntries';
import coursesAPI from '../../../apis/coursesAPI';
import { toNumber } from 'lodash';
import Rating from 'components/Rating/Rating';
const { Panel } = Collapse;

export default function FilterByRating({
  mainPath,
  courses,
  filterBy,
  dispatchedAction,
  fetchStart,
  getTotalNum,
}) {
  const dispatch = useDispatch();
  const accesstoken = localStorage.getItem('access_token');

  const changeUrlParam = (e) => {
    const result = sendSearchQuery(
      toNumber(e.target.value),
      e.target.checked,
      'rating[]',
      filterBy,
    );
    const fetchCourses = async (result) => {
      dispatch(fetchStart());

      if (accesstoken) {
        const response = await coursesAPI
          .get('/courses/auth/filter?perpage=12&' + result, {
            headers: { Authorization: `bearer ${accesstoken}` },
          })
          .catch((err) => console.log('err', err));

        if (response.data) {
          dispatch(dispatchedAction(response.data.data));
          dispatch(getTotalNum(response.data.total));
        }
      } else {
        const response = await coursesAPI
          .get('/courses/fiter?perpage=12&' + result)
          .catch((err) => console.log('err', err));

        if (response.data) {
          dispatch(dispatchedAction(response.data.data));
          dispatch(getTotalNum(response.data.total));
        }
      }
    };

    fetchCourses(result);
    // navigate({ pathname: mainPath, search: result });
  };

  let result = coursesSort(courses, 'rating_value');
  // console.log(result, "result in rating ");
  let ratingFilter = [];
  let loopArr = [];
  if (Object.keys(result).length === 0) {
    return null;
  } else {
    for (let key in result) {
      if (key != 'undefined') {
        console.log(Math.round(key), 'key in rating');
        key = Math.round(key);
        if (loopArr.includes(key)) {
          // console.log(key, " ker in loopArr");
        } else {
          loopArr.push(key);
        }
      }
    }
    console.log(loopArr, 'loopArr itself');
    for (let key in loopArr) {
      console.log(key, 'key', loopArr[key], 'value');
      if (key == 3 || key == 4 || key == 5) {
        console.log(key, 'key in loopArr');
        ratingFilter.push(
          <li className={'rating' + key} key={key}>
            <Checkbox onChange={(e) => changeUrlParam(e)} value={key}>
              {/* <Rating
                defaultValue={toNumber(key)}
                precision={toNumber(0.1)}
                readOnly
              /> */}
              <Rating defaultValue={toNumber(key)} disabled showAvg={false} />
              {/* & Up <span>({loopArr[key]})</span>TODO: work on it later */}
            </Checkbox>
          </li>,
        );
      }
    }
  }

  return (
    <>
      {ratingFilter.length > 0 ? (
        <Collapse defaultActiveKey={['1']}>
          <Panel header="Rating" key="1">
            <ul className="unstyled-list">{ratingFilter}</ul>
          </Panel>
        </Collapse>
      ) : (
        ''
      )}
    </>
  );
}
