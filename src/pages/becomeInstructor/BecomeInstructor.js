import React from 'react';
import '../../sass/landingPage.scss';
import BreadCrumbs from '../../helpers/breadCrumbs/BreadCrumbs';
import WhyInstructor from './becomeInstructorSections/WhyInstructor';
import HowInstructor from './becomeInstructorSections/HowInstructor';
import BecomeInstructorNow from './becomeInstructorSections/BecomeInstructorNow';
import { useNavigate } from 'react-router-dom';
function BecomeInstructor() {
  const navigate = useNavigate();
  window.scroll(0, 0);
  return (
    <div className="landingPage">
      <BreadCrumbs
        param="Become an Instructor"
        title="Become an Instructor"
        txt={`Become an instructor and change lives — including your own`}
        callToActionButton={true}
        buttonText="become an instructor"
        heroImg={
          <img
            className="landingPageHero"
            src="/assets/images/instructors/instructors-herosection.png"
          />
        }
        buttonAction={() => navigate('./register')}
      />
      <WhyInstructor />
      <HowInstructor />
      <BecomeInstructorNow />
    </div>
  );
}

export default BecomeInstructor;
