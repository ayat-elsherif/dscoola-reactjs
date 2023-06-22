import React from "react";
import { useNavigate } from "react-router-dom";
import { Collapse, Checkbox } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { coursesSort } from "../sortFilterEntries";
import { sendSearchQuery } from "../sendSearchQuery";
import coursesAPI from "../../../apis/coursesAPI";
import {
  getFilterResult,
  fetchStart,
} from "../../../features/filter/filterSlice";
const { Panel } = Collapse;

export default function FilterByCourseType({
  mainPath,
  courses,
  dispatchedAction,
  fetchStart,
  filterBy,
  getTotalNum,
}) {
  const dispatch = useDispatch();
  const accesstoken = localStorage.getItem("access_token");

  function callback(key) {
    console.log(key);
  }
  // function onChange(e) {
  //   console.log(`checked = ${e.target.checked}`);
  // }
  const navigate = useNavigate();

  const changeUrlParam = (e) => {
    const result = sendSearchQuery(
      e.target.value,
      e.target.checked,
      "type[]",
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

  let result = coursesSort(courses, "type");
  let sortedList = [];
  if (Object.keys(result).length === 0) {
    return null;
  } else {
    for (let key in result) {
      if (key != "undefined" && key != "null" && key != "[object Object]") {
        sortedList.push(
          <li className={"coursetype-" + key} key={key}>
            <Checkbox onChange={(e) => changeUrlParam(e)} value={key}>
              {key}
              {/* <span>({result[key]})</span> TODO: work on it later */}
            </Checkbox>
          </li>
        );
      }
    }
  }
  return (
    <>
      {sortedList.length > 0 ? (
        <Collapse defaultActiveKey={["1"]} onChange={callback}>
          <Panel header="Courses" key="1">
            <ul className="unstyled-list">{sortedList}</ul>
          </Panel>
        </Collapse>
      ) : (
        ""
      )}
    </>
  );
}
