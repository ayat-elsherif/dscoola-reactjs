import { Button, Col, message, Row } from 'antd';
import useApi from 'network/useApi';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StripeIcon } from '../../../../../../../../assets/svg';
import SweetAlert from '../../../../../../../../components/common/dashboard/components/sweetAlert.js';

import { useGetProfileInfo } from 'pages/dashboard/myProfile/components/personalInformation/hooks/usePersonalInfo';

const PayoutMethods = ({ onPrev }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const api = useApi();
  const onFinish = () => {
    const acceptTerms = localStorage.getItem('acceptTerms');
    if (acceptTerms) {
      SweetAlert('Done!', 'We will review your data and reply very soon !');
      navigate('/instructor-dashboard/courses/add/course-pricing');
      localStorage.setItem('premiumInstructor', true);
    } else {
      message.error('Please accept terms to continue.');
    }
  };

  const handleAddPaymentMethod = () => {
    setLoading(true);
    api.post('stripe/create/account/link').then((data) => {
      window.open(data?.data?.url, '_blank');
      setLoading(false);
    });
  };

  const { data } = useGetProfileInfo();

  return (
    <>
      <div className="payment-method-step">
        <div className="payment-method-header">Payout methods</div>
        <div className="payment-method-description">
          choose your payment method below
        </div>
        <Row
          align="middle"
          justify="space-between"
          className="payment-method-item-container"
        >
          <Col>
            <StripeIcon />
          </Col>
          <Col>
            <Button
              loading={loading}
              className="payment-method-btn"
              onClick={handleAddPaymentMethod}
              disabled={data.data.stripe_account_id}
            >
              {data.data.stripe_account_id ? 'Connected' : 'Connect'}
            </Button>
          </Col>
        </Row>
      </div>
      {/* <Row justify="end">
        <button className="save-and-continue-finish" onClick={onFinish}>
          Save & Continue
        </button>
      </Row> */}
      <Row justify="end" gutter={[16]} className="pt-5">
        <Col>
          <Button onClick={onPrev}>Back</Button>
        </Col>
        <Col>
          <Button onClick={onFinish} type="primary">
            Finish
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default PayoutMethods;
