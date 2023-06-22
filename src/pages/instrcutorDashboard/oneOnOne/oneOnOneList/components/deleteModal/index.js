import React from 'react';
import { Modal } from 'antd';
import DashboardButton from '../../../../../../components/common/dashboard/components/button';
import { DeleteModalIcon } from '../../../../../../assets/svg';

const DeleteModal = ({ isOpen, cancel }) => {
  const onDelete = () => {
    cancel();
  };
  const onCancel = () => {
    cancel();
  };

  return (
    <Modal
      centered
      closable={false}
      open={isOpen}
      onCancel={cancel}
      footer={null}
      className="delete-modal"
      width="440px"
    >
      <div className="delete-modal_header">
        <DeleteModalIcon />
        <h3>Are You Sure ?</h3>
        <p>You Want To Delete Meeting</p>
      </div>

      <div className="delete-actions">
        <DashboardButton
          text="Cancel"
          btnClass="btn-modal gray-btn"
          onclick={onCancel}
          type="link"
        />
        <DashboardButton
          text="Delete"
          btnClass="btn-modal"
          onclick={onDelete}
          type="link"
          cssStyle={{ marginLeft: '14px' }}
        />
      </div>
    </Modal>
  );
};

export default DeleteModal;
