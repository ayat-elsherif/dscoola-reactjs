import React, { useEffect } from 'react';
import CourseCard from '../../../helpers/cards/courseCard/courseCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCategoryCourses } from '../../../features/courses/categoriesSlice';
import coursesAPI from '../../../apis/coursesAPI';

function CategoryCourses() {
  const courses = useSelector((state) => state.categories);
  const levels = useSelector((state) => state.allLevels);

  const courseList = courses.allCategoryCourses.map((item, i) => (
    <div className="px-3 col-lg-4" key={i}>
      <CourseCard course={item} sliderToggle={false} levels={levels.levels} />
    </div>
  ));
  return (
    <section className="categoryCourses home-section">
      <div className="container px-0">
        <div className="row">{courseList} </div>
      </div>
    </section>
  );
}

export default CategoryCourses;
