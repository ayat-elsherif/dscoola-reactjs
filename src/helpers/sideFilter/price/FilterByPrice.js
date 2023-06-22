import React from "react";

import { Collapse, Checkbox } from "antd";
import { useDispatch } from "react-redux";
import { coursesSort } from "../sortFilterEntries";
import { useNavigate } from "react-router-dom";
import { sendSearchQuery } from "../sendSearchQuery";
import coursesAPI from "../../../apis/coursesAPI";
import { getFilterResult } from "../../../features/filter/filterSlice";
import { topCourses } from "../../../features/courses/coursesSlice";
const { Panel } = Collapse;

export default function FilterByPrice({
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
  const changeUrlParam = (e) => {
    const result = sendSearchQuery(
      e.target.value,
      e.target.checked,
      // "price%5B%5D",
      "price[]",
      filterBy
    );

    fetchCourses(result);
    // navigate({ pathname: mainPath, search: result });
  };

  let result = coursesSort(courses, "price_plan");
  // console.log(result, "result in price");
  let priceFilter = [];
  let count = 0;
  if (Object.keys(result).length === 0) {
    return null;
  } else {
    for (let key in result) {
      // if (key != "undefined" && key != "null" && key != 0) {
      //   count += Number(result[key]);
      // } else
      if (key == "free" || key == "null") {
        priceFilter.push(
          <li className={"price-free"} key={"free"}>
            <Checkbox onChange={(e) => changeUrlParam(e)} value="free">
              Free
              {/* <span>({result[key]})</span> TODO: work on it later */}
            </Checkbox>
          </li>
        );
      } else if (key == "paid") {
        priceFilter.push(
          <li className={"price-paid"} key={"paid"}>
            <Checkbox onChange={(e) => changeUrlParam(e)} value="paid">
              Paid
              {/* <span>({count})</span> TODO: work on it later */}
            </Checkbox>
          </li>
        );
      }
    }
  }
  return (
    <>
      {priceFilter.length > 0 ? (
        <Collapse defaultActiveKey={["1"]}>
          <Panel header="Price" key="1">
            <ul className="unstyled-list">{priceFilter}</ul>
          </Panel>
        </Collapse>
      ) : (
        ""
      )}
    </>
  );
}
