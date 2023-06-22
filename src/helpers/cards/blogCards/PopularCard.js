import React from "react";
import { Link } from "react-router-dom";

function PopularCard({ img }) {
  return (
    <div className="popularCard">
      <div className="popularCard-img">
        <img src={img} alt="article1" />
      </div>
      <div className="popularCard-details">
        <Link to="/blogs/popArticle">
          <h6>
            Preparing learners around the world for in-demand jobs Career
            Academy and new entry-level....
          </h6>
          <span>By Dee Naidoo. March 23, 2020</span>
        </Link>
      </div>
    </div>
  );
}

export default PopularCard;
