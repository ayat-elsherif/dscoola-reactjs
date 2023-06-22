import React from 'react';
import '../cards.scss';
import { message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

import { useQueryClient } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';

import SendGift from '../../gift/SendGift';
import CountdownTimer from '../../CountdownTimer/CountdownTimer';
import MainCard from '../mainCard';
import ReadOnlyRatings from '../../ratings/ReadOnlyRatings';
import { calendarIcon } from '../SVGs';
import {
  useAddToCartList,
  useEnroll,
} from '../../dropdownCart/hooks/useCartList';
import { fetchStart } from '../../../features/courses/cartList';
import { Statistic } from 'antd';
import { Highlight } from 'react-instantsearch-dom';
const { Countdown } = Statistic;

var duration = require('dayjs/plugin/duration');
dayjs.extend(duration);

function LiveSessionCard({
  course,
  levels,
  sliderToggle,
  isWishlist,
  algolia,
  hits,
}) {
  const accesstoken = localStorage.getItem('access_token');
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { is_enrolled } = course.isEnrolled;
  const { currentUser } = useSelector((state) => state?.user);

  const trimText = (text, txtNo) => {
    // let text = course?.objective;
    if (text?.length > txtNo) {
      return text.slice(0, txtNo) + '...';
    } else {
      return text;
    }
  };

  const onSuccsses = (data) => {
    message.success(data.data.message, 5);

    dispatch(fetchStart());
    queryClient.invalidateQueries([`cart-info`]);
  };

  const onenrollSuccsses = (data) => {
    message.success(data.data.message, 5);
    queryClient.invalidateQueries([`cart-info`]);
    navigate('/student-dashboard/my-courses');
    dispatch(fetchStart());
  };
  const onFail = (data) => {
    message.error(data.response.data.message, 5);
  };
  const { mutate: addToCart } = useAddToCartList(onSuccsses, onFail);
  const { mutate: enroll } = useEnroll(onenrollSuccsses);

  // const addToCard = (slug) => {
  //   addToCart({ course_slug: slug });
  // };
  const addToCard = (id) => {
    addToCart({
      item_id: id,
      item_type: 'course',
    });
  };

  const enrollNow = (id) => {
    if (currentUser?.isVerified) {
      enroll({ course_id: id });
    } else {
      message.error('Your email address has not been verified', 5);
    }
  };

  const goToCourse = () => {
    // console.log({ course_id: course.id });
    navigate('/course-view/' + course?.slug || course?.id);
  };

  const courseType = () => {
    if (is_enrolled) {
      return 'View Course';
    } else if (course?.price_plan !== 'free' && !is_enrolled) {
      return 'Add to cart';
    } else {
      return ' Enroll Now';
    }
  };
  const courseTypePtn = () => {
    if (is_enrolled && !!accesstoken) {
      return () => goToCourse();
    } else if (course?.price_plan !== 'free' && !is_enrolled && !!accesstoken) {
      return () => addToCard(course?.id);
    } else if (course?.price_plan === 'free' && !is_enrolled && !!accesstoken) {
      return () => enrollNow(course?.id);
    } else {
      return () => navigate('/sign-in');
    }
  };

  let courseImg = course?.thumbnailurl;
  let short_detail = course?.short_description;
  if (short_detail) {
    if (short_detail?.length > 60) {
      short_detail = short_detail.slice(0, 55).concat('...');
    }
  }
  const bookingPercentage = (course.totalEnrolled * 100) / course.max_attends;
  const currentLevel = (id) => {
    let levelArr;
    let level;
    levelArr = levels?.filter((i) => i?.id === id);
    level = levelArr?.[0]?.title;
    if (level === 'Pro') {
      level = 'Advanced';
    }
    return level;
  };

  if (!course) return;

  return (
    <>
      <MainCard
        liveIcon={
          <div className="d-flex justify-content-between align-items-center live-icon">
            <img
              src="/assets/images/icons/Group 10569/Group 10569.png"
              alt="live-icon"
            />
            {bookingPercentage ? (
              bookingPercentage === 100 ? (
                <div className="bookingPercentage fullBooking">
                  {Math.floor(bookingPercentage)}% booked
                </div>
              ) : (
                <div className="bookingPercentage onBooking">
                  {' '}
                  {Math.floor(bookingPercentage)}% booked
                </div>
              )
            ) : (
              <div className="bookingPercentage onBooking">0% booked</div>
            )}
          </div>
        }
        counter={
          <div className="live-session-counter">
            <div className="card-course-text">
              {
                <CountdownTimer
                  countdownTimestampMs={'01 Jan 2023 00:00:00 GMT'}
                  endedTimeStamp={course?.start_time}
                  course={course}
                />
              }
            </div>
          </div>
        }
        slider={sliderToggle}
        favorite={course?.id}
        isWishlist={isWishlist}
        title={
          <Link to={'/course-view/' + course?.slug || course?.id}>
            <h4 className="card-course-title">
              {algolia ? (
                <Highlight attribute="title" hit={hits} />
              ) : (
                trimText(course?.title, 40)
              )}
            </h4>
          </Link>
        }
        coursePath={'/course-view/' + course?.slug || course?.id}
        courseImg={
          courseImg
            ? courseImg
            : 'https://img-c.udemycdn.com/course/240x135/4427730_5388.jpg'
        }
        imgAlt={course?.title}
        instructorName={
          course?.author?.name ? (
            algolia ? (
              <Highlight attribute="author.name" hit={hits} />
            ) : (
              course?.author?.name
            )
          ) : (
            'Unknown'
          )
        }
        instructorPage={'/instructors/' + course?.user_id}
        coursePrice={
          course?.sale_price ? (
            <div>
              <span className="afterSale">{course?.sale_price}EGP </span>
              <span className="beforeSale">
                <small className="text-muted">{course?.price}EGP</small>
              </span>
            </div>
          ) : (
            <span className="afterSale">
              {course?.price ? <>{course?.price} EGP</> : 'free'}
            </span>
          )
        }
        addSmlButton={true}
        btnTxt={courseType()}
        addToCard={courseTypePtn()}
        gift={
          <div className="gift-btn">
            <SendGift />
          </div>
        }
      >
        <p>{short_detail}</p>
        <div className="course-level-container justify-content-between">
          <div className="d-flex align-items-center">
            {course?.level === 1 && (
              <img
                src="/assets/images/icons/Mask Group 583.svg"
                alt="Course Level"
              />
            )}
            {course?.level === undefined && (
              <img
                src="/assets/images/icons/Mask Group 583.svg"
                alt="Course Level"
              />
            )}
            {course?.level === 2 && (
              <img
                src="/assets/images/icons/Mask Group 582.svg"
                alt="Course Level"
              />
            )}
            {course?.level === 3 && (
              <img
                src="/assets/images/icons/Icon awesome-signal.svg"
                alt="Course Level"
              />
            )}
            {course?.level === 4 && (
              <img
                src="/assets/images/icons/Icon awesome-signal.svg"
                alt="Course Level"
              />
            )}

            <span className={'course-level ' + course.level}>
              {course.level ? currentLevel(course.level) : ''}
            </span>
          </div>

          <div className="d-flex align-items-center">
            {calendarIcon}
            <span className={'course-level ' + course?.level}>
              {dayjs(course?.end_time).diff(course?.start_time, 'w')} Weeks
            </span>
          </div>
        </div>
        {/* {
            <CountdownTimer
              countdownTimestampMs={dayjs(course.reopen_date).valueOf()}
              endedTimeStamp={dayjs(course.closed_date).valueOf()}
              course={course}
            />
          } */}
        <span>
          {course?.rating_value ? (
            <ReadOnlyRatings
              rating={course?.rating_value}
              totalRating={course?.rating_count}
            />
          ) : (
            // <div className="mt-2">
            //   <small className="text-muted ">not rated yet</small>
            // </div>
            <ReadOnlyRatings rating={0} />
          )}
        </span>
      </MainCard>
    </>
  );
}

export default LiveSessionCard;
