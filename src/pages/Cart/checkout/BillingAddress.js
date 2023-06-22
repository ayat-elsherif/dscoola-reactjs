import React from "react";
import { Select } from "antd";
const { Option } = Select;
function BillingAddress() {
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  return (
    <div className="billingAddress">
      <h4>Billing Address</h4>
      <div className="row justify-content-between">
        <div className="col-lg-6">
          <label>Country</label>
          <div>
            <Select
              defaultValue="Egypt"
              style={{ width: "100%" }}
              onChange={handleChange}
            >
              <Option value="Egypt">Egypt</Option>
              <Option value="Saudi">Saudi</Option>
              <Option value="Emirates">Emirates</Option>
            </Select>
          </div>
        </div>
        <div className="col-lg-6">
          <label>City</label>
          <div>
            <Select
              defaultValue="Cairo"
              style={{ width: "100%" }}
              onChange={handleChange}
            >
              <Option value="Cairo">Cairo</Option>
              <Option value="Giza">Giza</Option>
              <Option value="Alexandria">Alexandria</Option>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BillingAddress;
