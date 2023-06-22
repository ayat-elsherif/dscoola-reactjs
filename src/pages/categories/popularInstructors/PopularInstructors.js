import React from 'react';
import InstructorCard from '../../../helpers/cards/instructorCard/InstructorCard';
import MultipleSlider from '../../../helpers/carousels/multipleSlider/MultipleSlider';
import { SwiperSlide } from 'swiper/react';

/******fake array to loop through course boxes****** */
const CourseArr = () => {
  const fakeArr = [];
  fakeArr.length = 10;
  let myArr = [];
  for (let i = 0; i < fakeArr.length; i++) {
    myArr.push(
      <SwiperSlide className="col-xl-3 col-lg-4 col-sm-6 col-6" key={i}>
        <li className="topCourses__item">
          <div>
            <InstructorCard sliderToggle={true} />
          </div>
        </li>
      </SwiperSlide>,
    );
  }
  return myArr;
};
/******End of fake array to loop through course boxes****** */

function PopularInstructors() {
  return (
    <section className="topInstructors">
      <div className="container px-0">
        <div className="d-flex justify-content-between align-items-baseline mb-2">
          <h3 className="page-title">popular Instructors</h3>
        </div>
        <div className="instructorCards">
          <MultipleSlider
            cardsXSmall={1}
            cardsSmall={2}
            cardsMedium={3}
            cardsLarge={4}
          >
            {CourseArr()}
          </MultipleSlider>
        </div>
      </div>
    </section>
  );
}

export default PopularInstructors;
