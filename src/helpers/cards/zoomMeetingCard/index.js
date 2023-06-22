import '../cards.scss';
import { Link, useNavigate } from 'react-router-dom';
import MainCard from '../mainCard';
import { HappeningNow } from '../../../assets/svg';
import dayjs from 'dayjs';
import MainButton from '../../Buttons/MainButton';
import { protectAxios } from '../../../apis/coursesAPI';
import { useDispatch } from 'react-redux';
// import swal from "sweetalert";
// import { cartList, fetchStart } from "../../../features/courses/cartList";
// import { toNumber } from "lodash";
// import ZoomSDK from "../../../components/containers/views/layouts/coursePreview/ZoomSDK";
import { getZoomObj, getZoomSDK } from '../../../features/zoomSDKSlice';
import { useState } from 'react';
import duration from 'dayjs/plugin/duration';
import { Button } from 'antd';

dayjs.extend(duration);

export default function ZoomMeetingCard({ course, sliderToggle }) {
  const now = new Date();
  const [isClicked, setIsClicked] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetchZoomSDK = async (obj) => {
    // console.log(obj, "obj in fetchZoomSDK ");
    const response = await protectAxios
      .post(`user/zoom-generate-signature?meeting_number=${obj?.meeting_id}`)
      .catch((err) => {
        window.open(obj?.url, 'obj?.url');
      });
    dispatch(getZoomSDK(response.data.data));
    dispatch(getZoomObj(course?.zoom_meetings?.[0]));

    setIsClicked(() => true);
    console.log(isClicked, 'isClicked');
    navigate('/zoomsdk');
  };
  const trimText = (text, txtNo) => {
    // let text = course?.objective;
    if (text.length > txtNo) {
      return text.slice(0, txtNo) + '...';
    } else {
      return text;
    }
  };
  return (
    <MainCard
      cssClass={'zoomMeeting'}
      liveIcon={
        <div className="d-flex justify-content-between align-items-center webinarStatus">
          {Date?.parse(now) >
          Date?.parse(dayjs(course?.zoom_meetings?.[0]?.end_time).format()) ? (
            <span className="completed ">Completed</span>
          ) : Date?.parse(course?.zoom_meetings?.[0]?.start_time) <=
              Date?.parse(now) &&
            Date?.parse(now) <=
              Date?.parse(course?.zoom_meetings?.[0]?.end_time) ? (
            <span className="happeningNow">
              <HappeningNow /> Happening now
            </span>
          ) : (
            <span className="comingSoon">Coming Soon</span>
          )}
        </div>
      }
      onImgTime={
        <div>
          <span>
            {course?.zoom_meetings?.[0]?.start_time
              ? dayjs(course?.zoom_meetings?.[0]?.start_time).format('D')
              : ''}
          </span>
          <span>
            {course?.zoom_meetings?.[0]?.start_time
              ? dayjs(course?.zoom_meetings?.[0]?.start_time).format('MMM')
              : ''}
          </span>{' '}
        </div>
      }
      courseLevel={false}
      // favorite={course.id}
      courseImg={
        course?.image
          ? course.image
          : 'https://img-c.udemycdn.com/course/240x135/4427730_5388.jpg'
      }
      imgAlt={course?.title}
      slider={sliderToggle}
      instructorName={
        <Link to={'/instructors/' + course?.creator?.name}>
          {course?.creator?.name}
        </Link>
      }
      title={
        <>
          <Link to={'/webinars/' + course?.slug}>
            <h4 className="card-course-title">{trimText(course?.title, 50)}</h4>
          </Link>
        </>
      }
      coursePath={'/webinars/' + course?.slug}
      actionButton={false}
    >
      <div className="card-text" as="div">
        <p>{trimText(course?.objective, 55)}</p>
        <div className="d-flex justify-content-between mb-3 mt-2">
          <span className="meetingTimeInterval">
            <svg
              width="15px"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              fill="#6A6F73"
            >
              <path d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-1-7.59V4h2v5.59l3.95 3.95-1.41 1.41L9 10.41z" />
            </svg>
            {dayjs(course?.zoom_meetings?.[0]?.start_time).format('HH:mm a')} -{' '}
            {dayjs(course?.zoom_meetings?.[0]?.end_time).format('HH:mm a')}
          </span>
        </div>
        {course?.price_plan === 'paid' ? (
          course?.sale_price ? (
            <>
              <div className="mb-2">
                <strong> {course?.sale_price} EGP </strong>
                <del>
                  <small className="text-muted">{course?.price} EGP</small>
                </del>
              </div>
            </>
          ) : (
            <div className="mb-2">
              {' '}
              <strong>{course?.price} + EGP</strong>
            </div>
          )
        ) : (
          <div className="mb-2">
            <strong>Free</strong>
          </div>
        )}
      </div>
      {(Date.parse(course?.zoom_meetings?.[0]?.start_time) <= Date.parse(now) &&
        Date.parse(now) <= Date.parse(course?.zoom_meetings?.[0]?.end_time)) ||
      Date.parse(now) < Date.parse(course?.zoom_meetings?.[0]?.start_time) ? (
        course?.price_plan === 'paid' ? (
          <MainButton
            cssStyle={{ width: '100%' }}
            text="Add To Cart"
            // onclick={() => addToCard(course?.slug)}
          />
        ) : (
          <Link
            to="#"
            onClick={() => fetchZoomSDK(course?.zoom_meetings[0])}
            style={{ width: '100%', color: '#fff' }}
            className="btn btn-outline-success"
          >
            Join Meeting
            {/* {isClicked ? (
                <>
                  <ZoomSDK zoomObj={{ ...course?.zoom_meetings[0], role: 0 }} />
                </>
              ) : (
                ""
              )} */}
          </Link>
        )
      ) : (
        <Button
          type="primary"
          block
          onClick={() => navigate('/webinars/' + course?.slug)}
        >
          Learn More
        </Button>
      )}
    </MainCard>
  );
}
