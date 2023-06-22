import { css } from '@emotion/css';
import { Button } from 'antd';
import { CloseRoundedIcon, CompleteIcon, SoundWavesImg } from 'assets/svg';

function SoundRecordPopup({ onFinish, onCancel, length }) {
  const SoundRecordPopupStyles = css`
    position: relative;
    padding: 1.6rem 1.2rem;
    background: #ffffff;
    box-shadow: 0px 0px 6px #24242429;
    border-radius: 4px;
    z-index: 99;
    .btn-clear {
      position: absolute;
      top: -0.9rem;
      right: -0.9rem;

      min-width: auto;
      min-height: auto;
      width: 1.8rem;
      height: 1.8rem;
    }
    .btn-done {
      position: absolute;
      bottom: -1rem;
      left: calc(50% - 1rem);

      min-width: auto;
      min-height: auto;
      width: 2rem;
      height: 2rem;
    }

    .content {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
  `;

  return (
    <div className={SoundRecordPopupStyles}>
      <Button
        type="link"
        shape="circle"
        icon={<CloseRoundedIcon />}
        className="btn-clear"
        onClick={onCancel}
      />
      <div className="content">
        {/* <div className="time">{dayjs({ second: length }).format('mm:ss')}</div> */}
        <div className="time">
          {/* {dayjs
            .duration({
              seconds: length,
            })
            .format('mm:ss')} */}
          {/* {getTimeFromSeconds(length)} */}
          {length}
        </div>
        <SoundWavesImg width={154} />
      </div>
      <Button
        type="link"
        shape="circle"
        icon={<CompleteIcon />}
        className="btn-done"
        onClick={onFinish}
      />
    </div>
  );
}

export default SoundRecordPopup;
