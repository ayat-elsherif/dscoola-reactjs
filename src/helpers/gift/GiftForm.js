import React from "react";
// import "./gift.scss";
import { DatePicker, Form, Input } from "antd";
import MainButton from "../Buttons/MainButton";
const { TextArea } = Input;
function GiftForm() {
  return (
    <>
      <h5>Gift a Course</h5>
      <p>
        It is a long established fact that a reader will be distracted by the
        readable content lorem
      </p>
      <Form>
        <Form.Item
          label="Recipient's Name"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input placeholder="Recipient's name.." />
        </Form.Item>
        <Form.Item
          name={["user", "email"]}
          label="Email"
          rules={[
            {
              required: true,
              message: "Please enter an email",
            },
            {
              type: "email",
              message: "It's not a valid email",
            },
          ]}
        >
          <Input placeholder="ex: test@test.com" />
        </Form.Item>
        <Form.Item
          name="date-picker"
          label="When do you want to send this gift:"
          rules={[
            {
              type: "object",
              required: true,
              message: "Please select time!",
            },
          ]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item label="Your Message (optional):">
          <TextArea rows={3} placeholder="Your Message (optional).." />
        </Form.Item>
        <MainButton
          text="Checkout"
          cssStyle={{ width: "100%", marginTop: "1rem" }}
        />
      </Form>
    </>
  );
}

export default GiftForm;
