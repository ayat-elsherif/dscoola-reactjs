import React, { useState } from "react";
import { sendSearchQuery } from "../../helpers/sideFilter/sendSearchQuery";

import { Pagination } from "antd";
import "./pagination.scss";
import { protectAxios } from "../../apis/coursesAPI";
import {
  getAllMostViewed,
  fetchStart,
} from "../../features/mostViewed/alllMostViewedSlice";
import { useDispatch } from "react-redux";
function SimplePagination({ coursesNum, mainPath, dispatchedAction }) {
  let initialAPI = "";
  let initialAuthAPI = "";

  if (mainPath == "/webinars") {
    initialAuthAPI = "/webinar/filter?perpage=12&";
    initialAPI = "/webinar/filter?perpage=12&";
  } else {
    initialAuthAPI = "/courses/auth/filter?perpage=12&";
    initialAPI = "/courses/fiter?perpage=12&";
  }
  // const [current, setCurrent] = useState(1);
  const dispatch = useDispatch();
  const accesstoken = localStorage.getItem("access_token");
  const onChangePage = (page) => {
    const result = sendSearchQuery(page, "", "page", "");

    const fetchPage = async (result) => {
      dispatch(fetchStart());
      console.log(page, "page");
      if (accesstoken) {
        const response = await protectAxios
          .get(initialAuthAPI + result)
          .catch((err) => console.log("err", err));
        dispatch(dispatchedAction(response.data.data));
      } else {
        const response = await protectAxios
          .get(initialAPI + result)
          .catch((err) => console.log("err", err));
        dispatch(dispatchedAction(response.data.data));
      }
    };
    fetchPage(result);
  };
  return (
    <div className="pagination">
      <Pagination
        // current={current}
        defaultCurrent={1}
        onChange={onChangePage}
        total={coursesNum}
        defaultPageSize={12}
      />
    </div>
  );
}

export default SimplePagination;
