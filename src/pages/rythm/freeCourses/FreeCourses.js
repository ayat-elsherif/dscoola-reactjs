import React, { useEffect } from 'react';
import SortBy from '../../../helpers/formControls/SortBy';
import GetFreeCourses from './GetFreeCourses';
import CourseCard from '../../../helpers/cards/courseCard/courseCard';
import SideFilter from '../../../helpers/sideFilter/SideFilter';
import coursesAPI from '../../../apis/coursesAPI';
import { Skeleton } from 'antd';
import {
  fetchFreeCourses,
  fetchStart,
} from '../../../features/courses/coursesSlice';
import { useSelector, useDispatch } from 'react-redux';
import { getFilterResult } from '../../../features/filter/filterSlice';
import { levelsList } from '../../../apis/levelsList';
import LiveSessionCard from '../../../helpers/cards/liveSessionCard';
function FreeCourses() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchCourses = async () => {
      const response = await coursesAPI
        .get('/courses?perpage=12&price%5B%5D=free')
        .catch((err) => console.log('err', err));
      dispatch(fetchFreeCourses(response?.data?.data));
    };
    fetchCourses();
  }, [dispatch]);

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await coursesAPI
        .get('/courses?perpage=100000&price%5B%5D=free')
        .catch((err) => console.log('err', err));
      dispatch(getFilterResult(response?.data?.data));
    };
    fetchCourses();
  }, [dispatch]);
  const filterResult = useSelector(
    (state) => state?.filterResult?.filterResult,
  );
  const courses = useSelector((state) => state?.courses?.freeCourses);
  const loading = useSelector((state) => state?.courses?.loading);
  const levels = levelsList;
  console.log(loading, 'loading state');
  let coursesList;
  if (courses?.length > 0) {
    coursesList = courses?.map((item, i) => {
      if (item?.type == 'recorded' || item?.type == 'mixed') {
        return (
          <div className="col-xl-4 col-lg-6" key={i}>
            <CourseCard levels={levels} course={item} sliderToggle={false} />
          </div>
        );
      } else if (item?.type == 'liveClass') {
        return (
          <div className="col-xl-4 col-lg-6" key={i}>
            <LiveSessionCard
              course={item}
              levels={levels}
              sliderToggle={false}
            />
          </div>
        );
      }
    });
  } else {
    coursesList = "There's no courses..";
  }

  return (
    <section className="retrieveCoursesPages">
      <div className="container ">
        <div className="d-flex justify-content-between align-items-baseline mb-4">
          <h4>All Free Courses</h4>
          <SortBy
            sortOptions={[
              { value: 'relevance', label: 'Relevance' },
              { value: 'newest', label: 'Newest' },
            ]}
            mainPath={`/rythm`}
            filterBy={'price%5B%5D=free'}
            dispatchedAction={fetchFreeCourses}
            fetchStart={fetchStart}
          />
        </div>

        <div className="row">
          <div className="col-xl-3 col-lg-4">
            <SideFilter
              mainPath={'/rythm'}
              courses={filterResult}
              filterBy="price%5B%5D=free"
              dispatchedAction={fetchFreeCourses}
              fetchStart={fetchStart}
            />
          </div>
          <div className="col-xl-9 col-lg-8">
            {!loading ? (
              coursesList?.length > 0 ? (
                <section className="GetFreeCourses home-section">
                  <div className="container px-0">
                    <div className="row">{coursesList}</div>
                  </div>
                </section>
              ) : (
                <div style={{ margin: 'auto .2rem 3rem 1rem' }}>
                  <Skeleton active /> <Skeleton active /> <Skeleton active />
                </div>
              )
            ) : (
              <div style={{ margin: 'auto .2rem 3rem 1rem' }}>
                <Skeleton active /> <Skeleton active /> <Skeleton active />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default FreeCourses;
