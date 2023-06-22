import { useCallback } from 'react';
import { useEffect, useState } from 'react';

let oldScrollY = 0;
function useScrollY(initStatus) {
  const [isScrollUp, setIsScrollUp] = useState(false);
  const [isScrollDown, setIsScrollDown] = useState(false);
  // const [oldScrollY, setOldScrollY] = useState(0);

  useEffect(() => {
    if (initStatus === 'down') setIsScrollDown(true);
    else setIsScrollUp(true);
  }, [initStatus]);

  const observeScroll = useCallback(() => {
    if (window.scrollY > oldScrollY) {
      setIsScrollDown(true);
      setIsScrollUp(false);
    } else {
      setIsScrollDown(false);
      setIsScrollUp(true);
    }

    // setOldScrollY(window.scrollY);
    oldScrollY = window.scrollY;
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', observeScroll);
    // CLEAN UP
    return () => window.removeEventListener('scroll', observeScroll);
  }, [observeScroll]);

  return { isScrollUp, isScrollDown, scrollY: oldScrollY };
}

export default useScrollY;
