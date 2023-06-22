import React from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
function InstructorPost({ response }) {
  return (
    <div>
      <div className="d-flex align-items-start">
        <figure>
          <img src={response.owner.avatar} alt={response.owner.name} />
        </figure>
        <div className="commentnDetail">
          <Link to="#">
            <span>{response.owner.name}</span>
          </Link>
          <p>
            Posted an announcement . {dayjs().to(dayjs(response.created_at))}
          </p>
        </div>
      </div>
      <h5>{response.title}</h5>
      <div className="commentBody">
        <p>{response.body}</p>
      </div>
    </div>
  );
}

export default InstructorPost;
