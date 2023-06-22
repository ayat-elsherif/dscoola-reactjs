import { Button, Col, Form, Input, Row, message } from 'antd';
import React, { useState } from 'react';
import fetch from '../../../../../auth/AuthInterceptor';
import { useQueryClient } from '@tanstack/react-query';

const AddCard = ({ onAddSucc }) => {
  const [loading, setLoading] = useState();
  const queryClient = useQueryClient();
  const onFinish = (values) => {
    setLoading(true);
    const exp_month = values.exp?.slice(0, values.exp?.indexOf('/'));
    const short_exp_year = +values.exp?.slice(3);
    const exp_year = short_exp_year + 2000;
    values.exp_month = exp_month;
    values.exp_year = exp_year;
    values.is_saved = 1;
    delete values.exp;
    fetch({
      url: `api/stripe/save-card`,
      method: 'post',
      headers: {
        'public-request': 'true',
      },
      data: values,
    })
      .then(() => {
        message.success('Add Successfully');
        setLoading(false);
        onAddSucc();
        queryClient.invalidateQueries([`get-cards-info`]);
      })
      .catch(() => {
        message.error('something went wrong');
        setLoading(false);
      });
  };
  return (
    <Form onFinish={onFinish} layout="vertical">
      <Row justify="space-between">
        <Col span={10}>
          <Form.Item
            label="Full name"
            name="name"
            rules={[
              {
                required: true,
                message: 'Please enter card holder name!',
              },
            ]}
          >
            <Input placeholder="Card holder name" />
          </Form.Item>
        </Col>
        <Col span={10}>
          <Form.Item
            label="Card number"
            name="number"
            rules={[
              {
                required: true,
                message: 'Please enter credit card number!',
              },
              {
                pattern: /(\d{4}[-. ]?){4}|\d{4}[-. ]?\d{6}[-. ]?\d{5}/g,
                message: 'Please enter a valid credit card number!',
              },
            ]}
          >
            <Input placeholder="0000 0000 0000 00" />
          </Form.Item>
        </Col>
      </Row>
      <Row justify="space-between">
        <Col span={10}>
          <Form.Item
            label="MM/YY"
            name="exp"
            rules={[
              {
                required: true,
                message: 'Please enter date format!',
              },

              {
                pattern: /^(0[1-9]|1[0-2])[- /.]\d{2}/,

                message: 'Please enter a valid date format!',
              },
            ]}
          >
            <Input placeholder="MM/YY" />
          </Form.Item>
        </Col>
        <Col span={10}>
          <Form.Item
            label="CVV code"
            name="cvc"
            rules={[
              {
                required: true,
                message: 'Please enter a CVV code',
              },
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
      <Row justify="end">
        <Col>
          <Button htmlType="submie" loading={loading}>
            Save
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default AddCard;
