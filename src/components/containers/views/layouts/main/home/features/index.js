import React from 'react';
import './features.scss';
function Features() {
  return (
    <>
      <section className="dscoolaFeatures">
        <div className="container">
          <div className="row">
            <div className=" featureContainer col-xl-3 col-sm-6 col-12 d-flex align-items-center">
              <div className="feature-item online-live">
                <img
                  src="/assets/images/icons/css_sprites.png"
                  alt="online live and recorded courses"
                />
              </div>
              <h6>
                Online Live & <br /> Recorded Courses
              </h6>
            </div>
            <div className="featureContainer col-xl-3 col-sm-6 col-12 d-flex align-items-center">
              <div className="feature-item zoom-meetings">
                <img
                  src="/assets/images/icons/css_sprites.png"
                  alt="online live and recorded courses"
                />
              </div>
              <h6>
                Zoom <br /> meetings & Webinars
              </h6>
            </div>
            <div className="featureContainer col-xl-3 col-sm-6 col-12 d-flex align-items-center">
              <div className="feature-item appointment">
                <img
                  src="/assets/images/icons/css_sprites.png"
                  alt="online live and recorded courses"
                />
              </div>
              <h6>
                Appointment <br /> with Your Instructor
              </h6>
            </div>
            <div className="featureContainer col-xl-3 col-sm-6 col-12 d-flex align-items-center">
              <div className="feature-item yalla-online">
                <img
                  src="/assets/images/icons/css_sprites.png"
                  alt="online live and recorded courses"
                />
              </div>
              <h6>
                Yalla Online <br /> To Help Students
              </h6>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Features;
