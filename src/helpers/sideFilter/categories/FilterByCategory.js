import React, { useEffect, useState } from "react";
import { Collapse, Checkbox } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { coursesSort } from "../sortFilterEntries";
import { sendSearchQuery } from "../sendSearchQuery";
import coursesAPI, { protectAxios } from "../../../apis/coursesAPI";
import { fetchAllCategories } from "../../../features/categories/categoriesSlice";
import { useNavigate, useSearchParams } from "react-router-dom";
const { Panel } = Collapse;

export default function FilterByCategory({
  mainPath,
  courses,
  filterBy,
  dispatchedAction,
  fetchStart,
  getTotalNum,
  initialAPIs,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(initialAPIs, "initialAPIs in category");
  const accesstoken = localStorage.getItem("access_token");

  const [showMore, setShowMore] = useState(false);

  let currentCategory = [];

  const changeUrlParam = (e) => {
    const result = sendSearchQuery(
      e.target.value,
      e.target.checked,
      `category[]`,
      filterBy
    );

    const fetchCourses = async (result) => {
      dispatch(fetchStart());
      if (accesstoken) {
        const response = await protectAxios
          .get(initialAPIs.initialAuthAPI + result)
          .catch((err) => console.log("err", err));

        if (response.data) {
          console.log(response.data.total, "response.data.total in category");

          dispatch(dispatchedAction(response.data.data));
          dispatch(getTotalNum(response.data.total));
        }
      } else {
        const response = await protectAxios
          .get(initialAPIs.initialAPI + result)
          .catch((err) => console.log("err", err));

        if (response.data) {
          dispatch(dispatchedAction(response.data.data));
          dispatch(getTotalNum(response.data.total));
        }
      }
    };

    fetchCourses(result);
    // navigate({ pathname: mainPath, search: result });
  };
  const allCategories = useSelector(
    (state) => state.fetchCategories.allCategories
  );
  // console.log(allCategories, "allCategories");
  const categoryNameFromId = (id) => {
    currentCategory = allCategories.filter((i) => i.id == id);
    return currentCategory[0]?.title;
  };

  let result = coursesSort(courses, "parent_category_id");
  // console.log(courses, "courses after");

  let sortedList = [];
  if (Object.keys(result).length === 0) {
    return null;
  } else {
    for (let key in result) {
      if (key != "undefined" && key != "null" && key != "[object Object]") {
        sortedList.push(
          categoryNameFromId(key)?.length > 0 ? (
            <li
              className={"category-" + key}
              key={key}
              title={categoryNameFromId(key)}
            >
              <Checkbox onChange={(e) => changeUrlParam(e)} value={key}>
                {categoryNameFromId(key)}
              </Checkbox>
            </li>
          ) : (
            ""
          )
        );
      }
    }
  }
  return (
    <>
      {sortedList.length > 0 ? (
        <Collapse defaultActiveKey={["1"]}>
          <Panel header="Category" key="1">
            {sortedList.length > 6 ? (
              showMore ? (
                <>
                  <ul className="unstyled-list">{sortedList}</ul>
                  <span
                    className="anchor"
                    onClick={() => setShowMore(!showMore)}
                  >
                    Show Less
                  </span>
                </>
              ) : (
                <>
                  <ul className="unstyled-list">{sortedList.splice(0, 6)}</ul>
                  <span
                    className="anchor"
                    onClick={() => setShowMore(!showMore)}
                  >
                    Show More
                  </span>
                </>
              )
            ) : (
              <ul className="unstyled-list">{sortedList}</ul>
            )}

            {/* <ul className="unstyled-list">{sortedList}</ul> */}
          </Panel>
        </Collapse>
      ) : (
        ""
      )}
    </>
  );
}

// export default FilterByCategory;
