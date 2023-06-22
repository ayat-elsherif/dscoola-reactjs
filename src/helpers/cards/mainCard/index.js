import React, { useEffect, useState } from 'react';
import '../cards.scss';
import { Link, useParams } from 'react-router-dom';
import MainButton from '../../Buttons/MainButton';
import { Card, Skeleton } from 'antd';
import { ActiveHIeartIcon, HeartIcon } from '../../../assets/svg';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

import {
  useAddToMyWishlist,
  useRemoveFromMyWishlist,
} from '../../../pages/dashboard/myWishlist/hooks/useWishList';
import { useQueryClient } from '@tanstack/react-query';
import fetch from '../../../auth/AuthInterceptor';
import { useDispatch } from 'react-redux';
import { protectAxios } from '../../../apis/coursesAPI';
import {
  singleCourse,
  fetchStart as fetchStartSingleCourse,
} from '../../../features/singleCourse/singleCourse';

function MainCard({
  courseImg,
  imgAlt,
  slider,
  liveIcon,
  counter,
  addSmlButton,
  onImgTime,
  btnTxt,
  instructorPage,
  instructorName,
  favorite,
  title,
  coursePrice,
  discription,
  courseLevel,
  priceAfter,
  priceBefore,
  actionButton,
  coursePath,
  gift,
  children,
  addToCard,
  isWishlist,
  cssClass,
}) {
  //  const authIsLoading = localStorage.getItem("authIsLoading")

  const [heart, setHeart] = useState('');
  const params = useParams();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  // const[isWishlisted,setIsWishlist]=useState(false)
  const addToMyWishList = (id) => {
    mutate(id);
  };

  // const fetchCourseDetails = async (slug) => {
  //   dispatch(fetchStartSingleCourse());
  //   const response = await protectAxios.get(
  //     `lecture/course/${slug}?includes=author,reviews,author.reviews`
  //   );
  //   console.log(response.data.data, "response.data.data");
  //   dispatch(singleCourse(response.data.data));
  // };

  const handleRemoveFromMyWishList = (id) => {
    removeFromWishlist(id);
  };
  const onSuccsses = (data) => {
    setHeart('active');
    queryClient.invalidateQueries([`my-wishlist`]);
  };
  const onFail = (data) => {};
  const onRemoveSuccsses = (data) => {
    setHeart('inactive');
    queryClient.invalidateQueries([`my-wishlist`]);
  };
  const onRemoveFail = (data) => {};

  const { mutate, isLoading } = useAddToMyWishlist(onSuccsses, onFail);
  const { mutate: removeFromWishlist, isLoading: removeIsLoading } =
    useRemoveFromMyWishlist(onRemoveSuccsses, onRemoveFail);
  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 20,
        color: '#7e59d1',
      }}
      spin
    />
  );

  // return '';

  return (
    <Card
      className={`mainCard ${cssClass}`}
      // cover={}
    >
      <div className="card-img">
        <Link
          to={coursePath}
          // onClick={() => {
          //   fetchCourseDetails(params.courseSlug);
          // }}
        >
          <img
            variant="top"
            data-src={
              courseImg
                ? courseImg
                : 'https://img-c.udemycdn.com/course/240x135/4427730_5388.jpg'
            }
            src={
              courseImg
                ? courseImg
                : 'https://img-c.udemycdn.com/course/240x135/4427730_5388.jpg'
            }
            alt={imgAlt}
            className={slider ? 'swiper-lazy' : ''}
          />
        </Link>
        <div>
          {liveIcon ? liveIcon : ''}
          {counter ? counter : ''}
        </div>
        {addSmlButton ? (
          addToCard ? (
            <span className="add-to-cart-btn" onClick={addToCard}>
              {btnTxt}
            </span>
          ) : (
            <Link
              className="add-to-cart-btn"
              to={coursePath}
              // onClick={addToCard}
            >
              {btnTxt}
            </Link>
          )
        ) : (
          ''
        )}
      </div>

      {slider ? (
        <div className="swiper-lazy-preloader scoola-swiper">
          <Skeleton
            active
            avatar
            paragraph={{ rows: 2 }}
            style={{ padding: '1rem' }}
          />
        </div>
      ) : (
        ''
      )}

      <div className="card-course-body">
        <div className="d-flex justify-content-between align-items-center">
          {onImgTime ? <div className="webinarTime">{onImgTime}</div> : ''}
          <Link to={instructorPage ? instructorPage : '/'}>
            <span className="card-instructor-name">{instructorName}</span>
          </Link>
          {favorite ? (
            isLoading || removeIsLoading ? (
              <Spin indicator={antIcon} />
            ) : (
              <span className="card-favourite-button">
                {!isWishlist ? (
                  <>
                    {heart == '' ? (
                      <HeartIcon onClick={() => addToMyWishList(favorite)} />
                    ) : (
                      <>
                        {heart == 'inactive' ? (
                          <HeartIcon
                            onClick={() => addToMyWishList(favorite)}
                          />
                        ) : (
                          <ActiveHIeartIcon
                            onClick={() => handleRemoveFromMyWishList(favorite)}
                          />
                        )}
                      </>
                    )}
                  </>
                ) : (
                  <>
                    {' '}
                    {heart == '' ? (
                      <ActiveHIeartIcon
                        onClick={() => handleRemoveFromMyWishList(favorite)}
                      />
                    ) : (
                      <>
                        {' '}
                        {heart == 'inactive' ? (
                          <HeartIcon
                            onClick={() => addToMyWishList(favorite)}
                          />
                        ) : (
                          <ActiveHIeartIcon
                            onClick={() => handleRemoveFromMyWishList(favorite)}
                          />
                        )}
                      </>
                    )}
                  </>
                )}
              </span>
            )
          ) : (
            ''
          )}
        </div>
        {title}
        <div className="card-course-text">
          {children}
          {courseLevel}
        </div>
        <div className="d-flex justify-content-between align-items-center">
          {priceBefore ? (
            <div>
              {priceAfter}
              {priceBefore}
            </div>
          ) : (
            ''
          )}
          {coursePrice}

          {actionButton ? (
            <>
              <Link to={coursePath} style={{}}>
                <MainButton
                  text="join meeting"
                  cssStyle={{
                    fontSize: '14px',
                    textTransform: 'capitalize',
                    fontWeight: '300',
                    display: 'block',
                    width: '100%',
                  }}
                />
              </Link>
            </>
          ) : (
            ''
          )}

          {gift ? gift : ''}
        </div>
      </div>
    </Card>
  );
}
export default MainCard;
