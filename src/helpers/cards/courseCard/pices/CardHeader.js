import { css } from '@emotion/css';
import { Button, Col, Image, Modal, Row, message } from 'antd';
import useCartAdd from 'api-hooks/cart/useCartAdd';
import useEnrollFree from 'api-hooks/cart/useEnrollFree';
import { HappeningNow } from 'assets/svg';
import CountdownTimer from 'components/tiny/CountdownTimer';
import dayjs from 'dayjs';
import RequestBundle from 'pages/courses/courseView/RequestBundle';
import DatesAvailability from 'pages/courses/courseView/liveCourses/DatesAvailability';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getPercentage } from 'utils';

function CardHeader({ course }) {
  // // console.log('CardHeader  course', course);
  const CardHeaderStyles = css`
    position: relative;

    &:hover {
      .action-btn,
      .time-counter-wrapper {
        width: 14.5rem;
        padding: 0.8rem;
      }
    }
    .course-image {
      width: 27rem;
      max-width: 100%;
      height: 13.9rem;
      object-fit: cover;
    }

    .float-box {
      position: absolute;
      top: 1.6rem;

      display: flex;
      align-items: center;
      gap: 0.3rem;
      padding: 0.2rem 0.5rem;

      font-weight: 500;
      font-size: 1.2rem;
      letter-spacing: 0px;

      &.live {
        left: 1.6rem;
        background-color: #cc1915;
        border-radius: 1.3rem;

        svg {
          width: 1.1rem;
        }

        color: #ffffff;
      }
      &.booked {
        right: 0;
        background-color: #f4f5f9;
        color: #cc1915;
      }
    }
    .action-btn {
      /* width: 14.5rem; */
      min-width: 0;
      overflow: hidden;
      height: 4rem;
      position: absolute;
      right: 0;
      bottom: -1px;
      border: none;
      width: 0;
      padding: 0;

      text-transform: capitalize;
      border-radius: 0;
      clip-path: polygon(10% 0, 100% 0, 100% 100%, 0% 100%);
      /* transform: scaleX(0); */
      transform-origin: right;
      transition: width 0.3s;
    }
    .time-counter-wrapper {
      width: 0;
      height: 4rem;

      padding: 0;
      overflow: hidden;
      position: absolute;
      left: 0;
      bottom: -1px;
      clip-path: polygon(0 0, 100% 0, 90% 100%, 0 100%);
      transition: width 0.25s ease-out;
      transform-origin: left;
      background-color: #f4f5f9;
    }
  `;

  const { cartAdd, cartAddLod } = useCartAdd();
  const { enrollFree, enrollFreeLod } = useEnrollFree();
  const { currentUser } = useSelector((state) => state?.user);
  const [openBundleModal, setOpenBundleModal] = useState(null);
  const [selectedBundle, setSelectedBundle] = useState(null);
  const [clickedBtn, setClickedBtn] = useState();
  const [openReqBunModal, setOpenReqBunModal] = useState(null);

  const [actionBtnTex, setActionBtnTex] = useState('');
  const is_enrolled = course?.isEnrolled?.is_enrolled;
  const navigate = useNavigate();

  const startTime = course?.start_time;
  const endTime = course?.end_time;
  const [dateStatus, setDateStatus] = useState('');

  useEffect(() => {
    const now = dayjs();

    if (now.isBefore(dayjs(startTime))) {
      // console.log('Coming Soon ');
      setDateStatus('comingSoon');
    }
    if (now.isAfter(dayjs(endTime))) {
      // console.log('Completed');
      setDateStatus('completed');
    }
    if (now.isAfter(dayjs(startTime)) && now.isBefore(dayjs(endTime))) {
      // console.log('Happening Now');
      setDateStatus('happeningNow');
    }
  }, [course?.zoom_meetings, startTime, endTime]);

  useEffect(() => {
    let text = 'Enroll Now';
    if (is_enrolled) text = 'View Course';
    if (course?.price_plan !== 'free' && !is_enrolled) text = 'Add to cart';

    setActionBtnTex(text);
  }, [is_enrolled, course?.price_plan]);

  const handleAction = () => {
    if (!currentUser) return navigate('/sign-in');
    if (!currentUser.isVerified)
      return message.error('Your email address has not been verified', 5);
    // ? Handle cases
    if (is_enrolled)
      // return navigate('/course-view/' + course?.slug || course?.id);
      return navigate('/course-view/' + course?.id);

    if (course?.price_plan !== 'free') {
      if (course?.type === 'liveClass') {
        setOpenBundleModal(course?.id);
        return;
      }
      const reqData = {
        item_id: course?.id,
        item_type: 'course',
      };
      cartAdd({
        reqData,
        onSuc: (res) => {},
      });
      return false;
    }
    if (!course?.price || course?.price_plan === 'free') {
      const reqData = {
        course_id: course?.id,
      };
      enrollFree({ reqData });
      return false;
    }
    console.log('Not match any case!');
  };
  // const handleAction = () => {
  //   if (is_enrolled && !!currentUser) {
  //     navigate('/course-view/' + course?.slug || course?.id);
  //     return false;
  //   }
  //   if (course?.price_plan !== 'free' && !is_enrolled && !!currentUser) {
  //     const reqData = {
  //       item_id: course?.id,
  //       item_type: 'course',
  //     };
  //     cartAdd({
  //       reqData,
  //       onSuc: (res) => {
  //         // // console.log('cartAdd  res', res);
  //       },
  //     });
  //     return false;
  //   }
  //   if (
  //     (!course?.price || course?.price_plan === 'free') &&
  //     !is_enrolled &&
  //     !!currentUser
  //   ) {
  //     if (currentUser?.isVerified) {
  //       const reqData = {
  //         course_id: course?.id,
  //       };
  //       enrollFree({ reqData });
  //     } else {
  //       message.error('Your email address has not been verified', 5);
  //     }
  //     return false;
  //   }
  //   navigate('/sign-in');
  // };

  // if (course?.type === 'liveClass' && course?.id === 5) {
  //   // console.log('CardHeader  course', course);
  // }
  const handleRadioChange = (e, id) => {
    console.log(e.target.checked, id, 'dfverg');

    if (e.target.checked) {
      setSelectedBundle(id);
    }
  };
  return (
    <div className={CardHeaderStyles}>
      <Link to={'/course-view/' + course?.slug || course?.id}>
        <Image
          className="course-image"
          src={
            course?.thumbnailurl ||
            'https://img-c.udemycdn.com/course/240x135/4427730_5388.jpg'
          }
          fallback={
            'https://img-c.udemycdn.com/course/240x135/4427730_5388.jpg'
          }
          preview={false}
          alt={course?.title}
        />
      </Link>

      {course?.type === 'liveClass' && (
        <div className="float-box live">
          <HappeningNow /> <span>Live</span>
        </div>
      )}
      {course?.type === 'liveClass' && (
        <div className="float-box booked">
          {course?.totalEnrolled
            ? getPercentage(course?.max_attends || 0, course?.totalEnrolled)
            : 0}
          % Booked
        </div>
      )}
      <div className="rest-btns-wrapper">
        {course?.inCart ? (
          <Button
            type="primary"
            className="action-btn"
            style={{ background: '#7e59d1' }}
            onClick={() => navigate('/cart')}
          >
            view cart
          </Button>
        ) : (
          <Button
            type="primary "
            loading={cartAddLod || enrollFreeLod}
            onClick={handleAction}
            className="action-btn"
          >
            {actionBtnTex}
          </Button>
        )}
        {course?.type === 'liveClass' && dateStatus === 'comingSoon' && (
          <div className="time-counter-wrapper">
            <CountdownTimer targetDate={course?.start_time} />
          </div>
        )}
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
          myCourse={course}
          handleBundleId={handleRadioChange}
        />
        <Row justify="space-between" className="pt-4 pb-5">
          <Col className="cant-finde-bundle">
            Can't find a bundle you were looking for?
          </Col>
          <Col
            onClick={() => {
              setOpenBundleModal(false);
              setOpenReqBunModal(course?.id);
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
            loading={cartAddLod && clickedBtn === 1}
            type="primary"
            onClick={() => {
              setClickedBtn(1);
              const reqData = {
                item_id: selectedBundle,
                item_type: 'bundle',
              };
              cartAdd({
                reqData,
                onSuc: (res) => {},
              });
            }}
          >
            Add To cart
          </Button>
        </Row>
        <Row className="pt-4" justify="center">
          <Button
            disabled={!selectedBundle}
            loading={cartAddLod && clickedBtn === 2}
            className="add-to-cart-bundle"
            onClick={() => {
              setClickedBtn(2);

              const reqData = {
                item_id: selectedBundle,
                item_type: 'bundle',
              };
              cartAdd({
                reqData,
                onSuc: (res) => {},
              });
              navigate('/cart');
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
        <RequestBundle />
      </Modal>
    </div>
  );
}

export default CardHeader;
