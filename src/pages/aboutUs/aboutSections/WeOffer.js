import { Col, Row } from "antd";
import React from "react";
import {
  coursesNoIcon,
  instructorsNoIcon,
  lessonNoIcon,
  webinarsNoIcon,
} from "../../../SVGs";

function WeOffer() {
  return (
    <div className="weOffer">
      <div className="container">
        <Row>
          <Col xl={9} lg={12} md={24}>
            <div className="weOffer-img">
              <img
                src="/assets/images/pages/about-we-offer.png"
                alt="we-offer"
              />
            </div>
          </Col>
          <Col xl={14} lg={11} md={23} offset={1} className="weOffer-details">
            <p className="trinary-color">KNOW OUR FEATURES LEARNING</p>
            <h2>What kind of courses we offer?</h2>
            <Row className="mb-xl-4 mb-lg-0">
              <Col xl={12} md={24}>
                {coursesNoIcon} 1200+ courses
              </Col>
              <Col xl={12} md={24}>
                {webinarsNoIcon} 1560+ webinar
              </Col>
            </Row>
            <Row>
              <Col xl={12} md={24}>
                {lessonNoIcon} 10k+ lessons
              </Col>
              <Col xl={12} lg={24} md={24}>
                {instructorsNoIcon} Qualified instructors
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default WeOffer;
