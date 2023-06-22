import React from 'react';
import { startYallaOnlineTop, startYallaOnlineBottom } from './SVGs';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

function BecomeInstructorNow() {
  return (
    <div className="becomeInstructorNow takeActionSection">
      <div className="actionTopSvg">{startYallaOnlineTop}</div>
      <div className="headSection">
        <h2>Start helping your colleagues</h2>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting{' '}
          <br />
          industry.
        </p>
        <Link to="/student-dashboard/my-courses">
          <Button type="primary" style={{ margin: 'auto' }}>
            Let's Start Now
          </Button>
        </Link>
      </div>
      <div className="actionBottomSvg">{startYallaOnlineBottom}</div>
    </div>
  );
}

export default BecomeInstructorNow;
