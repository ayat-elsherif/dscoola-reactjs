import React, { useState } from 'react';
import { smallDelete } from '../SVGs';
import { Button, message } from 'antd';
import fetch from '../../../auth/AuthInterceptor';
import { useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { DeleteOutlined } from '@ant-design/icons';
function CartCard({ item }) {
  const queryClient = useQueryClient();
  const [loading, setloading] = useState(false);
  const imgBaseUrl = 'https://dscoola-files.s3.eu-west-1.amazonaws.com';

  const handelDeleteItem = () => {
    setloading(true);
    fetch({
      url: `api/cart/delete?&item_id=${item.id}&item_type=${item.item_type}`,
      method: 'delete',
      headers: {
        'public-request': 'true',
      },
    })
      .then((res) => {
        setloading(false);
        message.success('Item remove from cart');
        queryClient.invalidateQueries([`cart-info`]);
      })
      .catch((err) => {
        setloading(false);
      });
  };

  return (
    <>
      <div className="cart-item-card">
        <div className="cart-item-content">
          <div className="cart-item-img">
            {/* <Link className="course-title" to={'/course-view/' + item?.id}> */}
            <Link
              className="course-title"
              to={
                item?.item_type === 'course'
                  ? `/course-view/${item?.slug}`
                  : `/webinars/${item?.slug}`
              }
            >
              {/* <img src={item?.thumbnail_url} alt="course-img" /> */}
              <img
                src={
                  item?.item_type === 'course'
                    ? item?.thumbnail_url
                    : `${imgBaseUrl}/${item?.thumbnail_url}`
                }
                alt="course-img"
              />
            </Link>
          </div>
          <div className="cart-item-details">
            <h4>
              <Link
                className="course-title"
                to={
                  item?.item_type === 'course'
                    ? `/course-view/${item?.slug}`
                    : `/webinars/${item?.slug}`
                }
              >
                {item?.title}
              </Link>
            </h4>
            <p>{item?.slug}</p>
            <div className="cart-item-delete">
              {/* <span>
                                {smallFavorite}
                                <small> Save For Later</small>
                            </span> */}
              {/* <span onClick={()=>onDelete(item?.id)}>
                            {smallDelete}
                            <small> Delete</small>
                        </span> */}

              <Button
                type="text"
                // danger
                icon={<DeleteOutlined />}
                loading={loading}
                onClick={() => handelDeleteItem()}
                danger
              >
                Delete
              </Button>
              {/* {smallDelete}
              <small
                onClick={() =>
                  fetch({
                    url: `api/cart/delete?&item_id=${item.id}&item_type=${item.item_type}`,
                    method: 'delete',
                    headers: {
                      'public-request': 'true',
                    },
                  })
                    .then((res) => {
                      message.success('Done!', res.data.message, 'success');
                      queryClient.invalidateQueries([`cart-info`]);
                    })
                    .catch((err) => {})
                }
                loading={false}
              >
                Delete
              </small> */}
            </div>
          </div>
        </div>
        <div className="cart-item-price">
          <div className="item-price-group">
            {item.price_plan === 'free' ? (
              <p className="cart-item-price-after">Free</p>
            ) : (
              <>
                {item?.sale_price ? (
                  <>
                    <p className="cart-item-price-after">${item?.sale_price}</p>
                    <small className="text-muted cart-item-price-before">
                      <del> ${item?.price}</del>
                    </small>
                  </>
                ) : (
                  <p className="cart-item-price-after">${item?.price}</p>
                )}
              </>
            )}
          </div>
          {item?.item_type !== 'course' && (
            <time className="cart-item--time">{item?.formated_start_day}</time>
          )}
        </div>
      </div>
    </>
  );
}

export default CartCard;
