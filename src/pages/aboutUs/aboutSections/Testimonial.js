import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Row, Col } from "antd";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import { dottedPattern, quotationIcon } from "../../../SVGs";
import ReadOnlyRatings from "../../../helpers/ratings/ReadOnlyRatings";
export default function Testimonial() {
  return (
    <div className="aboutTestimonial container">
      <div className="aboutTestimonial-title">
        <p className="trinary-color">Testimonial</p>
        <h4>Check what our clients are saying</h4>
      </div>
      <Swiper
        navigation={true}
        modules={[Navigation]}
        className="testimonialSwiper"
        breakpoints={{
          318: {
            width: 280,
            slidesPerView: 1,
          },
          576: {
            width: 520,
            slidesPerView: 1,
          },
          768: {
            width: 720,
            slidesPerView: 1,
          },

          992: {
            width: 862,
            slidesPerView: 1,
          },
          1200: {
            width: 1170,
            slidesPerView: 1,
          },
        }}
      >
        <SwiperSlide>
          <Row justify="space-between" align="middle">
            <Col md={10} className="aboutTestimonial-person">
              <div className="aboutTestimonial-img">
                <img
                  src="/assets/images/pages/about-testimonial-1.png"
                  alt="testimonial-1"
                />
                {dottedPattern}
              </div>
            </Col>
            <Col
              xl={13}
              md={13}
              offset={1}
              className="aboutTestimonial-details"
            >
              {quotationIcon}
              <ReadOnlyRatings rating={5} />
              <p>
                Get industry accredited certifications and advance through our
                high quality online courses and excellent instructors help me
              </p>
              <h3>Sarah Hany</h3>
            </Col>
          </Row>
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <Row justify="space-between" align="middle">
            <Col xl={10} md={10} className="aboutTestimonial-person">
              <div className="aboutTestimonial-img">
                <img
                  src="/assets/images/pages/about-testimonial-1.png"
                  alt="testimonial-1"
                />
                {dottedPattern}
              </div>
            </Col>
            <Col md={13} offset={1} className="aboutTestimonial-details">
              {quotationIcon}
              <ReadOnlyRatings rating={5} />
              <p>
                Get industry accredited certifications and advance through our
                high quality online courses and excellent instructors help me
              </p>
              <h3>Sarah Hany</h3>
            </Col>
          </Row>
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <Row justify="space-between" align="middle">
            <Col xl={10} md={10} className="aboutTestimonial-person">
              <div className="aboutTestimonial-img">
                <img
                  src="/assets/images/pages/about-testimonial-1.png"
                  alt="testimonial-1"
                />
                {dottedPattern}
              </div>
            </Col>
            <Col md={13} offset={1} className="aboutTestimonial-details">
              {quotationIcon}
              <ReadOnlyRatings rating={5} />
              <p>
                Get industry accredited certifications and advance through our
                high quality online courses and excellent instructors help me
              </p>
              <h3>Sarah Hany</h3>
            </Col>
          </Row>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
