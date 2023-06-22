import { css } from '@emotion/css';
import { Button } from 'antd';
import { GiftIcon } from 'assets/svg';
import ModalGiftCourse from 'components/modals/ModalGiftCourse';
import { useState } from 'react';

function BtnGiftSend() {
  const BtnGiftSendStyles = css`
    min-width: 3.5rem;
    height: 3.5rem;
    /* box-shadow: 0px 0px 6px #d6d1e5d6; */
    svg {
      margin-bottom: 0.2rem;
    }
  `;

  const [isGiftModal, setIsGiftModal] = useState(false);

  return (
    <>
      <Button
        type="default"
        icon={<GiftIcon width={16} />}
        shape="circle"
        className={BtnGiftSendStyles}
        onClick={() => setIsGiftModal(true)}
      />
      <ModalGiftCourse
        open={isGiftModal}
        setOpen={() => setIsGiftModal(false)}
      />
    </>
  );
}

export default BtnGiftSend;
