import React from "react";
import { Checkbox, Radio } from "antd";
const onChange = (e) => {
  console.log(`checked = ${e.target.checked}`);
};
function PayPal() {
  return (
    <div className="paymentItem">
      <Radio value={2}>PayPal</Radio>
    </div>
  );
}

export default PayPal;
