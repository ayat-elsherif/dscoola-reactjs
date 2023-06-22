import { Divider } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import ReadOnlyRatings from '../../../../../helpers/ratings/ReadOnlyRatings';
import { studentsFeedback } from '../data';
import './index.scss';
const StudentFeedback = () => {
  function cutlogngString(str, n) {
    return str.length > n ? str.slice(0, n - 1) + '...' : str;
  }
  return (
    <div className='studentFeedback'>
      <div className='studentFeedback_header'>
        <h4>Student Feedback</h4>
        <Link to='#'>View All</Link>
      </div>
      <div className='custom-divider'></div>
      {studentsFeedback.map((item, index) => {
        return (
          <>
            <div className='studentFeedback_body' key={index}>
              <div className='main-details'>
                <div className='photo'>
                  <img src={item.image_url} />
                </div>
                <div className='name'>
                  <div>{cutlogngString(item.name, 21)}</div>
                  <div>{cutlogngString(item.desc, 24)}</div>
                </div>
              </div>
              <div className='more-details'>
                <ReadOnlyRatings rating={item.rate} />
                <Link to='#'>Full Review</Link>
              </div>
            </div>
            <div className='custom-divider'></div>
          </>
        );
      })}
    </div>
  );
};

export default StudentFeedback;
