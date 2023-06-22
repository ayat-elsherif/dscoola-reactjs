import { css } from '@emotion/css';
import checkImg from 'assets/icons/check.svg';

function StepsItem({ title, icon, isActive, isChecked, isClickAble, onClick }) {
  const StepsItemStyles = css`
    min-width: 13rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.4rem;
    cursor: ${isClickAble ? 'pointer' : 'auto'};

    font-size: 2rem;
    line-height: 2.2rem;
    letter-spacing: -0.408px;
    color: ${isActive ? '#058B92' : '#000'};
    text-align: center;

    .img-wrapper {
      width: 8.3rem;
      height: 8.3rem;
      border-radius: 50%;
      border: 1px solid rgba(0, 0, 0, 0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: ${isChecked ? '#058B92' : 'unset'};
      img {
        width: 4.5rem;
      }
    }
  `;

  return (
    <div className={StepsItemStyles} onClick={onClick}>
      <div className="img-wrapper">
        <img src={isChecked ? checkImg : icon} alt="step" />
      </div>
      {title}
    </div>
  );
}

export default StepsItem;
