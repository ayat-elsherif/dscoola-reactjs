import React, { useEffect, useState } from 'react';
import CourseCard from '../../../helpers/cards/courseCard/courseCard';
import { Col, Pagination, Result, Row, Select } from 'antd';
import { levelsList } from '../../../apis/levelsList';
import { useLocation, useParams } from 'react-router-dom';
import LiveSessionCard from '../../../helpers/cards/liveSessionCard';
import FilterSection from '../../../components/common/FilterSection/FilterSection';
import CardSkeleton from '../../../components/common/CardSkeleton/CardSkeleton';
import useApi from '../../../network/useApi';
// import { fetchAllcategories } from "../../../features/categories/categoriesSlice";
// import { getFilterResult } from "../../../features/filter/filterSlice";

function AllCategoryCourses({ routeTo, paramsCat }) {
  const Params = useParams();
  const levels = levelsList;
  let catTitle = Params?.cat_name?.replace('-', ' ');
  const api = useApi();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const params = useParams();
  const location = useLocation();
  const onChangeSort = (value) => {};
  const onChangePage = (index) => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    handelGetCourses(index);
  };

  useEffect(() => {
    handelGetCourses();
  }, [location]);

  const handelGetParams = () => {
    if (params.cat_id) {
      return `&category[]=${params?.cat_id}`;
    }
  };

  const handelGetCourses = (current_page = 1) => {
    setLoading(true);
    const params = handelGetParams();
    api
      .get(`/courses?page=${current_page}${params}`)
      .then((res) => {
        // console.log(res, "ssssssssssss")
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        setData(null);
        setLoading(false);
      });
  };
  return (
    <section className="retrieveCoursesPages">
      <div className="container">
        <div className="filter-row-holder">
          <h4>All '{catTitle}' Courses</h4>
          <Select
            onChange={onChangeSort}
            defaultValue={0}
            options={[
              {
                value: 0,
                label: 'Sort by',
              },
              {
                value: 1,
                label: 'Relevance',
              },
              {
                value: 2,
                label: 'Newest',
              },
            ]}
          />
        </div>
        <Row gutter={30}>
          <Col xs={24} lg={6}>
            <FilterSection />
          </Col>
          <Col xs={24} lg={18}>
            <section className="GetFreeCourses home-section">
              <div className="course-grid-wrapper">
                {loading ? (
                  [0, 1, 2, 3, 4, 5, 6]?.map((s) => <CardSkeleton />)
                ) : data?.data?.length > 0 ? (
                  data?.data?.map((item, i) => {
                    if (item.type === 'mixed' || item.type === 'recorded') {
                      return (
                        <CourseCard
                          key={i}
                          course={item}
                          levels={levels}
                          sliderToggle={false}
                          isWishlist={item.isWishlist}
                        />
                      );
                    }
                    if (item.type === 'liveClass') {
                      return (
                        <LiveSessionCard
                          course={item}
                          key={i}
                          levels={levels}
                          sliderToggle={false}
                          isWishlist={item.isWishlist}
                        />
                      );
                    }
                  })
                ) : (
                  <Result
                    status="404"
                    title="No Results..."
                    subTitle="Sorry, No courses found."
                    className="grid-full-width"
                  />
                )}
              </div>
              <div className="pagination">
                <Pagination
                  current={data?.current_page || 1}
                  defaultCurrent={1}
                  onChange={onChangePage}
                  total={data?.total}
                  defaultPageSize={10}
                  hideOnSinglePage
                />
              </div>
            </section>
          </Col>
        </Row>
      </div>
    </section>
  );
}

export default AllCategoryCourses;
