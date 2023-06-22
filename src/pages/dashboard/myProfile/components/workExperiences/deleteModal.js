import { Button, Col, Modal, Row } from 'antd';
import { DeleteModalIcon } from 'assets/svg';
import React from 'react';
import './index.scss';

const DeleteModal = ({
  open,
  handleCancel,
  loading,
  handleDelete,
  header,
  body,
}) => {
  return (
    <>
      {' '}
      <Modal
        open={open}
        title="Title"
        onOk={handleDelete}
        onCancel={handleCancel}
        footer={null}
        width={440}
        height={299}
        className="delete-modal"
      >
        <Row justify="center" gutter={[16, 16]}>
          <Col span={24}>
            <DeleteModalIcon />
          </Col>
          <Col className="delete-modal-header" span={24}>
            {header}
          </Col>
          <Col className="mb-4" span={24}>
            {body}
          </Col>
          <Col span={24}>
            <Row justify="center" gutter={[16, 16]}>
              <Col>
                <Button key="back" onClick={handleCancel}>
                  Cancel
                </Button>
              </Col>
              <Col>
                <Button
                  key="submit"
                  type="primary"
                  loading={loading}
                  onClick={handleDelete}
                >
                  Delete
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default DeleteModal;
