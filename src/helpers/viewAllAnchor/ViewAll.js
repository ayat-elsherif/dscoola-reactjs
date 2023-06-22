import React from "react";
import { Link } from "react-router-dom";
import "./viewAll.scss";
function ViewAll({ url, text, extraClass }) {
  return (
    <>
      <Link className={"viewAll " + extraClass} to={url}>
        {text}
      </Link>
    </>
  );
}

export default ViewAll;
