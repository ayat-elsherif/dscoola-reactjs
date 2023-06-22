import React, { useEffect, useState } from 'react';
import { Button, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { singleCourse } from '../../../features/singleCourse/singleCourse';
import WriteReview from '../../../helpers/review/WriteReview';
import ShowReviews from '../../../helpers/review/ShowReviews';
import useApi from 'Hooks/network/useApi';

const Reviewings = ({ slug, isLoading, webinar }) => {
  const myCourse = useSelector((state) => state.singleCourse?.singleCourse);
  const [addReviewToggel, setaddREviewToggel] = useState(false);
  const dispatch = useDispatch();
  const [increaseBy, setIncreaseBy] = useState(3);
  const [showMore, setShowMore] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);

  const api = useApi();

  const allReviews = myCourse?.course?.reviews;
  const isEnrolled = myCourse?.course?.isEnrolled?.is_enrolled;
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
    if (!reviewObj.comment || !reviewObj.rating) {
      message.error('You Must Fill All Fields');
      return;
    }
    setBtnLoading(true);
    api
      .post(
        webinar
          ? `webinar/rate/${webinar?.id}?comment=${reviewObj.comment}&rate=${reviewObj.rating}`
          : `my/courses/${myCourse?.course?.slug}/review?review=${reviewObj.comment}&rating=${reviewObj.rating}`,
      )
      .then(() => {
        setBtnLoading(false);
        if (webinar) {
        }
        api
          .get(
            `lecture/course/${myCourse?.course?.slug}/basic-info?includes=author,reviews,author.reviews`,
          )
          .then((res) => {
            dispatch(singleCourse(res.data));
            message.success('Review Added successfully');
            setaddREviewToggel(!addReviewToggel);
          })
          .catch((err) => {
            setaddREviewToggel(!addReviewToggel);
          });
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

  if (isLoading) return;

  return (
    <section className="reviewings">
      <div className="row2">
        <div className="course-container">
          {myCourse?.course?.reviews?.length > 0 && (
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
          )}

          {isEnrolled ? (
            <>
              {addReviewToggel ? (
                <>
                  <div className="add-review-container">
                    <WriteReview
                      onBtnSubmit={submitReview}
                      buttonText={'Submit Review'}
                      btnLoading={btnLoading}
                    />
                  </div>
                </>
              ) : (
                <Button
                  onClick={addReview}
                  className="add-review-btn"
                  type="primary"
                  block
                  style={{ color: '#fff' }}
                >
                  Write Review
                </Button>
              )}
            </>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default Reviewings;
