import React from "react";
import { Row, Col } from "antd";
import { notFoundShape } from "../../SVGs";

function NotFoundPage() {
  return (
    <div>
      <Row justify="center">
        <Col style={{ margin: "5rem auto 6rem" }}>{notFoundShape}</Col>
      </Row>
    </div>
  );
}

export default NotFoundPage;
