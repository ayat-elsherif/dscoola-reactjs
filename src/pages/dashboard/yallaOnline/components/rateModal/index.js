import React, { useState } from 'react';
import { Input, Modal } from 'antd';
import './index.scss';
import { useRate } from '../../hooks/useMyYallaOnLine';
import { useQueryClient } from '@tanstack/react-query';
import DashboardButton from '../../../../../components/common/dashboard/components/button';
import Rating from 'components/Rating/Rating';

const RateModal = ({ isOpen, cancel, id }) => {
  const [ratingValue, setRatingValue] = useState(null);
  const [comment, setComment] = useState('');
  const queryClient = useQueryClient();
  const onRateSuccess = () => {
    queryClient.invalidateQueries([`yallaonline/enrolled`]);
    queryClient.invalidateQueries([`yallaonline/my-groups`]);
    cancel();
  };
  const onRateFail = (data) => {
    console.log('fail', data);
  };
  const { mutate, isLoading } = useRate(id, onRateSuccess, onRateFail);
  const addRate = () => {
    mutate({ rate: ratingValue, comment });
  };
  return (
    <Modal
      centered
      closable={false}
      open={isOpen}
      onCancel={cancel}
      footer={null}
      className="rate-modal"
      width="478px"
    >
      <img
        src="/assets/images/instructors/julian-wan-WNoLnJo7tS8-unsplash.png"
        alt="userPhoto"
      />
      <h3>Vladimir Raykov</h3>
      <p>Rate your experience with the group</p>
      {/* <Rating
        className="ratingStars"
        name="no-value"
        value={ratingValue}
        onChange={(e) => {
          setRatingValue(e.target.value);
        }}
        size="large"
        /> */}
      <Rating
        defaultValue={ratingValue}
        showAvg={false}
        size="large"
        onChange={(newValue) => {
          setRatingValue(newValue);
        }}
      />
      <Input.TextArea
        autoSize={{ minRows: 3.4, maxRows: 3.4 }}
        placeholder="Write review"
        onChange={(e) => setComment(e.target.value)}
      />

      <DashboardButton
        text="Submit"
        btnClass="btn-modal"
        onclick={addRate}
        loading={isLoading}
        disabled={!ratingValue}
      />
    </Modal>
  );
};

export default RateModal;
