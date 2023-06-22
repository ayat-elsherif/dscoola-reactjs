// import Swiper core and required modules
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
  Lazy,
  Keyboard,
} from "swiper";

import { Swiper } from "swiper/react";
import "./multipleSlider.scss";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import "swiper/css/lazy";
import "swiper/css/keyboard";
export default function SmallMultipleSlider({ children }) {
  return (
    <>
      <Swiper
        className="row topCourses__slider"
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
        slidesPerView={4}
        keyboard={{
          enabled: true,
          onlyInViewport: false,
        }}
        navigation={{ clickable: true }}
        // autoplay={{ delay: 3000 }}
        lazy={{ loadPrevNext: false }}
        breakpoints={{
          318: {
            width: 280,
            slidesPerView: 1,
          },
          // when window width is >= 768px
          576: {
            width: 520,
            slidesPerView: 2,
          },
          768: {
            width: 700,
            slidesPerView: 2,
          },
          850: {
            width: 710,
            slidesPerView: 3,
          },
          992: {
            width: 575,
            slidesPerView: 2,
          },
          1200: {
            width: 782,
            slidesPerView: 3,
          },
        }}
      >
        {children}
      </Swiper>
    </>
  );
}
