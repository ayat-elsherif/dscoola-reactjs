import { css } from '@emotion/css';
import OwnSlider from 'components/own/OwnSlider/OwnSlider';
import ZoomeMeetingHomeCard from 'helpers/cards/zoomMeetingHomeCard/zoomMeetingHomeCard';
import SectionHeader from '../SectionHeader';

function zoomMeetingHome({ data, loading }) {
  // console.log('zoomMeetingHome  data', data);

  const zoomMeetingHomeStyles = css`
    margin: 6rem 0;
  `;
  const setting = {
    slidesToShow: 1.2,
    autoplay: false,
    infinite: false,
    dots: false,
    speed: 1000,
    // centerPadding: 70,
  };
  return (
    <div className={zoomMeetingHomeStyles}>
      <SectionHeader title="Webinars and Scoola Talks" viewAllLink="webinars" />

      <OwnSlider {...setting}>
        {data?.map((el) => (
          <div key={el?.id}>
            <ZoomeMeetingHomeCard
              course={el}
              sliderToggle={true}
              isWishlist={el?.isWishlist}
            />
          </div>
        ))}
      </OwnSlider>
    </div>
  );
}

export default zoomMeetingHome;
