import * as React from 'react';
import './rating.scss';
import { Rate } from 'antd';
export default function ReadOnlyRatings({
  rating,
  totalRating,
  justifyContentCenter,
}) {
  //   const [value, setValue] = React.useState(3);

  return (
    <div
      className={`d-flex align-items-center readOnlyRating ${
        justifyContentCenter ? justifyContentCenter : ''
      }`}
    >
      {/* <span className="ratingAverage">{rating}</span> */}
      <Rate allowHalf disabled defaultValue={rating} />
      {/* <Rate disabled allowHalf defaultValue={rating} /> */}
      <span className="ratingTotal">
        {totalRating ? `(${totalRating})` : ''}
      </span>
    </div>
  );
}
