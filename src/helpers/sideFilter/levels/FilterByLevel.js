import React from "react";

import { Collapse, Checkbox } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { coursesSort } from "../sortFilterEntries";
import { sendSearchQuery } from "../sendSearchQuery";
import { useNavigate } from "react-router-dom";
import coursesAPI from "../../../apis/coursesAPI";
import { getFilterResult } from "../../../features/filter/filterSlice";
import { levelsList } from "../../../apis/levelsList";
import { topCourses } from "../../../features/courses/coursesSlice";
const { Panel } = Collapse;

export default function FilterByLevel({
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

  let levelArr = [];

  const changeUrlParam = (e) => {
    const result = sendSearchQuery(
      e.target.value,
      e.target.checked,
      "level%5B%5D",
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
          .get("/courses/fiter?perpage=12&" + result)
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

  const levels = levelsList;
  const currentLevel = (id) => {
    if (levels) {
      levelArr = levels.filter((i) => {
        // console.log(typeof i.id, typeof id, "i.id");
        return i.id === parseInt(id);
      });
    }
    // console.log(levelArr, "levelArr");
    return levelArr[0]?.title;
  };

  let result = coursesSort(courses, "level");
  let levelFilter = [];
  let count = 0;
  if (Object.keys(result).length === 0) {
    return null;
  } else {
    for (let key in result) {
      count += result[key];
      if (key != "undefined" && key != "null") {
        levelFilter.push(
          <li className={key} key={key}>
            <Checkbox onChange={(e) => changeUrlParam(e)} value={key}>
              {currentLevel(key)}
              {/* ({result[key]}) TODO: work on it later  */}
            </Checkbox>
          </li>
        );
      }
    }
  }
  return (
    <>
      {levelFilter.length > 0 ? (
        <Collapse defaultActiveKey={["1"]}>
          <Panel header="Level" key="1">
            <ul className="unstyled-list">{levelFilter}</ul>
          </Panel>
        </Collapse>
      ) : (
        ""
      )}
    </>
  );
}
