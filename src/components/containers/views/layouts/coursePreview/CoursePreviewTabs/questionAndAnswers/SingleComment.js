import React from "react";
import { Link } from "react-router-dom";

function singleComment({ index }) {
  return (
    <div
      className="d-flex align-items-start singleComment"
      key={index}
      id={index}
    >
      <figure>
        <img src="/assets/images/instructors/Christian.jpg" alt="" />
      </figure>
      <div className="commentDetail">
        <h5>How to download photoshop?</h5>
        <p>
          Hi everyone, my problem is that following all the steps in the video,
          I can't copy and paste all the steps in the video....
        </p>
        <div className="d-flex justify-content-between commentFooter">
          <p>
            <Link to="#">
              <span>Mohamed Sherif </span>
            </Link>
            . 1 week ago
          </p>
          <div className="commentReplies">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              width="16"
              height="16"
              viewBox="0 0 16 16"
            >
              <defs>
                <clipPath id="clip-path">
                  <rect
                    id="Rectangle_1370"
                    data-name="Rectangle 1370"
                    width="16"
                    height="16"
                    transform="translate(247 993)"
                    fill="#9b9c9d"
                    stroke="#707070"
                    strokeWidth="1"
                  />
                </clipPath>
              </defs>
              <g
                id="Mask_Group_294"
                data-name="Mask Group 294"
                transform="translate(-247 -993)"
                clipPath="url(#clip-path)"
              >
                <g
                  id="svgexport-6_-_2022-01-24T135620.097"
                  data-name="svgexport-6 - 2022-01-24T135620.097"
                  transform="translate(247 993)"
                >
                  <path
                    id="Path_7765"
                    data-name="Path 7765"
                    d="M8,.4C3.589.4,0,3.63,0,7.6a6.656,6.656,0,0,0,1.271,3.894,6.217,6.217,0,0,1-1.193,3.65.267.267,0,0,0,.189.455l.037,0a14.246,14.246,0,0,0,4.431-1.424A8.68,8.68,0,0,0,8,14.8c4.411,0,8-3.23,8-7.2S12.411.4,8,.4ZM4.267,8.667A1.067,1.067,0,1,1,5.333,7.6,1.068,1.068,0,0,1,4.267,8.667ZM8,8.667A1.067,1.067,0,1,1,9.067,7.6,1.068,1.068,0,0,1,8,8.667Zm3.733,0A1.067,1.067,0,1,1,12.8,7.6,1.068,1.068,0,0,1,11.733,8.667Z"
                    fill="#9b9c9d"
                  />
                </g>
              </g>
            </svg>
            9 Reply
          </div>
        </div>
      </div>
    </div>
  );
}

export default singleComment;
