import { SwiperSlide } from 'swiper/react';
import MultipleSlider from '../carousels/multipleSlider/MultipleSlider';
import CourseCard from '../cards/courseCard';
import { Skeleton } from 'antd';

export default function singleTab(tab, levels) {
  const tabCards = tab.map((item, i) => {
    return (
      <SwiperSlide key={i} className={item.level}>
        <li className="topCourses__item">
          <div>
            <CourseCard course={item} sliderToggle={true} levels={levels} />
          </div>
        </li>
      </SwiperSlide>
    );
  });
  return (
    <>
      {tabCards.length > 0 ? (
        <MultipleSlider
          cardsXSmall={1}
          cardsSmall={2}
          cardsMedium={3}
          cardsLarge={4}
        >
          {tabCards}
        </MultipleSlider>
      ) : (
        <Skeleton active />
      )}
    </>
  );
}
