import { css } from '@emotion/css';
import { Button } from 'antd';
import useYallaOnlineJoin from 'api-hooks/yalla-online/useYallaOnlineJoin';
import ModalYallaOnlineRate from 'components/modals/ModalYallaOnlineRate';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

function DetailsCard({ creator, meeting, room, timezone, lastJoin }) {
  const startTime = meeting?.start_time;
  const endTime = meeting?.end_time;
  const [dateStatus, setDateStatus] = useState('');
  const [isModalRateOpen, setIsModalRateOpen] = useState(false);

  useEffect(() => {
    const now = dayjs();

    if (now.isBefore(dayjs(startTime))) {
      // console.log('Coming Soon ');
      setDateStatus('comingSoon');
    }
    if (now.isAfter(dayjs(startTime)) && now.isBefore(dayjs(endTime))) {
      // console.log('Happening Now');
      setDateStatus('happeningNow');
    }
    if (now.isAfter(dayjs(endTime))) {
      // console.log('Completed');
      setDateStatus('expiredMeeting');
    }
  }, [startTime, endTime]);

  const DetailsCardStyles = css`
    padding: 2.6rem 2.1rem;
    background: #ffffff;
    box-shadow: 0px 0px 6px #00000029;
    border: 1px solid #ffffff;
    border-radius: 4px;
    .title {
      font-weight: 500;
      font-size: 2rem;
      color: #2a2a2a;
      letter-spacing: 0px;
    }
    ul {
      padding: 2.5rem 0;
      li {
        &:not(:first-child) {
          border-top: 1px solid #eee;
        }
        padding: 0.8rem 0;
        display: flex;
        justify-content: space-between;
        gap: 2rem;
        flex-wrap: wrap;

        font-size: 1.4rem;
        line-height: 2.1rem;
        color: #6a6f73;
        text-transform: capitalize;
      }
    }
  `;
  const { yallaOnlineJoin, yallaOnlineJoinLod } = useYallaOnlineJoin();

  const onJoinMeeting = () => {
    console.log({ lastJoin });
    if (lastJoin?.rate_status || lastJoin?.room_id === room?.id) {
      yallaOnlineJoin({
        meet_id: room?.id,
        onSuc: (res) => {
          const url = res?.data?.urls?.[0];
          console.log('onJoinMeeting  url', url);
          window.open(url, '_blank', 'noreferrer');
        },
      });
    } else {
      setIsModalRateOpen(true);
    }
  };
  return (
    <>
      <div className={DetailsCardStyles}>
        <div className="title">Details</div>
        <ul>
          <li>
            <span>Hosted By</span>
            <span>{creator?.name}</span>
          </li>
          <li>
            <span>start</span>
            <span>
              {dayjs(meeting?.start_time).format('MMM DD, YYYY H:mm A')}
            </span>
          </li>
          <li>
            <span>Duration</span>
            <span>{meeting?.meeting_duration} minutes</span>
          </li>
          <li>
            <span>Category</span>
            <span>{room?.course?.category?.category_name}</span>
          </li>
          <li>
            <span>Time Zone</span>
            <span>{timezone}</span>
          </li>
        </ul>
        {dateStatus === 'happeningNow' ? (
          <Button
            type="primary"
            block
            loading={yallaOnlineJoinLod}
            onClick={onJoinMeeting}
          >
            Join meeting
          </Button>
        ) : dateStatus === 'comingSoon' ? (
          <Button type="primary" ghost block>
            coming Soon
          </Button>
        ) : (
          <Button
            type="primary"
            ghost
            block
            // style={{ background: '#00b74a' }}
          >
            Expired Meeting
          </Button>
        )}
      </div>
      {!lastJoin?.rate_status && (
        <ModalYallaOnlineRate
          open={isModalRateOpen}
          setOpen={setIsModalRateOpen}
          // rateItem={{
          //   course_id: course?.id,
          //   meet_id: meeting?.id,
          // }}
          lastJoin
          rateItem={{
            // creator,
            id: lastJoin?.room_id,
            course_id: lastJoin?.course_id,
          }}
        />
      )}
    </>
  );
}

export default DetailsCard;
