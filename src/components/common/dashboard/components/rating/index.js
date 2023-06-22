import Rating from 'components/Rating/Rating';
import React, { useState } from 'react';

import './index.scss';

function CustomRating({ readOnly = false, ratingNumber }) {
  const [value, setValue] = useState(2);

  return (
    // <div className="custom-rating">
    //   {!readOnly ? (
    //     <Rating
    //       name="simple-controlled"
    //       value={value}
    //       precision={0.5}
    //       onChange={(event, newValue) => {
    //         setValue(newValue);
    //       }}
    //     />
    //   ) : (
    //     <Rating
    //       name="read-only"
    //       value={ratingNumber}
    //       precision={0.5}
    //       readOnly
    //     />
    //   )}
    // </div>
    <div className="custom-rating">
      <Rating
        defaultValue={ratingNumber}
        disabled={readOnly}
        showAvg={false}
        onChange={(newValue) => {
          setValue(newValue);
        }}
      />
    </div>
  );
}

export default CustomRating;
