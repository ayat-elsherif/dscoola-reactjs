import { css } from '@emotion/css';
import useYallaOnlineShow from 'api-hooks/yalla-online/useYallaOnlineShow';
import OwnBreadcrumb from 'components/own/OwnBreadcrumb';
import { Link, useParams } from 'react-router-dom';
import slugify from 'slugify';
import bannerImg from 'assets/images/antenna-cw-cj_nFa14-unsplash.jpg';
import OwnLoading from 'components/own/OwnLoading';
import { Button, Col, Row, Skeleton } from 'antd';
import { StudentIcon } from 'assets/svg';
import groupImage from 'assets/images/group.png';
import Rating from 'components/Rating/Rating';
import { getProfileUrl, limitedText } from 'utils';
import DetailsCard from './DetailsCard';
import ReviewItem from './ReviewItem';
import ModalYallaOnlineRate from 'components/modals/ModalYallaOnlineRate';
import { useState } from 'react';
import useYallaOnlineReviewList from 'api-hooks/yalla-online/useYallaOnlineReviewList';
import OwnPagination from 'components/own/OwnPagination';
import OwnResult from 'components/own/OwnResult';

function MeetingDetails() {
  const MeetingDetailsStyles = css`
    .page-header-wrapper {
      background-color: #efeff6;

      .title {
        padding-bottom: 4rem;
        font-weight: 500;
        font-size: 3rem;
        line-height: 2rem;
        color: #2a2a2a;
        text-transform: capitalize;
      }
    }
    .banner-wrapper {
      margin: 3.7rem 0;
      max-height: 34.4rem;
      img {
        height: 100%;
      }
    }
    .col-start {
      .section {
        margin-bottom: 2rem;
        padding: 1rem;
        .sec-title {
          font-weight: 500;
          font-size: 2rem;
          text-transform: capitalize;
          color: #2a2a2a;
          margin-bottom: 1.5rem;
        }
        .desc {
          font-size: 1.4rem;
          line-height: 2.5rem;
          color: #2a2a2a;
        }

        .creator-wrapper {
          display: flex;
          /* align-items: center; */
          gap: 1.6rem;
          .img-profile-wrapper {
            min-width: 20rem;
            height: 20rem;
            border-radius: 6px;
            overflow: hidden;
            background-color: #f9f9f9;
            img {
              width: 100%;
              height: 100%;
              object-fit: contain;
            }
          }
          .info {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            .sub-title {
              font-size: 1.6rem;
              line-height: 2rem;
              text-transform: capitalize;
              color: #6a6f73;
            }
            .title {
              font-weight: 500;
              font-size: 1.8rem;
              text-transform: capitalize;
              color: #2a2a2a;
            }
            ul.followers {
              display: flex;
              flex-wrap: wrap;
              gap: 4rem;
              li {
                display: flex;
                align-items: center;
                gap: 3px;

                font-size: 1.3rem;
                text-transform: capitalize;

                img {
                  width: 1.6rem;
                  height: 1.6rem;
                }
              }
            }
          }
        }

        .reviews-wrapper {
          padding: 1rem 0;
          .btn-show-more {
            margin-bottom: 2rem;
            padding: 0;
            display: flex;
            flex-direction: row-reverse;

            gap: 1rem;
            font-size: 1.4rem;
            svg {
              width: 0.9rem;
              path {
                fill: #7e59d1;
              }
            }
          }
        }
      }
    }

    .icon {
      width: 4rem;
      height: 4rem;
    }
    .col-end {
      position: sticky;
      top: 4rem;
    }
  `;
  const { meetId } = useParams();
  const { yallaOnlineShow, yallaOnlineShowLod } = useYallaOnlineShow(meetId);
  console.log('MeetingDetails  yallaOnlineShow:', yallaOnlineShow);
  const {
    yallaOnlinePagination,
    yallaOnlineReviewList,
    yallaOnlineReviewListLod,
    // } = useYallaOnlineReviewList(yallaOnlineShow?.meetings?.[0]?.id);
  } = useYallaOnlineReviewList(yallaOnlineShow?.room?.id);
  // console.log('MeetingDetails  yallaOnlineReviewList:', yallaOnlineReviewList);
  const [isModalRateOpen, setIsModalRateOpen] = useState(false);

  if (yallaOnlineShowLod) return <OwnLoading />;

  const meeting = yallaOnlineShow?.meetings?.[0];
  // console.log('MeetingDetails  meeting:', meeting);
  const creator = yallaOnlineShow?.room?.creator;
  const course = yallaOnlineShow?.room?.course;
  // console.log('MeetingDetails  course:', course);
  return (
    <>
      <div className={MeetingDetailsStyles}>
        <div className="page-header-wrapper">
          <div className="container">
            <OwnBreadcrumb
              routes={[
                {
                  label: yallaOnlineShow?.room?.course?.category?.category_name,
                  path: `/categories/${yallaOnlineShow?.room?.course?.category?.category_id}/${yallaOnlineShow?.room?.course?.category?.slug}`,
                },
                {
                  label: yallaOnlineShow?.room?.course?.title,
                  path: `/categories/${
                    yallaOnlineShow?.room?.course?.category?.category_id
                  }/${yallaOnlineShow?.room?.course?.category?.slug}/${
                    yallaOnlineShow?.room?.course?.id
                  }/${slugify(yallaOnlineShow?.room?.course?.title)}`,
                },
                {
                  label: 'Yalla Online',
                  path: `/student-dashboard/yalla-online`,
                },
              ]}
              current={yallaOnlineShow?.room?.title}
            />
            <div className="title">{yallaOnlineShow?.room?.title}</div>
          </div>
        </div>
        <div className="container">
          <div className="page-inner">
            <div className="banner-wrapper">
              <img src={bannerImg} alt="banner" />
            </div>

            <div className="meeting-info-wrapper">
              <Row gutter={30}>
                <Col span={16}>
                  <div className="col-start">
                    <div className="section">
                      <div className="sec-title">About This Meeting</div>
                      <div className="desc">{meeting?.description}</div>
                    </div>

                    <div className="section">
                      <div className="sec-title">Hosted by</div>
                      <div className="creator-wrapper">
                        <div className="img-profile-wrapper">
                          <img src={creator?.avatar} alt="profile" />
                        </div>

                        <div className="info">
                          <div className="sub-title">
                            {creator?.role_id === 2
                              ? 'Instructor'
                              : creator?.role_id === 3
                              ? 'Student'
                              : ''}
                          </div>
                          <Link
                            to={getProfileUrl(creator?.role_id, creator?.id)}
                            className="title"
                          >
                            {creator?.name}
                          </Link>
                          <div className="desc">
                            {limitedText(creator?.about_me, 150)}
                          </div>
                          <ul className="followers">
                            <li>
                              <StudentIcon />
                              <span>{creator?.totalStudent} Students</span>
                            </li>
                            <li>
                              <img
                                src={groupImage}
                                alt="group"
                                height={20}
                                width={20}
                              />
                              <span>
                                {yallaOnlineShow?.my_groups_count} Groups
                              </span>
                            </li>
                          </ul>
                          <Rating
                            count={creator?.getRating?.rating_count}
                            defaultValue={creator?.getRating?.rating_avg}
                            showAvg={creator?.getRating?.rating_avg}
                            disabled
                          />
                        </div>
                      </div>
                    </div>

                    <div className="section">
                      <div className="sec-title">
                        Reviews ({yallaOnlinePagination?.total || 0})
                      </div>
                      <div className="reviews-wrapper">
                        {yallaOnlineReviewListLod ? (
                          <Skeleton active />
                        ) : yallaOnlineReviewList?.length ? (
                          yallaOnlineReviewList?.map((el) => (
                            <ReviewItem key={el?.id} item={el} />
                          ))
                        ) : (
                          <OwnResult
                            title="No reviews yet!"
                            iconWidth={90}
                            style={{
                              display: 'inline-block',
                            }}
                          />
                        )}
                        <OwnPagination pagination={yallaOnlinePagination} />
                        {/* {commentList?.length > replyCount && ( */}
                        {/* <Button
                          type="link"
                          icon={<ArrowDownIcon />}
                          // loading={showMoreLod}
                          className="btn-show-more"
                          // onClick={onShowMore}
                        >
                          Show more
                        </Button> */}
                        {/* )} */}
                        <Button
                          type="primary"
                          // loading={showMoreLod}
                          onClick={() => setIsModalRateOpen(true)}
                        >
                          Write Review
                        </Button>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col span={8}>
                  <div className="col-end">
                    <DetailsCard
                      creator={creator}
                      meeting={meeting}
                      room={yallaOnlineShow?.room}
                      timezone={yallaOnlineShow?.timezone}
                      lastJoin={yallaOnlineShow?.ratedLatestJoinedYallaonline}
                    />
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
      {/* {!data?.isRated && ( */}
      <ModalYallaOnlineRate
        open={isModalRateOpen}
        setOpen={setIsModalRateOpen}
        // rateItem={{
        //   course_id: course?.id,
        //   meet_id: meeting?.id,
        // }}
        rateItem={{
          creator,
          // id: meeting?.id,
          id: yallaOnlineShow?.room?.id,
          course_id: course?.id,
        }}
      />
      {/* )} */}
    </>
  );
}

export default MeetingDetails;
