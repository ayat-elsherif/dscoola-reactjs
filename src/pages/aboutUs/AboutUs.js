import React from "react";
import "../staticPages.scss";
import AboutHero from "./aboutSections/AboutHero";
import FeatureLearning from "./aboutSections/FeatureLearning";
import WeOffer from "./aboutSections/WeOffer";
import Testimonial from "./aboutSections/Testimonial";
function AboutUs() {
  window.scroll(0, 0);
  return (
    <div className="aboutUsPage">
      <AboutHero />
      <FeatureLearning />
      <WeOffer />
      <Testimonial />
    </div>
  );
}

export default AboutUs;
