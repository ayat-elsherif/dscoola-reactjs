import { css } from '@emotion/css';
import { Popover, Skeleton } from 'antd';
import Rating from 'components/Rating/Rating';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import slugify from 'slugify';
import { limitedText } from 'utils';
import PopoverContent from './PopoverContent';

function YallaOnlineCard({ item, loading }) {
  const YallaOnlineCardStyles = css`
    background-color: #fff;
    box-shadow: 0px 3px 6px #44444429;
    border: 1px solid #e0e0f5;
    border-radius: 4px;
    padding: 2.6rem 1rem;
    min-height: 24.5rem;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.6rem;
    .image-wrapper {
      width: 10rem;
      height: 10rem;
      padding: 1rem;
      img {
        border-radius: 50%;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .title {
      font-weight: 500;
      font-size: 1.4rem;
      line-height: 1.7rem;
      text-align: center;
      color: #2a2a2a;
    }
    .sub-title {
      font-size: 1.3rem;
      line-height: 1.5rem;
      text-align: center;
      color: #6a6f73;
    }
  `;
  const [isModalRateOpen, setIsModalRateOpen] = useState(false);

  if (loading) return <YallaOnlineCardLod />;
  return (
    <Popover
      placement="right"
      content={
        <PopoverContent
          data={item}
          isModalRateOpen={isModalRateOpen}
          setIsModalRateOpen={setIsModalRateOpen}
        />
      }
      open={isModalRateOpen ? false : undefined}
      //   autoAdjustOverflow
      //   open={item.id === 24}
      //   style={{ padding: 0 }}
      overlayStyle={{ paddingLeft: 6 }}
    >
      <Link
        to={`/meeting-details/${slugify(item?.title)}/${item?.id}`}
        className={YallaOnlineCardStyles}
      >
        <div className="image-wrapper">
          <img
            src={
              item?.image ||
              'https://img-c.udemycdn.com/course/240x135/4427730_5388.jpg'
            }
            alt="course"
          />
        </div>
        <div className="title">{item?.creator?.name}</div>
        <div className="sub-title">
          {/* Group one:  */}
          {limitedText(item?.title, 16)}
        </div>
        <Rating
          defaultValue={item?.averageRating}
          count={item?.timesRated}
          disabled
        />
      </Link>
    </Popover>
  );
}

export default YallaOnlineCard;

function YallaOnlineCardLod() {
  const YallaOnlineCardLodStyles = css`
    background-color: #fff;
    box-shadow: 0px 3px 6px #44444429;
    border: 1px solid #e0e0f5;
    border-radius: 4px;
    padding: 2.6rem 2rem;
    min-height: 24.5rem;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;

    .sk-img {
      border-radius: 50%;
      overflow: hidden;
    }
  `;

  return (
    <div className={YallaOnlineCardLodStyles}>
      <Skeleton.Image active className="sk-img" />
      <Skeleton title={false} active />
    </div>
  );
}
