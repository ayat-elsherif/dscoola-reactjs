import { Col, Row } from 'antd';
import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { InstractorAvatarIcon, UserAvatarIcon } from '../../../assets/svg';
import ReadOnlyRatings from '../../../helpers/ratings/ReadOnlyRatings';
function UserBio({ param1, param2, instractorProfileData }) {
  const [showMore, setShowMore] = useState();
  const { currentUser } = useSelector((state) => state?.user);

  return (
    <div className="container userBio">
      <div className="row userBio-first align-items-center">
        <div className="col-lg-8 d-flex align-items-center userBio-details">
          <div className="userBio-img">
            {instractorProfileData?.photo_url ? (
              <img src={instractorProfileData?.photo_url} alt="instuctor" />
            ) : (
              <UserAvatarIcon />
            )}
          </div>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <small className="text-muted">
                {currentUser?.role_id === 1 && <>Admin</>}
                {currentUser?.role_id === 2 && <>Instructor</>}
                {currentUser?.role_id === 3 && <>Student</>}
              </small>
            </Col>
            <Col span={24}>
              {' '}
              <h3>
                {instractorProfileData?.name
                  ? instractorProfileData?.name
                  : 'User Name'}
              </h3>
            </Col>
            <Col span={24}>
              <small>
                {' '}
                {instractorProfileData?.job_title
                  ? instractorProfileData?.job_title
                  : 'Instructor Job Title'}
              </small>
            </Col>
            <Col span={24}>
              {' '}
              <ReadOnlyRatings
                rating={instractorProfileData?.getRating?.rating_avg}
                totalRating={instractorProfileData?.getRating?.rating_count}
              />
            </Col>
          </Row>
        </div>
        <div className="col-lg-4 d-flex justify-content-between userBio-stats">
          <div>
            <span>
              <small>{param1}</small>
            </span>
            <h5 style={{ textAlign: 'center' }}>
              {instractorProfileData?.totalStudent != (null || 'undefined')
                ? instractorProfileData?.totalStudent
                : '0'}
            </h5>
          </div>
          <div>
            <span>
              <small>{param2 ? param2 : 'param2'}</small>
            </span>
            <h5 style={{ textAlign: 'center' }}>
              {instractorProfileData?.totalReviews != (null || 'undefined')
                ? instractorProfileData?.totalReviews
                : '0'}
            </h5>
          </div>
        </div>
      </div>
      <hr />

      <div className="userBio-second">
        <h4>Bio</h4>
        {instractorProfileData?.about_me ? (
          <p>
            {instractorProfileData?.about_me.length > 200 ? (
              showMore ? (
                <>
                  <div>{instractorProfileData?.about_me}</div>

                  <span
                    className="anchor"
                    onClick={() => setShowMore(!showMore)}
                  >
                    Show Less
                  </span>
                </>
              ) : (
                <>
                  {' '}
                  <div>
                    {instractorProfileData?.about_me?.substring(0, 200) + '...'}
                  </div>
                  <span
                    className="anchor"
                    onClick={() => setShowMore(!showMore)}
                  >
                    Show More{' '}
                    <img
                      style={{ width: 12 }}
                      src="/assets/images/icons/arrowDown.svg"
                      alt=""
                    />
                  </span>
                </>
              )
            ) : (
              instractorProfileData?.about_me
            )}
          </p>
        ) : null}
      </div>
    </div>
  );
}

export default UserBio;
