import React from 'react';
import { Button, message, Modal } from 'antd';
import './index.scss';
import { WarningIcon } from '../../../../../../../assets/svg';
import { useState } from 'react';
import fetch from '../../../../../../../auth/AuthInterceptor';
import { useQueryClient } from '@tanstack/react-query';
const DeleteModal = ({ isOpen, cancel, data }) => {
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const handelDelete = () => {
    setLoading(true);
    fetch({
      url: `api/stripe/delete/user-card`,
      method: 'delete',
      headers: {
        'public-request': 'true',
      },
      data: {
        id: data.id,
      },
    })
      .then((res) => {
        queryClient.invalidateQueries([`get-cards-info`]);
        setLoading(false);
        message.success('deleted successfully!');
      })
      .catch((e) => {
        message.error('someting went wrong!');
        setLoading(false);
      });
  };

  return (
    <Modal
      centered
      closable={false}
      open={isOpen}
      onCancel={cancel}
      footer={null}
      className="delete-modal"
      width="526px"
    >
      <WarningIcon />
      <h3>Warning</h3>
      <p>Are you sure you want to delete This Card?</p>
      <div className="form-actions">
        <Button className="discard" onClick={cancel}>
          Cancel
        </Button>
        <Button
          type="primary"
          className="save"
          onClick={handelDelete}
          loading={loading}
        >
          Delete
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteModal;
