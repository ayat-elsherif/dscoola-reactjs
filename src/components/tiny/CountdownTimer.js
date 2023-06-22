import { css } from '@emotion/css';
import { Divider } from 'antd';
import { useCountdown } from 'Hooks/utils/useCountdown';

// const targetDate = '2023-3-17 10:37:36';
// function CountdownTimer() {
function CountdownTimer({ targetDate }) {
  const CountdownTimerStyles = css`
    clip-path: polygon(0 0, 100% 0, 90% 100%, 0 100%);
    background-color: #f4f5f9;
    display: flex;

    .item {
      display: flex;
      flex-direction: column;

      font-size: 0.8rem;
      color: #909193;
      line-height: 1.2;
      .number {
        font-weight: 500;
        font-size: 1.4rem;
        color: #7e59d1;
      }
    }
    .divider {
      height: 1.4rem;
      margin-top: 0.3rem;
      background-color: #7e59d1;
      width: 1px;
    }
  `;

  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  if (days + hours + minutes + seconds <= 0) return null;
  return (
    <div className={CountdownTimerStyles}>
      <div className="item">
        <span className="number">{days}</span>
        <span className="label">Day</span>
      </div>
      <Divider type="vertical" className="divider" />
      <div className="item">
        <span className="number">{hours}</span>
        <span className="label">hrs</span>
      </div>
      <Divider type="vertical" className="divider" />
      <div className="item">
        <span className="number">{minutes}</span>
        <span className="label">min</span>
      </div>
      <Divider type="vertical" className="divider" />
      <div className="item">
        <span className="number">{seconds}</span>
        <span className="label">Sec</span>
      </div>
    </div>
  );
}

export default CountdownTimer;
