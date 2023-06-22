import React, { useState } from 'react';
import { Popover } from 'antd';
import { Link } from 'react-router-dom';
import './index.scss';
import ReadOnlyRatings from '../../../../../helpers/ratings/ReadOnlyRatings';
import ItemMember from '../../../../../components/common/dashboard/components/members';
import RateModal from '../rateModal';
import dayjs from 'dayjs';

const YallaOnlineCard = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const openRateModal = () => {
    setIsOpen(true);
  };
  const closeRateModal = () => {
    setIsOpen(false);
  };
  const content = (meeting) => {
    const getStatus = (date) => {
      if (date > dayjs(new Date())) {
        return 'Upcoming Meeting';
      } else if (date < dayjs(new Date())) {
        return 'Expired Meeting';
      } else if ((date = dayjs(new Date()))) {
        return 'happening now';
      }
    };
    return (
      <>
        <div className="meeting-details">
          <div
            className={`meeting-status ${getStatus(
              dayjs(`${meeting?.start_date} ${meeting?.time}`).add(
                meeting?.duration,
                'm',
              ),
            )}`}
          >
            {getStatus(
              dayjs(`${meeting?.start_date} ${meeting?.time}`).add(
                meeting?.duration,
                'm',
              ),
            )}
          </div>
          <div className="title">Discussions: {meeting?.title}</div>
          <div className="hosted-by">
            <span className="label">Hosted by: </span>
            <span className="value">{meeting?.hostedBy}</span>
          </div>

          <div className="meeting-members">
            <h5>Meeting members</h5>
            <ItemMember members={meeting?.members} />
          </div>

          <div className="date">
            <span>
              {dayjs(`${meeting?.start_date} ${meeting?.time}`).format('ll')}
            </span>
            <span>
              {dayjs(`${meeting?.start_date} ${meeting?.time}`).format('LT')}
            </span>
          </div>

          <div className="my-rate">
            {meeting?.isRated ? (
              <span className="rated">Your Rated This Course Before</span>
            ) : (
              <Link to="" className="not-rated" onClick={openRateModal}>
                Rate your experience
              </Link>
            )}
          </div>
          <Link to="#" className="button">
            View Meeting Details
          </Link>
        </div>
        <RateModal isOpen={isOpen} cancel={closeRateModal} id={meeting?.id} />
      </>
    );
  };

  return (
    <Popover
      content={() =>
        content({
          hostedBy: data?.creator?.name,
          title: data?.title,
          members: data?.members,
          start_date: data?.start_date,
          time: data?.time,
          duration: data?.duration,
          id: data?.id,
          isRated: data?.isRated,
        })
      }
      placement="right"
      overlayClassName="yalla-popover"
      trigger="hover"
    >
      <div className="yallaOnline-card">
        <img src={data?.image} alt="coursePhoto" />

        <div className="yallaOnline-details">
          <h4>{data?.creator?.name}</h4>
          <p>Group one: {data?.title?.slice(0, 16)}</p>
          <ReadOnlyRatings
            rating={data?.averageRating}
            totalRating={data?.timesRated}
            justifyContentCenter={'justify-content-center'}
          />
        </div>
      </div>
    </Popover>
  );
};

export default YallaOnlineCard;
