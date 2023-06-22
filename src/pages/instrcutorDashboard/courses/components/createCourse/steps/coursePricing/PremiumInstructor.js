import { Button, Col, message, Row, Steps, Tabs } from 'antd';
import SweetAlert from 'components/common/dashboard/components/sweetAlert.js';
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BasicInformation from './premiumTabs/basicInformation';
import InstructorTerms from './premiumTabs/instructorTerms';
import PayoutMethods from './premiumTabs/payoutMethods';

const PremiumInstructor = () => {
  const [current, setCurrent] = useState(0);
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };

  const steps = [
    {
      title: 'Basic Information',
      content: <BasicInformation onNext={next} />,
    },
    {
      title: 'Instructor Terms',
      content: <InstructorTerms onNext={next} onPrev={prev} />,
    },
    {
      title: 'Payout methods',
      content: <PayoutMethods onPrev={prev} />,
    },
  ];
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));
  const contentStyle = {
    marginTop: 16,
  };

  const navigate = useNavigate();

  const onFinish = () => {
    const acceptTerms = localStorage.getItem('acceptTerms');
    if (acceptTerms) {
      SweetAlert('Done!', 'We will review your data and reply very soon !');
      navigate('/instructor-dashboard/courses/add/course-pricing');
      localStorage.setItem('premiumInstructor', true);
    } else {
      message.error('Please accept terms to continue.');
    }
  };

  return (
    <>
      {/* <Tabs
        onChange={onChange}
        activeKey={activeKey}
        className="dashboard-tabs"
      >
        <TabPane tab="Basic Information" key="1">
          <BasicInformation />
        </TabPane>
        <TabPane tab="Instructor Terms" key="2">
          <InstructorTerms />
        </TabPane>
        <TabPane tab="Payout methods" key="3">
          <PayoutMethods />
        </TabPane>
      </Tabs> */}
      <div>
        <Steps current={current} items={items}></Steps>
        <div style={contentStyle}>{steps[current].content}</div>
      </div>

      {/* <Row gutter={[16]} className="pt-4" justify="end">
        {' '}
        {(activeKey === '2' || activeKey === '3') && (
          <Col>
            <Button onClick={() => setActiveKey((+activeKey - 1).toString())}>
              Back
            </Button>
          </Col>
        )}
        {(activeKey === '1' || activeKey === '2') && (
          <Col>
            <Button
              onClick={() => setActiveKey((+activeKey + 1).toString())}
              type="primary"
            >
              Save & Continue
            </Button>
          </Col>
        )}
        {activeKey === '3' && (
          <Col>
            <Button onClick={onFinish} type="primary">
              Save & Continue
            </Button>
          </Col>
        )}
      </Row> */}
    </>
  );
};

export default PremiumInstructor;
