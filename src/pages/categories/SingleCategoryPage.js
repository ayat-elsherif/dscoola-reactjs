import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import coursesAPI from '../../apis/coursesAPI';
import '../innerPagesWithFilter.scss';
import BreadCrumbsMultiple from '../../helpers/breadCrumbs/BreadCrumbsMultiple';
import {
  fetchStartingCourses,
  getCategoryId,
} from '../../features/courses/categoriesSlice';
import { getFilterResult } from '../../features/filter/filterSlice';
import {
  fetchAllCategoryCourses,
  fetchStart,
} from '../../features/categories/allCategoryCourses';
import MainSearchResults from '../searchResults/MainSearchResults';

function SingleCategoryPage({ type }) {
  const Params = useParams();
  const dispatch = useDispatch();
  console.log(type, 'typetypetype');
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchStart());
    const controller = new AbortController();
    const fetchCourses = async () => {
      await coursesAPI
        .get('/categories')
        .then((res) => {
          let currentCategory = [];
          let cateoryId;
          currentCategory = res.data.data.filter(
            (i) => i.slug == Params.cat_id,
          );
          cateoryId = currentCategory[0].id;

          const tabsSection = async () => {
            const responseAll = await coursesAPI
              .get(`/courses?perpage=100000&category[]=${cateoryId}`, {
                signal: controller.signal,
              })
              .catch((err) => console.log(err, 'Err'));
            dispatch(getCategoryId(cateoryId));
            if (responseAll.data) {
              dispatch(fetchStartingCourses(responseAll.data.data));
              dispatch(fetchAllCategoryCourses(responseAll.data.data));
            }
          };
          tabsSection();

          const fetchFilterResults = async () => {
            const response = await coursesAPI
              .get(`/courses?perpage=100000&category[]=${cateoryId}`)
              .catch((err) => console.log('err', err));
            if (response.data) {
              console.log(response.data.data, 'response.data.data');
              dispatch(getFilterResult(response.data.data));
            }
          };
          fetchFilterResults();
        })
        .catch((err) => console.log('err', err));
    };
    fetchCourses();
    return () => {
      controller.abort();
    };
  }, []);

  let paramId = useParams();
  // console.log(paramId, "I'm param");
  // let catTitle = paramId.cat_id.replaceAll("-", " ");
  return (
    <div className="innerPage">
      <BreadCrumbsMultiple
        params={[{ label: paramId.cat_name }]}
        title={paramId.cat_name}
      />{' '}
      {/* <CoursesToStartWith /> */}
      {/* <FeaturedCourses /> */}
      {/* <PopularInstructors /> */}
      {/* <AllCategoryCourses routeTo={paramId.cat_id} /> */}
      <MainSearchResults />
    </div>
  );
}

export default SingleCategoryPage;
