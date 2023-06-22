import { css } from '@emotion/css';
import CoursesSliderWrapper from 'components/CoursesSliderWrapper/CoursesSliderWrapper';
import { useEffect, useRef } from 'react';
import SectionHeader from '../SectionHeader';

function TopCourses({ data, loading, ref }) {
  const topCoursesRef = useRef(null);

  console.log('TopCourses  ref:', ref);
  // console.log('TopCourses  data', data);
  const TopCoursesStyles = css`
    margin: 6rem 0;
  `;

  useEffect(() => {
    console.log(topCoursesRef.current);
  }, []);
  return (
    <div className={TopCoursesStyles} ref={topCoursesRef}>
      <SectionHeader title="Browse our top courses" viewAllLink="topcourses" />
      <CoursesSliderWrapper courseList={data} loading={loading} />
    </div>
  );
}

export default TopCourses;
