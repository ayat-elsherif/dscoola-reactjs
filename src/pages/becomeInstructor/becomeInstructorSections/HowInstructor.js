import React from "react";
import { Tabs } from "antd";
import { launchcourse, plancontent, videorecord } from "./SVGs";
const { TabPane } = Tabs;

function HowInstructor() {
  return (
    <div>
      {" "}
      <div className="container">
        <div className="tabsSection">
          <div className="headSection">
            <h2>How to Become an Instructor</h2>
            <p>
              simply dummy text of the printing and typesetting industry. Lorem{" "}
              <br />
              Ipsum has been the industry's
            </p>
          </div>
          <div className="bodySection">
            <Tabs defaultActiveKey="1" className="scoolaInnerTabs">
              <TabPane tab=" Plan Your Content" key="1">
                <div className="row align-items-center mt-4 bodySectionDetails">
                  <div className="col-8">
                    <div className="bodySectionItem">
                      <h4>Plan your Content</h4>
                      <p>
                        It is a long established fact that a reader will be
                        distracted by the readable content of a page when
                        looking at its layout. The point of using Lorem Ipsum is
                        that it has a more-or- less normal distribution of
                        letters, as opposed to using 'Content here, content
                        here', making it look like readable English.
                      </p>
                    </div>
                    <div className="bodySectionItem">
                      <h4>How we Help you</h4>
                      <p>
                        It is a long established fact that a reader will be
                        distracted by the readable content of a page when
                        looking at its layout. The point of using Lorem Ipsum is
                        that it has a more-or- less normal distribution of
                        letters, as opposed to using 'Content here, content
                        here', making it look like readable English.
                      </p>
                    </div>
                  </div>
                  <div className="col-4">{plancontent}</div>
                </div>
              </TabPane>
              <TabPane tab="Record Your Video" key="2">
                <div className="row align-items-center mt-4 bodySectionDetails">
                  <div className="col-8">
                    <div className="bodySectionItem">
                      <h4>Record Your Video</h4>
                      <p>
                        It is a long established fact that a reader will be
                        distracted by the readable content of a page when
                        looking at its layout. The point of using Lorem Ipsum is
                        that it has a more-or- less normal distribution of
                        letters, as opposed to using 'Content here, content
                        here', making it look like readable English.
                      </p>
                    </div>
                    <div className="bodySectionItem">
                      <h4>How we Help you</h4>
                      <p>
                        It is a long established fact that a reader will be
                        distracted by the readable content of a page when
                        looking at its layout. The point of using Lorem Ipsum is
                        that it has a more-or- less normal distribution of
                        letters, as opposed to using 'Content here, content
                        here', making it look like readable English.
                      </p>
                    </div>
                  </div>
                  <div className="col-4">{videorecord}</div>
                </div>
              </TabPane>
              <TabPane tab="Launch Your Course" key="3">
                <div className="row align-items-center mt-4 bodySectionDetails">
                  <div className="col-8">
                    <div className="bodySectionItem">
                      <h4>Launch your course</h4>
                      <p>
                        It is a long established fact that a reader will be
                        distracted by the readable content of a page when
                        looking at its layout. The point of using Lorem Ipsum is
                        that it has a more-or- less normal distribution of
                        letters, as opposed to using 'Content here, content
                        here', making it look like readable English.
                      </p>
                    </div>
                    <div className="bodySectionItem">
                      <h4>How we Help you</h4>
                      <p>
                        It is a long established fact that a reader will be
                        distracted by the readable content of a page when
                        looking at its layout. The point of using Lorem Ipsum is
                        that it has a more-or- less normal distribution of
                        letters, as opposed to using 'Content here, content
                        here', making it look like readable English.
                      </p>
                    </div>
                  </div>
                  <div className="col-4">{launchcourse}</div>
                </div>
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HowInstructor;
