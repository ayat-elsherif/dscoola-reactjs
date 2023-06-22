import React from 'react';
import { Modal, Form, Input } from 'antd';
import './index.scss';
import DashboardButton from '../../../../../components/common/dashboard/components/button';
import { Closecon } from '../../../../../assets/svg';

const EditAnnouncementModal = ({ isOpen, cancel }) => {
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
      title="Edit Announcement"
      centered
      closable={false}
      open={isOpen}
      onCancel={cancel}
      footer={null}
      className="edit-announcement-modal"
      width="484px"
    >
      <Form
        form={form}
        name="editCardForm"
        layout="vertical"
        onFinish={onFinish}
        className="dashboard-form"
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder="Title" />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input.TextArea
            autoSize={{ minRows: 3.82, maxRows: 3.82 }}
            placeholder="Description"
          />
        </Form.Item>
      </Form>
      <div className="modal-actions">
        <DashboardButton
          text="Cancel"
          btnClass="btn-modal gray-btn"
          onclick={onCancel}
          type="link"
          cssStyle={{ height: '40px', borderRadius: '4px', color: '#7E59D1' }}
        />
        <DashboardButton
          text="Update"
          btnClass="btn-modal"
          onclick={onsubmit}
          type="link"
          cssStyle={{ marginLeft: '14px', height: '40px' }}
        />
      </div>
    </Modal>
  );
};

export default EditAnnouncementModal;
