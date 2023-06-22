import { Divider } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { myCourses } from '../data';
import './index.scss';
const MyCourses = () => {
  function cutlogngString(str) {
    return str.length > 21 ? str.slice(0, 21 - 1) + '...' : str;
  }
  return (
    <div className="home-courses">
      <div className="home-courses_header">
        <h4>My Courses</h4>
        <Link to="#">View All</Link>
      </div>
      <div className="custom-divider"></div>
      {myCourses?.map((item, index) => {
        return (
          <>
            <div className="home-courses_body" key={index}>
              <div className="main-details">
                <div className="photo">
                  <img src={item?.image_url} />
                </div>
                <div className="name">
                  <div>{cutlogngString(item?.title)}</div>
                  <div>${item?.price}</div>
                </div>
              </div>
              <div className="more-details">
                <div>$ {item?.total_price}</div>
                <div>{item?.sold_number} Sold</div>
              </div>
            </div>
            <div className="custom-divider"></div>
          </>
        );
      })}
    </div>
  );
};

export default MyCourses;
