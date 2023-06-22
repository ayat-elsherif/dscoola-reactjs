import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';

import { UserAvatarIcon } from '../../assets/svg';
import ReadOnlyRatings from '../../helpers/ratings/ReadOnlyRatings';
import { checkIfImageExists } from 'utils';

const ShowReviews = ({ review }) => {
  const [imgExist, setImgExist] = useState(false);

  const CheckImgURL = (url) => {
    checkIfImageExists(url, (exists) => {
      if (exists) setImgExist(true);
      else setImgExist(false);
    });
  };

  useEffect(() => {
    CheckImgURL(review?.photoUrl);
  }, [review]);
  console.log(review, 'reviewreviewreviewreview');
  return (
    <li>
      <div className="reviewings-li">
        <div className="reviewings-li-image">
          {imgExist ? (
            <img
              src={review?.photoUrl}
              alt="student "
              className="instractor-pic"
            />
          ) : (
            <UserAvatarIcon />
          )}
        </div>
        <div className="reviewings-li-disc">
          <div className="reviewings-li-disc-name">
            {review?.userName ? review?.userName : review?.userId}
          </div>

          <div className="d-flex align-items-center">
            {/* <ReadOnlyRatings rating={item.rating} /> */}
            {/* <Rate disabled defaultValue={item.rating} /> */}
            <ReadOnlyRatings
              rating={review?.rating}
              // totalRating={1}
            />
            <span className="reviewings-li-disc-rating-time">
              {dayjs(review?.createdAt).fromNow()}
            </span>
          </div>
          <div className="reviewings-li-disc-comment">{review?.review}</div>
        </div>
      </div>

      {/* <div className="review-divider"></div> */}
    </li>
  );
};

export default ShowReviews;
