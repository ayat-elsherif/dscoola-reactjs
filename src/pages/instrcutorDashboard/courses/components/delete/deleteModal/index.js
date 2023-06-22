import React from 'react';
import { Modal, Form, Input } from 'antd';
import DashboardButton from '../../../../../../components/common/dashboard/components/button';

import './index.scss';
import { Closecon } from '../../../../../../assets/svg';
const { TextArea } = Input;
const DeleteModal = ({ isOpen, cancel }) => {
  const [form] = Form.useForm();

  const onsubmit = () => {
    form.submit();
  };
  const onFinish = (values) => {
    console.log(values);
  };
  return (
    <Modal
      centered
      closeIcon={<Closecon />}
      open={isOpen}
      onCancel={cancel}
      footer={null}
      className="deactivate-modal"
      width="452px"
    >
      <h3>Delete This Course</h3>

      <Form
        form={form}
        name="editCardForm"
        layout="vertical"
        onFinish={onFinish}
        className="dashboard-form"
      >
        <Form.Item
          name="reason"
          label="What is your reason for deleting this course?"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <TextArea placeholder="Type here" />
        </Form.Item>
      </Form>
      <div className="delete-actions">
        <DashboardButton
          text="Cancel"
          btnClass="btn-modal gray-btn"
          onclick={cancel}
          type="link"
        />
        <DashboardButton
          text="Delete"
          btnClass="btn-modal"
          onclick={onsubmit}
          type="link"
          cssStyle={{ marginLeft: '14px' }}
        />
      </div>
    </Modal>
  );
};

export default DeleteModal;
