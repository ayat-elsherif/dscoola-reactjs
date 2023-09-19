import React, { useState, useEffect } from 'react';
import {
  cartLevel,
  cartDuration,
  cartAccess,
  cartArticles,
  cartLectures,
  cartQuizzes,
  cartCertificate,
} from '../SVGs';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { message, Button, Skeleton, Modal, Row, Col } from 'antd';
// import { CourseVideoPlayer } from '../CourseVideo';
import { useDispatch, useSelector } from 'react-redux';
import BookingDetails from './liveCourses/BookingDetails';
// import DatesAvailability from './liveCourses.js/DatesAvailability';
import { useNavigate } from 'react-router-dom';
// import RequestBundle from './liveCourses.js/RequestBundle';
// import SendGift from '../../../helpers/gift/SendGift';
import ShareGroup from '../../../helpers/shareGroup/ShareGroup';
import { levelsList } from '../../../apis/levelsList';
// import { protectAxios } from '../../../apis/coursesAPI';

import { fetchStart } from '../../../features/courses/cartList';
import { useEnroll } from '../../../helpers/dropdownCart/hooks/useCartList';
import { useQueryClient } from '@tanstack/react-query';
import { loadedLecInfo } from '../../../features/coursePreview/coursePreview';
import { AboutIcon, ActiveHIeartIcon, HeartIcon } from '../../../assets/svg';
import {
  useAddToMyWishlist,
  useRemoveFromMyWishlist,
} from '../../dashboard/myWishlist/hooks/useWishList';
import useApi from 'Hooks/network/useApi';
import DatesAvailability from './liveCourses/DatesAvailability';
import RequestBundle from './RequestBundle';
import useScreens from 'Hooks/ui/useScreens';
// import fetch from '../../../auth/AuthInterceptor';
// import { singleCourse } from '../../../features/singleCourse/singleCourse';
// import { fetchSingleLiveCourse } from '../../../features/singleLiveCourse/singleLiveCourseSlice';

dayjs.extend(duration);

