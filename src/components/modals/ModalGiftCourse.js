import { css } from '@emotion/css';
import { Form, Button, DatePicker, Input, Typography } from 'antd';
import OwnModal from 'components/own/OwnModal';

function ModalGiftCourse({ open, setOpen }) {
  const ModalGiftCourseStyles = css``;
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('onFinish  values:', values);
  };
  return (
    <OwnModal
      open={open}
      onCancel={() => setOpen(false)}
      title="Gift a course"
      width={516}
      className={ModalGiftCourseStyles}
      style={{ top: 20 }}
    >
      <Typography.Text strong>
        It is a long established fact that a reader will be distracted by the
        readable content lorem
      </Typography.Text>
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        className="input-holder form"
        initialValues={{ host: 'Zoom' }}
      >
        <Form.Item
          name="name"
          label="Recipient's Name:"
          rules={[
            {
              required: true,
              message: `Please input Recipient's name`,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Recipient's Email:"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: `Please input Recipient's E-mail!`,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="date"
          label="When do you want to send this gift:"
          rules={[
            {
              required: true,
              message: `Please input date!`,
            },
          ]}
        >
          <DatePicker format="DD/MM/YYYY" />
        </Form.Item>
        <Form.Item name="message" label="Your Message (optional):">
          <Input.TextArea />
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          block
          // className="btn-publish"
          // loading={yallaOnlineAddLod}
        >
          Check out
        </Button>
      </Form>
    </OwnModal>
  );
}

export default ModalGiftCourse;
