import { useLayoutEffect, useState, useCallback } from 'react'

// Increase/decrease these values for header style compatibility
const scrollYToFixed = 200
const headerHeight = 90
// =============================

const headerTrack = scrollYToFixed + headerHeight

function useHeaderFixedStyle() {
  const [isFixed, setIsFixed] = useState(false)
  const [headerTop, setHeaderTop] = useState(null)

  const observeScroll = useCallback(() => {
    const startFixed = window.scrollY >= scrollYToFixed
    const topValue = window.scrollY - headerTrack

    if (startFixed) {
      setIsFixed(true)

      if (topValue <= 0) {
        setHeaderTop(topValue)
      }
      if (window.scrollY >= headerTrack) {
        setHeaderTop(0)
      }
    } else {
      setIsFixed(false)
      setHeaderTop(20)
    }
  }, [])

  useLayoutEffect(() => {
    observeScroll()
    window.addEventListener('scroll', observeScroll)

    return () => window.removeEventListener('scroll', observeScroll)
  }, [observeScroll])

  let style = {
    minHeight: headerHeight,
    top: headerTop,
    zIndex: 999,
    width: '100%',
  }

  style = isFixed
    ? {
        ...style,
        position: 'fixed',
      }
    : {
        ...style,
        position: 'absolute',
      }

  return { headerStyle: style, isFixed }
}
export default useHeaderFixedStyle
