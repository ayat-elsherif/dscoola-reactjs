import React from "react";
import { Checkbox, Radio } from "antd";
function CreditCard() {
  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };
  return (
    <>
      <div className="paymentItem">
        <Radio value={1} checked>
          Credit or Debit Card
        </Radio>
      </div>
    </>
  );
}

export default CreditCard;
