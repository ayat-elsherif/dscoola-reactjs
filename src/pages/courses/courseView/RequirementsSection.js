import React, { useState } from 'react';
import { Skeleton } from 'antd';
const Requirementssection = ({ myCourse, isLoading }) => {
  const [showMore, setShowMore] = useState();

  if (isLoading) return <Skeleton active paragraph={{ rows: 2 }} />;

  if (!myCourse?.course?.requirements) return false;

  return (
    <section className="RequirementsSection">
      <div className="course-container">
        <div className="requirements-title">Requirements</div>

        <div className="requirements-body">
          <div className="learn-section-text">
            {myCourse?.course?.requirements?.length > 450 ? (
              showMore ? (
                <>
                  <div>{myCourse?.course?.requirements}</div>
                  <span
                    className="anchor"
                    onClick={() => setShowMore(!showMore)}
                  >
                    Show Less
                  </span>
                </>
              ) : (
                <>
                  <div>
                    {myCourse?.course?.requirements?.substring(0, 450) + '...'}
                  </div>

                  <span
                    className="anchor"
                    onClick={() => setShowMore(!showMore)}
                  >
                    Show More
                    <img src="/assets/images/icons/arrowDown.svg" alt="" />
                  </span>
                </>
              )
            ) : (
              <div>{myCourse?.course?.requirements}</div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Requirementssection;
