import React from 'react';
import { Rate } from 'antd';
import dayjs from 'dayjs';
import './courseCard.scss';
import { clock } from '../../../../assets/svg/Clock';
import { student } from '../../../../assets/svg/Student';
import { calcPrice } from '../calcPrice';
import { shortenText } from '../shortenText';
import LiveIcon from '../../../../assets/svg/LiveIcon';
import ClockIcon from '../../../../assets/svg/ClockIcon';
import { Delete } from '../../../../assets/svg/Delete';
import { smallheart } from '../../../../assets/svg/SmallHeart';
import { Link } from 'react-router-dom';
import ReadOnlyRatings from 'helpers/ratings/ReadOnlyRatings';

export default function CourseCardHorizontal({
  course,
  isYallaOnline,
  isTalk,
  isCart,
}) {
  let totalBooked = 0;
  if (course?.type === 'liveClass') {
    totalBooked = Math.floor(
      (course?.max_attends * course?.totalEnrolled) / 100,
    );
  }
  // console.log(isCart);
  return (
    <>
      <div className={'card-container'}>
        <div className={'card'}>
          <Link to={`/recorcedcourses/id`}>
            <div className={'image'}>
              <img
                src={'/frontend/infixlmstheme/img/course/2.jpg'}
                alt={course?.title}
              />
              {course?.type === 'liveClass' && (
                <>
                  <div className="card-liveCourse">
                    <LiveIcon /> Live
                  </div>
                  <div
                    className={
                      totalBooked === 100
                        ? `card-booking full-booked`
                        : `card-booking`
                    }
                  >
                    {totalBooked} % booked
                  </div>
                </>
              )}
            </div>
          </Link>
          <div className={'instractor-desc'}>
            <Link to={'/instructor/fd'}>
              {' '}
              {!isCart && (
                <h3 className={'name'}>
                  {course?.author?.name
                    ? course?.author?.name
                    : 'Instructor Name'}
                </h3>
              )}
            </Link>
            <Link to={`/recorcedcourses/id`}>
              <h5 className={'course-name'}>
                {shortenText(course?.title, 40)
                  ? shortenText(course?.title, 40)
                  : 'Flutter & Dart-The Compelete Guide [2022 Edition]'}
              </h5>
            </Link>
            {isYallaOnline && (
              <div className={'date-time'}>
                <h6>
                  <span>{clock}</span> Feb 24 . 9:20 am
                </h6>
                <h6>
                  <span>{student}</span> 30 Students
                </h6>
              </div>
            )}

            {!isCart &&
              (course?.rating_count ? (
                <ReadOnlyRatings rating="3" totalRating="4" />
              ) : (
                // htt8yr lma 2gyb data from api dy bta3t yallaonline
                !isTalk && (
                  <div className="rate">
                    <h6>4.2</h6>
                    <Rate disabled allowHalf defaultValue={2.5} />
                    <h6 className="num-students">(6,000)</h6>
                  </div>
                )
              ))}

            {isTalk && (
              <div className="card-duration">
                <ClockIcon />
                {dayjs(course?.start_date).format('MMM DD, YYYY')} {' • '}
                {dayjs(course?.start_date).format('HH:MM a')} -{' '}
                {dayjs(course?.end_date).format('HH:MM a')}
              </div>
            )}
            {!isYallaOnline && (
              <div className="card-price">{calcPrice(course)}</div>
            )}
            {isCart && (
              <div className={'cart-actions'}>
                <div className={'icon'}>
                  {smallheart}
                  <h6>Save for later</h6>
                </div>
                <div className={'icon'}>
                  {Delete}
                  <h6>Delete</h6>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
