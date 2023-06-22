import React from "react";
import { TooManyRequestsShape } from "../../SVGs";
import { Row, Col } from "antd";
function TooManyRequests() {
  return (
    <div>
      <Row justify="center">
        <Col style={{ margin: "5rem auto 6rem" }}>{TooManyRequestsShape}</Col>
      </Row>
    </div>
  );
}

export default TooManyRequests;
