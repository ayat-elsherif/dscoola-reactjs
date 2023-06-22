import React, { useEffect } from 'react';
import BreadCrumbs from '../../helpers/breadCrumbs/BreadCrumbs';
import { useDispatch, useSelector } from 'react-redux';
import CourseCard from '../../helpers/cards/courseCard/courseCard';
import SortBy from '../../helpers/formControls/SortBy';
import SideFilter from '../../helpers/sideFilter/SideFilter';
import coursesAPI, { protectAxios } from '../../apis/coursesAPI';
import { Pagination, Skeleton } from 'antd';
import { getFilterResult } from '../../features/filter/filterSlice';
import { levelsList } from '../../apis/levelsList';
import LiveSessionCard from '../../helpers/cards/liveSessionCard';
import {
  getAllTopCourses,
  fetchStart,
} from '../../features/topCourses/allTopCoursesSlice';
import { useState } from 'react';

function TopCoursesPage() {
  const dispatch = useDispatch();
  const [current, setCurrent] = useState(1);
  const accesstoken = localStorage.getItem('access_token');

  const onChangePage = async (page) => {
    dispatch(fetchStart());

    console.log(page);
    setCurrent(page);
    if (accesstoken) {
      const response = await protectAxios
        .get(`/courses/auth/filter?page=${page}`)
        .catch((err) => console.log('err', err));
      dispatch(getAllTopCourses(response.data.data));
    } else {
      const response = await protectAxios
        .get(`/courses/filter?page=${page}`)
        .catch((err) => console.log('err', err));
      dispatch(getAllTopCourses(response.data.data));
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchCourses = async () => {
      if (accesstoken) {
        const response = await coursesAPI
          .get('/courses/auth/filter?perpage=12&rating[]=4', {
            headers: { Authorization: `bearer ${accesstoken}` },
          })
          .catch((err) => console.log('err', err));
        // console.log("response top courses:", response.data.data.courses.data);
        dispatch(getAllTopCourses(response.data.data));
      } else {
        const response = await coursesAPI

          .get('/courses/filter?perpage=12&rating[]=4')
          .catch((err) => console.log('err', err));
        // console.log("response top courses:", response.data.data.courses.data);
        dispatch(getAllTopCourses(response.data.data));
      }
    };
    fetchCourses();
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      if (accesstoken) {
        const response = await coursesAPI
          .get('/courses/auth/filter?perpage=100000&rating[]=4', {
            headers: { Authorization: `bearer ${accesstoken}` },
          })
          .catch((err) => console.log('err', err));
        // console.log("response top courses:", response.data.data.courses.data);
        dispatch(getFilterResult(response.data.data));
      } else {
        const response = await coursesAPI
          .get('/courses/filter?perpage=100000&rating[]=4')
          .catch((err) => console.log('err', err));
        // console.log("response top courses:", response.data.data.courses.data);
        dispatch(getFilterResult(response.data.data));
      }
    };
    fetchCourses();
  }, []);
  const filteredCourses = useSelector(
    (state) => state.allTopCourses.allTopCourses,
  );
  const loading = useSelector((state) => state.allTopCourses.loading);
  const allTopCourses = useSelector((state) => state.filterResult.filterResult);
  const levels = levelsList;
  let coursesNum = allTopCourses.length;
  console.log(allTopCourses.length, 'allTopCourses.length');
  let coursesList;
  if (filteredCourses) {
    coursesList = filteredCourses.map((item, i) => {
      if (item.type == 'mixed' || item.type == 'recorded') {
        console.log(item.isWishlist, 'rvrrtvt');
        return (
          <div className="px-3 col-xl-4 col-lg-6" key={i}>
            <CourseCard
              course={item}
              levels={levels}
              sliderToggle={false}
              isWishlist={item.isWishlist}
            />
          </div>
        );
      } else if (item.type == 'liveClass') {
        {
          return (
            <div className="col-xl-4 col-lg-6" key={i}>
              <LiveSessionCard
                course={item}
                levels={levels}
                isWishlist={item.isWishlist}
              />
            </div>
          );
        }
      }
      return (
        <div className="col-xl-4 col-lg-6" key={i}>
          <CourseCard
            course={item}
            levels={levels}
            sliderToggle={false}
            isWishlist={item.isWishlist}
          />
        </div>
      );
    });
  } else {
    coursesList = 'no courses sorry';
  }

  return (
    <div className="innerPage">
      <BreadCrumbs
        param="Browse Our Top Courses"
        title="Browse Our Top Courses"
        txt=""
      />

      <section className="retrieveCoursesPages">
        <div className="container">
          <div className="d-flex justify-content-between align-items-baseline mb-4">
            {/* <h5>{coursesNum} results Found</h5> */}
            <h5>All Courses</h5>
            <SortBy
              sortOptions={[
                { value: 'relevance', label: 'Relevance' },
                { value: 'newest', label: 'Newest' },
              ]}
              mainPath="/topcourses"
              filterBy={'rating[]=4'}
              courses={allTopCourses}
              dispatchedAction={getAllTopCourses}
              fetchStart={fetchStart}
            />
          </div>

          <div className="row">
            <div className="col-xl-3 col-lg-4">
              <SideFilter
                mainPath="/topcourses"
                filterBy={'rating[]=4'}
                courses={allTopCourses}
                dispatchedAction={getAllTopCourses}
                fetchStart={fetchStart}
              />
            </div>
            <div className="col-xl-9 col-lg-8">
              <div className="row">
                {loading ? (
                  <div style={{ marginBottom: '4rem' }}>
                    <Skeleton active />
                    <Skeleton active />
                    <Skeleton active />
                  </div>
                ) : loading ? (
                  <div style={{ marginBottom: '4rem' }}>
                    <Skeleton active />
                    <Skeleton active />
                    <Skeleton active />
                  </div>
                ) : coursesList.length > 0 ? (
                  coursesList
                ) : (
                  <div style={{ marginBottom: '4rem' }}>
                    <Skeleton active />
                    <Skeleton active />
                    <Skeleton active />
                  </div>
                )}
                {coursesNum > 12 ? (
                  <div className="pagination">
                    <Pagination
                      current={current}
                      defaultCurrent={1}
                      onChange={onChangePage}
                      total={coursesNum}
                      defaultPageSize={15}
                    />
                  </div>
                ) : (
                  ''
                )}{' '}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default TopCoursesPage;
