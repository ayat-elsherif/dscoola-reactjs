import OwnModal from 'components/own/OwnModal';
import React, { useState } from 'react';
import { colorfulGiftIcon } from '../../pages/courses/SVGs';
import './gift.scss';
import GiftForm from './GiftForm';
function SendGift({ giftLabel }) {
  const [show, setShow] = useState(false);
  const handleOpen = () => setShow(true);
  const handleClose = () => setShow(false);
  return (
    <div className="sendGift">
      <div className="sendGift-toggle" onClick={() => handleOpen()}>
        {colorfulGiftIcon} {giftLabel ? giftLabel : ''}
      </div>

      <OwnModal
        open={show}
        onCancel={() => {
          handleClose(setShow);
        }}
        className="giftForm"
      >
        <GiftForm />
      </OwnModal>
    </div>
  );
}

export default SendGift;
