import { Button, DatePicker, Form } from "antd";
import dayjs from "dayjs";
import React from "react";
import "./index.scss";
function Filter() {
  const [form] = Form.useForm();
  const onsubmit = () => {
    form.submit();
  };

  const onFinish = (values) => {
    console.log(values);
  };
  const resetForm = () => {
    form.resetFields();
  };
  return (
    <Form
      form={form}
      name="recovery-filter"
      layout="vertical"
      onFinish={onFinish}
      className="dashboard-form"
    >
      <Form.Item name="from" label="From">
        <DatePicker placeholder="Select From" />
      </Form.Item>
      <Form.Item
        name="to"
        label="To"
        dependencies={["from"]}
        rules={[
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("from") <= value) {
                return Promise.resolve();
              }
              return Promise.reject("invalid date");
            },
          }),
        ]}
      >
        <DatePicker placeholder="Select to" />
      </Form.Item>
      <Button className="reset-filter" type="link" onClick={resetForm}>
        Reset Filter
      </Button>
    </Form>
  );
}

export default Filter;
