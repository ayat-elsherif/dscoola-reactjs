import { css } from '@emotion/css';
import SectionHeader from '../SectionHeader';
import CoursesSliderWrapper from 'components/CoursesSliderWrapper/CoursesSliderWrapper';

function liveSession({ data, loading }) {
  const liveSessionStyles = css`
    margin: 6rem 0;
  `;

  return (
    <div className={liveSessionStyles}>
      <SectionHeader title="Browse our Live Course" viewAllLink="livecourses" />
      <CoursesSliderWrapper courseList={data} loading={loading} />
    </div>
  );
}

export default liveSession;
