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
  Space,
} from 'antd';
import { Option } from 'antd/lib/mentions';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import StepHeader from '../components/stepHeader';
import './index.scss';
import fetch from '../../../../../../../auth/AuthInterceptor';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { CheckedIcon } from '../../../../../../../assets/svg';
import { normalizeDataToFields } from '../../../../../../dashboard/myProfile/components/personalInformation/Helpers';
import DashboardButton from 'components/common/dashboard/components/button';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Loading from 'components/common/dashboard/shared-components/Loading';
import useApi from 'network/useApi';

export default function CoursePricing() {
  const navigate = useNavigate();
  const [getData, setGetData] = useState();
  const queryClient = useQueryClient();
  const [value, setValue] = useState('free');
  const [featuerd, setFeatuerd] = useState(0);
  const [pointsValue, setpointsValue] = useState(0);

  const [localStorageFeatuerd, setLocalStorageFeatuerd] = useState(false);
  const [price, setPrice] = useState(0);
  const [salePrice, setSalePrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [getLoading, setGetLoading] = useState(false);
  const [fields, setFields] = useState([]);
  const [premiumInstructor, setPremiumInstructor] = useState(false);
  const [form] = Form.useForm();
  const api = useApi();
  useEffect(() => {
    setGetLoading(true);

    const isFeatuerd = localStorage.getItem('is_featuerd');
    const premiumInstructor = localStorage.getItem('premiumInstructor');
    setPremiumInstructor(premiumInstructor);

    setLocalStorageFeatuerd(isFeatuerd);
    fetch({
      url: `api/lecture/course/${localStorage.getItem('live-course-id')}/price`,
      method: 'get',
      headers: {
        'public-request': 'true',
      },
    })
      .then((res) => {
        setGetLoading(false);
        setGetData(res.data);
        console.log(res.data.price, 'sdcvsdv');
        form.setFieldsValue({
          price: res.data.price,
          sale_price: res.data.sale_price,
        });
        setSalePrice(res.data.sale_price);
        setPrice(res.data.price);
      })
      .catch((err) => {
        setGetLoading(false);
        message.error('something went wrong');
      });
  }, []);

  const onChange = (e) => {
    setValue(e.target.value);
  };
  const onfeatuerdChange = (e) => {
    setFeatuerd(e.target.value);
  };
  const onCheckedChange = (e) => {};

  const onFinish = () => {
    let today =
      dayjs().format('YYYY') + -+dayjs().format('MM') + -+dayjs().format('DD');
    const data = {
      price_plan:
        premiumInstructor || getData?.price_plan === 'paid' ? 'paid' : 'free',
      price: price?price:0,
      sale_price: salePrice?salePrice:0,
      is_featured: getData.is_featured
        ? true
        : localStorageFeatuerd
        ? true
        : featuerd,
      featured_at: today,
    };
    setLoading(true);
    fetch({
      url: `api/lecture/course/${localStorage.getItem('live-course-id')}/price`,
      method: 'put',
      headers: {
        'public-request': 'true',
      },
      data: data,
    })
      .then((res) => {
        localStorage.removeItem('is_featuerd');
        localStorage.removeItem('acceptTerms');
        localStorage.removeItem('premiumInstructor');
        queryClient.invalidateQueries([`add-course`]);

        setLoading(false);
        navigate('/instructor-dashboard/courses/add/course-setting');
      })
      .catch((err) => {
        setLoading(false);
        message.error('something went wrong');
      });
  };

  return (
    <>
      {' '}
      {getLoading ? (
        <Loading />
      ) : (
        <div className="intended-learners">
          <StepHeader data={{ title: 'Pricing', preview: true }} />
          <div className="intended-learners_body">
            <div className="pricing-title">Course Price</div>
            <div className="pricing-info">
              Determine the price of your course and select the currency in
              which you will receive the amount.
            </div>
            {
              <>
                {premiumInstructor || getData?.price_plan === 'paid' ? (
                  <>
                    <Form layout="vertical" fields={fields} form={form}>
                      <Form.Item
                        label="What is the full amount you'd like to provide per hour ?"
                        name="price"
                      >
                        <Input
                          onChange={(e) => {
                            setPrice(e.target.value);
                          }}
                          placeholder="25.00"
                          style={{
                            width: '50%',
                          }}
                        />
                      </Form.Item>

                      <Form.Item label="Sale Price ?" name="sale_price">
                        <Input
                          onChange={(e) => {
                            setSalePrice(e.target.value);
                          }}
                          placeholder="25.00"
                          style={{
                            width: '50%',
                          }}
                        />
                      </Form.Item>
                    </Form>
                  </>
                ) : (
                  <>
                    <div className="pricing-plane-ques">
                      How do you want to be paid?
                    </div>

                    <Radio.Group
                      className="pricing-radio"
                      onChange={onChange}
                      value={value}
                    >
                      <Space direction="vertical">
                        <Radio value={'free'}>Free</Radio>
                        <Radio value={'paid'}>Select the amount</Radio>
                      </Space>
                    </Radio.Group>
                    {value == 'paid' && (
                      <div className="pricing-warning">
                        {' '}
                        <span className="pricing-warning-red">
                          Warning :
                        </span>{' '}
                        <span>
                          {' '}
                          Please complete the premium instructor application{' '}
                        </span>
                        <span
                          onClick={() =>
                            navigate(
                              '/instructor-dashboard/courses/premium-instructor',
                            )
                          }
                          className="pricing-warning-link"
                        >
                          here
                        </span>{' '}
                        <span>
                          {' '}
                          in order to set a price for your course. You can set
                          your course price as soon as your linked payment
                          method is approved.
                        </span>
                      </div>
                    )}
                  </>
                )}
              </>
            }

            {localStorageFeatuerd || getData?.is_featured ? (
              <>
                <Row className="is-featuerd-text-row">
                  <Col span={1}>
                    <CheckedIcon />
                  </Col>
                  <Col span={23} className="is-featuerd-text">
                    Now your course has been featured and will be visible easily
                    to students when they search for it and at the top of
                    courses
                  </Col>
                </Row>
              </>
            ) : (
              <>
                {value == 'free' && !localStorageFeatuerd && (
                  <>
                    {' '}
                    <div className="pricing-plane-ques">
                      Make your Course Featured
                    </div>
                    <Radio.Group
                      className="pricing-radio"
                      onChange={onfeatuerdChange}
                      value={featuerd}
                    >
                      <Space>
                        <Radio value={1}>Yes</Radio>
                        <Radio value={0}>No</Radio>
                      </Space>
                    </Radio.Group>
                    <div className="pricing-info">
                      Now you can make your course Featured so it's easily
                      visible to students when they search for it only{' '}
                      <span className="pricing-100">$100</span>
                    </div>
                    {featuerd === 1 && (
                      <>
                        <Row>
                          <Col>
                            {' '}
                            <DashboardButton
                              text="Pay Now"
                              onclick={() =>
                                navigate(
                                  '/instructor-dashboard/courses/add/course-pricing/payment-method',
                                )
                              }
                            ></DashboardButton>
                          </Col>
                        </Row>
                      </>
                    )}
                  </>
                )}
              </>
            )}

            <Row justify="end" className="pt-5">
              <Col>
                <Button
                  onClick={onFinish}
                  loading={loading}
                  disabled={featuerd === 1 || value == 'paid'}
                  type="link"
                  className="btn-step-next"
                >
                  Next Step
                </Button>
              </Col>
            </Row>
          </div>
        </div>
      )}
    </>
  );
}
