import React, { useRef, useEffect } from 'react';
import { Input, Button, Checkbox, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import useApi from 'network/useApi';
import { useQueryClient } from '@tanstack/react-query';

function OrderSummary({ cartInfo, isShopingCard }) {
  const { currentUser } = useSelector((state) => state?.user);
  const [couponVal, setCouponVal] = useState(null);
  const [couponLoading, setCouponLoading] = useState(false);
  const [userRedeemPoints, setUserRedeemPoints] = useState(false);
  const navigate = useNavigate();
  const api = useApi();
  const queryClient = useQueryClient();

  const verify = () => {
    // !!BUG for develoment utils
    if (currentUser?.isVerified) {
      // navigate('/cart/checkout');
      navigate('/cart/checkout', { state: { userRedeemPoints } });
    } else {
      message?.warning('please verify your email address');
    }
  };

  useEffect(() => {
    let cartWithCoupon =
      localStorage.getItem('cartWithCoupon') &&
      localStorage.getItem('cartWithCoupon') !== 'undefined'
        ? JSON.parse(localStorage.getItem('cartWithCoupon') || '')
        : null;
    if (cartWithCoupon?.code) {
      setCouponVal(cartWithCoupon?.code);
      queryClient.setQueryData([`cart-info`], (oldData) => {
        return oldData
          ? {
              ...oldData,
              data: cartWithCoupon,
            }
          : oldData;
      });
    }
  }, []);

  const handelAddCouponToCart = () => {
    if (!couponVal) return;
    setCouponLoading(true);
    const form = new FormData();
    form.append('code', couponVal);
    api
      .post('coupons/discount', form)
      .then((res) => {
        if (res?.code === 200) {
          message.success('coupon added successfully');
          queryClient.setQueryData([`cart-info`], (oldData) => {
            const cartWithCoupon = {
              ...oldData?.data,
              price_without_fees: res?.data?.price,
              price_after_discount: res?.data?.total_pay,
              code: couponVal,
              coupon_discount: res?.data?.coupon_discount,
            };
            localStorage.setItem(
              'cartWithCoupon',
              JSON.stringify(cartWithCoupon),
            );
            return oldData
              ? {
                  ...oldData,
                  data: cartWithCoupon,
                }
              : oldData;
          });
        }
        // message.success(res?.data?.message, 5);
      })
      .catch((err) => {
        err?.response?.data?.errors?.forEach((error) => {
          message.error(error?.validation?.code, 5);
        });
        // message.error(err?.response?.data?.errors, 5);
      })
      .finally(() => {
        setCouponLoading(false);
      });
  };

  const onChangePoint = (e) => {
    // console.log('first', e);
    setUserRedeemPoints(e.target.checked);
  };

  return (
    <>
      <h5>Order Summary</h5>
      {isShopingCard && (
        <div className="add-coupon-discount">
          <span className="coupon-discount-title">Coupon Discount</span>
          <div className="coupon-discount-holder">
            <Input.Group compact>
              <Input
                style={{
                  width: 'calc(100% - 73px)',
                  height: '35px',
                }}
                value={couponVal}
                onChange={(e) => setCouponVal(e.target.value || null)}
                type="search"
              />
              <Button
                type="primary"
                style={{ height: '35px' }}
                onClick={handelAddCouponToCart}
                loading={couponLoading}
              >
                Apply
              </Button>
            </Input.Group>
          </div>
          {cartInfo?.points_redeem_list?.length ? (
            <Checkbox onChange={onChangePoint}>
              Redeem Your Point ({cartInfo?.points_state?.native} = $
              {cartInfo?.points_state?.cash})
            </Checkbox>
          ) : null}
        </div>
      )}
      <div className="price-calc">
        <div className="calc-item">
          <span>Price</span>
          <span>${cartInfo?.price_without_fees || cartInfo?.price}</span>
        </div>
        {cartInfo?.discount ? (
          <div className="calc-item">
            <span>Discount</span>
            <span>${cartInfo?.discount}</span>
          </div>
        ) : null}
        {cartInfo?.coupon_discount ? (
          <div className="calc-item">
            <span>Coupon discount</span>
            <span>${cartInfo?.coupon_discount}</span>
          </div>
        ) : null}
      </div>
      <div className="total-price">
        {' '}
        <div className="d-flex justify-content-between">
          <span>Total</span>
          <span>
            $
            {cartInfo?.price_after_discount ||
              cartInfo?.price_without_fees ||
              cartInfo?.total_pay}
          </span>
        </div>
        {!isShopingCard && (
          <div className="terms-privacy-agreeing">
            <span>
              By completing your purchase you agree to these
              <Link to="/terms"> Terms of Use </Link> and
              <Link to="/privacy"> Privacy Policy</Link>.
            </span>
          </div>
        )}
      </div>
      {
        isShopingCard ? (
          <Button type="primary" onClick={verify} block>
            Checkout
          </Button>
        ) : null
        // <Button type="primary" onClick={verify}>
        //   Complete Payment
        // </Button>
      }
    </>
  );
}

export default OrderSummary;
