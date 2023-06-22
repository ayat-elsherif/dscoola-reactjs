import { css } from '@emotion/css'
import cls from 'classnames'

function OwnBox({
  children,
  align,
  justify,
  direction,
  gap,
  wrap,
  p,
  m,
  style,
  className,
  ...rest
}) {
  const BoxStyles = css``
  return (
    <div
      className={cls(BoxStyles, className)}
      style={{
        display: 'flex',
        flexDirection: direction || 'row',
        alignItems: align || 'start',
        justifyContent: justify || 'start',
        gap: gap || '2rem',
        flexWrap: wrap ? 'wrap' : 'nowrap',
        padding: p,
        margin: m,
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  )
}

export default OwnBox
