import React from 'react';
import { Button, Col, message, Modal, Row } from 'antd';

import { DeleteModalIcon } from '../../../../../assets/svg';
import DashboardButton from '../../../../../components/common/dashboard/components/button';
import useApi from 'network/useApi';
import { useQueryClient } from '@tanstack/react-query';

const DeleteModal = ({ isOpen, cancel, id }) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const onDelete = () => {
    cancel();
    api
      .delete(`instructor/announcement/${id?.id}`)
      .then(() => {
        queryClient.invalidateQueries([`get-annoncement`]);
        cancel();
      })
      .catch(() => {
        message.error('someting went wrong!');
      });
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
        <p>You Want To Delete this Announcement</p>
      </div>

      <Row justify="center" gutter={[16, 16]}>
        <Col>
          {' '}
          <Button onClick={onCancel}>Cancel</Button>
        </Col>
        <Col>
          {' '}
          <Button btnClass="btn-modal" onClick={onDelete} type="primary">
            Delete
          </Button>
        </Col>
      </Row>
    </Modal>
  );
};

export default DeleteModal;
