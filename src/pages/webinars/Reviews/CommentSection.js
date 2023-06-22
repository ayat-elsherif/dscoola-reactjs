import React, { useState, useEffect } from 'react';
import { Button, Rate, Input, Skeleton } from 'antd';
import { protectAxios } from '../../../apis/coursesAPI';
import { useDispatch, useSelector } from 'react-redux';
import { singleCourse } from '../../../features/singleCourse/singleCourse';
// import { useAddReview } from "../useReview";
import WriteReview from '../../../helpers/review/WriteReview';
import ShowReviews from '../../../helpers/review/ShowReviews';
import { toNumber } from 'lodash';
import { showSingleZoomMeeting } from '../../../features/courses/zoomMeetingSlice';
const ReviewsSection = ({ slug }) => {
  // const myCourse = useSelector((state) => state.singleCourse?.singleCourse);

  const singleZoomMeeting = useSelector(
    (state) => state.zoomMeeting.singleZoomMeeting,
  );

  console.log(singleZoomMeeting, 'singleZoomMeeting in reviewings');
  console.log(slug, 'slug in reviewing');

  const [textAreaVal, setTextAreaVal] = useState('');
  const [addReviewToggel, setaddREviewToggel] = useState(false);
  const [rate, setRate] = useState(0);
  const [loading, setLoading] = useState(false);
  const { TextArea } = Input;
  const dispatch = useDispatch();
  const [increaseBy, setIncreaseBy] = useState(3);

  const allReviews = singleZoomMeeting?.webinar?.creator?.reviews;
  const isEnrolled = true;
  //   console.log(myCourse?.course?.isEnrolled, "isEnrolled");
  console.log(
    singleZoomMeeting?.webinar?.ratings,
    'singleZoomMeeting?.webinar?.ratings',
  );

  let initialReviewArr = singleZoomMeeting?.webinar?.ratings?.slice(
    0,
    increaseBy,
  );

  const allReviewsArr = initialReviewArr?.map((item, index) => {
    const reviewObj = {
      photoUrl: item?.photo_url,
      review: item?.comment,
      createdAt: item?.created_at,
      id: item?.id,
      rating: item?.rating,
      userId: item?.user_id,
      userName: item?.name,
    };
    return <ShowReviews review={reviewObj} key={index} />;
  });
  const addReview = () => {
    setaddREviewToggel(!addReviewToggel);
  };

  const submitReview = (reviewObj) => {
    // mutate(slug.courseSlug,textAreaVal,rate)
    setLoading(true);
    console.log(reviewObj, 'reviewObj');
    protectAxios()
      .post(
        `webinar/rate/${singleZoomMeeting?.webinar?.id}?comment=${reviewObj.comment}&rate=${reviewObj.rating}`,
      )
      .then(() => {
        protectAxios()
          .get(`webinar/${slug}?includes=zoomMeetings,creator,ratings`)
          .then((res) => {
            dispatch(showSingleZoomMeeting(res.data.data));
            setLoading(false);
            setaddREviewToggel(!addReviewToggel);
          })
          .catch((err) => {
            setLoading(false);
            setaddREviewToggel(!addReviewToggel);
          });
      })
      .catch((err) => {
        setLoading(false);
        setaddREviewToggel(!addReviewToggel);
      });
  };

  const onShowMore = () => {
    setIncreaseBy(increaseBy + 3);
  };

  const reviews = [];

  return (
    <section className="reviewings">
      <div className="row2">
        <div className="course-container">
          {singleZoomMeeting?.webinar?.ratings?.length > 0 && (
            <div className="reviewings-headline-headline userCard-headline">
              Reviews {singleZoomMeeting?.webinar?.ratings?.length}
            </div>
          )}

          {/* <Scrollbars autoHide  > */}
          <ul className="reviewings-ul">{allReviewsArr}</ul>
          {/* </Scrollbars> */}

          <div className="reviewings-show">
            {increaseBy < allReviews?.length ? (
              <>
                <span
                  onClick={onShowMore}
                  className="reviewings-comments-show-more"
                >
                  Show more
                </span>{' '}
                <img src="/assets/images/icons/arrowDown.svg" alt="" />
              </>
            ) : (
              ' '
            )}
          </div>

          {isEnrolled ? (
            <>
              {addReviewToggel ? (
                <>
                  <div className="add-review-container">
                    <WriteReview
                      onBtnSubmit={submitReview}
                      buttonText={'Submit Review'}
                    />
                  </div>
                </>
              ) : (
                <Button
                  onClick={addReview}
                  className="add-review-btn"
                  type="primary"
                >
                  Write Review
                </Button>
              )}
            </>
          ) : (
            ''
          )}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
