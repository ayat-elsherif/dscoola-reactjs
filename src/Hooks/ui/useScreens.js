// /* eslint-disable react-hooks/exhaustive-deps */
// import { useEffect, useState } from 'react'

// function useIsScreenGreater(size = 992) {
//   const [isGreater, setIsGreater] = useState(false)

//   const observeScreen = () => {
//     if (window.innerWidth >= size) setIsGreater(true)
//     else setIsGreater(false)
//   }
//   useEffect(() => {
//     observeScreen()
//     window.addEventListener('resize', observeScreen)
//     return () => {
//       window.removeEventListener('resize', observeScreen)
//     }
//   }, [size])

//   return isGreater
// }
// export default useIsScreenGreater
/* eslint-disable react-hooks/exhaustive-deps */
import { Grid } from 'antd';
const { useBreakpoint } = Grid;

function useScreens() {
  const { xs, sm, md, lg, xl, xxl } = useBreakpoint();

  return { isXs: xs, isSm: sm, isMd: md, isLg: lg, isXl: xl, isXxl: xxl };
}
export default useScreens;
