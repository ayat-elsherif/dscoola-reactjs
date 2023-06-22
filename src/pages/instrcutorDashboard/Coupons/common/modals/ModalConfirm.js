import { css } from '@emotion/css';
import { Button } from 'antd';
import { CheckedOutlineIcon } from 'assets/svg';
import OwnModal from 'components/own/OwnModal';

function ModalConfirm({ open, icon, title, subTitle, onOk }) {
  const ModalConfirmStyles = css`
    padding: 2rem 0 2.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.2rem;
    svg {
      width: 9.1rem;
      height: 9.1rem;
      margin-bottom: 0.6rem;
    }
    .title {
      font-weight: 500;
      font-size: 1.8rem;
      line-height: 2.2rem;
      color: #2a2a2a;
      text-transform: capitalize;
      text-align: center;
    }
    .sub-title {
      font-size: 1.3rem;
      line-height: 2.2rem;
      color: #7e7e7e;
      text-transform: capitalize;
      text-align: center;
    }
    button {
      margin-top: 3rem;
    }
  `;
  return (
    <OwnModal open={open} centered width={526}>
      <div className={ModalConfirmStyles}>
        {icon || <CheckedOutlineIcon />}
        {title && <div className="title">{title}</div>}
        {subTitle && <div className="sub-title">{subTitle}</div>}
        <Button type="primary" onClick={onOk}>
          Ok
        </Button>
      </div>
    </OwnModal>
  );
}

export default ModalConfirm;
