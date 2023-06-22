import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  Navigation,
  Pagination,
  Autoplay,
  Virtual,
  Scrollbar,
  A11y,
  Lazy,
  Keyboard,
} from "swiper/core";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import "swiper/css/lazy";
import "swiper/css/keyboard";
// import "swiper/swiper-bundle.css";
// import "./styles.css";
import { Col, Row } from "antd";
import {
  accountProfileIcon,
  courseTakingIcon,
  helpGettingStart,
  TroubleshootingIcon,
} from "../../../SVGs";
import { Link } from "react-router-dom";
SwiperCore.use([Navigation, Pagination, Autoplay, Virtual]);

function HelpSupportByTopic() {
  const slides = [];
  return (
    <div className="helpSupport-byTopic">
      <h3>Select a topic to search for help</h3>
      <div>
        <Swiper
          id="swiper"
          // slidesPerColumn={2}
          // slidesPerColumnFill="row"
          modules={[
            Navigation,
            Pagination,
            Scrollbar,
            A11y,
            Autoplay,
            Lazy,
            Keyboard,
          ]}
          spaceBetween={28}
          // slidesPerView={4}
          keyboard={{
            enabled: true,
            onlyInViewport: false,
          }}
          navigation={{ clickable: true }}
          // autoplay={{ delay: 3000 }}
          lazy={{ loadPrevNext: false }}
          breakpoints={{
            768: {
              width: 700,
              slidesPerView: 2,
            },
            850: {
              width: 710,
              slidesPerView: 2,
            },
            1024: {
              width: 862,
              slidesPerView: 3,
            },
            1200: {
              width: 1170,
              slidesPerView: 4,
            },
          }}
        >
          <SwiperSlide>
            <Link to="topic/:id" className="planningSolutions-item">
              <div>
                {helpGettingStart}
                <h4>Getting Started</h4>
                <p>How to Get Started With scoola</p>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="topic/:id" className="planningSolutions-item">
              <div>
                {accountProfileIcon}
                <h4>Account/Profile</h4>
                <p>Manage your account/Profile setting</p>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="topic/:id" className="planningSolutions-item">
              <div>
                {accountProfileIcon}
                <h4>Account/Profile</h4>
                <p>Manage your account/Profile setting</p>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="topic/:id" className="planningSolutions-item">
              <div>
                {TroubleshootingIcon}
                <h4>Troubleshooting</h4>
                <p>Experiencing at technical issue? Check here</p>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="topic/:id" className="planningSolutions-item">
              <div>
                {courseTakingIcon}
                <h4>Course Taking</h4>
                <p>Everything about taking a course on scoola</p>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="topic/:id" className="planningSolutions-item">
              <div>
                {courseTakingIcon}
                <h4>Course Taking</h4>
                <p>Everything about taking a course on scoola</p>
              </div>
            </Link>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

export default HelpSupportByTopic;
