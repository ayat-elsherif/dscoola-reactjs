import { Row, Col } from "antd";
import React from "react";
import MainButton from "../../../../../../helpers/Buttons/MainButton";
import SmlButton from "../../../../../../helpers/Buttons/SmlButton";
import { dollarSign } from "../../../../../../pages/instructors/instructor/SVGs";

function TitleWithButton({ title, isButton, btnTxt, onclick, isOneOnOne }) {
  return (
    <div className="d-flex justify-content-between align-items-center mb-4 contentTitle">
      <Row align="middle">
        <Col>
          <h6>{title}</h6>
        </Col>
        {isOneOnOne ? (
          <Col className="appointmentFees">
            {dollarSign}
            <span>$25.00</span>
            <span className="perHour"> Per Hour</span>
          </Col>
        ) : (
          ""
        )}
      </Row>
      {isButton ? (
        <MainButton
          text={btnTxt}
          onclick={onclick}
          btnClass="longButton text-capitalize"
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default TitleWithButton;
