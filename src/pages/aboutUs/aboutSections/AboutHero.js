import React from 'react';
import { Link } from 'react-router-dom';
import MainButton from '../../../helpers/Buttons/MainButton';
function AboutHero() {
  return (
    <div className="aboutHero">
      <div className="aboutHero-left">
        <div>
          <span className="trinary-color explore">Explore Us</span>
          <h2>
            Let`s <span className="trinary-color">Grow</span> Your learning
            <br />
            Level Up With <span className="trinary-color">Scoola</span>
          </h2>
          <p>
            The best place to discover & share your knowledge <br /> here on our
            platform let's figure it out.
          </p>
          <Link to="/sign-in">
            <MainButton
              text="sign up"
              cssStyle={{
                textTransform: 'capitalize',
                padding: '10px 35px',
              }}
            />
          </Link>
          <Link to="/topcourses">
            <MainButton text="Check Courses" btnClass={'greyButton'} />
          </Link>
        </div>
      </div>
      <div className="aboutHero-right">
        <img src="/assets/images/pages/about-hero.png" />
      </div>
    </div>
  );
}

export default AboutHero;
