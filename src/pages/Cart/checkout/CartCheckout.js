import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import BreadCrumbsMultiple from '../../../helpers/breadCrumbs/BreadCrumbsMultiple';
import '../cart.scss';
import fetch from '../../../auth/AuthInterceptor';
import CheckoutForm from './checkoutForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import OrderSummary from '../cartWithItems/OrderSummary';
import useCartInfo from 'api-hooks/cart/useCartInfo';
import { useQueryClient } from '@tanstack/react-query';

function CartCheckout() {
  const [stripePromise, setStripePromise] = useState(null);
  const [PaymenyInfo, setPaymenyInfo] = useState(null);
  const [clientSecret, setClientSecret] = useState('');
  const queryClient = useQueryClient();
  const { cartInfo, cartInfoLod } = useCartInfo();

  const location = useLocation();
  const { userRedeemPoints } = location.state;
  console.log(userRedeemPoints, 'userRedeemPoints');
  useEffect(() => {
    handelGetPayemntForm();
    let cartWithCoupon =
      localStorage.getItem('cartWithCoupon') &&
      localStorage.getItem('cartWithCoupon') !== 'undefined'
        ? JSON.parse(localStorage.getItem('cartWithCoupon') || '')
        : null;
    if (cartWithCoupon) {
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

  const handelGetPayemntForm = () => {
    const form = new FormData();
    let cartWithCoupon =
      localStorage.getItem('cartWithCoupon') &&
      localStorage.getItem('cartWithCoupon') !== 'undefined'
        ? JSON.parse(localStorage.getItem('cartWithCoupon') || '')
        : null;
    if (cartWithCoupon?.code) {
      form.append('code', cartWithCoupon?.code);
    }
    if (userRedeemPoints) {
      const { id, cash, points } = cartInfo?.points_redeem_list?.[0];
      console.log(cartInfo?.points_redeem_list?.[0]);
      form.append('redeem_points', 1);
      form.append('points_cash', cash);
      form.append('points', points);
      form.append('point_id', id);
    }
    setStripePromise(
      loadStripe(
        'pk_test_51Jwk8wHdpKqpVhJcvH9tqkgh03fSz4pH3p9cfJfNLsEFTg3iUET3FjFwcc3YSKUs3TPTWoT14F6EYEJFKJEKf1SZ00P13uCULD',
      ),
    );
    fetch({
      url: 'api/create-payment-intent',
      method: 'post',
      headers: {
        'public-request': 'true',
      },
      data: form,
    }).then(async (result) => {
      if (cartWithCoupon?.code) {
        queryClient.setQueryData([`cart-info`], (oldData) => {
          return oldData
            ? {
                ...oldData,
                data: cartWithCoupon,
              }
            : oldData;
        });
      }
      setClientSecret(result.data.client_secret);
      setPaymenyInfo(result?.data);
      localStorage.setItem('client_secret', result.data.client_secret);
    });
  };

  useEffect(() => window.scroll(0, 0), []);

  return (
    <>
      <BreadCrumbsMultiple
        params={[
          { label: 'Shopping Cart', url: '/cart' },
          { label: 'Checkout' },
        ]}
        title="Checkout"
      />
      <div className="shoppingCart checkout">
        <div className="container">
          {/* <BillingAddress /> */}
          {/* <PaymentMethods setFireBaymentBtn={setFireBaymentBtn} /> */}
          <div className="checkout-layout-wrapper">
            <div className="paymentMethods">
              <div className="payment-stripe-form">
                {clientSecret && stripePromise && (
                  <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <CheckoutForm clientSecret={clientSecret} />
                  </Elements>
                )}
              </div>
            </div>
            <div className="order-summary">
              <OrderSummary cartInfo={PaymenyInfo} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartCheckout;
