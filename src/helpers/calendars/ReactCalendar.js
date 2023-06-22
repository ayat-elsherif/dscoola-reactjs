import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function ReactCalendar() {
  const [value, onChange] = useState(new Date());
  const disabledDates = [
    new Date(2022, 5, 20),
    new Date(2022, 5, 18),
    new Date(2022, 6, 10),
    new Date(2022, 6, 14),
    new Date(2022, 5, 22),
    new Date(2022, 5, 24),
  ];

  return (
    <>
      <h6>Select Date & time</h6>
      <div className="dateAndTime">
        <Calendar
          onChange={onChange}
          value={value}
          tileDisabled={({ date, view }) =>
            view === "month" && // Block day tiles only
            disabledDates.some(
              (disabledDate) =>
                date.getFullYear() === disabledDate.getFullYear() &&
                date.getMonth() === disabledDate.getMonth() &&
                date.getDate() === disabledDate.getDate()
            )
          }
        />
        {console.log(value)}
        {/* {value.toString()} */}
      </div>
    </>
  );
}

export default ReactCalendar;
