import React from 'react';
import { Modal, Form, Input, message, Button } from 'antd';
import './index.scss';
import { Closecon } from '../../../../../../../assets/svg';
import { useDeactivateAccount } from '../../hooks/UseDeactivate';
import { useNavigate } from 'react-router-dom';

const DeactivateModal = ({ isOpen, cancel }) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const onSuccess = () => {
    cancel();
    navigate('/sign-in');
  };
  const onFail = (data) => {
    message.error('Invalid Password');
  };
  const { mutate, isLoading } = useDeactivateAccount(onSuccess, onFail);
  const onsubmit = () => {
    form.submit();
  };
  const onFinish = (values) => {
    mutate(values);
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
      <h3>Deactivate account</h3>
      <p>Are you sure you want to Deactivate your account ?</p>
      <Form
        form={form}
        name="editCardForm"
        layout="vertical"
        onFinish={onFinish}
        className="dashboard-form"
      >
        <Form.Item
          name="password"
          label="your password"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input
            className="p"
            type="password"
            placeholder="Enter your password"
          />
        </Form.Item>
      </Form>
      <div className="form-actions">
        <Button type="primary" className="save" onClick={onsubmit}>
          Deactivate account
        </Button>
      </div>
    </Modal>
  );
};

export default DeactivateModal;
