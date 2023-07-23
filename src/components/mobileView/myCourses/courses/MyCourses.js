import EnrolledCourseCard from '../../helpers/enrolledCourseCard/EnrolledCourseCard';
import React from 'react';

export default function MyCourses() {
  const fakeArr = ['60', '40', '85'];
  const allEnrolledCourses = fakeArr.map((item, i) => (
    <EnrolledCourseCard percentage={item} key={i} />
  ));
  return <div>{allEnrolledCourses}</div>;
}
