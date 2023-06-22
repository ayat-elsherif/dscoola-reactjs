import React from "react";
import { DatePicker, Form, Input, Select } from "antd";
import MainButton from "../../../../helpers/Buttons/MainButton";
const { Option } = Select;

function RequestBundle() {
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="20">+20</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );
  return (
    <>
      <Form>
        <h5>Request a bundle</h5>
        <p>
          Tell us your preferred starting date and choose your two preferred
          days in the same week
        </p>
        <Form.Item
          name="date-picker"
          label="Preferred start date"
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
        <Form.Item
          name="days"
          label="Choose your preferred days in week:"
          rules={[
            {
              required: true,
              message: "Please choose your preferred days.",
            },
          ]}
        >
          <Select
            placeholder="Preferred days"
            // onChange={this.onGenderChange}
            allowClear
          >
            <Option value="male">Saturday-Tuesday</Option>
            <Option value="female">Sunday - WednesDay</Option>
            <Option value="other">Monday - Thursday</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="times"
          label="Choose your preferred time:"
          rules={[
            {
              required: true,
              message: "Please choose  your preferred time.",
            },
          ]}
        >
          <Select placeholder="Preferred Time" allowClear>
            <Option value="eighttonine">08:00 PM - 09:00 PM</Option>
            <Option value="ninetoten">09:00 PM - 10:00 PM</Option>
            <Option value="tentoeleven">10:00 PM - 11:00 PM</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="phone"
          label="Phone Number"
          rules={[
            {
              required: true,
              message: "Please enter your phone number!",
            },
            {
              pattern: "^[0-9]*$",
              message: "only numbers allowed",
            },
          ]}
        >
          <Input
            addonBefore={prefixSelector}
            style={{
              width: "100%",
            }}
          />
        </Form.Item>
        <div className="btn-cont">
          <MainButton
            text="Add To Cart"
            type="submit"
            cssStyle={{ marginTop: "1rem", width: "100%" }}
          />
        </div>
      </Form>
    </>
  );
}

export default RequestBundle;
