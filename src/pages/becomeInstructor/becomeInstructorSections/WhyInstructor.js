import React from "react";
import { earnmoney, getrewarded, inspirestudents, whyinstructor } from "./SVGs";

function WhyInstructor() {
  return (
    <div className="container">
      <div className="briefSection">
        <div className="headSection">
          <h2>Why should you be an instructor ?</h2>
          <p>
            simply dummy text of the printing and typesetting industry. Lorem{" "}
            <br />
            Ipsum has been the industry's
          </p>
        </div>
        <div className="bodySection row align-items-center justify-content-between">
          <div className="bodySectionSvg col-lg-5">{whyinstructor}</div>
          <div className="bodySectionDetail col-lg-7 ps-4">
            <div className="d-flex align-items-start">
              <div>{earnmoney}</div>
              <div>
                <h5>Earn Money</h5>
                <p>
                  simply dummy text of the printing and typesetting industry.
                  Lorem Ipsum has been the industry's simply dummy text of the
                  printing and typesetting industry. Lorem Ipsum has been the
                  industry's
                </p>
              </div>
            </div>
            <div className="d-flex align-items-start">
              <div>{inspirestudents}</div>
              <div>
                <h5>Inspire Students</h5>
                <p>
                  simply dummy text of the printing and typesetting industry.
                  Lorem Ipsum has been the industry's simply dummy text of the
                  printing and typesetting industry. Lorem Ipsum has been the
                  industry's
                </p>
              </div>
            </div>
            <div className="d-flex align-items-start">
              <div>{getrewarded}</div>
              <div>
                <h5>Get Rewarded</h5>
                <p>
                  simply dummy text of the printing and typesetting industry.
                  Lorem Ipsum has been the industry's simply dummy text of the
                  printing and typesetting industry. Lorem Ipsum has been the
                  industry's
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WhyInstructor;
