import React, { useState } from 'react';
import './review.scss';
import { Button } from 'antd';
import Rating from 'components/Rating/Rating';
function WriteReview({ buttonText, rowsNo, onBtnSubmit, btnLoading }) {
  const [ratingValue, setRatingValue] = useState(null);
  const [textAreaVal, setTextAreaVal] = useState();
  const onSubmitBtn = () => {
    return onBtnSubmit({ rating: ratingValue, comment: textAreaVal });
  };
  return (
    <div className="writeReview">
      <h3>Write a Review</h3>
      <form>
        <div className="form-group">
          {/* <Rating
            name="no-value"
            value={ratingValue}
            className="ratingStars"
            onChange={(e) => {
              setRatingValue(e.target.value);
              // console.log(e.target.value);
            }}
            size="large"
            /> */}
          <Rating
            defaultValue={ratingValue}
            showAvg={false}
            size="large"
            onChange={(newValue) => {
              setRatingValue(newValue);
            }}
          />
        </div>
        <div className="form-group">
          <textarea
            value={textAreaVal}
            onChange={(e) => setTextAreaVal(e.target.value)}
            className="form-control"
            rows={rowsNo ? rowsNo : 5}
            placeholder="write your review"
          ></textarea>
        </div>
        <Button
          type="primary"
          onClick={(e) => {
            e.preventDefault();
            onSubmitBtn();
          }}
          loading={btnLoading}
          style={{
            marginBottom: '3.5rem',
            textTransfor: 'capitalize',
            padding: '8px 30px',
          }}
        >
          {buttonText ? buttonText : 'submit Review'}
        </Button>
        {/* <MainButton
          text={buttonText ? buttonText : 'submit Review'}
          cssStyle={{
            marginBottom: '3.5rem',
            textTransfor: 'capitalize',
            padding: '8px 30px',
          }}
          type="submit"
          onclick={(e) => {
            e.preventDefault();
            onSubmitBtn();
          }}
        /> */}
      </form>
    </div>
  );
}

export default WriteReview;
