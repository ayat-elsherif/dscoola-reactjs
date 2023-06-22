import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Checkbox, Form, Input, message, Select } from 'antd';
import BreadCrumbsMultiple from '../../helpers/breadCrumbs/BreadCrumbsMultiple';
import '../staticPages.scss';
import {
  envelopeFill,
  facebookColofulIcon,
  linkedColorfulIcon,
  mapDropFill,
  phoneFill,
  twitterColorfulIcon,
  youtubeColorfulIcon,
  birdMessage,
} from '../../SVGs';
function ContactUsPage() {
  const { Option } = Select;
  window.scroll(0, 0);
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div>
      <BreadCrumbsMultiple
        params={[{ label: 'contact us' }]}
        title="Contact Us"
      />
      <div className="container contactUsDetails">
        <div className="d-flex justify-content-between">
          <div className="contactInfo">
            <div className="birdMessage-svg"> {birdMessage}</div>
            <h4>Contact Information</h4>
            <p>
              Fill up our form and our team will get back to you within 24
              hours. <br /> Or contact us via:
            </p>
            <ul className="contactList">
              <li className="contactItem">{phoneFill} (+20) 1100001938</li>
              <li className="contactItem">
                {envelopeFill} support@dscoola.com
              </li>
              <li className="contactItem">
                {mapDropFill} Nasr City, Cairo, Egypt
              </li>
            </ul>
            <h4>Social Media</h4>
            <ul className="socialMediaList">
              <li className="socialMediaItem">
                <Link to="/fb">{facebookColofulIcon}</Link>
              </li>
              <li className="socialMediaItem">
                <Link to="/twitter">{twitterColorfulIcon}</Link>
              </li>
              <li className="socialMediaItem">
                <Link to="/yt">{youtubeColorfulIcon}</Link>
              </li>
              <li className="socialMediaItem">
                <Link to="/in">{linkedColorfulIcon}</Link>
              </li>
            </ul>
          </div>
          <div className="contactForm">
            <h3>Get In Touch With Us</h3>
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                name={['user', 'Full Name']}
                label="Full Name"
                rules={[
                  { required: true, message: 'Please input your full name!' },
                ]}
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
                label="Phone Number"
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
                label="Introduction"
              >
                <Input.TextArea placeholder="Your Message" />
              </Form.Item>
              <Button
                type="primary"
                block
                cssStyle={{
                  width: '100%',
                  marginTop: '1.5rem',
                  textTransform: 'capitalize',
                }}
              >
                Send a Message
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUsPage;
