import { Button } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

function SingleAppointment() {
  return (
    <div className="singleAppointment">
      <div>
        <span className="appointmentStatus upcoming">Upcoming Appointment</span>
        <p>Discussions: Adobe Illustrator 2021 Ultimate Course</p>
        <small className="text-muted">
          With instructor: <Link to={'#'}>Vladimir Raykov</Link>
        </small>
      </div>
      <div className="text-end">
        <small>June 16, 2022 • 3:00 Pm</small>
        <div className="btnGroup">
          <Button type="primary" danger size="small">
            Delete
          </Button>
          <Button type="primary" size="small">
            update
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SingleAppointment;
