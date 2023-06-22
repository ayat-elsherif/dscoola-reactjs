import React from "react";
import {
  AboutUsNodes,
  FeatureOne,
  FeatureThree,
  FeatureTwo,
} from "../../../assets/svg";
import MainButton from "../../../helpers/Buttons/MainButton";
import { featureShape } from "../../../SVGs";

function FeatureLearning() {
  return (
    <div className="aboutFetureLearning container">
      <div className="featureLearning-details">
        <span className="trinary-color">Know our features learning</span>
        <h3>
          We have best features
          <br /> here you go
        </h3>
        <p>
          Get industry accredited certifications and <br /> advance through our
          high-quality online
        </p>
        <MainButton
          text={"get started"}
          cssStyle={{
            textTransform: "capitalize",
            padding: "10px 30px",
            borderRadius: "8px",
          }}
        />
      </div>
      <div className="ourFeatures">
        <AboutUsNodes />
        <div className="featureItem feature1">
          <div className="featContainer">
            <FeatureOne />
            <h4>Recorded & live courses</h4>
            <p>
              different types of courses with different topics and different
              instructors you can book any courses you want
            </p>
          </div>
        </div>
        <div className="featureItem feature2">
          <div className="featContainer">
            <FeatureTwo />
            <h4>One on one</h4>
            <p>
              Book an appointment with your instructors and schedule time as you
              want to help you and reply to your questions
            </p>
          </div>
        </div>
        <div className="featureItem feature3">
          <div className="featContainer">
            <FeatureThree />
            <h4>Yalla online</h4>
            <p>
              The student can make the meeting with their friends at specific
              time and get points on every group he creates
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeatureLearning;
