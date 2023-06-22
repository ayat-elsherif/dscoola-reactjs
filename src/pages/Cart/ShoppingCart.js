import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import BreadCrumbsMultiple from '../../helpers/breadCrumbs/BreadCrumbsMultiple';
import MainButton from '../../helpers/Buttons/MainButton';
import { levelsList } from '../../apis/levelsList';
import CoursesService from '../../services/CoursesServices';
import { useQuery } from '@tanstack/react-query';

import MainCard from '../../helpers/cards/mainCard';
import { noItemsInCart } from '../../SVGs';
import CartItems from './cartWithItems/CartItems';
import OrderSummary from './cartWithItems/OrderSummary';
import { topCourses } from '../../features/courses/coursesSlice';
import { SwiperSlide } from 'swiper/react';
// import CourseCard from '../../helpers/cards/courseCard/courseCard';
import LiveSessionCard from '../../helpers/cards/liveSessionCard';
import MultipleSlider from '../../helpers/carousels/multipleSlider/MultipleSlider';
import useCartInfo from 'api-hooks/cart/useCartInfo';
import CourseCard from 'helpers/cards/courseCard/courseCard';
import CoursesSliderWrapper from 'components/CoursesSliderWrapper/CoursesSliderWrapper';
// import MultipleSlider from "../../../../../../../helpers/carousels/multipleSlider/MultipleSlider";

function ShoppingCart() {
  // const cartInfo = useSelector((state) => state.cartList.cartList);
  const { cartInfo, cartInfoLod } = useCartInfo();

  const accesstoken = localStorage.getItem('access_token');
  let courseList = [];
  const dispatch = useDispatch();

  const getAuthTopCourses = () => {
    return CoursesService.getAuthTopCourses();
  };
  const getTopCourses = () => {
    return CoursesService.getTopCourses();
  };
  const onSuccess = (data) => {
    console.log(data, 'authDAta.data');
    dispatch(topCourses(data?.data));
  };
  const onAuthSuccess = (authDAta) => {
    console.log(authDAta.data, 'authDAta.data');
    dispatch(topCourses(authDAta?.data));
  };
  const onError = () => {};
  const onAuthError = () => {};
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  const {
    isLoading: authIsLoading,
    isFetching: authIsfetching,
    data: authDAta,
  } = useQuery([`auth-top-courses`], () => getAuthTopCourses(), {
    onSuccess: onAuthSuccess,
    onError: onAuthError,
    enabled: !!accesstoken,
  });

  const { isLoading, data } = useQuery([`top-courses`], () => getTopCourses(), {
    onSuccess: onSuccess,
    onError: onError,
    enabled: !!!accesstoken,
  });

  const courses = useSelector((state) => state.courses.topCourses);
  const levels = levelsList;

  if (courses) {
    courseList = courses?.map((item, i) => {
      // console.log(item, "item in top courses");
      if (item.type == 'mixed' || item.type == 'recorded') {
        return (
          <SwiperSlide key={i}>
            <li className="topCourses__item course__item">
              <div>
                <CourseCard course={item} levels={levels} sliderToggle={true} />
              </div>
            </li>
          </SwiperSlide>
        );
      } else if (item.type == 'liveClass') {
        return (
          <SwiperSlide key={i}>
            <li className="topCourses__item">
              <div>
                <LiveSessionCard
                  course={item}
                  levels={levels}
                  sliderToggle={true}
                  isWishlist={item.isWishlist}
                />
              </div>
            </li>
          </SwiperSlide>
        );
      }
    });
  }

  return (
    <div className="shoppingCart">
      <BreadCrumbsMultiple
        params={[{ label: 'Shopping Cart' }]}
        title="shopping cart"
      />

      <div className="container overflow-visible">
        <div className="shopping-cart-Items">
          {cartInfo?.items?.length > 0 ? (
            <div className="checkout-layout-wrapper">
              <div className="cartItems">
                <CartItems loading={cartInfoLod} list={cartInfo?.items} />
              </div>
              <div className="order-summary">
                <OrderSummary cartInfo={cartInfo} isShopingCard />
              </div>
            </div>
          ) : (
            <div className="noItemsInCart">
              <div className="noItems-svg">{noItemsInCart}</div>
              <p>Your cart is empty. Keep shopping to find a course!</p>
              <Link to="/">
                <MainButton
                  text="shop now"
                  cssStyle={{
                    textTransform: 'capitalize',
                    padding: '7px 35px',
                  }}
                />
              </Link>
            </div>
          )}
        </div>
        <div className="recommended-courses-wrapper">
          <h5 className="recommended-courses__title">Recommended Courses</h5>
          <CoursesSliderWrapper courseList={courses} loading={cartInfoLod} />

          {/* <ul className="topCourses__list course__list">
            <MultipleSlider
              cardsLarge={4}
              cardsMedium={3}
              cardsSmall={2}
              cardsXSmall={1}
            >
              {courseList}
            </MultipleSlider>
          </ul> */}
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;
