import React, { useEffect, useState } from 'react';
import {
  PaypalIcon,
  PlusCardIcon,
  StripeIcon,
} from '../../../../../assets/svg';
import CreditCard from './creditCard';
import './index.scss';
import useApi from '../../../../../network/useApi';
import { Button, Col, Modal, Row } from 'antd';
import fetch from '../../../../../auth/AuthInterceptor';

import AddCard from './addCard';
import { useQuery } from '@tanstack/react-query';
import { useGetProfileInfo } from '../personalInformation/hooks/usePersonalInfo';
const CreditCards = () => {
  const api = useApi();
  const [cardsData, setCardsData] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const getCardsInfo = () => {
    return fetch({
      url: `api/stripe/user/cards`,
      method: 'get',
      headers: {
        'public-request': 'true',
      },
    });
  };

  const { data, isLoading } = useQuery([`get-cards-info`], () =>
    getCardsInfo(),
  );

  const handleAddPaymentMethod = () => {
    setLoading(true);
    api.post('stripe/create/account/link').then((data) => {
      window.open(data?.data?.url, '_blank');
      setLoading(false);
    });
  };

  const { data: profileInfo } = useGetProfileInfo();
  return (
    <div className="credit-cards">
      <div className="info-header">
        <h3>Payment Methods</h3>
        <h4>Update your Payment Methods</h4>
        <div className="form-section-title">Cards</div>
      </div>
      {data?.data?.length ? (
        data?.data?.map((card) => {
          return <CreditCard key={card.key} data={card} />;
        })
      ) : (
        <p className="empty-state">No Cards To Show</p>
      )}
      <span
        onClick={() => {
          setOpen(true);
        }}
        className="payment-plus-card"
      >
        <PlusCardIcon className="PlusCardIcon" />
        Add New Card
      </span>
      <div className="form-section-title">Payment Accounts</div>

      <div className="credit-card">
        <div className="card-type">
          <StripeIcon />
        </div>
        <div className="card-actions-expire">
          <Button
            loading={loading}
            className="payment-method-btn"
            onClick={handleAddPaymentMethod}
            disabled={profileInfo?.data?.stripe_account_id}
          >
            {profileInfo?.data?.stripe_account_id ? 'Connected' : 'Connect'}
          </Button>
        </div>
      </div>
      <Modal
        title="Add Card"
        centered
        open={open}
        destroyOnClose
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={700}
        footer={null}
      >
        <AddCard onAddSucc={() => setOpen(false)} />
      </Modal>
    </div>
  );
};

export default CreditCards;
