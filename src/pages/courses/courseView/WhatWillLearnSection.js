import { Skeleton } from 'antd';
import React from 'react';

export default function WhatWillLearnSection({ myCourse, isLoading }) {
  if (isLoading)
    return (
      <section className="what-will-learn-section" style={{ margin: '40px 0' }}>
        <div className="course-container">
          <div className="learn-section-container">
            <ul className="learn-section-list">
              <Skeleton active paragraph={{ rows: 2 }} />
            </ul>
          </div>
        </div>
      </section>
    );

  if (!myCourse?.course?.benefits) return null;

  return (
    <section className="what-will-learn-section">
      <div className="course-container">
        <div className="learn-section-container">
          <div className="learn-section-title">What you'll learn</div>
          <ul className="learn-section-list">
            {myCourse?.course?.benefits?.map((item, index) => {
              return (
                <li key={index} className="learn-section-item">
                  <div className="learn-section-wraper">
                    <img
                      src="/assets/images/icons/learn-section-icon.svg"
                      className="learn-section-icon icon-small"
                      alt="learn icon"
                    />
                    <span className="learn-section-text">{item}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
