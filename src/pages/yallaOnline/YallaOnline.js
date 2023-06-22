import React from "react";
import "../../sass/landingPage.scss";
import BreadCrumbs from "../../helpers/breadCrumbs/BreadCrumbs";
import HowYAllaOnline from "./yallaOnlineSections/HowYallaOnline";
import StartYallaOnline from "./yallaOnlineSections/StartYallaOnline";
function YallaOnline() {
  return (
    <div className="landingPage">
      <BreadCrumbs
        param="Yalla online"
        title="Yalla online"
        txt="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
        callToActionButton={true}
        buttonText="let's start now"
        heroImg={
          <img
            className="landingPageHero"
            src="/assets/images/yallaOnline/yallaOnlineHero.png"
          />
        }
      />

      <HowYAllaOnline />
      <StartYallaOnline />
    </div>
  );
}

export default YallaOnline;
