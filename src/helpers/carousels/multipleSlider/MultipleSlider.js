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
export default function MultipleSlider({
  children,
  cardsXSmall,
  cardsSmall,
  cardsMedium,
  cardsLarge,
}) {
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
        // slidesPerView={4}
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
            slidesPerView: cardsXSmall ? cardsXSmall : "",
          },
          576: {
            width: 520,
            slidesPerView: cardsSmall ? cardsSmall : "",
          },
          768: {
            width: 720,
            slidesPerView: cardsSmall ? cardsSmall : "",
          },

          992: {
            width: 862,
            slidesPerView: cardsMedium ? cardsMedium : "",
          },
          1200: {
            width: 1170,
            slidesPerView: cardsLarge ? cardsLarge : "",
          },
        }}
      >
        {children}
      </Swiper>
    </>
  );
}
