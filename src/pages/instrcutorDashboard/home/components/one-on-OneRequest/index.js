import { Divider } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { EllipsIcon } from '../../../../../assets/svg';
import { oneRequest } from '../data';
import './index.scss';
const OneOnOneRequest = () => {
  function cutlogngString(str) {
    return str.length > 21 ? str.slice(0, 21 - 1) + '...' : str;
  }
  return (
    <div className='one-on-one-request'>
      <div className='one-on-one-request_header'>
        <h4>One-on-One Request</h4>
        <Link to='#'>View All</Link>
      </div>
      <div className='custom-divider'></div>
      {oneRequest.map((item, index) => {
        return (
          <>
            <div className='one-on-one-request_body' key={index}>
              <div className='main-details'>
                <div className='photo'>
                  <img src={item.image_url} />
                </div>
                <div className='name'>
                  <div>{cutlogngString(item.name)}</div>
                  <Link to='#'>View Details</Link>
                </div>
              </div>
              <div className='more-details'>
                <EllipsIcon />
              </div>
            </div>
            <div className='custom-divider'></div>
          </>
        );
      })}
    </div>
  );
};

export default OneOnOneRequest;
