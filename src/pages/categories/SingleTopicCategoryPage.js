import React from "react";
import { useParams } from "react-router-dom";
import "../innerPagesWithFilter.scss";
import BreadCrumbsMultiple from "../../helpers/breadCrumbs/BreadCrumbsMultiple";
import MainSearchResults from "../searchResults/MainSearchResults";
function SingleTopicCategoryPage() {
  let paramId = useParams();
  const topicTitle = paramId.topic_name.replaceAll("-", " ");
  console.log(paramId, "paramId");
  return (
    <div className="innerPage">
      <BreadCrumbsMultiple
        params={[
          {
            label: paramId.cat_name,
            url: `/categories/${paramId.cat_id}/${paramId.cat_name}`,
          },
          {
            label: paramId.subCat_name,
            url: `/categories/${paramId.cat_id}/${paramId.cat_name}/${paramId.subCat_id}/${paramId.subCat_name}`,
          },
          {
            label: paramId.topic_name,
          },
        ]}
        title={topicTitle}
      />
      {/* <BreadCrumbs param={paramId.cat_id} title={paramId.cat_id + " Courses"} /> */}
      {/* <CoursesToStartWith /> */}
      {/* <FeaturedCourses /> */}
      {/* <PopularInstructors /> */}
      {/* <AllCategoryCourses
            routeTo={`${paramId.cat_id}/${paramId.subCat_id}/${paramId.topic_id}`}
          /> */}
      <MainSearchResults />
    </div>
  );
}

export default SingleTopicCategoryPage;
