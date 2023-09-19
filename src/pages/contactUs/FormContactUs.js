import { css } from '@emotion/css';
import { Button, Form, Input } from 'antd';

function FormContactUs() {
  const FormContactUsStyles = css`
    width: 44.8rem;
    max-width: 100%;
    padding: 2rem 3.4rem;
    background-color: #fff;
    box-shadow: 0px 3px 6px #00000029;
    border-radius: 6px;
    @media screen and (max-width: 991px) {
      width: 80vw;
      margin-bottom: 5rem;
      margin-top: 2rem;
    }
    @media screen and (max-width: 767px) {
      width: 100%;
    }
    h3 {
      font-weight: 500;
      font-size: 2.4rem;
      line-height: 5.6rem;
      color: #2a2a2a;
    }

    .form {
      label {
        font-weight: 400;
        font-size: 1.5rem;
        color: #2a2a2a;
      }
      input {
        width: 100%;
      }

      .btn-publish {
        margin-left: auto;
      }
    }
  `;

  const onFinish = (values) => {
    console.log('Success:', values);
  };
  return (
    <div className={FormContactUsStyles}>
      <h3>Get In Touch With Us</h3>
      <Form onFinish={onFinish} layout="vertical" className="input-holder form">
        <Form.Item
          name={['user', 'Full Name']}
          label="Full Name"
          rules={[{ required: true, message: 'Please input your full name!' }]}
        >
          <Input placeholder="Your Full Name" />
        </Form.Item>

        <Form.Item
          name={['user', 'email']}
          label="Email"
          rules={[
            {
              type: 'email',
              message: 'please type a valid email',
            },
            { required: true, message: 'please enter your email' },
          ]}
        >
          <Input placeholder="Your Email" />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Phone No"
          rules={[
            {
              required: true,
              message: 'Please input your phone number!',
            },
            { pattern: '[0-9]', message: 'You Should Enter a Number' },
          ]}
        >
          <Input
            // addonBefore={prefixSelector}
            placeholder="Your phone Number"
          />
        </Form.Item>
        <Form.Item
          name={['user', 'Message']}
          rules={[
            { required: true, message: 'please enter your message here' },
          ]}
          label="Message"
        >
          <Input.TextArea
            style={{ resize: 'none', height: 'auto' }}
            rows={3}
            placeholder="Your Message"
          />
        </Form.Item>
        <Button type="primary" htmlType="submit" block>
          Send a Message
        </Button>
      </Form>
    </div>
  );
}

export default FormContactUs;
