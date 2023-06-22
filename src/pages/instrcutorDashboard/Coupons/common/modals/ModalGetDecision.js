import { css } from '@emotion/css';
import { Button, Space } from 'antd';
import { DeleteModalIcon } from 'assets/svg';
import OwnModal from 'components/own/OwnModal';

function ModalGetDecision({
  open,
  icon,
  title,
  subTitle,
  onOk,
  okText = 'Ok',
  onCancel,
  loading,
}) {
  const ModalGetDecisionStyles = css`
    padding: 2rem 0 2.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.2rem;
    .head-icon {
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
    <OwnModal open={open} centered width={440}>
      <div className={ModalGetDecisionStyles}>
        {icon || <DeleteModalIcon className="head-icon" />}
        {title && <div className="title">{title}</div>}
        {subTitle && <div className="sub-title">{subTitle}</div>}
        <Space style={{ justifyContent: 'center' }}>
          <Button type="default" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="primary" loading={loading} onClick={onOk}>
            {okText}
          </Button>
        </Space>
      </div>
    </OwnModal>
  );
}

export default ModalGetDecision;
