import { useState } from 'react';

export const AvaliableDays = ({ days, onPickDay }) => {
  const [currentDay, setCurrentDay] = useState();
  return (
    <div className="time-slots-wrapper">
      {days ? (
        days?.map((day) => (
          <div
            onClick={() => {
              if (!day?.isBooked) {
                setCurrentDay(day);
                onPickDay(day);
              }
            }}
            className={`time-slots-card ${day?.isBooked ? 'disabled' : ''} ${
              currentDay?.time === day?.time ? 'active-day' : ''
            }`}
          >
            <p>{day?.time}</p>
          </div>
        ))
      ) : (
        <p className="empty-slots">There's No Slots</p>
      )}
    </div>
  );
};
