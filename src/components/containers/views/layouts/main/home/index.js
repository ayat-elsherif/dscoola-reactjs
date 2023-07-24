import { css } from '@emotion/css';
import useHomeData from 'api-hooks/home/useHomeData';
import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import BecomeAnInsturctor from './BecomeAnInsturctor/BecomeAnInsturctor';
// import Features from './features/';
import HeroSection from './herosection/HeroSection';
import LetsStartLearning from './LetsStartLearning/LetsStartLearning';
import LiveSession from './liveSession/liveSession';
import OneOnOneLearning from './OneOnOneLearning/OneOnOneLearning';
import TopCategories from './topCategories/TopCategories';
import TopCourses from './topCourses/TopCourses';
import TopViewed from './topViewed/TopViewed';
import YallaOnlineFull from './YallaOnlineSection/YallaOnlineFull';
import ZoomMeetingHome from './zoomMeetingHome/zoomMeetingHome';
import Categories from 'components/mobileView/categories/Categories';
import useScreens from 'Hooks/ui/useScreens';

function Home() {
  const HomeStyles = css``;
  const topCoursesRef = useRef(null);
  const { homeData, homeDataLod } = useHomeData();
  const { currentUser } = useSelector((state) => state?.user);
  const { isLg } = useScreens();

  const topViewedData = {
    mostPopular: homeData?.popular_courses,
    beginner: homeData?.beginner_courses,
    intermediate: homeData?.intermediate_courses,
    advanced: homeData?.advanced_courses,
  };

  return (
    <div className={HomeStyles}>
      <HeroSection topCoursesEl={topCoursesRef.current} /> {/* static data */}
      <div className="container">
        {/* <Features data={homeData?.featured_courses} loading={homeDataLod} /> */}
        {currentUser && currentUser?.role_id === 3 && <LetsStartLearning />}
        {isLg ? (
          <TopCategories
            data={homeData?.root_categories}
            loading={homeDataLod}
          />
        ) : (
          <Categories data={homeData?.root_categories} loading={homeDataLod} />
        )}
        <TopCourses
          ref={topCoursesRef}
          data={homeData?.top_rated_courses}
          loading={homeDataLod}
        />
        <ZoomMeetingHome
          data={homeData?.latest_webinars}
          loading={homeDataLod}
        />
        <TopViewed data={topViewedData} loading={homeDataLod} />
        <YallaOnlineFull /> {/* static data */}
        <LiveSession
          data={homeData?.live_session_courses}
          loading={homeDataLod}
        />
        <OneOnOneLearning />
      </div>
      <BecomeAnInsturctor />
    </div>
  );
}

export default Home;
