import { combineReducers } from '@reduxjs/toolkit';
import coursesSlice from './courses/coursesSlice';
import liveSessionSlice from './courses/liveSessionSlice';
import mostViewedSilce from './courses/mostViewedSilce';
import zoomMeetingSlice from './courses/zoomMeetingSlice';
import categoriesSlice from './courses/categoriesSlice';
import singleCourseSlice from './singleCourse/singleCourse';
import signUpSlice from './auth/sign-up';
import forgetPassSlice from './auth/forgetPass';
import resetPassSlice from './auth/resetPass';
import categoriesSliceHome from './categories/categoriesSlice';
import levelsSlice from './levels/levelsSlice';
import filterSlice from './filter/filterSlice';
import addToCartSlice from './courses/addToCart';
import courseContentStateSlice from './courseContent/courseContentState';
/*Dashboard*/
import themeReducer from './theme/ThemeSlice';
import cartListSlice from './courses/cartList';
import deleteFromCartSlice from './courses/deleteFromCart';
import quizSlice from './quizes/quiz';
import searchSlice from './filter/searchSlice';
import singleLiveCourseSlice from './singleLiveCourse/singleLiveCourseSlice';
import allYallaOnlineSlice from './yallaonline/allYallaOnline';
import singleGroup from './yallaonline/singleGroup';
import myCoursesSlice from './myCourses/myCoursesSlice';
import paymentSlice from './payment/payment';
import allCatgoryCoursesSlice from './categories/allCategoryCourses';
import topCoursesSlice from './topCourses/allTopCoursesSlice';
import allMostViewedSlice from './mostViewed/alllMostViewedSlice';
import coursePreviewSlice from './coursePreview/coursePreview';
import oneOnOneSlice from './oneOnOne/oneOnOne';
import chatRoom from './chatRoom/chatRoom';
import courseContentSlice from './courseContent/courseContentSlice';
import alterFilterSlice from './filter/alterFilterSlice';
import notificationsSlice from './notifications/notificationsSlice';
import zoomSDKSlice from './zoomSDKSlice';
import courseAddPiplineSlice from './courseContent/courseAddPipline';
import userSlice from './user/user';
import { courseLectureSlice } from './coursePreview/courseLecture';
import courseContentInnerSlice from './courseContent/courseContentInner';
import currentBundleSlice from './courseContent/curentBundle';

export default combineReducers({
  user: userSlice,
  courses: coursesSlice,
  mostViewed: mostViewedSilce,
  liveSession: liveSessionSlice,
  zoomMeeting: zoomMeetingSlice,
  categories: categoriesSlice,
  singleCourse: singleCourseSlice,
  courseContentState: courseContentStateSlice,
  singleLiveCourse: singleLiveCourseSlice,
  signUp: signUpSlice,
  forgetPass: forgetPassSlice,
  resetPass: resetPassSlice,
  allLevels: levelsSlice,
  fetchCategories: categoriesSliceHome,
  theme: themeReducer,
  filterResult: filterSlice,
  alterFilterResult: alterFilterSlice,
  searchResult: searchSlice,
  cartList: cartListSlice,
  addToCartCart: addToCartSlice,
  deleteFromCart: deleteFromCartSlice,
  quiz: quizSlice,
  allYallaOnline: allYallaOnlineSlice,
  singleGroup: singleGroup,
  payment: paymentSlice,
  coursesNum: myCoursesSlice,
  allCategories: allCatgoryCoursesSlice,
  allTopCourses: topCoursesSlice,
  allMostViewed: allMostViewedSlice,
  coursePreview: coursePreviewSlice,
  courseLecture: courseLectureSlice,
  chatData: chatRoom,
  oneOnOne: oneOnOneSlice,
  courseContent: courseContentSlice,
  notifications: notificationsSlice,
  courseAddPipline: courseAddPiplineSlice,
  courseContentInner: courseContentInnerSlice,
  currentBundle: currentBundleSlice,
  zoomSDK: zoomSDKSlice,
});
