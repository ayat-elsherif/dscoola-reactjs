import React from 'react';
import { Link } from 'react-router-dom';
import ItemMember from '../../../../../components/common/dashboard/components/members';

import './index.scss';

const UpComingMeeting = ({ members }) => {
  return (
    <>
      <h3 className='dashboard-page-title'>Yalla online student groups</h3>
      <div className='upcoming-meeting'>
        <div className='header'>
          <h4>Upcomming Meeting</h4>
          <h3>Discussions: Adobe Illustrator 2021 Ultimate Course</h3>
          <div className='hosted-by'>
            <span className='label'>Hosted by: </span>
            <span className='value'>Vladimir Raykov</span>
          </div>
        </div>
        <div className='meeting-members'>
          <h5>Meeting members</h5>
          <ItemMember members={members} />
        </div>
        <div className='date'>May 26 , 2022 • 5:00 - 6:30 PM</div>
        <div className='upcoming-meeting-footer'>
          <button className='main-btn'>Join meeting</button>
          <Link to='#'>Show all Meeting</Link>
        </div>
      </div>
    </>
  );
};

export default UpComingMeeting;
