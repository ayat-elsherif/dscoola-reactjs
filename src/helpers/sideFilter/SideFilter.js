import React, { useEffect } from "react";
import "./dscoolaFilter.scss";
import FilterByCategory from "./categories/FilterByCategory";
import FilterByLevel from "./levels/FilterByLevel";
import FilterByRating from "./rating/filterByRating";
import FilterBySubCategory from "./subCategories/FilterBySubCategory";
import FilterByCourseType from "./courseType/FilterByCourseType";
import FilterByLanguage from "./language/FilterByLanguage";
import FilterByPrice from "./price/FilterByPrice";
import FilterByDuration from "./duration/FilterByDuration";
import FilterByInstructor from "./instructor/FilterByInstructor";
import { Skeleton } from "antd";
import { useSelector } from "react-redux";
import FilterByTopic from "./topic/FilterByTopic";
function SideFilter({
  mainPath,
  courses,
  filterBy,
  dispatchedAction,
  fetchStart,
  filterType,
  getTotalNum,
}) {
  // const loading = useSelector((state) => state.filterResult.loading);
  // console.log(courses, "courses in side filter for category check");
  let initialAPI = "";
  let initialAuthAPI = "";

  if (mainPath == "/webinars") {
    initialAuthAPI = "/webinar/filter?perpage=12&";
    initialAPI = "/webinar/filter?perpage=12&";
  } else {
    initialAuthAPI = "/courses/auth/filter?perpage=12&";
    initialAPI = "/courses/fiter?perpage=12&";
  }
  return (
    <>
      {courses?.length > 0 ? (
        <div className="sideFilter">
          {filterType == "category" ||
          filterType == "sub_category" ||
          filterType == "topic" ? (
            ""
          ) : (
            <FilterByCategory
              mainPath={mainPath}
              filterBy={filterBy}
              courses={courses}
              dispatchedAction={dispatchedAction}
              fetchStart={fetchStart}
              getTotalNum={getTotalNum}
              initialAPIs={{ initialAPI, initialAuthAPI }}
            />
          )}
          {filterType == "sub_category" || filterType == "topic" ? (
            ""
          ) : (
            <FilterBySubCategory
              mainPath={mainPath}
              courses={courses}
              filterBy={filterBy}
              dispatchedAction={dispatchedAction}
              fetchStart={fetchStart}
              getTotalNum={getTotalNum}
              initialAPIs={{ initialAPI, initialAuthAPI }}
            />
          )}
          {filterType == "topic" || mainPath == "/webinars" ? (
            ""
          ) : (
            <FilterByTopic
              mainPath={mainPath}
              courses={courses}
              filterBy={filterBy}
              dispatchedAction={dispatchedAction}
              fetchStart={fetchStart}
              getTotalNum={getTotalNum}
            />
          )}
          {mainPath == "/webinars" ? (
            <FilterByInstructor
              mainPath={mainPath}
              courses={courses}
              filterBy={filterBy}
              dispatchedAction={dispatchedAction}
              fetchStart={fetchStart}
              getTotalNum={getTotalNum}
              initialAPIs={{ initialAPI, initialAuthAPI }}
            />
          ) : (
            ""
          )}

          {mainPath == "/livecourses" ||
          mainPath == "/webinars?includes=zoomMeetings,creator" ? (
            ""
          ) : (
            <FilterByCourseType
              mainPath={mainPath}
              courses={courses}
              filterBy={filterBy}
              dispatchedAction={dispatchedAction}
              fetchStart={fetchStart}
              getTotalNum={getTotalNum}
            />
          )}
          {mainPath == "/webinars" ? (
            ""
          ) : (
            <FilterByLevel
              mainPath={mainPath}
              courses={courses}
              filterBy={filterBy}
              dispatchedAction={dispatchedAction}
              fetchStart={fetchStart}
              getTotalNum={getTotalNum}
            />
          )}
          {mainPath != "/rythm" || mainPath == "/webinars" ? (
            ""
          ) : (
            <FilterByPrice
              mainPath={mainPath}
              courses={courses}
              filterBy={filterBy}
              dispatchedAction={dispatchedAction}
              fetchStart={fetchStart}
              getTotalNum={getTotalNum}
            />
          )}
          <FilterByLanguage
            mainPath={mainPath}
            courses={courses}
            fetchStart={fetchStart}
            getTotalNum={getTotalNum}
          />
          {mainPath == "/topcourses" || mainPath == "/webinars" ? (
            ""
          ) : (
            <FilterByRating
              mainPath={mainPath}
              courses={courses}
              filterBy={filterBy}
              dispatchedAction={dispatchedAction}
              fetchStart={fetchStart}
              getTotalNum={getTotalNum}
            />
          )}

          <FilterByDuration
            mainPath={mainPath}
            filterBy={filterBy}
            courses={courses}
            dispatchedAction={dispatchedAction}
            fetchStart={fetchStart}
            getTotalNum={getTotalNum}
            initialAPIs={{ initialAPI, initialAuthAPI }}
          />
        </div>
      ) : (
        <>
          <Skeleton active /> <Skeleton active />
        </>
      )}
    </>
  );
}

export default SideFilter;
