import { Col, Row } from 'antd';
import useWishlistAdd from 'api-hooks/wishlist/useWishlistAdd';
import useWishlistRemove from 'api-hooks/wishlist/useWishlistRemove';
import { CalenderIcon } from 'assets/svg';
import FavoriteIcon from 'components/FavoriteIcon/FavoriteIcon';
import Rating from 'components/Rating/Rating';
import BtnGiftSend from 'components/tiny/BtnGiftSend';
import levelsList from 'data/levels-list.json';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getDurationHHmm, limitedText } from 'utils';
import CardHeader from './pices/CardHeader';
import { CourseCardStyles } from './style';

function CourseCard({ course, callback }) {
  // console.log('CourseCard  course', course);
  const { currentUser } = useSelector((state) => state?.user);

  const level = levelsList?.find((el) => {
    return el.id === course?.level;
  });
  const [isWishListEcho, setisWishListEcho] = useState(course?.isWishlist);

  const { wishlistAdd, wishlistAddLod } = useWishlistAdd();
  const { wishlistRemove, wishlistRemoveLod } = useWishlistRemove();

  const handleCourseFav = () => {
    if (course?.isWishlist) {
      const reqData = {
        id: course?.id,
      };
      wishlistRemove({
        reqData,
        onSuc: (res) => {
          setisWishListEcho(false);
          callback && callback();
        },
      });
    } else {
      const reqData = new FormData();
      reqData.append('course_id', course?.id);
      wishlistAdd({
        reqData,
        onSuc: (res) => {
          setisWishListEcho(true);
        },
      });
    }
  };

  return (
    <div className={CourseCardStyles}>
      <Row gutter={[0, 6]}>
        <Col span={24}>
          <CardHeader course={course} />
        </Col>
        <Col span={24}>
          <div className="card-body">
            <Row gutter={[0, 6]}>
              <Col span={24}>
                <Row justify="space-between">
                  <Col>
                    <Link
                      to={`/instructors/${course?.author?.id}`}
                      className="author-name"
                    >
                      {course?.author?.name || course?.author_name || 'Unknown'}
                    </Link>
                  </Col>
                  {!!currentUser && !course?.isEnrolled?.is_enrolled && (
                    <Col>
                      <FavoriteIcon
                        active={isWishListEcho}
                        onClick={handleCourseFav}
                        loading={wishlistAddLod || wishlistRemoveLod}
                      />
                    </Col>
                  )}
                </Row>
              </Col>
              <Col span={24}>
                <Link
                  className="course-title"
                  to={`/course-view/${course?.slug || course?.id}`}
                >
                  {limitedText(course?.title, 40)}
                </Link>
              </Col>
              <Col span={24}>
                <div className="course-desc">{course?.short_description}</div>
              </Col>
              <Col span={24}>
                <Row justify="space-between">
                  <Col>
                    <div className="leavel-wrapper">
                      <img src={level?.icon} alt={level?.title} />
                      <span>{level?.title}</span>
                    </div>
                  </Col>
                  <Col>
                    <div className="course-duration-wrapper">
                      <CalenderIcon width={13} />
                      {getDurationHHmm(course?.total_duration)}
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col span={24}>
                <div className="course-rating-wrapper">
                  <Rating
                    defaultValue={course?.rating_avg}
                    count={course?.rating_count}
                    disabled
                  />
                </div>
              </Col>
              <Col span={24}>
                <Row align="middle" justify="space-between">
                  <Col>
                    <div className="price-wrapper">
                      {course?.price_plan === 'free' ? (
                        <span className="price">Free</span>
                      ) : course?.sale_price ? (
                        <>
                          <span className="price">{course?.sale_price}EGP</span>
                          <span className="old-price">{course?.price}EGP</span>
                        </>
                      ) : (
                        <span className="price">{course?.price}EGP</span>
                      )}
                    </div>
                  </Col>
                  <Col>
                    <BtnGiftSend />
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default CourseCard;
