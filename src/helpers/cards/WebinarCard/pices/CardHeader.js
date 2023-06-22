import { css, cx } from '@emotion/css';
import { Image } from 'antd';
import { HappeningNow } from 'assets/svg';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { camelToNrm } from 'utils';

function CardHeader({ course, dateStatus, isWebinar }) {
  const imgBaseUrl = 'https://dscoola-files.s3.eu-west-1.amazonaws.com';
  const CardHeaderStyles = css`
    position: relative;
    /* border: 1px solid red; */
    .course-image {
      width: 27rem;
      max-width: 100%;
      min-height: 13.9rem;
      height: 13.9rem;
      object-fit: cover;
    }

    .float-box {
      position: absolute;
      top: 1.6rem;

      display: flex;
      align-items: center;
      gap: 0.3rem;
      padding: 0.2rem 0.5rem;

      font-weight: 500;
      font-size: 1.2rem;
      letter-spacing: 0px;
      /*  */
      &.live {
        left: 1.6rem;
        background-color: #cc1915;
        border-radius: 1.3rem;

        svg {
          width: 1.1rem;
          display: none;
        }

        color: #ffffff;

        &.happeningNow {
          background-color: #cc1915;
          svg {
            display: block;
          }
        }
        &.completed {
          background-color: #2da381;
        }
        &.comingSoon {
          background-color: #f2b636;
        }
      }
    }

    .date-box {
      width: 50px;
      position: absolute;
      bottom: 0;
      right: 1.2rem;
      transform: translateY(50%);
      padding: 0.5rem 1rem;
      background-color: #efeff6;
      border-radius: 2px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      span {
        font-size: 1.2rem;
        line-height: 1.7rem;
        color: #7e59d1;
        text-transform: capitalize;

        &.day {
          font-weight: 500;
          font-size: 1.3rem;
        }
      }
    }
  `;

  const dateOfMeeting = course?.zoom_meetings?.[0]?.date_of_meeting;

  return (
    <div className={` ${isWebinar ? 'webinar-card' : ''} ${CardHeaderStyles}`}>
      <Link
        to={
          isWebinar ? `/webinars/${course?.slug}` : '/course-view/' + course?.id
        }
      >
        <Image
          className="course-image"
          src={
            isWebinar
              ? `${imgBaseUrl}/${course?.image}`
              : course?.image ||
                'https://img-c.udemycdn.com/course/240x135/4427730_5388.jpg'
          }
          preview={false}
          fallback="https://img-c.udemycdn.com/course/240x135/4427730_5388.jpg"
          alt={course?.title}
        />
      </Link>

      {isWebinar && (
        <span className="webinar-status">
          <HappeningNow /> <span>{course?.webinar_status}</span>
        </span>
      )}

      {dateStatus && (
        <div className={cx('float-box live', dateStatus)}>
          <HappeningNow /> <span>{camelToNrm(dateStatus)}</span>
        </div>
      )}

      <div className="date-box">
        <span className="day">{course?.formated_start_day}</span>
        {/* <span className="day">{dayjs(dateOfMeeting).format('DD')}</span>
        <span>{dayjs(dateOfMeeting).format('MMM')}</span> */}
      </div>
    </div>
  );
}

export default CardHeader;
