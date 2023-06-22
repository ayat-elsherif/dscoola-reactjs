import React, { useEffect, useState } from 'react';
import { Button, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
// import WriteReview from '../../../helpers/review/WriteReview';
// import ShowReviews from '../../../helpers/review/ShowReviews';
import useApi from 'Hooks/network/useApi';
import WriteReview from 'helpers/review/WriteReview';
import ShowReviews from 'helpers/review/ShowReviews';
import { RatingFeedback } from 'helpers/RatingFeedback';
import Reviewings from 'pages/courses/courseView/Reviewings';

const Feedback = ({ slug, isLoading, webinar, refetch }) => {
  const myCourse = useSelector((state) => state.singleCourse?.singleCourse);
  const { currentUser } = useSelector((state) => state?.user);

  const [addReviewToggel, setaddREviewToggel] = useState(false);
  const dispatch = useDispatch();
  const [increaseBy, setIncreaseBy] = useState(3);
  const [showMore, setShowMore] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  const api = useApi();

  const allReviews = myCourse?.course?.reviews;
  //   const isEnrolled = myCourse?.course?.isEnrolled?.is_enrolled;
  let initialReviewArr = myCourse?.course?.reviews?.slice(0, increaseBy);

  const allReviewsArr = initialReviewArr?.map((item, index) => {
    const reviewObj = {
      photoUrl: item?.user?.photo_url,
      review: item?.review,
      createdAt: item?.created_at,
      id: item?.id,
      rating: item?.rating,
      userId: item?.user_id,
      userName: item?.user?.name,
    };
    return <ShowReviews review={reviewObj} key={index} />;
  });

  const addReview = () => {
    setaddREviewToggel(!addReviewToggel);
  };

  const submitReview = (reviewObj) => {
    if (!reviewObj.rating) {
      message.error('You Must Fill All Fields');
      return;
    }
    setBtnLoading(true);

    const formData = new FormData();
    formData.append('comment', reviewObj.comment);
    formData.append('rate', reviewObj.rating);
    api
      .post(
        `webinar/rate/${webinar?.id}?comment=${reviewObj.comment}&rate=${reviewObj.rating}`,
      )
      .then(() => {
        setBtnLoading(false);
        setaddREviewToggel(!addReviewToggel);
        // refetch?.();
      })
      .catch((err) => {
        setBtnLoading(false);
        message.error('Something went wrong');
        setaddREviewToggel(!addReviewToggel);
      });
  };

  useEffect(() => {
    setIncreaseBy(showMore ? allReviews?.length : 3);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showMore]);

  console.log({ webinar });
  // console.log(webinar?.);

  if (isLoading) return;

  return (
    <section className="reviewings">
      <div className="row2">
        <div className="course-container">
          {/* {myCourse?.course?.reviews?.length > 0 && (
            <>
              <div className="reviewings-headline-headline userCard-headline">
                Reviews ({myCourse?.course?.reviews?.length})
              </div>
              <ul className="reviewings-ul">{allReviewsArr}</ul>
            </>
          )}
          {myCourse?.course?.reviews?.length > 3 && (
            <div className="reviewings-show">
              <>
                <span
                  onClick={() => setShowMore(!showMore)}
                  className="reviewings-comments-show-more"
                >
                  {!showMore ? 'Show more' : 'Show less'}
                </span>
                <img src="/assets/images/icons/arrowDown.svg" alt="" />
              </>
            </div>
          )} */}

          <RatingFeedback showPercentage rating={webinar?.ratings} />
          <Reviewings webinar={webinar} isLoading={loading} />
          <>
            {addReviewToggel ? (
              <>
                <div className="add-review-container">
                  {/* <div className="Write-review">Write a review</div> */}
                  {/* <Rate
                      //    allowHalf
                      value={rate}
                      onChange={(e) => setRate(e)}
                      className="Write-review-rate"
                    />
                    <TextArea
                      value={textAreaVal}
                      onChange={onTextAreaValChange}
                      className="Write-review-textarea"
                      rows={6}
                    /> */}
                  <WriteReview
                    onBtnSubmit={submitReview}
                    buttonText={'Submit Review'}
                    btnLoading={btnLoading}
                    // onclick={(textAreaVal, rate) =>
                    //   mutate(slug.courseSlug, {
                    //     review: textAreaVal,
                    //     rating: rate,
                    //   })
                    // }
                  />
                </div>
              </>
            ) : (
              currentUser && (
                <Button
                  onClick={addReview}
                  className="add-review-btn"
                  type="primary"
                  block
                  style={{ color: '#fff' }}
                >
                  Write Review
                </Button>
              )
            )}
          </>
        </div>
      </div>
    </section>
  );
};

export default Feedback;
