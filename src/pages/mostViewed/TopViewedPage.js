import React, { useEffect, useState } from 'react';
import BreadCrumbs from '../../helpers/breadCrumbs/BreadCrumbs';
import OnTopViewedLoad from '../../helpers/tabs/UsingUseEffect';
import { useSelector, useDispatch } from 'react-redux';
import { Pagination, Skeleton } from 'antd';
import CourseCard from '../../helpers/cards/courseCard/courseCard';
import SortBy from '../../helpers/formControls/SortBy';
import SideFilter from '../../helpers/sideFilter/SideFilter';
import coursesAPI, { protectAxios } from '../../apis/coursesAPI';
import { getFilterResult } from '../../features/filter/filterSlice';
import { levelsList } from '../../apis/levelsList';
import { useParams } from 'react-router-dom';
import LiveSessionCard from '../../helpers/cards/liveSessionCard';
import {
  getAllMostViewed,
  fetchStart,
  getTotalNum,
} from '../../features/mostViewed/alllMostViewedSlice';
import SimplePagination from '../../helpers/pagination/SimplePagination';
function TopViewedPage() {
  const Params = useParams();
  // console.log(Params, "params in topViewed");

  const accesstoken = localStorage.getItem('access_token');

  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchCourses = async () => {
      if (accesstoken) {
        const response = await coursesAPI
          .get('/courses/auth/filter?perpage=12', {
            headers: { Authorization: `bearer ${accesstoken}` },
          })
          .catch((err) => console.log('err', err));
        // console.log("response top courses:", response.data.data.courses.data);
        dispatch(getAllMostViewed(response.data.data));
      } else {
        const response = await coursesAPI
          .get('/courses/filter?perpage=12')
          .catch((err) => console.log('err', err));
        // console.log("response top courses:", response.data.data.courses.data);
        dispatch(getAllMostViewed(response.data.data));
      }
    };
    fetchCourses();
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      if (accesstoken) {
        const response = await protectAxios
          .get('/courses/auth/filter?perpage=100000', {
            headers: { Authorization: `bearer ${accesstoken}` },
          })
          .catch((err) => console.log('err', err));
        // console.log("response top courses:", response.data.data.courses.data);
        dispatch(getFilterResult(response.data.data));
        dispatch(getTotalNum(response.data.total));
      } else {
        const response = await protectAxios
          .get('/courses/filter?perpage=100000')
          .catch((err) => console.log('err', err));
        // console.log("response top courses:", response.data.data.courses.data);
        dispatch(getFilterResult(response.data.data));
        dispatch(getTotalNum(response.data.total));
      }
    };
    fetchCourses();
  }, []);
  const allCourses = useSelector((state) => state.allMostViewed.allMostViewed);
  const loading = useSelector((state) => state.allMostViewed.loading);
  let coursesNum = useSelector((state) => state.allMostViewed.totalNum);

  const allMostViewedCourses = useSelector(
    (state) => state.filterResult.filterResult,
  );
  let coursesList;
  if (allCourses) {
    coursesList = allCourses.map((item, i) => {
      // console.log(coursesNum, item, "itm and coursesNum");
      // coursesNum++;
      if (item.type == 'mixed' || item.type == 'recorded') {
        return (
          <div className="col-xl-4 col-lg-6" key={i}>
            <CourseCard
              course={item}
              levels={levelsList}
              sliderToggle={false}
              isWishlist={item.isWishlist}
            />
          </div>
        );
      } else if (item.type == 'liveClass') {
        return (
          <div className="col-xl-4 col-lg-6" key={i}>
            <LiveSessionCard
              course={item}
              levels={levelsList}
              sliderToggle={false}
              isWishlist={item.isWishlist}
            />
          </div>
        );
      }
    });
  } else {
    coursesList = 'sorry no courses';
  }

  return (
    <div className="innerPage">
      <BreadCrumbs
        param="Most Viewed By Students"
        title="Most Viewed By Students"
        txt=""
      />

      <section className="retrieveCoursesPages">
        <div className="container">
          <div className="d-flex justify-content-between align-items-baseline mb-4">
            <h5>{coursesNum} results Found</h5>
            {/* <h5> All Viewed Courses</h5> */}
            <SortBy
              sortOptions={[
                { value: 'relevance', label: 'Relevance' },
                { value: 'newest', label: 'Newest' },
              ]}
              mainPath={`/topviewed`}
              filterBy={''}
              dispatchedAction={getAllMostViewed}
              fetchStart={fetchStart}
              // getTotalNum={getTotalNum}
            />
          </div>

          <div className="row">
            <div className="col-xl-3 col-lg-4">
              <SideFilter
                mainPath="/topviewed"
                courses={allMostViewedCourses}
                filterBy={''}
                dispatchedAction={getAllMostViewed}
                fetchStart={fetchStart}
                getTotalNum={getTotalNum}
              />
            </div>
            <div className="col-xl-9 col-lg-8">
              {loading ? (
                <div style={{ marginBottom: '4rem' }}>
                  <Skeleton active />
                  <Skeleton active />
                  <Skeleton active />
                </div>
              ) : coursesList.length > 0 ? (
                <div className="row">{coursesList}</div>
              ) : (
                <div style={{ marginBottom: '4rem' }}>No Courses..</div>
              )}
              {coursesNum > 12 ? (
                <SimplePagination
                  coursesNum={coursesNum}
                  mainPath={'/topviewed'}
                  dispatchedAction={getAllMostViewed}
                  fetchStart={fetchStart}
                />
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default TopViewedPage;
