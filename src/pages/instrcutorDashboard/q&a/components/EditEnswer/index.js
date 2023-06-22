import React from 'react';
import { Modal, Form, Input } from 'antd';
import './index.scss';
import DashboardButton from '../../../../../components/common/dashboard/components/button';
import { Closecon } from '../../../../../assets/svg';

const EditAnswerModal = ({ isOpen, cancel }) => {
  const [form] = Form.useForm();
  const onsubmit = () => {
    form.submit();
  };

  const onCancel = () => {
    cancel();
  };
  const onFinish = (values) => {
    console.log(values);
  };
  return (
    <Modal
      title="Edit my Answer"
      centered
      closeIcon={<Closecon />}
      open={isOpen}
      onCancel={cancel}
      footer={null}
      className="edit-answer-modal"
      width="446px"
    >
      <Form
        form={form}
        name="editCardForm"
        layout="vertical"
        onFinish={onFinish}
        className="dashboard-form"
      >
        <Form.Item
          name="answer"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input.TextArea autoSize={{ minRows: 3.82, maxRows: 3.82 }} />
        </Form.Item>
      </Form>
      <div className="modal-actions">
        <DashboardButton
          text="Cancel"
          btnClass="btn-modal gray-btn"
          onclick={onCancel}
          type="link"
          cssStyle={{ height: '40px' }}
        />
        <DashboardButton
          text="Edit"
          btnClass="btn-modal"
          onclick={onsubmit}
          type="link"
          cssStyle={{ marginLeft: '14px', height: '40px' }}
        />
      </div>
    </Modal>
  );
};

export default EditAnswerModal;
