import React, { useEffect, useState } from 'react';
import {
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import '../cart.scss';
import { Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

export default function CheckoutForm({ clientSecret }) {
  const stripe = useStripe();
  const elements = useElements();

  const [messageResult, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaveCard, setIsSaveCard] = useState(true);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!stripe) {
      return;
    }

    // const clientSecret = new URLSearchParams(window.location.search).get(
    //   "payment_intent_client_secret"
    // );

    if (!clientSecret) {
      return;
    }

    // stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
    //   switch (paymentIntent.status) {
    //     case "succeeded":
    //       setMessage("Payment succeeded!");
    //       break;
    //     case "processing":
    //       setMessage("Your payment is processing.");
    //       break;
    //     case "requires_payment_method":
    //       setMessage("Your payment was not successful, please try again.");
    //       break;
    //     default:
    //       setMessage("Something went wrong.");
    //       break;
    //   }
    // });
  }, [stripe]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(ele, 'ele');
    // console.log(elements, 'elements');
    // console.log(elements.getElement('card'), 'elements');
    // return false;
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = stripe
      .confirmPayment({
        elements,
        confirmParams: {
          // Make sure to change this to your payment completion page
          // Make sure to redirect to the course page **********************************> not My courses.
          // return_url: `${window.location.origin}/payment-success`,
          // return_url: 'if_required',
          // redirect: false,
        },
        redirect: 'if_required',
      })
      .then(function (result) {
        if (result?.paymentIntent) {
          if (result?.paymentIntent?.status === 'succeeded') {
            message.success('Payment succeeded!');
            setMessage('Payment succeeded!');
            queryClient.invalidateQueries([`cart-info`]);
            localStorage.removeItem('cartWithCoupon');
            navigate('/payment-success');
            return false;
          }
          switch (result?.paymentIntent?.status) {
            case 'succeeded':
              // localStorage.removeItem('client_secret');
              message.success('Payment succeeded!');
              setMessage('Payment succeeded!');
              break;
            case 'processing':
              setMessage('Your payment is processing.');
              break;
            case 'requires_payment_method':
              setMessage(error?.message);
              break;
            default:
              setMessage('Something went wrong.');
              break;
          }
        }
      })
      .catch((err) => {
        setIsLoading(false);
        setMessage('Something went wrong.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      {/* <Checkbox
        checked={isSaveCard}
        onChange={(e) => {
          setIsSaveCard(e.target.checked);
        }}
      >
        save card for later
      </Checkbox> */}
      <Button
        type="primary"
        disabled={isLoading || !stripe || !elements}
        id="submit"
        htmlType="submit"
        block
        loading={isLoading}
      >
        {isLoading ? 'Processing ... ' : 'Pay now'}
      </Button>
      {/* Show any error or success messages */}
      {messageResult && <div id="payment-message">{messageResult}</div>}
    </form>
  );
}
