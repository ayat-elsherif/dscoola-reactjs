import React, { useState, useEffect } from "react";

import CreditCard from "./CreditCard";
import PayPal from "./PayPal";
import { Radio } from "antd";

import { useDispatch, useSelector } from "react-redux";

import {
      useStripe,
      useElements,
      PaymentElement,
      CardElement,
} from "@stripe/react-stripe-js";
import { protectAxios } from "../../../apis/coursesAPI";
import swal from "sweetalert";
import MainButton from "../../../helpers/Buttons/MainButton";
import { cartList, fetchStart } from "../../../features/courses/cartList";
import { firePayment } from "../../../features/payment/payment";
import fetch from '../../../auth/AuthInterceptor'

function PaymentMethods() {
      const stripe = useStripe();
      const dispatch = useDispatch();
      const element = useElements();
      const [value, setValue] = useState(1);
//     const isFiered = useSelector((state) => state.payment.isClicked);
//     console.log(isFiered,"isFiered")
   
    
//     const appearance = {
//         theme: 'stripe',
//       };
//     const options = {
     
//         appearance,
//       };
    const isFiered = useSelector((state) => state.payment.isClicked);
    console.log(isFiered,"isFiered")
   
    
    const appearance = {
        theme: 'stripe',
      };
    const options = {
     
        appearance,
      };

    const onFinishPayment = (e) => {
        e.preventDefault()
        const cardElement = element.getElement("card");
        console.log(cardElement, "cardElement");
        stripe.createToken(cardElement).then((res) => {
            fetch({
                  url: `gateways/stripe?token_id=${res.token.id}`,
                  method: 'post',
                  headers: {
                    'public-request': 'true',
                  }})
                  .then((res) => {
                        dispatch(firePayment(false));
                        swal("Payment completed!",  "The course has been successfully purchased", "success");
                        const onCartList = async () => {
                            dispatch(fetchStart());
    
                                        await protectAxios
                                              .get(`cart`)
                                              .then((response) => {
                                                    dispatch(cartList(response?.data?.data));
                                              })
    
                                              .catch((err) => {});
                                  };
    
                        onCartList();
                    })
                    .catch((err) => {
                        console.log(err,"eirjhper")
                        dispatch(firePayment(false));
                        swal("Oops", err.response.data.message, "warning");
                    });
            
 
    
        })
        .then((data) =>  console.log(data,"lwerhfoiwehrg"));
    };

      return (
            <div className="paymentMethods">
                  <h4 className="mt-4">Payment Method</h4>
                  <div className="justify-content-between">
                        <Radio.Group
                              className="row"
                              onChange={(e) => setValue(e.target.value)}
                              value={value}
                        >
                              <div className="col-lg-6">
                                    <CreditCard />
                              </div>
                              <div className="col-lg-6">
                                    <PayPal />
                              </div>
                        </Radio.Group>
                  </div>
                  <form className="payment-form">
                        <CardElement options={options}   />

                        <button ref={isFiered}  onClick={onFinishPayment}>xxxxxxxxxxx</button>
                  </form>
            </div>
      );
}

export default PaymentMethods;

 
