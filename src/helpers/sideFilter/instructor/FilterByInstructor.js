import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Collapse, Checkbox } from "antd";
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
  initialAPIs,
}) {
  const dispatch = useDispatch();
  const accesstoken = localStorage.getItem("access_token");
  console.log("nothing to show");

  function callback(key) {
    console.log(key);
  }
  const [showMore, setShowMore] = useState(false);

  const navigate = useNavigate();

  const changeUrlParam = (e) => {
    const result = sendSearchQuery(
      e.target.value,
      e.target.checked,
      "instructor[]",
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
  const getInstructorId = (courses, name) => {
    let course = courses?.filter((item) => {
      console.log(item?.creator?.name, "creator");
      return name == item?.creator?.name;
    });
    console.log(name, "course in filter");

    // console.log(course[0]?.creator?.id, "course?.creator?.id");
    return course[0]?.creator?.id;
  };

  let result = coursesSort(courses, "name");
  let instructorFilter = [];
  if (Object.keys(result).length === 0) {
    return null;
  } else {
    for (let key in result) {
      if (key != "undefined" && key != "null" && key != "[object Object]") {
        const instId = getInstructorId(courses, key);
        console.log(instId, "instId");
        instructorFilter.push(
          <li className={"instructor-" + key} key={key}>
            {" "}
            <Checkbox onChange={(e) => changeUrlParam(e)} value={instId}>
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
      {instructorFilter.length > 0 ? (
        <Collapse defaultActiveKey={["1"]} onChange={callback}>
          <Panel header="Instructors" key="1">
            {/* <ul className="unstyled-list">{sortedList}</ul> */}
            {instructorFilter.length > 6 ? (
              showMore ? (
                <>
                  <ul className="unstyled-list">{instructorFilter}</ul>
                  <span
                    className="anchor"
                    onClick={() => setShowMore(!showMore)}
                  >
                    Show Less
                  </span>
                </>
              ) : (
                <>
                  <ul className="unstyled-list">
                    {instructorFilter.splice(0, 6)}
                  </ul>
                  <span
                    className="anchor"
                    onClick={() => setShowMore(!showMore)}
                  >
                    Show More
                  </span>
                </>
              )
            ) : (
              <ul className="unstyled-list">{instructorFilter}</ul>
            )}
          </Panel>
        </Collapse>
      ) : (
        ""
      )}
    </>
  );
}
