import React, { useEffect, useState } from "react";

import { Collapse, Checkbox } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sendSearchQuery } from "../sendSearchQuery";
import { coursesSort } from "../sortFilterEntries";
import coursesAPI from "../../../apis/coursesAPI";
import { getFilterResult } from "../../../features/filter/filterSlice";
import { topCourses } from "../../../features/courses/coursesSlice";
import { fetchAllCategories } from "../../../features/categories/categoriesSlice";
import { toNumber } from "lodash";
const { Panel } = Collapse;

export default function FilterBySubCategory({
  mainPath,
  courses,
  filterBy,
  dispatchedAction,
  fetchStart,
  getTotalNum,
  initialAPIs,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accesstoken = localStorage.getItem("access_token");

  const [showMore, setShowMore] = useState(false);

  let currentCategory = [];

  const changeUrlParam = (e) => {
    const result = sendSearchQuery(
      e.target.value,
      e.target.checked,
      "sub_category[]",
      filterBy
    );

    const fetchCourses = async (result) => {
      dispatch(fetchStart());
      if (accesstoken) {
        const response = await coursesAPI
          .get(initialAPIs.initialAuthAPI + result, {
            headers: { Authorization: `bearer ${accesstoken}` },
          })
          .catch((err) => console.log("err", err));

        if (response.data) {
          dispatch(dispatchedAction(response.data.data));
          dispatch(getTotalNum(response.data.total));
        }
      } else {
        const response = await coursesAPI
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
  let county = 0;

  const categoryNameFromId = (id) => {
    // console.log(currentCategory, "currentCategory all sub categories");
    allCategories?.map((item) => {
      if (item?.sub_categories.length > 0) {
        // console.log(item.sub_categories, `I'm item in subcat filter`);
        item?.sub_categories.map((i) => {
          if (toNumber(i.id) == toNumber(id)) {
            // console.log(i.title, "items with typical idssss");
            currentCategory = i.title;
          }
        });
      }
    });
    // console.log(currentCategory, "currentCategory all sub categories");

    return currentCategory;
  };

  let result = coursesSort(courses, "second_category_id");
  let SubCatFilter = [];
  let count = 0;
  if (Object.keys(result).length === 0) {
    return null;
  } else {
    for (let key in result) {
      count += result[key];
      if (key != "undefined" && key != "null") {
        SubCatFilter.push(
          categoryNameFromId(toNumber(key))?.length > 0 ? (
            <li className={key} key={key} title={categoryNameFromId(key)}>
              <Checkbox onChange={(e) => changeUrlParam(e)} value={key}>
                {categoryNameFromId(key)}

                {/* ({result[key]}) TODO: work on it later */}
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
      <Collapse defaultActiveKey={["1"]}>
        <Panel header="Sub Category" key="1">
          {/* <ul className="unstyled-list">{SubCatFilter}</ul> */}
          {SubCatFilter.length > 6 ? (
            showMore ? (
              <>
                <ul className="unstyled-list">{SubCatFilter}</ul>
                <span className="anchor" onClick={() => setShowMore(!showMore)}>
                  Show Less
                </span>
              </>
            ) : (
              <>
                <ul className="unstyled-list">{SubCatFilter.splice(0, 6)}</ul>
                <span className="anchor" onClick={() => setShowMore(!showMore)}>
                  Show More
                </span>
              </>
            )
          ) : (
            <ul className="unstyled-list">{SubCatFilter}</ul>
          )}
        </Panel>
      </Collapse>
    </>
  );
}
