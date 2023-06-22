import React from 'react';
import { dateIcon, courseLength, clockIcon } from '../../SVGs.js';
import dayjs from 'dayjs';

export default function StartDate({ myCourse }) {
  return (
    <div className="overLayer">
      <div className="row">
        <div className="col-xl-3 col-lg-4 d-flex align-items-center justify-content-center">
          <div className="svg-img">{dateIcon}</div>
          <div className="">
            <span>Start Date</span>
            <h6>
              {' '}
              {myCourse?.course?.start_time
                ? dayjs(myCourse?.course?.start_time).format('MMM DD, YYYY')
                : 'not specified'}
            </h6>
          </div>
        </div>
        <div className="col-xl-3 col-lg-4 d-flex align-items-center justify-content-center">
          <div className="svg-img">{dateIcon}</div>
          <div className="">
            <span>End Date</span>
            <h6>
              {myCourse?.course?.end_time
                ? dayjs(myCourse?.course?.end_time).format('MMM DD, YYYY')
                : 'not specified'}
            </h6>
          </div>
        </div>
        <div className="col-xl-3 col-lg-4 d-xl-flex align-items-center justify-content-center d-none">
          <div className="svg-img">{courseLength}</div>
          <div className="">
            <span>course length</span>
            <h6>30 session</h6>
          </div>
        </div>
        <div className="col-xl-3 col-lg-4 d-flex align-items-center justify-content-center">
          <div className="svg-img">{clockIcon}</div>
          <div className="">
            <span>session duration</span>
            <h6> 1 hour 20 min</h6>
          </div>
        </div>
      </div>
    </div>
  );
}
