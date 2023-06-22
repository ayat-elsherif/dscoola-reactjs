import { css } from '@emotion/css';
import { message, Popconfirm } from 'antd';
// import { t } from 'i18next';
import React from 'react';

function OwnConfirm({
  children,
  okMes,
  cancelMes,
  title,
  okText,
  cancelText,
  onConfirm,
  onCancel,
}) {
  const PopconfirmStyles = css``;
  const btnOk = css`
    span {
      color: #7e59d1;
    }
  `;
  const btnCancel = css`
    span {
    }
  `;
  const confirm = (e) => {
    // console.log(e);
    // message.success(okMes || "Deleting");
    if (onConfirm) onConfirm();
  };

  const cancel = (e) => {
    // console.log(e);
    message.info(cancelMes || 'Canceled');
    if (onCancel) onCancel();
  };
  return (
    <Popconfirm
      title={title || 'Are you sure you want to delete this item?'}
      onConfirm={confirm}
      onCancel={cancel}
      okText={okText || 'Yes'}
      cancelText={cancelText || 'No'}
      className={PopconfirmStyles}
      okButtonProps={{ type: 'link', className: btnOk }}
      cancelButtonProps={{ type: 'link', className: btnCancel }}
    >
      {children}
    </Popconfirm>
  );
}

export default OwnConfirm;
