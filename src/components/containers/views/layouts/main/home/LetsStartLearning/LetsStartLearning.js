import { css } from '@emotion/css';
import useCoursesEnrolled from 'api-hooks/courses/useCoursesEnrolled';
import OwnSlider from 'components/own/OwnSlider/OwnSlider';
import { useSelector } from 'react-redux';
import { crtArray } from 'utils';
import SectionHeader from '../SectionHeader';
import LetsLearningCard from './LetsLearningCard';

function LetsStartLearning() {
  // console.log('LetsStartLearning  data', data);
  const { currentUser } = useSelector((state) => state?.user);
  const { coursesEnrolled, coursesEnrolledLod } = useCoursesEnrolled();
  // console.log('LetsStartLearning  coursesEnrolled:', coursesEnrolled);

  const LetsStartLearningStyles = css`
    margin: 6rem 0;
  `;
  const setting = {
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: false,
    infinite: false,
    dots: false,
    speed: 600,
    // centerPadding: '70px',
    // responsive: [
    //   {
    //     breakpoint: 992,
    //     settings: {
    //       slidesToShow: 2.5,
    //     },
    //   },
    // ],
  };

  const skItems = crtArray(4).map((_, i) => (
    <LetsLearningCard key={i} loading />
  ));

  if (!coursesEnrolled?.length) return '';
  return (
    <div className={LetsStartLearningStyles}>
      <SectionHeader title={`Let's start learning, ${currentUser?.name}`} />
      <OwnSlider {...setting} arrowsPosY="40%">
        {coursesEnrolledLod
          ? skItems
          : coursesEnrolled?.map((el) => (
              <div key={el?.id}>
                <LetsLearningCard data={el} />
              </div>
            ))}
      </OwnSlider>
    </div>
  );
}

export default LetsStartLearning;
