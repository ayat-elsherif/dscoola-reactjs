import React from 'react';
import MainButton from '../../Buttons/MainButton';
import { Link, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { Button } from 'antd';
import useCartAdd from 'api-hooks/cart/useCartAdd';
import useWebinarJoin from 'api-hooks/webinar/useWebinarJoin';

function DetailsCard({ details, categoryName, webinar, handleGetWebinar }) {
  const navigate = useNavigate();
  const now = new Date();
  const { cartAdd, cartAddLod } = useCartAdd('webinar');
  const { webinarJoin, webinarJoinLod } = useWebinarJoin();

  const onCartAdd = () => {
    const reqData = {
      item_id: webinar?.id,
      item_type: 'webinar',
    };
    cartAdd({
      reqData,
      onSuc: (res) => {
        handleGetWebinar();
        // console.log('cartAdd  res', res);
      },
    });
  };

  const onJoin = () => {
    webinarJoin({
      webinarId: webinar?.id,
      onSuc: (res) => {
        const meetingLink = res?.data?.[0];
        // console.log('webinarJoin  meetingLink', meetingLink);
        window.open(meetingLink, '_blank');
      },
    });
  };

  return (
    <div className="cartsidebar-body">
      {details?.pricePlan === 'paid' ? (
        details?.salePrice ? (
          <div className="cartsidebar-fees">
            <span className="sale_price">${details?.salePrice}</span>{' '}
            <span className="preSale_price">
              <small>
                <s>{details?.price}</s>
              </small>
            </span>
          </div>
        ) : (
          <div className="cartsidebar-fees">{details?.price}EGP</div>
        )
      ) : (
        'Free'
      )}
      <p className="cartsidebar-course-includes">Details</p>
      <ul className="cartsidebar-ul">
        <li>
          <div className="cartsidebar-li">
            <div>
              <span className="cartsidebar-li-items ">Hosted By</span>
            </div>
            <div>
              <span className="cartsidebar-li-items">
                {details?.created_by}
              </span>
            </div>
          </div>
          <div className="cartsidebar-li-divider"></div>
          <div className="cartsidebar-li">
            <div>
              <span className="cartsidebar-li-items ">Start</span>
            </div>
            <div>
              <span className="cartsidebar-li-items">
                {details?.start_time
                  ? dayjs(details?.start_time).format('MMM D, YYYY H:mm a')
                  : 'coming soon'}
              </span>
            </div>
          </div>
          <div className="cartsidebar-li-divider"></div>
        </li>
        <li>
          <div className="cartsidebar-li">
            <div>
              <span className="cartsidebar-li-items ">Duration</span>
            </div>
            <div>
              <span className="cartsidebar-li-items">{details?.duration}</span>
            </div>
          </div>
          <div className="cartsidebar-li-divider"></div>
        </li>
        <li>
          <div className="cartsidebar-li">
            <div>
              <span className="cartsidebar-li-items ">Category </span>
            </div>
            <div>
              <span className="cartsidebar-li-items">
                {categoryName?.category_name}{' '}
              </span>
            </div>
          </div>
          <div className="cartsidebar-li-divider"></div>
        </li>
        <li>
          <div className="cartsidebar-li">
            <div>
              <span className="cartsidebar-li-items ">Time Zone </span>
            </div>
            <div>
              <span className="cartsidebar-li-items">(GMT+02:00) Cairo</span>
            </div>
          </div>
          {webinar?.inCart ? (
            <Button type="primary" onClick={() => navigate('/cart')} block>
              View Cart
            </Button>
          ) : (
            <>
              {Date.parse(now) > Date.parse(details?.end_time) ? (
                <p className="expired-webinar-p">
                  This meeting is no longer valid and cannot be joined !
                </p>
              ) : (
                ''
              )}

              {(Date.parse(details?.start_time) <= Date.parse(now) &&
                Date.parse(now) <= Date.parse(details?.end_time)) ||
              Date.parse(now) < Date.parse(details?.end_time) ? (
                details?.pricePlan === 'paid' ? (
                  <Button
                    type="primary"
                    block
                    onClick={onCartAdd}
                    loading={cartAddLod}
                  >
                    Add To Cart
                  </Button>
                ) : (
                  <Button
                    type="primary"
                    onClick={onJoin}
                    loading={webinarJoinLod}
                    block
                  >
                    Join Meeting
                  </Button>
                )
              ) : (
                ''
              )}
            </>
          )}
        </li>
      </ul>
    </div>
  );
}

export default DetailsCard;
