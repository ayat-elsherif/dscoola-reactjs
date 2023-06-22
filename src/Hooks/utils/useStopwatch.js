import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import uts from 'dayjs/plugin/utc';

const getTimeFromSeconds = (seconds, format = 'mm:ss') => {
  const oneSecondAgo = dayjs().subtract(seconds, 'second');
  const dur = dayjs.duration(dayjs().diff(oneSecondAgo));

  return dayjs.extend(uts).utc(dur.asMilliseconds()).format(format);
};

function useStopwatch() {
  const [count, setCount] = useState(0);
  const [isTimer, setIsTimer] = useState(false);

  useEffect(() => {
    if (isTimer) {
      const interval = setInterval(() => {
        setCount((prev) => prev + 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isTimer]);

  const startTimer = () => {
    setCount(0);
    setIsTimer(true);
  };
  const stopTimer = () => {
    setIsTimer(false);
  };

  const format = (format) => getTimeFromSeconds(count, format);

  return { startTimer, stopTimer, format, count };
}

export default useStopwatch;
