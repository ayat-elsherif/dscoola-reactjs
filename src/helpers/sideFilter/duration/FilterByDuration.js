import React from "react";

import { Collapse, Checkbox } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { coursesSort } from "../sortFilterEntries";
import { useNavigate, useParams } from "react-router-dom";
import { sendSearchQuery } from "../sendSearchQuery";
import coursesAPI from "../../../apis/coursesAPI";

import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { topCourses } from "../../../features/courses/coursesSlice";
import { indexOf } from "lodash";
dayjs.extend(duration);
const { Panel } = Collapse;

export default function FilterByDuration({
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
  const params = useParams();
  let keyword = "";
  // console.log(initialAPIs.initialAuthAPI, "initialAuthAPI in duration");
  const accesstoken = localStorage.getItem("access_token");

  if (mainPath == "/webinars") {
    keyword = "duration";
  } else {
    keyword = "total_duration";
  }

  const changeUrlParam = (e) => {
    const result = sendSearchQuery(
      e.target.value,
      e.target.checked,
      "duration[]",
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
  };

  let result = coursesSort(courses, keyword);
  let sortedList = [];
  let fitlerObj = {};
  if (Object.keys(result).length === 0) {
    return null;
  } else {
    for (let key in result) {
      if (key != "undefined" && key != "null" && key != "[object Object]") {
        const duration = new Date("01 01 01 " + key);
        if (duration.getHours() > 0 && duration.getHours() < 3) {
          fitlerObj["0-3"] = "00:00-02:59";
        } else if (duration.getHours() >= 3 && duration.getHours() < 6) {
          fitlerObj["3-6"] = "03:00-05:59";
        } else if (duration.getHours() >= 6 && duration.getHours() < 16) {
          fitlerObj["6-16"] = "06:00-15:59";
        } else if (duration.getHours() >= 16) {
          fitlerObj["16Plus"] = "16:00-100:59";
        }
        // console.log(fitlerObj, "filterOBj");
      }
    }
  }
  let i = 0;
  for (let key2 in fitlerObj) {
    // if (key2 === "16Plus") {
    //   sortedList.push(
    //     <li className={"duration-" + key2} key={++i}>
    //       <Checkbox onChange={(e) => changeUrlParam(e)} value={fitlerObj[key2]}>
    //         16+ Hours
    //         {/* <span>({result[key]})</span> TODO: work on it later */}
    //       </Checkbox>
    //     </li>
    //   );
    // } else {
    sortedList.push(
      <li className={"duration-" + key2} key={++i}>
        <Checkbox onChange={(e) => changeUrlParam(e)} value={fitlerObj[key2]}>
          {key2 === "16Plus" ? "16+ Hours" : <> {key2} Hours</>}
          {/* {key2} Hours */}
          {/* <span>({result[key]})</span> TODO: work on it later */}
        </Checkbox>
      </li>
    );
  }
  console.log(params, "params in filter");
  return (
    <>
      {sortedList.length > 0 ? (
        <Collapse defaultActiveKey={["1"]}>
          <Panel header="Duration" key="1">
            <ul className="unstyled-list">{sortedList}</ul>
          </Panel>
        </Collapse>
      ) : (
        ""
      )}
    </>
  );
}
