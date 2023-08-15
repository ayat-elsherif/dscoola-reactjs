import { css } from '@emotion/css';
import CardSkeleton from 'components/common/CardSkeleton/CardSkeleton';
import OwnSlider from 'components/own/OwnSlider/OwnSlider';
import CourseCard from 'helpers/cards/courseCard/courseCard';
import { crtArray } from 'utils';

function CoursesSliderWrapper({ courseList, loading }) {
  const CoursesSliderWrapperStyles = css`
    @media (max-width: 992px) {
      width: 100vw;
    }
  `;
  const setting = {
    slidesToShow: 4,
    slidesToScroll: 3,
    autoplay: false,
    infinite: false,
    dots: false,
    speed: 600,
    // centerPadding: '70px',
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 3.95,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3.3,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2.5,
        },
      },
    ],
  };

  const skItems = crtArray(4).map((_, i) => (
    <li key={i}>
      <CardSkeleton />
    </li>
  ));

  return (
    <div className={CoursesSliderWrapperStyles}>
      <OwnSlider {...setting} arrowsPosY="25%">
        {loading
          ? skItems
          : courseList?.map((el) => (
              <div key={el?.id}>
                <CourseCard course={el} />
              </div>
            ))}
      </OwnSlider>
      {/* <CourseCard /> */}
    </div>
  );
}

export default CoursesSliderWrapper;
