import React from 'react';
import {
  Modal,
  Form,
  Input,
  Row,
  Col,
  DatePicker,
  TimePicker,
  Select,
  Radio,
} from 'antd';
import './index.scss';
import DashboardButton from '../../../../../../components/common/dashboard/components/button';
import { Closecon, DownArrowIcon } from '../../../../../../assets/svg';
const { Option } = Select;
const EditMeetingModal = ({ isOpen, cancel }) => {
  const [form] = Form.useForm();
  const onsubmit = () => {
    form.submit();
  };

  const onFinish = (values) => {
    console.log(values);
  };
  return (
    <Modal
      title="Edit meeting"
      centered
      closeIcon={<Closecon />}
      open={isOpen}
      onCancel={cancel}
      footer={null}
      className="edit-meeting-modal"
      width="656px"
    >
      <Form
        form={form}
        name="editCardForm"
        layout="vertical"
        onFinish={onFinish}
        className="dashboard-form"
      >
        <Form.Item
          name="title"
          label="Meeting Title"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder="Meeting Title" />
        </Form.Item>
        <Row gutter={24}>
          <Col xs={24} md={12}>
            <Form.Item
              name="date"
              label="Meeting Title"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <DatePicker />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item name="time" label="Time">
              <TimePicker />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col xs={24} md={12}>
            <Form.Item
              name="duration"
              label="Duration"
              rules={[{ required: true }]}
            >
              <Select
                placeholder="Duration"
                allowClear={false}
                suffixIcon={<DownArrowIcon />}
              >
                <Option value="1">1 Hour</Option>
                <Option value="2">2 Hour</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="time-zone"
              label="Time Zone"
              rules={[{ required: true }]}
            >
              <Select
                placeholder="Time Zone"
                allowClear={false}
                suffixIcon={<DownArrowIcon />}
              >
                <Option value="1">(GMT+04:00) Dubai</Option>
                <Option value="2">(GMT+04:00) Dubai</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item name="meeting-host" label="Meeting Host">
          <Radio.Group>
            <Radio value="1">Zoom Meeting</Radio>
            <Radio value="2">Bigblue Button</Radio>
            <Radio value="3">Jitsi</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="meeting-password"
          label="Meeting Password *"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input type="password" placeholder="Meeting Password" />
        </Form.Item>
      </Form>
      <div className="modal-actions">
        <DashboardButton
          text="Create New Meeting"
          btnClass="btn-modal"
          onclick={onsubmit}
          type="link"
          cssStyle={{ height: '40px', width: '202px' }}
        />
      </div>
    </Modal>
  );
};

export default EditMeetingModal;
