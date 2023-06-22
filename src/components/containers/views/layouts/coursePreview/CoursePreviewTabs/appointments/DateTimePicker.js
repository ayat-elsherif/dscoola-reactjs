import { Form, DatePicker } from "antd";

const config = {
  rules: [
    {
      type: "object",
      required: true,
      message: "Please select time!",
    },
  ],
};

const DateTimePicker = () => {
  return (
    <>
      <Form.Item
        className="dscoola-datepicker"
        style={{ width: "50%" }}
        name="date-time-picker"
        label="Select date and time"
        {...config}
      >
        <DatePicker format="YYYY-MM-DD" />
      </Form.Item>
    </>
  );
};

export default DateTimePicker;
