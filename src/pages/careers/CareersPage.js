import { Col, Row } from "antd";
import React from "react";
import BreadCrumbsMultiple from "../../helpers/breadCrumbs/BreadCrumbsMultiple";
import {
  alwaysLearningIcon,
  benefitsCheckedIcon,
  careThemeColorIcon,
  compassThemeColorIcon,
  coreValuesShape,
  earnestlyAuthenticIcon,
  globeThemeColorIcon,
  individuallyHumbleIcon,
  missionIcon,
  writeThemeColorIcon,
} from "../../SVGs";
function CareersPage() {
  window.scroll(0, 0);

  return (
    <div className="careersPage">
      <BreadCrumbsMultiple
        params={[{ label: "Careers" }]}
        title="Let's Shape The Future Of Learning"
        txt={`Help people around the world empower themselves through knowledge.`}
        heroImg={
          <img
            className="careersPage-img"
            src="/assets/images/blogs/blogs-header.png"
            alt="Career header"
          />
        }
      />
      <div className="careersPage-body container">
        <div className="planningSolutions">
          <h3>Learn The Secrets To Life Success</h3>
          <p>The Ultimate Planning Solution To Reach Their Personal Goals</p>
          <Row gutter={30}>
            <Col xl={6} lg={8}>
              <div className="planningSolutions-item">
                {writeThemeColorIcon}
                <h4>We Are Learners</h4>
                <p>Enjoy a yearly learning stipend, office wide learning</p>
              </div>
            </Col>
            <Col xl={6} lg={8}>
              <div className="planningSolutions-item">
                {compassThemeColorIcon}
                <h4>We Are Navigators</h4>
                <p>When people feel supported We want our employees</p>
              </div>
            </Col>
            <Col xl={6} lg={8}>
              <div className="planningSolutions-item">
                {careThemeColorIcon} <h4>We Make An Impact</h4>
                <p>our employees regularly help local food banks </p>
              </div>
            </Col>
            <Col xl={6} lg={0}>
              <div className="planningSolutions-item">
                {globeThemeColorIcon}
                <h4>We Are Global</h4>
                <p>we’ve had a global mindset from the start.</p>
              </div>
            </Col>
          </Row>
        </div>
        <div className="coreValues">
          <div className="coreValues-title">
            {coreValuesShape}
            <h3>Our Core Values</h3>
          </div>
          <Row gutter={30} className="coreValues-body">
            <Col xl={6} lg={12}>
              <div className="coreValues-item">
                <div className="coreValues-firstBG">{missionIcon}</div>
                <h2>Mission Inspired Results Obsessed</h2>
              </div>
            </Col>
            <Col xl={6} lg={12}>
              <div className="coreValues-item">
                <div className="coreValues-firstBG">{alwaysLearningIcon}</div>
                <h2>Always Learning</h2>
              </div>
            </Col>
            <Col xl={6} lg={12}>
              <div className="coreValues-item">
                <div className="coreValues-firstBG">
                  {individuallyHumbleIcon}
                </div>
                <h2>Individually Humble Collectively Proud</h2>
              </div>
            </Col>
            <Col xl={6} lg={12}>
              <div className="coreValues-item">
                <div className="coreValues-firstBG">
                  {earnestlyAuthenticIcon}
                </div>
                <h2>Earnestly Authentic</h2>
              </div>
            </Col>
          </Row>
        </div>
        <div className="perksBenefits">
          <h3>Perks and Benefits</h3>
          <Row gutter={30}>
            <Col span={12}>
              <div className="benefits-item">
                {benefitsCheckedIcon}
                <div>
                  <h4>Global Benefits</h4>
                  <p>
                    Our Many Benefits, Equity, And Time-Off Programs Are
                    Made-To-Fit For Each Of Our International Locations and
                    Areas.
                  </p>
                </div>
              </div>
            </Col>
            <Col span={12}>
              <div className="benefits-item">
                {benefitsCheckedIcon}
                <div>
                  <h4>Charitable Matching</h4>
                  <p>
                    Help A Cause That Matters To You. We Match Monetary
                    Contributions Up To A Certain Annual Limit For Eligible
                    Nonprofits And Charities.
                  </p>
                </div>
              </div>
            </Col>
            <Col span={12}>
              <div className="benefits-item">
                {benefitsCheckedIcon}
                <div>
                  <h4>Learning Incentives</h4>
                  <p>
                    Get Free Access To Udemy And Udemy Business Courses Plus A
                    Yearly Stipend To Spend On Your Professional Development.
                  </p>
                </div>
              </div>
            </Col>
            <Col span={12}>
              <div className="benefits-item">
                {benefitsCheckedIcon}
                <div>
                  <h4>Ubelong Program</h4>
                  <p>
                    We Prioritize Diversity And Inclusion Through Events,
                    Trainings, And Meet-Ups Facilitated By Our Many Employee
                    Resource Groups.
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default CareersPage;
