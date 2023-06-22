import dayjs from "dayjs";

export function getRemainingTimeUntilMsTimestamp(timestampMs, endedTimeStamp) {
  const timestampDayjs = dayjs(timestampMs);
  const endedTimeStampDayjs = dayjs(endedTimeStamp);
  const nowDayjs = dayjs();
  let status = {};
  // const showTimeStamp={}

  if (timestampDayjs.isBefore(nowDayjs)) {
    status = {
      statusMsg: "Currently Closed",
      statusStyle: "status-closed",
      // seconds: getRemainingSeconds(0),
      // minutes: getRemainingMinutes(0),
      // hours: getRemainingHours(0),
      // days: getRemainingDays(0),
    };
  } else if (endedTimeStampDayjs.isBefore(nowDayjs)) {
    status = {
      statusMsg: "Closed, reopening in",
      statusStyle: "status-reopened",
      seconds: getRemainingSeconds(nowDayjs, timestampDayjs),
      minutes: getRemainingMinutes(nowDayjs, timestampDayjs),
      hours: getRemainingHours(nowDayjs, timestampDayjs),
      days: getRemainingDays(nowDayjs, timestampDayjs),
    };
  } else {
    status = {
      statusMsg: "closes in",
      statusStyle: "status-other",
      seconds: getRemainingSeconds(nowDayjs, endedTimeStampDayjs),
      minutes: getRemainingMinutes(nowDayjs, endedTimeStampDayjs),
      hours: getRemainingHours(nowDayjs, endedTimeStampDayjs),
      days: getRemainingDays(nowDayjs, endedTimeStampDayjs),
    };
  }
  return status;
}

function getRemainingSeconds(nowDayjs, timestampDayjs) {
  const seconds = timestampDayjs.diff(nowDayjs, "seconds") % 60;
  return padWithZeros(seconds, 2);
}

function getRemainingMinutes(nowDayjs, timestampDayjs) {
  const minutes = timestampDayjs.diff(nowDayjs, "minutes") % 60;
  return padWithZeros(minutes, 2);
}

function getRemainingHours(nowDayjs, timestampDayjs) {
  const hours = timestampDayjs.diff(nowDayjs, "hours") % 24;
  return padWithZeros(hours, 2);
}

function getRemainingDays(nowDayjs, timestampDayjs) {
  const days = timestampDayjs.diff(nowDayjs, "days");
  return days.toString();
}

function padWithZeros(number, minLength) {
  const numberString = number.toString();
  if (numberString.length >= minLength) return numberString;
  return "0".repeat(minLength - numberString.length) + numberString;
}
