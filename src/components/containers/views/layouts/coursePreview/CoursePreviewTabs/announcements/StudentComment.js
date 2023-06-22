import React from "react";
import { Link } from "react-router-dom";

function StudentComment({ i, id }) {
  return (
    <div className="d-flex align-items-start secondaryComment" key={i}>
      <figure>
        <img
          src="/assets/images/instructors/Kayla-Person.png"
          alt={"name" + i}
        />
      </figure>
      <div>
        <div className="mb-1">
          <Link to="#">
            <span>Maira Fahimi</span>
          </Link>
          <small> · 5 days ago</small>
        </div>
        <p>
          Did you know that Udemy just launched a brand new YouTube channel? So
          I wanted to quickly let you know that I was featured on there! I
          uploaded
        </p>
      </div>
    </div>
  );
}

export default StudentComment;
