import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  Radio,
  Row,
  Select,
  Space,
  TimePicker,
} from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import { useState } from 'react';

const RequestBundle = () => {
  const [dialy, setDialy] = useState(null);
  const [occurs, setOccurs] = useState('');
  const [monthlyRadio, setMonthlyRadio] = useState(1);
  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < dayjs().endOf('day');
  };
  let endAfter = [];
  let monthDays = [];
  for (let i = 1; i < 32; i++) {
    monthDays.push({ label: i, value: i });
  }
  for (let i = 1; i < 13; i++) {
    endAfter.push({ label: i, value: i });
  }
  const weekDays = [
    { label: 'Sun', value: 1 },
    { label: 'Mon', value: 2 },
    { label: 'Tue', value: 3 },
    { label: 'Wed', value: 4 },
    { label: 'Thu', value: 5 },
    { label: 'Fri', value: 6 },
    { label: 'Sat', value: 7 },
  ];
  const weekNum = [
    { label: 'First', value: 1 },
    { label: 'Secound', value: 2 },
    { label: 'Third  ', value: 3 },
    { label: 'Fourth', value: 4 },
    { label: 'Last', value: -1 },
  ];
  const onFinish = () => {};
  return (
    <Row>
      <Col span={24}>
        Tell us your preferred starting date and choose your two preferred days
        in the same week
      </Col>
      <Form layout="vertical" onFinish={onFinish} style={{ width: '100%' }}>
        <Row gutter={[16]}>
          <Col xs={24} md={12}>
            <Form.Item
              name="start_date"
              label="preferred Start Date"
              rules={[
                {
                  required: true,
                  message: 'Plesae Enter Start Date',
                },
              ]}
            >
              <DatePicker
                disabledDate={disabledDate}
                placeholder="Select Date"
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="end_date"
              label="End Date"
              rules={[
                {
                  required: true,
                  message: 'Plesae Enter End Date',
                },
              ]}
            >
              <DatePicker
                disabledDate={disabledDate}
                placeholder="Select Date"
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={14}>
            <Form.Item
              name="type"
              label="Recurring Type"
              rules={[
                {
                  required: true,
                  message: 'Plesae Select Recurring Type',
                },
              ]}
            >
              <Select
                placeholder="Select Recurring Type"
                onChange={(vlaue) => {
                  setDialy(vlaue);
                }}
                options={[
                  {
                    value: 1,
                    label: 'Dialy',
                  },
                  {
                    value: 2,
                    label: 'Weekly',
                  },
                  {
                    value: 3,
                    label: 'Monthly',
                  },
                ]}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={6}>
            <Form.Item
              name="repeat_interval"
              label="Repeat Every"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select placeholder="0" options={endAfter} />
            </Form.Item>
          </Col>
          <Col style={{ paddingTop: '43px' }} xs={24} md={4}>
            {dialy === 1 && 'Day(s)'}
            {dialy === 2 && 'Week(S)'}
            {dialy === 3 && 'Month'}
          </Col>
          {(dialy === 2 || dialy === 3) && (
            <Col span={24}>
              <Form.Item
                name="occurs-On"
                label="Occurs On"
                // rules={[
                //   {
                //     required: true,
                //     // message: 'Plesae Select Recurring Type',
                //   },
                // ]}
              >
                {dialy === 2 && (
                  <Form.Item name="occursChecks">
                    <Checkbox.Group
                      options={weekDays}
                      onChange={(checkedValues) => {
                        setOccurs(checkedValues);
                      }}
                    />
                  </Form.Item>
                )}
                {dialy === 3 && <Select options={monthDays} />}
              </Form.Item>
            </Col>
          )}
          <Col xs={24} md={12}>
            <Form.Item
              name="start_time"
              label="Start Time"
              rules={[
                {
                  required: true,
                  message: 'Plesae Enter Start Time',
                },
              ]}
            >
              <TimePicker
                use12Hours
                placeholder="Select Time"
                showTime={{ format: 'HH:mm' }}
                //   onChange={handelChangeTime}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="end_time"
              label="End Time"
              rules={[
                {
                  required: true,
                  message: 'Plesae Enter End Time',
                },
              ]}
            >
              <TimePicker
                use12Hours
                placeholder="Select Time"
                showTime={{ format: 'HH:mm' }}
                //   onChange={handelChangeTime}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={24}>
            <Form.Item
              name="phone"
              label="Phone Number"
              rules={[
                {
                  required: true,
                  message: 'Plesae Enter Phone Number',
                },
              ]}
            >
              <Input placeholder="Enter Phone Number" />
            </Form.Item>
          </Col>
        </Row>
        <Row justify="center" tyle={{ width: '100%' }}>
          <Form.Item style={{ width: '100%' }}>
            <Button
              style={{ width: '100%' }}
              loading={false}
              type="primary"
              htmlType="submit"
            >
              Add To cart
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </Row>
  );
};

export default RequestBundle;
