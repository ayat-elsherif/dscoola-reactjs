import { css, cx } from '@emotion/css';
import { Button, Carousel } from 'antd';
import React, { useRef } from 'react';
import { ArrowRightIcon, ArrowLeftIcon } from 'assets/svg';

function OwnSlider({
  children,
  draggable = true,
  infinite = true,
  autoplay = true,
  dots = true,
  vertical,
  centerMode,
  //   fade = false,
  autoplaySpeed,
  slidesToScroll,
  slidesToShow,
  speed,
  responsive,
  lazyLoad,
  className,
  easing,
  arrows = true,
  arrowsPosY,
  gap,
}) {
  const OwnSliderStyles = css`
    position: relative;
    .slick-list {
      margin: -1rem -${gap ? +gap * 1.5 : 28}px;
      padding: 1rem;
      overflow-x: clip;
      overflow-y: visible;
    }
    .slick-slide > div {
      margin: 0 ${gap ? gap : 14}px;
    }

    .slick-disabled {
      opacity: 0;
      pointer-events: none;
    }

    .btn {
      min-width: auto;
      width: 4.4rem;
      height: 4.4rem;
      border: none;
      border-radius: 50%;
      background-color: #fff;
      z-index: 999;

      &-prev {
        inset-inline-start: -2.5rem;
      }
      &-next {
        inset-inline-end: -2.5rem;
      }
    }
  `;
  const slideRef = useRef(null);

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <Button
        type="link"
        onClick={onClick}
        className={cx(className, 'btn btn-next')}
        style={{ ...style, top: arrowsPosY || '50%' }}
        icon={<ArrowRightIcon />}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <Button
        type="link"
        onClick={onClick}
        className={cx(className, 'btn btn-prev')}
        style={{ ...style, top: arrowsPosY || '50%' }}
        icon={<ArrowLeftIcon />}
      />
    );
  }

  return (
    <div className={OwnSliderStyles}>
      <Carousel
        ref={slideRef}
        draggable={draggable}
        infinite={infinite}
        autoplay={autoplay}
        dots={dots}
        vertical={vertical || false}
        centerMode={centerMode || false}
        hideBtnInEdges
        // fade={fade}
        autoplaySpeed={autoplaySpeed || 4000}
        slidesToScroll={slidesToScroll || 1}
        slidesToShow={slidesToShow || 1}
        speed={speed || 800}
        responsive={responsive || null}
        lazyLoad={lazyLoad || null}
        className={className || ''}
        easing={easing || 'linear'}
        arrows={arrows}
        nextArrow={<SampleNextArrow />}
        prevArrow={<SamplePrevArrow />}
      >
        {children}
      </Carousel>
    </div>
  );
}

export default OwnSlider;

// const settings = {
//   dots: true,
//   infinite: false,
//   speed: 500,
//   slidesToShow: 4,
//   slidesToScroll: 4,
//   initialSlide: 0,
//   responsive: [
//     {
//       breakpoint: 1024,
//       settings: {
//         slidesToShow: 3,
//         slidesToScroll: 3,
//         infinite: true,
//         dots: true
//       }
//     },
//   ]
// };
