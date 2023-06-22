import { css, cx } from '@emotion/css';
import { Button, Tooltip } from 'antd';
import useYallaOnlineJoin from 'api-hooks/yalla-online/useYallaOnlineJoin';
import ModalYallaOnlineRate from 'components/modals/ModalYallaOnlineRate';
import UserAvatar from 'components/tiny/UserAvatar';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import slugify from 'slugify';
import { camelToNrm, getProfileUrl } from 'utils';

function PopoverContent({ data, isModalRateOpen, setIsModalRateOpen }) {
  console.log('PopoverContent  data:', data);
  const PopoverContentStyles = css`
    width: 29.5rem;
    padding: 1rem 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    .meeting-status {
      font-size: 1.4rem;
      text-transform: capitalize;
      color: #7e59d1;
      &.danger {
        color: #f93154;
      }
    }
    .title {
      font-weight: 500;
      font-size: 1.4rem;
      line-height: 2.1rem;
      color: #2a2a2a;
    }
    .host-wrapper {
      font-size: 1.2rem;
      color: #6a6f73;
      .val {
        color: #7e59d1;
        text-transform: capitalize;
      }
    }
    .meeting-members-wrapper {
      padding: 1rem 0;
      .title {
        margin-bottom: 1rem;
      }
      .members-wrapper {
        display: flex;
        flex-wrap: wrap;
        gap: 1px;
        &:hover .member-avatar-link {
          margin-inline-end: 0;
        }
        .member-avatar-link {
          display: inline-block;
          margin-inline-end: -1.6rem;
          transition: all 0.3s ease-in-out;
        }
      }
      .members-over-count {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: #7e59d1;
        font-size: 1.4rem;
        line-height: 2.1rem;
        color: #fff;
      }
    }
    .date-wrapper {
      padding: 1rem 0;

      font-size: 1.3rem;
      line-height: 2rem;
      color: #6a6f73;
    }
    .btn-rate {
      padding: 0;
      height: auto;
      font-size: 1.3rem;
      line-height: 2rem;
      color: #f2b636;
      text-decoration: underline;
      margin-bottom: 1.5rem;
    }
    .btn-join {
      height: 4rem;
      padding: 1rem 2rem;
      font-size: 1.4rem;
      line-height: 2.1rem;
    }
  `;
  const navigate = useNavigate();
  //   const [isModalRateOpen, setIsModalRateOpen] = useState(false);
  const { currentUser } = useSelector((s) => s?.user);
  console.log('PopoverContent  currentUser:', currentUser);
  const { yallaOnlineJoin, yallaOnlineJoinLod } = useYallaOnlineJoin();
  const startTime = data?.meet?.start_time;
  const endTime = data?.meet?.end_time;
  const [dateStatus, setDateStatus] = useState('');

  useEffect(() => {
    // if (!data?.zoom_meetings?.length) return;
    const now = dayjs();

    if (now.isBefore(dayjs(startTime))) {
      // console.log('Coming Soon ');
      setDateStatus('comingSoon');
    }
    if (now.isAfter(dayjs(endTime))) {
      // console.log('Completed');
      setDateStatus('expiredMeeting');
    }
    if (now.isAfter(dayjs(startTime)) && now.isBefore(dayjs(endTime))) {
      // console.log('Happening Now');
      setDateStatus('happeningNow');
    }
  }, [data?.zoom_meetings, startTime, endTime]);

  const onJoinMeeting = () => {
    yallaOnlineJoin({
      meet_id: data?.id,
      onSuc: (res) => {
        const url = res?.data?.urls?.[0];
        console.log('onJoinMeeting  url', url);
        window.open(url, '_blank', 'noreferrer');
      },
    });
  };

  return (
    <>
      <div className={PopoverContentStyles}>
        <div
          className={cx('meeting-status', {
            danger: dateStatus === 'expiredMeeting',
          })}
        >
          {camelToNrm(dateStatus)}
        </div>
        <div className="title">Discussions: {data?.title}</div>
        <div className="host-wrapper">
          <span className="key">Hosted by:</span>
          <Link
            to={getProfileUrl(data?.creator?.role_id, data?.creator?.id)}
            className="val"
          >
            {data?.creator?.name}
          </Link>
        </div>
        <div className="meeting-members-wrapper">
          <div className="title">Meeting members</div>
          <div className="members-wrapper">
            {data?.members?.slice(0, 9)?.map((el) => (
              <Tooltip key={el?.id} title={el?.name} placement="top">
                <Link
                  to={getProfileUrl(el?.role_id, el?.id)}
                  className="member-avatar-link"
                >
                  <UserAvatar size="large" img={el?.photo_url} />
                </Link>
              </Tooltip>
            ))}

            {data?.members?.length > 9 && (
              <span className="members-over-count">
                +{data?.members?.length - 9}
              </span>
            )}
          </div>
          <div className="date-wrapper">
            {dayjs(data?.start_date).format('MMM DD, YYYY HH:mm A')} -{' '}
            {dayjs(data?.end_date).format('HH:mm A')}
          </div>
          {!data?.isRated && data?.user_id !== currentUser?.user_id && (
            <Button
              type="link"
              className="btn-rate"
              onClick={() => setIsModalRateOpen(true)}
            >
              Rate your experience
            </Button>
          )}
          {data?.creator?.id !== currentUser?.user_id &&
            (dateStatus === 'happeningNow' ? (
              <Button
                type="primary"
                className="btn-join"
                loading={yallaOnlineJoinLod}
                onClick={onJoinMeeting}
              >
                Join meeting
              </Button>
            ) : dateStatus === 'comingSoon' ? (
              <Button type="primary" ghost className="btn-join">
                coming Soon
              </Button>
            ) : (
              <Button
                type="primary"
                className="btn-join"
                // style={{ background: '#00b74a' }}
                onClick={() =>
                  navigate(
                    `/meeting-details/${slugify(data?.title)}/${data?.id}`,
                  )
                }
              >
                View meeting details
              </Button>
            ))}
        </div>
      </div>
      {!data?.isRated && (
        <ModalYallaOnlineRate
          open={isModalRateOpen}
          setOpen={setIsModalRateOpen}
          rateItem={data}
        />
      )}
    </>
  );
}

export default PopoverContent;
