import { Button } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { becomeinstructor } from './SVGs';

function BecomeInstructorNow() {
  const navigate = useNavigate();
  return (
    <div className="becomeInstructorNow takeActionSection">
      {becomeinstructor}
      <div className="headSection">
        <h2>Become an instructor today</h2>
        <p>
          It is a long established fact that a reader will be distracted <br />
          by the readable content of a page
        </p>
        <Button
          type="primary"
          style={{ maxWidth: 200, margin: 'auto' }}
          onClick={() => navigate('/become-instructor/register')}
        >
          become an instructor
        </Button>
      </div>
    </div>
  );
}

export default BecomeInstructorNow;
