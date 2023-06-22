import { Button, Checkbox, Col, Row } from 'antd';
import { set } from 'lodash';
import React from 'react';
import { useState } from 'react';
import { InstructorTermsIcon } from '../../../../../../../../assets/svg';
import './premiumTabs.scss';
const InstructorTerms = ({ onNext, onPrev }) => {
  const onChange = (e) => {
    localStorage.setItem('acceptTerms', e.target.checked);
  };

  return (
    <>
      <Row justify="center" className="instructor-terms-row">
        <InstructorTermsIcon className="Instructor-Terms-Icon" />
        When you sign in to become an instructor on scoola platform, you agree
        to abide by the instructor terms .They cover details about scoola
        platform that are relevant to instructors(including pricing, payments,
        and your obligations as an instructor)
        <Checkbox className="Instructor-Terms-Checkbox" onChange={onChange}>
          I have read and agree to the scoola instructors terms
        </Checkbox>
      </Row>
      <Row justify="end" gutter={[16]} className="pt-5">
        <Col>
          <Button onClick={onPrev}>Back</Button>
        </Col>
        <Col>
          <Button onClick={onNext} type="primary">
            Save & Continue
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default InstructorTerms;
