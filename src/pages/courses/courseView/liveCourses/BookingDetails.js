import React from 'react';
import { Progress } from 'antd';
import CountdownTimer from '../../../../helpers/CountdownTimer/CountdownTimer';
import dayjs from 'dayjs';

function BookingDetails({ myCourse, onLiveCourseClose }) {
  const bookSeats = myCourse?.course?.max_attends
    ? Math.ceil(
        (myCourse?.total_enrolled * 100) / myCourse?.course?.max_attends,
      )
    : 0;

  return (
    <div className="bookingDetails">
      <div className="bookingDetails-progress">
        <Progress
          type="circle"
          percent={bookSeats}
          status={''}
          showInfo={false}
        />
        <p>{bookSeats}% booked, the Course will close in</p>
      </div>

      <div className="bookingDetails-countdown">
        <CountdownTimer
          countdownTimestampMs={myCourse?.course?.start_time || dayjs()}
          endedTimeStamp={myCourse?.course?.start_time || dayjs()}
          onLiveCourseClose={onLiveCourseClose}
        />
      </div>
    </div>
  );
}

export default BookingDetails;
