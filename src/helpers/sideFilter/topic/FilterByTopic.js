import React, { useState } from "react";

import { Collapse, Checkbox } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sendSearchQuery } from "../sendSearchQuery";
import { coursesSort } from "../sortFilterEntries";
import coursesAPI from "../../../apis/coursesAPI";
import { getFilterResult } from "../../../features/filter/filterSlice";
import { topCourses } from "../../../features/courses/coursesSlice";
import { toNumber } from "lodash";
const { Panel } = Collapse;

export default function FilterByTopic({
  mainPath,
  courses,
  filterBy,
  dispatchedAction,
  fetchStart,
  getTotalNum,
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
      "topic[]",
      filterBy
    );

    const fetchCourses = async (result) => {
      dispatch(fetchStart());
      if (accesstoken) {
        const response = await coursesAPI
          .get("/courses/auth/filter?perpage=12&" + result, {
            headers: { Authorization: `bearer ${accesstoken}` },
          })
          .catch((err) => console.log("err", err));

        if (response.data) {
          dispatch(dispatchedAction(response.data.data));
          dispatch(getTotalNum(response.data.total));
        }
      } else {
        const response = await coursesAPI
          .get("/courses/filter?perpage=12&" + result)
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
    // console.log(currentCategory, "currentCategory all sub categories");
    allCategories?.map((item) => {
      if (item?.sub_categories.length > 0) {
        // console.log(item.sub_categories, `I'm item in subcat filter`);
        item?.sub_categories.map((sub) => {
          if (sub?.sub_categories.length > 0) {
            sub?.sub_categories.map((i) => {
              if (toNumber(i.id) == toNumber(id)) {
                // console.log(i.title, "items with typical idssss");
                currentCategory = i.title;
              }
            });
          }
        });
      }
    });
    // console.log(currentCategory, "currentCategory all sub categories");

    return currentCategory;
  };

  let result = coursesSort(courses, "category_id");
  let topicFilter = [];
  let count = 0;
  if (Object.keys(result).length === 0) {
    return null;
  } else {
    for (let key in result) {
      count += result[key];
      if (key != "undefined" && key != "null") {
        topicFilter.push(
          categoryNameFromId(key)?.length > 0 ? (
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
        <Panel header="Topic" key="1">
          {/* <ul className="unstyled-list">{topicFilter}</ul> */}
          {topicFilter.length > 6 ? (
            showMore ? (
              <>
                <ul className="unstyled-list">{topicFilter}</ul>
                <span className="anchor" onClick={() => setShowMore(!showMore)}>
                  Show Less
                </span>
              </>
            ) : (
              <>
                <ul className="unstyled-list">{topicFilter.splice(0, 6)}</ul>
                <span className="anchor" onClick={() => setShowMore(!showMore)}>
                  Show more
                </span>
              </>
            )
          ) : (
            <ul className="unstyled-list">{topicFilter}</ul>
          )}
        </Panel>
      </Collapse>
    </>
  );
}
