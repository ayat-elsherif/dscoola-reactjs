import { Skeleton } from 'antd';
import React, { useState } from 'react';

const AboutCourseSection = ({ myCourse, isLoading }) => {
  const [showMore, setShowMore] = useState(false);

  const description = myCourse?.course?.description;

  return (
    <section
      className={`about-course-section ${isLoading ? 'about-loading' : ''}`}
    >
      <div>
        {isLoading ? (
          <Skeleton active paragraph={{ rows: 2 }} />
        ) : (
          <div className="course-container">
            <div className="about-headline">About This Course</div>
            {console.log(description?.length, 'description?.length')}
            <div className="about-content">
              {/* <p>{description}</p> */}
              {/* <p
                dangerouslySetInnerHTML={{
                  __html: description,
                }}
              /> */}
              <p
                dangerouslySetInnerHTML={{
                  __html:
                    description?.length > 450
                      ? showMore
                        ? description
                        : description?.substring(0, 450) + '...'
                      : description,
                }}
              />
              {description?.length > 450 && (
                <span
                  className={`anchor ${showMore ? 'ancor-showless' : ''}`}
                  onClick={() => setShowMore(!showMore)}
                >
                  {showMore ? 'Show Less' : 'Show More'}
                  <img src="/assets/images/icons/arrowDown.svg" alt="" />
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AboutCourseSection;
