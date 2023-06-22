import { css } from '@emotion/css';
import OwnSlider from 'components/own/OwnSlider/OwnSlider';
import {
  accountProfileIcon,
  courseTakingIcon,
  helpGettingStart,
  TroubleshootingIcon,
} from 'SVGs';
import HelpTopicItem from './HelpTopicItem';

const setting = {
  slidesToShow: 4,
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
function HelpTopics() {
  const HelpTopicsStyles = css`
    margin: 3rem 0;
    padding: 2rem 0;
    .sec-title {
      margin-bottom: 3rem;
      font-weight: 500;
      font-size: 2.4rem;
      line-height: 2rem;
      color: #2a2a2a;
      text-transform: capitalize;
    }
  `;

  return (
    <div className={HelpTopicsStyles}>
      <h3 className="sec-title">Select a topic to search for help</h3>
      <OwnSlider {...setting} arrowsPosY="40%">
        <HelpTopicItem
          to={`topic/:id`}
          icon={helpGettingStart}
          title="Getting Started"
          desc="How to Get Started With scoola"
        />
        <HelpTopicItem
          to={`topic/:id`}
          icon={accountProfileIcon}
          title="Account/Profile"
          desc="Manage your account/Profile setting"
        />
        <HelpTopicItem
          to={`topic/:id`}
          icon={TroubleshootingIcon}
          title="Troubleshooting"
          desc="Experiencing at technical issue? Check here"
        />

        <HelpTopicItem
          to={`topic/:id`}
          icon={courseTakingIcon}
          title="Course Taking"
          desc="Everything about taking a course on scoola"
        />
        <HelpTopicItem
          to={`topic/:id`}
          icon={courseTakingIcon}
          title="Course Taking"
          desc="Everything about taking a course on scoola"
        />
        <HelpTopicItem
          to={`topic/:id`}
          icon={courseTakingIcon}
          title="Course Taking"
          desc="Everything about taking a course on scoola"
        />
      </OwnSlider>
    </div>
  );
}

export default HelpTopics;
