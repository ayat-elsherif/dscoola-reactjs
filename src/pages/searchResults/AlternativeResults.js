import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import { useDispatch, useSelector } from 'react-redux';
import {
  getAllTopCourses,
  fetchStart,
} from '../../features/topCourses/allTopCoursesSlice';
import { getFilterResult } from '../../features/filter/filterSlice';
import CoursesService from '../../services/CoursesServices';
import FilterServices from '../../services/FilterServices';
import CourseCard from '../../helpers/cards/courseCard/courseCard';
import LiveSessionCard from '../../helpers/cards/liveSessionCard';
import { levelsList } from '../../apis/levelsList';
import { Result, Skeleton } from 'antd';
import SortBy from '../../helpers/formControls/SortBy';
import { useParams } from 'react-router-dom';
import SideFilter from '../../helpers/sideFilter/SideFilter';
import { protectAxios } from '../../apis/coursesAPI';
import { getAlterFilterResult } from '../../features/filter/alterFilterSlice';
import CardSkeleton from '../../components/common/CardSkeleton/CardSkeleton';
import './search.scss';
function AlternativeResults() {
  const paramTitle = useParams();

  const accesstoken = localStorage.getItem('access_token');

  const dispatch = useDispatch();

  // useEffect(() => {
  //   const fetchCourses = async () => {
  //     // dispatch(fetchStart());
  //     if (accesstoken) {
  //       const response = await protectAxios
  //         .get(`/courses/auth/filter?rating[]=4`)
  //         .catch((err) => console.log("err", err));
  //       if (response) {
  //         dispatch(getAllTopCourses(response.data.data));
  //       }
  //     } else {
  //       const response = await protectAxios
  //         .get(`/courses/filter?rating[]=4`)
  //         .catch((err) => console.log("err", err));
  //       if (response) {
  //         dispatch(getAllTopCourses(response.data.data));
  //       }
  //     }

  //     // console.log("response top courses:", response.data.data.courses.data);
  //   };
  //   fetchCourses();
  // }, [paramTitle.id]);

  // useEffect(() => {
  //   const fetchCourses = async () => {
  //     if (accesstoken) {
  //       const response = await protectAxios
  //         .get(`/courses/auth/filter?perpage=100000&rating[]=4`)
  //         .catch((err) => console.log("err", err));
  //       if (response) {
  //         dispatch(getAlterFilterResult(response.data.data));
  //       }
  //     } else {
  //       const response = await protectAxios
  //         .get(`/courses/filter?perpage=100000&rating[]=4`)
  //         .catch((err) => console.log("err", err));
  //       if (response) {
  //         dispatch(getAlterFilterResult(response.data.data));
  //       }
  //     }

  //     // console.log("response top courses:", response.data.data.courses.data);
  //   };
  //   fetchCourses();
  // }, [paramTitle.id]);

  // const getAuthTopCourses = () => {
  //   return CoursesService.getAuthTopCourses();
  // };
  const getTopCourses = () => {
    return CoursesService.getTopCourses();
  };

  const getFilterByTopRating = () => {
    return FilterServices.getFilterByTopRating();
  };

  const ontopCoursesSuccess = (authDAta) => {
    console.log(authDAta.data, 'authDAta.data');
    dispatch(getAllTopCourses(authDAta?.data));
  };
  const onError = () => {};

  const onFilterSuccess = (data) => {
    console.log(data, 'onFilterSuccess');
    dispatch(getAlterFilterResult(data?.data));
  };
  const onFilterError = () => {};

  const { isLoading, data } = useQuery([`top-courses`], () => getTopCourses(), {
    onSuccess: ontopCoursesSuccess,
    onError: onError,
    // enabled: !!!accesstoken,
  });

  const {
    isLoading: FilterIsLoading,
    isFetching: FilterIsfetching,
    data: FilterData,
  } = useQuery([`topRated-filter`], () => getFilterByTopRating(), {
    onSuccess: onFilterSuccess,
    onError: onFilterError,
  });

  const courses = useSelector((state) => state.allTopCourses.allTopCourses);
  const alterFilterResult = useSelector(
    (state) => state.alterFilterResult.alterFilterResult,
  );
  const loading = useSelector((state) => state.allTopCourses.loading);

  const levels = levelsList;
  let coursesList;
  if (courses) {
    coursesList = courses.map((item, i) => {
      if (item.type === 'mixed' || item.type === 'recorded') {
        return (
          <CourseCard course={item} levels={levels} sliderToggle={false} />
        );
      }
      if (item.type === 'liveClass') {
        return (
          <LiveSessionCard course={item} levels={levels} sliderToggle={false} />
        );
      }
    });
  } else {
    coursesList = 'no courses sorry';
  }
  // console.log(coursesList, alterFilterResult, "courses in alternative");
  return (
    <>
      <div className="d-flex justify-content-between align-items-baseline mb-4">
        <h4>All Courses</h4>
        <SortBy
          sortOptions={[
            { value: 'relevance', label: 'Relevance' },
            { value: 'newest', label: 'Newest' },
          ]}
          mainPath={`/searchresult/${paramTitle.id}`}
          courses={alterFilterResult}
          dispatchedAction={getAllTopCourses}
          fetchStart={fetchStart}
          filterBy={`rating[]=4`}
        />
      </div>

      <div className="row">
        <div className="col-xl-3 col-lg-4">
          {
            <SideFilter
              mainPath={`/searchresult/${paramTitle.id}`}
              courses={alterFilterResult}
              dispatchedAction={getAllTopCourses}
              fetchStart={fetchStart}
              filterBy={'rating[]=4'}
            />
          }
        </div>
        <div className="col-xl-9 col-lg-8">
          <section className="GetFreeCourses home-section">
            <div className="container px-0">
              {/* <div className="text-center mb-5">No Results </div> */}
              <div className="course-grid-wrapper">
                {isLoading ? (
                  <>
                    {[0, 1, 2, 3, 4, 5, 6]?.map((s) => (
                      <CardSkeleton />
                    ))}
                  </>
                ) : loading ? (
                  <>
                    <Skeleton active /> <Skeleton active />
                  </>
                ) : coursesList.length > 0 ? (
                  <>{coursesList}</>
                ) : (
                  <Result
                    status="404"
                    title="No Results..."
                    subTitle="Sorry, No courses found."
                    className="grid-full-width"
                  />
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default AlternativeResults;