const Cartsidebar = ({
  myCourse,
  liveCourse,
  isLoading,
  isAuth,
  isPreview,
}) => {
  const api = useApi();
  const [isWishList, setIsWishlist] = useState(myCourse?.course?.isWishlist);
  const [loading, setLoading] = useState(false);
  const [clickedBtn, setClickedBtn] = useState();

  const [openBundleModal, setOpenBundleModal] = useState(null);
  const [openReqBunModal, setOpenReqBunModal] = useState(null);
  const [selectedBundle, setSelectedBundle] = useState(null);
  const [liveIsClosed, setLiveIsClosed] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const handleClose = (handleModal) => handleModal(false);
  const handleShow = (handleModal) => handleModal(true);
  const levels = levelsList;
  const dispatch = useDispatch();
  const duration = myCourse?.course?.total_duration;
  const hours = duration?.slice(0, duration?.indexOf(':'));
  const oneDigitHour = duration?.slice(1, duration?.indexOf(':'));
  const { isLg } = useScreens();
  const { currentUser } = useSelector((state) => state?.user);
  const courseContent = useSelector(
    (state) => state.courseContentState?.courseContentState,
  );

  const onenrollSuccsses = (data) => {
    message.success(data.data.message, 5);
    queryClient.invalidateQueries([`cart-info`]);
    // navigate('/student-dashboard/my-courses');
    dispatch(fetchStart());
  };

  const { mutate: enroll } = useEnroll(onenrollSuccsses);

  const enrollNow = (id) => {
    if (currentUser?.isVerified) {
      enroll({ course_id: id });
    } else {
      message.error('Your email address has not been verified', 5);
    }
  };

  const cartsidebarList = [
    {
      icon: cartLevel,
      key: 'Level',
      value: levels.find((i) => i.id === myCourse?.course?.level)?.title,
    },
    {
      icon: cartDuration,
      key: 'Duration',
      value: duration
        ? hours > 10
          ? `${hours} hours`
          : `${oneDigitHour} hours`
        : '0',
    },
    {
      icon: cartAccess,
      key: 'Access',
      value: 'Lifetime ',
    },
    {
      icon: cartArticles,
      key: 'Articles',
      value: myCourse?.course?.totalArtical
        ? `${myCourse?.course?.totalArtical} Articles`
        : 'No Articles',
    },
    {
      icon: cartLectures,
      key: 'Lectures',
      value: myCourse?.course?.total_lectures
        ? `${myCourse?.course?.total_lectures} Lectures`
        : 'No Lectures',
    },
    {
      icon: cartLectures,
      key: 'Sessions',
      value: myCourse?.course?.total_lectures
        ? myCourse?.course?.total_lectures + ' Sessions'
        : 'No Sessions',
    },
    {
      icon: cartQuizzes,
      key: 'Quizes',
      value: myCourse?.course?.total_quiz
        ? myCourse?.course?.total_quiz + ' Quizzes'
        : 'No Quizzes',
    },
    {
      icon: cartCertificate,
      key: 'Certificate',
      value: 'Yes',
    },
  ];

  const addToCard = (id, navigateToCard, isBundle) => {
    setLoading(true);
    const form = new FormData();

    form.append('item_id', id);

    isBundle
      ? form.append('item_type', 'bundle')
      : form.append('item_type', 'course');

    api
      .post('cart', form)
      .then((res) => {
        setLoading(false);
        message.success(res?.data?.message, 5);
        dispatch(fetchStart());
        queryClient.invalidateQueries([`cart-info`]);
        setOpenBundleModal(false);
      })
      .catch((res) => {
        setLoading(false);
        message.error(res?.response?.data?.message, 5);
        setOpenBundleModal(false);
      });
  };

  const addToMyWishList = (id) => handleAddWishList(id);

  const handleRemoveFromMyWishList = (id) => removeFromWishlist(id);

  const onAddToMyWishlistSuccsses = (data) => setIsWishlist(true);

  const onRemoveSuccsses = (data) => {
    setIsWishlist(false);
  };

  const onRemoveFail = (data) => queryClient.invalidateQueries('single-course');

  const { mutate: handleAddWishList } = useAddToMyWishlist(
    onAddToMyWishlistSuccsses,
  );

  const { mutate: removeFromWishlist } = useRemoveFromMyWishlist(
    onRemoveSuccsses,
    onRemoveFail,
  );
  const handleRadioChange = (e, id) => {
    console.log(e.target.checked, id, 'dfverg');

    if (e.target.checked) {
      setSelectedBundle(id);
    }
  };
  // console.log(liveIsClosed, 'liveIsClosed');
  // console.log(isPreview, 'isPreview');
  return (
    <>
      {/* <OwnModal
        open={openVideo}
        onCancel={() => {
          handleClose(setOpenVideo);
        }}
        className="courseBrief"
      >
        <VideoJsPlayer videoObj={videoObj} />
      </OwnModal>
      <div
        className="videoLoading"
        onClick={() => {
          handleShow(setOpenVideo);
        }}
      >
        {isLoading ? (
          <Skeleton.Image className="cart-image-loadin" active />
        ) : (
          <>
            {playVideo}
            <img
              src={myCourse?.course?.thumbnailurl}
              alt=""
              className="cartsidebar-video"
            />
          </>
        )}
      </div> */}
      <div className="cartsidebar-body course-card-bar">
        {isLoading
          ? null
          : liveCourse && (
              <BookingDetails
                onLiveCourseClose={setLiveIsClosed}
                myCourse={myCourse}
              />
            )}
        <>
          {isLoading ? (
            <Skeleton active paragraph={{ rows: 1 }} />
          ) : myCourse?.course?.isEnrolled.is_enrolled ? (
            <div className="cartsidebar-price">
              <AboutIcon />
              <span className="cartsidebar-enrolled-on">
                <span className="cartsidebar-enrolled-on-text">
                  You have been enrolled on:
                </span>
                {myCourse?.course?.isEnrolled?.enrolled_at ? (
                  <span className="cartsidebar-enrolled-on-date">
                    <span>
                      {dayjs(myCourse?.course?.isEnrolled?.enrolled_at).format(
                        'YYYY-MM-DD',
                      )}
                    </span>
                  </span>
                ) : (
                  ' successfully'
                )}
              </span>
            </div>
          ) : (
            <div className="cartsidebar-price with-icon">
              <div>
                {myCourse?.course?.sale_price !== 0 && (
                  <span className="cartsidebar-body-disconted">
                    $ {myCourse?.course?.sale_price}
                  </span>
                )}
                <span
                  className={
                    myCourse?.course?.sale_price === 0
                      ? 'cartsidebar-body-disconted'
                      : 'cartsidebar-body-prise'
                  }
                >
                  $ {myCourse?.course?.price || 0}
                </span>
              </div>

              <div className="cartsidebar-heart">
                <span className="card-favourite-button">
                  {!isWishList ? (
                    <HeartIcon
                      onClick={() =>
                        !isPreview
                          ? addToMyWishList(myCourse?.course?.id)
                          : null
                      }
                    />
                  ) : (
                    <ActiveHIeartIcon
                      onClick={() =>
                        !isPreview
                          ? handleRemoveFromMyWishList(myCourse?.course?.id)
                          : null
                      }
                    />
                  )}
                </span>
              </div>
            </div>
          )}

          {isLoading ? (
            <Skeleton active paragraph={{ rows: 5 }} />
          ) : (
            <>
              <p className="cartsidebar-course-includes">
                This course includes:
              </p>
              <ul className="cartsidebar-ul">
                {cartsidebarList?.map((item, index) => {
                  if (
                    (item.key === 'Access' && liveCourse) ||
                    (item.key === 'Sessions' && !liveCourse)
                  )
                    return null;
                  else {
                    return (
                      <li key={index}>
                        {item.key === 'Lectures' ? null : (
                          <div className="cartsidebar-li">
                            <div>
                              {item.icon}
                              <span className="cartsidebar-li-items word">
                                {item.key === 'Lectures'
                                  ? 'Sessions'
                                  : item.key}
                              </span>
                            </div>
                            <div>
                              <span className="cartsidebar-li-items">
                                {item.value}
                              </span>
                            </div>
                          </div>
                        )}
                        {/* <div className="cartsidebar-li-divider"></div> */}
                      </li>
                    );
                  }
                })}
              </ul>
            </>
          )}
          {isLoading ? (
            <div className="cart-btn-loadng">
              <Skeleton.Button active shape="primary" block />
              <Skeleton.Button active shape="default" block />
            </div>
          ) : myCourse?.course?.isEnrolled.is_enrolled ? (
            <Button
              type="default"
              disabled={isPreview}
              onClick={() => {
                dispatch(
                  loadedLecInfo({
                    myCourse: myCourse,
                  }),
                );
                navigate(
                  `/course/${myCourse?.course?.slug}/${myCourse?.course?.id}/section/${courseContent?.sections[0]?.id}/preview/${courseContent?.sections?.[0]?.lectures?.[0]?.id}`,
                );
              }}
            >
              Go to Course
            </Button>
          ) : myCourse?.course?.price_plan !== 'free' ? (
            <>
              <Button
                type="primary"
                onClick={() => {
                  if (!isAuth) {
                    navigate('/sign-in');
                    return;
                  }
                  if (liveCourse) {
                    setOpenBundleModal(myCourse?.course?.id);
                    return;
                  }
                  if (myCourse?.course?.inCart) {
                    navigate('/cart');
                    return;
                  }
                  addToCard(myCourse?.course?.id);
                }}
                disabled={liveCourse || isPreview}
                // disabled={(liveCourse && liveIsClosed) || isPreview}
              >
                {/* {console.log(liveCourse, 'liveCourseliveCourse')}
                {console.log(
                  liveIsClosed,
                  'liveIsClosedliveIsClosedliveIsClosed',
                )}
                {console.log(isPreview, 'isPreviewisPreviewisPreview')} */}
                {myCourse?.course?.inCart ? 'View Cart' : 'Add to cart'}{' '}
              </Button>
              {!myCourse?.course?.inCart && (
                <Button
                  disabled={liveCourse || isPreview}
                  // disabled={(liveCourse && liveIsClosed) || isPreview}
                  onClick={() => {
                    if (!isAuth) {
                      navigate('/sign-in');
                      return;
                    }
                    if (liveCourse) {
                      setOpenBundleModal(myCourse?.course?.id);
                      return;
                    }
                    if (myCourse?.course?.inCart) navigate('/cart');
                    else addToCard(myCourse?.course?.id, true);
                  }}
                >
                  Buy Now
                </Button>
              )}
            </>
          ) : (
            <Button
              disabled={liveCourse || isPreview}
              // disabled={(liveCourse && liveIsClosed) || isPreview}
              type="primary"
              onClick={() => {
                console.log({ isAuth });
                if (!isAuth) {
                  navigate('/sign-in');
                  return;
                }
                enrollNow(myCourse?.course?.id);
              }}
            >
              Enroll Now
            </Button>
          )}

          {/* <div className="cartsidebar-divider"></div> */}

          <div className="d-flex justify-content-between cartsidebar-footer">
            <ShareGroup shareLabel={'Share'} />
            {/* <div className="">{colorfulGiftIcon} Gift This Course</div> */}
            {/* <div>
              <SendGift giftLabel="Gift This Course" />
            </div> */}
          </div>
        </>
      </div>
      <Modal
        title="Select any bundles to Start From"
        open={openBundleModal}
        destroyOnClose
        footer={null}
        width="800px"
        onCancel={() => setOpenBundleModal(false)}
      >
        <DatesAvailability
          isModal={true}
          myCourse={myCourse?.course}
          handleBundleId={handleRadioChange}
        />
        <Row justify="space-between" className="pt-4 pb-5">
          <Col className="cant-finde-bundle">
            Can't find a bundle you were looking for?
          </Col>
          <Col
            onClick={() => {
              setOpenBundleModal(false);
              setOpenReqBunModal(myCourse?.course?.id);
            }}
            className="request-bundle"
          >
            Request a bundle
          </Col>
        </Row>
        <Row justify="center">
          <Button
            className="add-to-cart-bundle"
            disabled={!selectedBundle}
            loading={loading && clickedBtn === 1}
            type="primary"
            onClick={() => {
              setClickedBtn(1);
              addToCard(selectedBundle, false, true);
            }}
          >
            Add To cart
          </Button>
        </Row>
        <Row className="pt-4" justify="center">
          <Button
            disabled={!selectedBundle}
            loading={loading && clickedBtn === 2}
            className="add-to-cart-bundle"
            onClick={() => {
              setClickedBtn(2);
              addToCard(selectedBundle, true, true);
            }}
          >
            Buy Now
          </Button>
        </Row>
      </Modal>
      <Modal
        title="Request a bundle"
        open={openReqBunModal}
        destroyOnClose
        footer={null}
        width="484px"
        onCancel={() => {
          setOpenReqBunModal(false);
          setOpenBundleModal(true);
        }}
      >
        <RequestBundle myCourse={myCourse} />
      </Modal>

      {isLoading ? (
        <div className="cart-btn-loadng">
          <Skeleton.Button active shape="primary" block />
          <Skeleton.Button active shape="default" block />
        </div>
      ) : myCourse?.course?.isEnrolled.is_enrolled ? (
        <div className="fixed-button-cartsidebar">
          <Button
            className="go-to-course"
            type="default"
            disabled={isPreview}
            onClick={() => {
              dispatch(
                loadedLecInfo({
                  myCourse: myCourse,
                }),
              );
              navigate(
                `/course/${myCourse?.course?.slug}/${myCourse?.course?.id}/section/${courseContent?.sections[0]?.id}/preview/${courseContent?.sections?.[0]?.lectures?.[0]?.id}`,
              );
            }}
          >
            Go to Course
          </Button>
        </div>
      ) : myCourse?.course?.price_plan !== 'free' ? (
        <div className="fixed-button-cartsidebar">
          <Button
            // type="primary"
            className="cart-button"
            onClick={() => {
              if (!isAuth) {
                navigate('/sign-in');
                return;
              }
              if (liveCourse) {
                setOpenBundleModal(myCourse?.course?.id);
                return;
              }
              if (myCourse?.course?.inCart) {
                navigate('/cart');
                return;
              }
              addToCard(myCourse?.course?.id);
            }}
            disabled={liveCourse || isPreview}
            // disabled={(liveCourse && liveIsClosed) || isPreview}
          >
            {/* {console.log(liveCourse, 'liveCourseliveCourse')}
                {console.log(
                  liveIsClosed,
                  'liveIsClosedliveIsClosedliveIsClosed',
                )}
                {console.log(isPreview, 'isPreviewisPreviewisPreview')} */}
            {myCourse?.course?.inCart ? 'View Cart' : 'Add to cart'}{' '}
          </Button>
          {!myCourse?.course?.inCart && (
            <Button
              className="buy-now-in-cart"
              disabled={liveCourse || isPreview}
              // disabled={(liveCourse && liveIsClosed) || isPreview}
              onClick={() => {
                if (!isAuth) {
                  navigate('/sign-in');
                  return;
                }
                if (liveCourse) {
                  setOpenBundleModal(myCourse?.course?.id);
                  return;
                }
                if (myCourse?.course?.inCart) navigate('/cart');
                else addToCard(myCourse?.course?.id, true);
              }}
            >
              Buy Now
            </Button>
          )}
        </div>
      ) : (
        <div className="fixed-button-cartsidebar">
          <Button
            disabled={liveCourse || isPreview}
            // disabled={(liveCourse && liveIsClosed) || isPreview}
            type="primary"
            onClick={() => {
              console.log({ isAuth });
              if (!isAuth) {
                navigate('/sign-in');
                return;
              }
              enrollNow(myCourse?.course?.id);
            }}
          >
            Enroll Now
          </Button>
        </div>
      )}
    </>
  );
};

export default Cartsidebar;
