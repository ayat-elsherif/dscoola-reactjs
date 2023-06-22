import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  message,
  Radio,
  Row,
  Select,
} from 'antd';
import React from 'react';
import { useState } from 'react';
import { PlusCardIcon } from '../../../../../../../assets/svg';
import DashboardButton from '../../../../../../../components/common/dashboard/components/button';
import CreditCard from '../../../../../../dashboard/myProfile/components/creditCards/creditCard';
import StepHeader from '../components/stepHeader';
import './paymentMethods.scss';
import fetch from '../../../../../../../auth/AuthInterceptor';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Loading from '../../../../../../../components/common/dashboard/shared-components/Loading';
import SweetAlert from '../../../../../../../components/common/dashboard/components/sweetAlert.js';
import useApi from 'network/useApi';
import swal from 'sweetalert';

export default function PaymentMethods() {
  const [openPaymentForm, setOpenPaymentForm] = useState(false);
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [redeemChecked, setRedeemChecked] = useState();
  const [cardsInfo, setCardsInfo] = useState([]);
  const [cardId, setCardId] = useState(null);
  const [cashValue, setCashValue] = useState(0);
  const [pointId, setPointId] = useState();

  const [isSaved, setIsSaved] = useState(0);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const api = useApi();
  const [value, setValue] = useState(null);
  const getCardsInfo = () => {
    return fetch({
      url: `api/stripe/user/cards`,
      method: 'get',
      headers: {
        'public-request': 'true',
      },
    });
  };

  const onSuccess = (data) => {
    setCardsInfo(data.data);
  };
  const onError = () => {
    message.error('something went wrong');
  };
  const { isLoading } = useQuery([`get-cards-info`], () => getCardsInfo(), {
    onSuccess: onSuccess,
    onError: onError,
  });
  const onFinish = (values) => {
    setLoading(true);
    const exp_month = values.exp?.slice(0, values.exp?.indexOf('/'));
    const short_exp_year = +values.exp?.slice(3);
    const exp_year = short_exp_year + 2000;
    values.exp_month = exp_month;
    values.exp_year = exp_year;
    values.is_saved = isSaved;
    delete values.exp;
    fetch({
      url: `api/stripe/save-card`,
      method: 'post',
      headers: {
        'public-request': 'true',
      },
      data: values,
    })
      .then((res) => {
        setCardId(res.data.card);
        fetch({
          url: `api/stripe/pay-feature-price`,
          method: 'post',
          headers: {
            'public-request': 'true',
          },
          data: {
            amount: 100 - cashValue,
            stripe_payment_method_id: res?.data?.card,
          },
        })
          .then((res) => {
            localStorage.setItem('is_featuerd', true);
            SweetAlert(
              'Done!',
              'payment is done, Your course has been featured now',
            );
            navigate('/instructor-dashboard/courses/add/course-pricing');
            setLoading(false);
          })
          .catch((e) => {
            message.error('someting went wrong!');
            setLoading(false);
          });
        queryClient.invalidateQueries([`get-cards-info`]);
        message.success('Add successfully!');
      })
      .catch((e) => {
        message.error('someting went wrong!');
      });
  };
  const onSubmit = () => {
    if (value) {
      setLoading(true);
      fetch({
        url: `api/stripe/pay-feature-price`,
        method: 'post',
        headers: {
          'public-request': 'true',
        },
        data: {
          amount: 100 - cashValue,
          stripe_payment_method_id: value,
        },
      })
        .then((res) => {
          localStorage.setItem('is_featuerd', true);
          swal('Done!', 'payment is done, Your course has been featured now');
          navigate('/instructor-dashboard/courses/add/course-pricing');
          setLoading(false);
        })
        .catch((e) => {
          message.error('someting went wrong!');
          setLoading(false);
        });
    } else if (redeemChecked) {
      if (!pointId) {
        message.error('You must select points to redeem!');
        return;
      }

      api
        .post('my/points/redeem', { points: pointId })
        .then(() => {
          if (cashValue == 100) {
            localStorage.setItem('is_featuerd', true);
            SweetAlert(
              'Done!',
              'payment is done, Your course has been featured now',
            );
            navigate('/instructor-dashboard/courses/add/course-pricing');
          } else {
            setRedeemChecked(false);
            message.success(
              `You Have Redeemed ${pointId} Points For ${cashValue} $`,
            );
          }
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      form.submit();
    }
  };

  const handleRadioChange = (e, id) => {
    if (e.target.checked) {
      setValue(id);
    }
  };
  const handelSaveCard = (e) => {
    console.log(`checked = ${e.target.checked}`);
    setIsSaved(e.target.checked);
  };

  const { data: pointsList, isLoading: pointsListLoading } = useQuery(
    [`get-points-list`],
    () => {
      return api.get(`my/points/redeem/list/formatted`);
    },
  );

  let pointsListArr = [];
  pointsList?.data?.forEach((item) => {
    pointsListArr.push({ label: item.points, value: item.id, cash: item.cash });
  });
  const onPointsChange = (id, data) => {
    setCashValue(data.cash);
    setPointId(data.label);
  };
  return (
    <div className="intended-learners">
      <StepHeader data={{ title: 'Pricing', preview: true }} />
      <div className="intended-learners_body">
        <Row align="middle" gutter={[16]}>
          <Col className="payment-method-headline" span={24}>
            You Need To Pay <span className="featuerd-price">$100</span> To Make
            Your Course Feature
          </Col>
          <Col>
            <Checkbox
              onChange={(e) => setRedeemChecked(e.target.checked)}
            ></Checkbox>
          </Col>
          <Col>
            <Select
              style={{ width: '120px' }}
              size="large"
              disabled={!redeemChecked}
              loading={pointsListLoading}
              placeholder="Select Points"
              onChange={onPointsChange}
              options={pointsListArr}
            ></Select>
          </Col>
          <Col align="middle" className="dolor-exchange">
            {cashValue}$
          </Col>
        </Row>

        {cashValue < 100 && (
          <div className="pricing-sorry-no-money">
            Sorry : You don't have enough money you need to pay{' '}
            <span className="pricing-points">${100 - cashValue}</span>
          </div>
        )}

        {!redeemChecked && (
          <>
            {' '}
            <div className="payment-method-headline">
              Choose your payment method to pay{' '}
              <span className="featuerd-price">${100 - cashValue}</span>{' '}
            </div>
            {cardsInfo?.length !== 0 ? (
              <>
                {' '}
                <div className="payment-method-choice">choice From Cards</div>
                {isLoading ? (
                  <Loading />
                ) : (
                  <>
                    {cardsInfo.map((card) => {
                      return (
                        <CreditCard
                          key={card.key}
                          data={card}
                          checkable={true}
                          checkedValue={value}
                          onChange={handleRadioChange}
                        />
                      );
                    })}
                    {/* </Radio.Group> */}
                  </>
                )}
              </>
            ) : (
              <div className="payment-method-choice">
                you have no saved cards yet !
              </div>
            )}
            <div
              onClick={() => {
                setValue(null);
                setOpenPaymentForm(!openPaymentForm);
              }}
              className="payment-plus-card"
            >
              <PlusCardIcon className="PlusCardIcon" />
              Add New Card
            </div>
            {openPaymentForm && !value && (
              <Form form={form} onFinish={onFinish} layout="vertical">
                <Row justify="space-between">
                  <Col span={10}>
                    <Form.Item
                      label="Full name"
                      name="name"
                      rules={[
                        {
                          required: true,
                          message: 'Please enter card holder name!',
                        },
                      ]}
                    >
                      <Input placeholder="Card holder name" />
                    </Form.Item>
                  </Col>
                  <Col span={10}>
                    <Form.Item
                      label="Card number"
                      name="number"
                      rules={[
                        {
                          required: true,
                          message: 'Please enter credit card number!',
                        },
                        {
                          pattern:
                            /(\d{4}[-. ]?){4}|\d{4}[-. ]?\d{6}[-. ]?\d{5}/g,
                          message: 'Please enter a valid credit card number!',
                        },
                      ]}
                    >
                      <Input placeholder="0000 0000 0000 00" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row justify="space-between">
                  <Col span={10}>
                    <Form.Item
                      label="MM/YY"
                      name="exp"
                      rules={[
                        {
                          required: true,
                          message: 'Please enter date format!',
                        },

                        {
                          pattern: /^(0[1-9]|1[0-2])[- /.]\d{2}/,

                          message: 'Please enter a valid date format!',
                        },
                      ]}
                    >
                      <Input placeholder="MM/YY" />
                    </Form.Item>
                  </Col>
                  <Col span={10}>
                    <Form.Item
                      label="CVV code"
                      name="cvc"
                      rules={[
                        {
                          required: true,
                          message: 'Please enter a CVV code',
                        },
                        {
                          pattern: /^[0-9]{3,4}$/,
                          message: 'Please enter a CVV code format!',
                        },
                      ]}
                    >
                      <Input placeholder="000" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Checkbox onChange={handelSaveCard}>
                      save card for later
                    </Checkbox>
                  </Col>
                </Row>
              </Form>
            )}
          </>
        )}
      </div>
      <Row className="mb-6" gutter={[16, 16]}>
        <Col span={16}></Col>
        <Col span={4}>
          {' '}
          <Button
            onClick={() =>
              navigate('/instructor-dashboard/courses/add/course-pricing')
            }
            className="back-btn"
          >
            Back
          </Button>
        </Col>
        <Col span={4}>
          {' '}
          <DashboardButton
            text="Pay Now"
            onclick={onSubmit}
            type="link"
            btnClass="finish-payment-ptn"
            loading={loading}
            disabled={!openPaymentForm && !value && !redeemChecked}
          />
        </Col>
      </Row>
    </div>
  );
}
