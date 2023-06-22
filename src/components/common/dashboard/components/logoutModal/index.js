import React from 'react';
import { Modal, Button } from 'antd';
import './index.scss';
import { Closecon } from '../../../../../assets/svg';

const LogoutModal = ({ isOpen, cancel, onsubmit }) => {
  return (
    <Modal
      centered
      closeIcon={<Closecon />}
      open={isOpen}
      onCancel={cancel}
      footer={null}
      className="logout-modal"
      width="526px"
    >
      <img src="/assets/images/logout.png" alt="logout" />
      <h3>oops!</h3>
      <p>Are you sure you want to log out?</p>

      <Button
        type="primary"
        // className="antd-main-btn"
        // block={true}
        style={{ margin: 'auto' }}
        onClick={onsubmit}
      >
        Ok
      </Button>
    </Modal>
  );
};

export default LogoutModal;
