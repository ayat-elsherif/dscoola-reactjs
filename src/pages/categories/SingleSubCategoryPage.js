import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import coursesAPI from '../../apis/coursesAPI';
import '../innerPagesWithFilter.scss';
import AllCategoryCourses from './allCategoryCourses/AllCategoryCourses';
import BreadCrumbsMultiple from '../../helpers/breadCrumbs/BreadCrumbsMultiple';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchStartingCourses,
  getCategoryId,
} from '../../features/courses/categoriesSlice';
import { getFilterResult } from '../../features/filter/filterSlice';
import { Skeleton } from 'antd';
import NotFoundPage from '../notFound/NotFoundPage';
import {
  fetchAllCategoryCourses,
  fetchStart,
} from '../../features/categories/allCategoryCourses';
import MainSearchResults from '../searchResults/MainSearchResults';
function SingleSubCategoryPage() {
  const Params = useParams();
  const dispatch = useDispatch();
  const subCatTitle = Params?.subCat_id.replaceAll('-', ' ');
  useEffect(() => {
    window.scrollTo(0, 0);
    // dispatch(fetchStart());
    const controller = new AbortController();

    const fetchCourses = async () => {
      dispatch(fetchStart());
      await coursesAPI
        .get('/categories')
        .then((res) => {
          let currentCategory = [];
          let cateoryId;
          console.log(Params, "first i'm in param cats");
          res.data.data.map((item) => {
            if (item.slug == Params.cat_id) {
              if (item.sub_categories.length > 0) {
                item.sub_categories?.map((sub, i) => {
                  if (sub.slug == Params.subCat_id) {
                    currentCategory.push(sub.id);
                  }
                });
              }
            }
          });
          cateoryId = currentCategory[0];

          // console.log(currentCategory, "currentCategory hoho");
          console.log(cateoryId, 'cateoryId');

          const tabsSection = async () => {
            const responseAll = await coursesAPI
              .get(`/courses?perpage=100000&sub_category[]=${cateoryId}`, {
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

          const fetchCFilterResults = async () => {
            const response = await coursesAPI
              .get(`/courses?perpage=100000&sub_category[]=${cateoryId}`)
              .catch((err) => console.log('err', err));
            if (response.data) {
              dispatch(getFilterResult(response.data.data));
            }
          };
          fetchCFilterResults();
        })
        .catch((err) => console.log('err', err));
    };
    fetchCourses();
    return () => {
      controller.abort();
    };
  }, []);
  const coursesToStartWith = useSelector(
    (state) => state.categories.startingCourses.mostViewed,
  );
  const allCategoryCourses = useSelector(
    (state) => state.allCategories.allCategoryCourses,
  );
  let paramId = useParams();

  console.log(paramId, "I'm param");
  return (
    <div className="innerPage">
      <BreadCrumbsMultiple
        params={[
          {
            label: paramId.cat_name,
            url: `/categories/${paramId.cat_id}/${paramId.cat_name}`,
          },
          { label: paramId.subCat_name },
        ]}
        title={paramId.subCat_name}
      />

      {/* <BreadCrumbs param={paramId.cat_id} title={paramId.cat_id + " Courses"} /> */}
      {/* <CoursesToStartWith /> */}
      {/* <FeaturedCourses /> */}
      {/* <PopularInstructors /> */}
      {/* <AllCategoryCourses
            routeTo={`${paramId.cat_id}/${paramId.subCat_id}`}
          /> */}
      <MainSearchResults />
    </div>
  );
}

export default SingleSubCategoryPage;
