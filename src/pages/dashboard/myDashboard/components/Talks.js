import React from 'react';
import { Link } from 'react-router-dom';
import { CalenderIcon, TimeIcon } from '../../../../assets/svg';

const Talks = () => {
  return (
    <div className='talks'>
      <h3 className='dashboard-page-title'>Webinars and Scoola Talks</h3>
      <div className='talks-card'>
        <div className='title'>
          Zoom meeting : Agile and Scrum for Product Owners.
        </div>
        <div className='created-by'>
          <span>Created by : </span>
          <span>Instructor name</span>
        </div>
        <div className='date-duration'>
          <div className='data'>
            <CalenderIcon /> <span>Jan 10,2022 3:26 PM</span>
          </div>
          <div className='duration'>
            <TimeIcon /> <span>1h:20m</span>
          </div>
        </div>
        <div className='upcoming-meeting-footer'>
          <button className='main-btn'>Join meeting</button>
          <Link to='#'>Show all Meeting</Link>
        </div>
      </div>
      <div className='talks-card'>
        <div className='title'>
          Zoom meeting : Agile and Scrum for Product Owners.
        </div>
        <div className='created-by'>
          <span>Created by : </span>
          <span>Instructor name</span>
        </div>
        <div className='date-duration'>
          <div className='data'>
            <CalenderIcon /> <span>Jan 10,2022 3:26 PM</span>
          </div>
          <div className='duration'>
            <TimeIcon /> <span>1h:20m</span>
          </div>
        </div>
        <div className='upcoming-meeting-footer'>
          <button className='main-btn'>Join meeting</button>
          <Link to='#'>Show all Meeting</Link>
        </div>
      </div>
    </div>
  );
};

export default Talks;
