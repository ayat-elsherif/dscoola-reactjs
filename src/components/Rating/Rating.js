import { css } from '@emotion/css';
import { Rate } from 'antd';
import { numberFormat } from 'utils';

function Rating({ disabled, defaultValue, showAvg, count, onChange, ...rest }) {
  const RatingStyles = css`
    display: flex;
    gap: 0.3rem;
    align-items: center;

    .rating {
      font-weight: 600;
      font-size: 1.2rem;
      color: #f2b636;
      li {
        margin-inline-end: 0.3rem !important;
      }
    }

    .avrage {
      font-size: 1.4rem;
      line-height: 2.1rem;
      color: #f2b636;
    }
    .count {
      font-size: 1.2rem;
      line-height: 1.8rem;
      color: #6a6f73;
    }
  `;

  return (
    <div className={RatingStyles}>
      {showAvg ?? <div className="avrage">{defaultValue}</div>}
      <Rate
        disabled={disabled}
        defaultValue={defaultValue}
        className="rating"
        onChange={onChange}
        {...rest}
      />
      {!!count && <div className="count">({numberFormat(count)})</div>}
    </div>
  );
}

export default Rating;
