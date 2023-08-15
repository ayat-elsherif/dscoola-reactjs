import { css } from '@emotion/css';
import CoursesSliderWrapper from 'components/CoursesSliderWrapper/CoursesSliderWrapper';
import React from 'react';
import SectionHeader from '../SectionHeader';

const TopCourses = React.forwardRef(({ data, loading }, ref) => {
  const TopCoursesStyles = css`
    margin: 6rem 0;
    @media (max-width: 992px) {
      width: 100vw;
    }
  `;

  return (
    <div className={TopCoursesStyles} ref={ref}>
      <SectionHeader title="Browse our top courses" viewAllLink="topcourses" />
      <CoursesSliderWrapper courseList={data} loading={loading} />
    </div>
  );
});

export default TopCourses;
