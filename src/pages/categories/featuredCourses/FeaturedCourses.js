import React, { useEffect } from 'react';
import CourseCard from '../../../helpers/cards/courseCard/courseCard';
import MultipleSlider from '../../../helpers/carousels/multipleSlider/MultipleSlider';
import { SwiperSlide } from 'swiper/react';
import { useDispatch, useSelector } from 'react-redux';
// import { topCourses } from "../../../features/courses/coursesSlice";
import coursesAPI from '../../../apis/coursesAPI';
import { fetchFeaturedCourses } from '../../../features/courses/categoriesSlice';

function FeaturedCourses() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchCourses = async () => {
      const response = await coursesAPI
        .get('/get-all-courses')
        .catch((err) => console.log('err', err));
      console.log('response:', response.data);
      dispatch(fetchFeaturedCourses(response.data.data));
    };
    fetchCourses();
  }, []);

  const courses = useSelector((state) => {
    // console.log(state.categories.featuredCourses, "I'm categories");
    return state.categories;
  });

  const courseList = courses.featuredCourses.map((item, i) => (
    <SwiperSlide key={i}>
      <li className="topCourses__item course__item">
        <div>
          <CourseCard course={item} sliderToggle={true} />
        </div>
      </li>
    </SwiperSlide>
  ));
  return (
    <section className="featuredCourses">
      <div className="container px-0">
        <div className="d-flex justify-content-between align-items-baseline mb-2">
          <h3 className="page-title">Featured Courses</h3>
        </div>
        <ul className="featuredCourses__list course__list">
          <MultipleSlider>{courseList}</MultipleSlider>
        </ul>
      </div>
    </section>
  );
}

export default FeaturedCourses;
