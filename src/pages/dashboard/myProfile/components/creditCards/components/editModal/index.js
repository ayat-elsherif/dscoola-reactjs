import React from 'react';
import { Modal, Form, Input, Row, Col, Button } from 'antd';
import './index.scss';

const EditModal = ({ isOpen, cancel }) => {
  const [form] = Form.useForm();
  const onEdit = () => {
    form.submit();
  };
  const onFinish = (values) => {
    console.log(values);
  };
  return (
    <Modal
      centered
      closable={false}
      open={isOpen}
      onCancel={cancel}
      footer={null}
      className="edit-modal"
      width="484px"
    >
      <h3>Edit Credit or Debit Card</h3>
      <Form
        form={form}
        name="editCardForm"
        layout="vertical"
        onFinish={onFinish}
        className="dashboard-form"
      >
        <Form.Item
          label="Full name"
          name="cardHolderName"
          rules={[
            {
              require: true,
              message: 'Please enter card holder name!',
            },
          ]}
        >
          <Input placeholder="Card holder name" />
        </Form.Item>
        <Form.Item
          label="Card number"
          name="cardNumber"
          rules={[
            {
              pattern: /(\d{4}[-. ]?){4}|\d{4}[-. ]?\d{6}[-. ]?\d{5}/g,
              message: 'Please enter a valid credit card number!',
            },
          ]}
        >
          <Input placeholder="0000 0000 0000 00" />
        </Form.Item>
        <Row gutter={16}>
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              label="MM/YY"
              name="exp"
              rules={[
                {
                  pattern: /^(0[1-9]|1[0-2])[- /.]\d{2}/,
                  message: 'Please enter a valid date format!',
                },
              ]}
            >
              <Input placeholder="MM/YY" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              label="CVV code"
              name="cvv"
              rules={[
                {
                  pattern: /^[0-9]{3,4}$/,
                  message: 'Please enter a CVV code format!',
                },
              ]}
            >
              <Input placeholder="000" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <div className="form-actions">
        <Button className="discard" onClick={cancel}>
          Cancel
        </Button>
        <Button type="primary" className="save" onClick={onEdit}>
          Update
        </Button>
      </div>
    </Modal>
  );
};

export default EditModal;
