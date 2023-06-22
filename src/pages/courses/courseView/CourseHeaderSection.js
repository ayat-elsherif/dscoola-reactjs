import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import ReadOnlyRatings from '../../../helpers/ratings/ReadOnlyRatings';
import { UserAvatarIcon } from '../../../assets/svg';
import { Link } from 'react-router-dom';
import { Skeleton, Typography } from 'antd';
import { checkIfImageExists } from 'utils';

const Courseheadersection = ({ myCourse, isLoading }) => {
  const imgBaseUrl = 'https://dscoola-files.s3.eu-west-1.amazonaws.com';
  const [imgExist, setImgExist] = useState(false);
  const { Paragraph } = Typography;
  const handleGetShortDesc = (description) => {
    if (description?.length > 60) return description?.slice(0, 60) + '...';
    else return description;
  };

  const CheckImgURL = (url) => {
    checkIfImageExists(url, (exists) => {
      if (exists) setImgExist(true);
      else setImgExist(false);
    });
  };

  useEffect(() => {
    CheckImgURL(`${imgBaseUrl}/${myCourse?.course?.author?.photo_url}`);
  }, [myCourse?.course?.author?.photo_url]);

  if (isLoading)
    return (
      <div className="container" style={{ paddingBottom: '15px' }}>
        <div className="course-container1">
          <Skeleton active paragraph={{ rows: 2 }} />
          <Skeleton active avatar paragraph={{ rows: 1 }} />
        </div>
      </div>
    );

  return (
    <section className="container">
      <div className="course-container1">
        <div className="course-headline">{myCourse?.course?.title}</div>
        <div className="course-Info">
          <Paragraph
            ellipsis={{ rows: 3, expandable: true, symbol: 'Show More' }}
          >
            {myCourse?.course?.short_description}
          </Paragraph>
        </div>
        <div className="instractor-holder">
          <div className="info">
            <div>
              {imgExist ? (
                <img
                  className="course-header-image"
                  src={`${imgBaseUrl}/${myCourse?.course?.author?.photo_url}`}
                  alt="instractor"
                />
              ) : (
                <UserAvatarIcon />
              )}
            </div>
            <div className="first-section">
              <div className="instractor-name">
                <Link to={`/instructors/${myCourse?.course?.user_id}`}>
                  {myCourse?.course?.author?.name}
                </Link>
              </div>
              <div className="instractor-rating">
                <ReadOnlyRatings
                  rating={parseInt(
                    myCourse?.course?.author?.getRating?.rating_count,
                  )}
                  totalRating={
                    myCourse?.course?.author?.getRating?.rating_count
                  }
                />
              </div>
            </div>
            <div className="divider"></div>
            <div className="sec-section">
              <div className="last-updated">
                <span>Last updated</span>
                {myCourse?.course?.updated_at &&
                  dayjs(myCourse?.course?.updated_at).format('MM - YYYY')}
              </div>
              <div>
                <img
                  className="icon-small"
                  src="/assets/images/icons/studentIcon.svg"
                  alt=""
                />
                <span className="enrolled">
                  {myCourse?.total_enrolled} enrolled
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Courseheadersection;
