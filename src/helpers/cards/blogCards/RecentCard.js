import React from "react";
import { Link } from "react-router-dom";
function RecentCard() {
  return (
    <div className="recentCard">
      <Link to="/blogs/article1">
        <div className="recentCard-img">
          <img
            src="/assets/images/blogs/articles/smallArticle-1.jpg"
            alt="article_1"
          />
        </div>
      </Link>
      <div className="recentCard-details">
        <Link to="/blogs/article1">
          <h5>What Is Mobile Website Design?? 7 Principles to get You start</h5>
        </Link>
        <span>
          <small>By Dee Naidoo. March 23, 2020</small>
        </span>
        <p>
          Learn 7 guiding principles to engage site visitors with an intuitive
          mobile UX design. Build skills with Courses, Certificates, and degrees
          online from world Alina is a self-taught engineer from Berlin,
          Germany.......
        </p>
      </div>
    </div>
  );
}

export default RecentCard;
