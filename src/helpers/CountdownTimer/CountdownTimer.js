import { useState, useEffect } from 'react';
import './CountdownTimer.css';
import { getRemainingTimeUntilMsTimestamp } from './Utils/CountdownTimerUtils';
import 'react-circular-progressbar/dist/styles.css';

const defaultRemainingTime = {
  seconds: '00',
  minutes: '00',
  hours: '00',
  days: '00',
};

const CountdownTimer = ({
  countdownTimestampMs,
  endedTimeStamp,
  onLiveCourseClose,
}) => {
  const [remainingTime, setRemainingTime] = useState(defaultRemainingTime);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (remainingTime.statusStyle !== 'status-closed')
        updateRemainingTime(countdownTimestampMs, endedTimeStamp);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [countdownTimestampMs, endedTimeStamp, remainingTime.statusStyle]);

  useEffect(() => {
    if (remainingTime.statusStyle === 'status-closed')
      onLiveCourseClose?.(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remainingTime]);

  const updateRemainingTime = (countdown, endedCountDown) => {
    setRemainingTime(
      getRemainingTimeUntilMsTimestamp(countdown, endedCountDown),
    );
  };

  // if (course?.booked) {
  //   const percentage = (course.booked * 100) / course.seats;
  // }

  return (
    <>
      {remainingTime.statusStyle === 'status-closed' ? (
        <span className={`card-course-status ${remainingTime.statusStyle}`}>
          {remainingTime.statusMsg}
        </span>
      ) : (
        <div className="countdown-body">
          {console.log(remainingTime, 'remainingTime')}
          <div className="time-unit">
            <h6>{remainingTime?.days || '00'}</h6>
            <span>
              <small className="text-muted">Days</small>
            </span>
          </div>
          <div className="time-unit">
            <h6>{remainingTime?.hours || '00'}</h6>
            <span>
              <small className="text-muted">Hours</small>
            </span>
          </div>
          <div className="time-unit">
            <h6>{remainingTime?.minutes || '00'}</h6>
            <span>
              <small className="text-muted">Mins</small>
            </span>
          </div>
          <div className="time-unit">
            <h6>{remainingTime?.seconds || '00'}</h6>
            <span>
              <small className="text-muted">Secs</small>
            </span>
          </div>
        </div>
      )}
    </>
  );
};
export default CountdownTimer;
