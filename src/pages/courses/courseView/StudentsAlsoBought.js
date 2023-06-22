import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { SwiperSlide } from 'swiper/react';
import { topCourses } from '../../../features/courses/coursesSlice';
import CourseCard from '../../../helpers/cards/courseCard/courseCard';
import SmallMultipleSlider from '../../../helpers/carousels/multipleSlider/smallMultipleSlider';
import { levelsList } from '../../../apis/levelsList';
import useApi from 'Hooks/network/useApi';
import { Skeleton } from 'antd';

const StudentsAlsoBought = ({ isLoading }) => {
  const dispatch = useDispatch();
  const [relatedCourse, setRelatedCourse] = useState([]);
  const api = useApi();

  const fetchCourses = async () => {
    api
      .get('/courses/filter?rating[]=4&perpage=30')
      .then((res) => {
        dispatch(topCourses(res.data));
        setRelatedCourse(res.data);
      })
      .catch((err) => console.log('err', err));
  };

  useEffect(() => {
    fetchCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const levels = levelsList;

  const courseList = relatedCourse?.map((item, i) => (
    <SwiperSlide key={i}>
      <li className="topCourses__item course__item">
        <div>
          <CourseCard
            course={item}
            levels={levels}
            sliderToggle={true}
            isWishlist={item.isWishlist}
          />
        </div>
      </li>
    </SwiperSlide>
  ));

  if (isLoading) {
    return <Skeleton active paragraph={{ rows: 2 }} />;
  }

  if (!courseList) return;

  return (
    <section className="what-will-learn-section">
      <div className="course-container">
        <div className="what-will-learn-section-headline">
          Students also bought
        </div>
        <ul className="topCourses__list course__list">
          <SmallMultipleSlider>{courseList}</SmallMultipleSlider>
        </ul>
      </div>
    </section>
  );
};

export default StudentsAlsoBought;
