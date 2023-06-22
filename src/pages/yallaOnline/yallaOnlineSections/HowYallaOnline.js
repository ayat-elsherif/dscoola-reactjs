import React from "react";
import { Tabs } from "antd";
import {
  yallaOnlineSubscribe,
  createZoomMeeting,
  getRewardPoints,
} from "./SVGs.js";
const { TabPane } = Tabs;

function HowYAllaOnline() {
  window.scroll(0, 0);
  return (
    <div>
      <div className="container">
        <div className="tabsSection">
          <div className="headSection">
            <h2>How Yalla Online Works</h2>
            <p>
              simply dummy text of the printing and typesetting industry. Lorem{" "}
              <br />
              Ipsum has been the industry's
            </p>
          </div>
          <div className="bodySection">
            <Tabs defaultActiveKey="1" className="scoolaInnerTabs">
              <TabPane tab=" Subscribe to the course" key="1">
                <div className="row align-items-center mt-4 bodySectionDetails">
                  <div className="col-8">
                    <div className="bodySectionItem">
                      <h4>Subscibe To The course</h4>
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
                  <div className="col-4">{yallaOnlineSubscribe}</div>
                </div>
              </TabPane>
              <TabPane tab="Create Zoom Meeting" key="2">
                <div className="row align-items-center mt-4 bodySectionDetails">
                  <div className="col-8">
                    <div className="bodySectionItem">
                      <h4>Create Zoom Meeting</h4>
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
                  <div className="col-4">{createZoomMeeting}</div>
                </div>
              </TabPane>
              <TabPane tab="Get Reward Points " key="3">
                <div className="row align-items-center mt-4 bodySectionDetails">
                  <div className="col-8">
                    <div className="bodySectionItem">
                      <h4>Get Reward Points</h4>
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
                  <div className="col-4">{getRewardPoints}</div>
                </div>
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HowYAllaOnline;
