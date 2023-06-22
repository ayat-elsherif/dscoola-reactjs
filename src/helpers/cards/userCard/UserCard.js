import { Skeleton } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { InstractorAvatarIcon } from '../../../assets/svg';
import ReadOnlyRatings from '../../ratings/ReadOnlyRatings';
import { SolidClock } from '../SVGs';

const UserCard = ({
  creatorInfo,
  instructor,
  isLoading,
  authorCourses,
  isWebinar,
}) => {
  const imgBaseUrl = 'https://dscoola-files.s3.eu-west-1.amazonaws.com';
  if (isLoading) return <Skeleton paragraph={{ rows: 4 }} />;

  return (
    <section className="userCard">
      <div className="course-container">
        {instructor && <div className="userCard-headline">{instructor}</div>}
        <div className="userCard-body">
          <div className="userCard-body-image">
            {creatorInfo?.photo_url ? (
              <img
                src={`${imgBaseUrl}/${creatorInfo?.photo_url}`}
                alt="instructor"
              />
            ) : (
              <InstractorAvatarIcon />
            )}
          </div>
          <div className="userCard-body-details">
            {/* <div className="userCard-body-details-header">
              <Link to={`/instructors/${creatorInfo?.id}`}>
                {creatorInfo?.name}
              </Link>
            </div> */}
            <div className="userCard-body-details-title">
              <p
                className="instructor-name"
                style={{
                  color: '#6a6f73',
                  fontSize: '16px',
                  marginBottom: '5px',
                  fontWeight: 100,
                }}
              >
                Instructor
              </p>
              <Link to={`/instructors/${creatorInfo?.id}`}>
                {creatorInfo?.name}
              </Link>
            </div>
            <div className="userCard-body-details-extra">
              {creatorInfo?.about_me}
            </div>
            <div>
              <img
                src="/assets/images/icons/studentIcon.svg"
                alt=""
                className="icon1"
              />
              <span className="span1">
                {creatorInfo?.totalStudent} Students
              </span>
              <img
                src="/assets/images/icons/Group759.png"
                alt=""
                className="icon1"
              />
              <span className="span1">
                {creatorInfo?.courses
                  ? creatorInfo?.courses
                  : authorCourses
                  ? authorCourses
                  : 0}{' '}
                Courses
              </span>
              <img
                src="/assets/images/icons/MaskGroup81.png"
                alt=""
                className="icon1"
              />
              <span className="span1">
                {creatorInfo?.reviews?.length ||
                  creatorInfo?.getRating?.rating_count}{' '}
                Reviews
              </span>
              {SolidClock}
              <span className="span1">
                {creatorInfo?.webinars ? creatorInfo?.webinars : 25} Webinars
                Mins
              </span>
            </div>
            <div className="userCard-body-details-rating d-flex align-items-center">
              <span className="userCard-body-details-rating-number">
                {creatorInfo?.ratingAvg}
              </span>
              <ReadOnlyRatings
                rating={
                  isWebinar
                    ? parseInt(+creatorInfo?.getRating?.rating_avg)
                    : parseInt(+creatorInfo?.getRating?.rating_count)
                }
                totalRating={
                  isWebinar
                    ? creatorInfo?.getRating?.rating_count
                    : creatorInfo?.getRating?.ratingCount
                }
              />
              {!isWebinar &&
                `(${
                  creatorInfo?.reviews?.length ||
                  creatorInfo?.getRating?.rating_count ||
                  0
                })`}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserCard;
