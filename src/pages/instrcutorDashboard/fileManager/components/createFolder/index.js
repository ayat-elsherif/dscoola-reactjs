import React from 'react';
import { Modal, Form, Input } from 'antd';

import DashboardButton from '../../../../../components/common/dashboard/components/button';
import './index.scss';
import { Closecon } from '../../../../../assets/svg';

const CreateFolder = ({ isOpen, cancel }) => {
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
      className="create-folder-modal"
      width="458px"
    >
      <h3>New Folder</h3>

      <Form
        form={form}
        name="create-folder"
        layout="vertical"
        onFinish={onFinish}
        className="dashboard-form"
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder="Enter Folder Name" />
        </Form.Item>
      </Form>

      <DashboardButton
        text="Create Folder"
        btnClass="btn-modal"
        onclick={onsubmit}
        type="link"
        cssStyle={{ height: '40px', width: '100%' }}
      />
    </Modal>
  );
};

export default CreateFolder;
