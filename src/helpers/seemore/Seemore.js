import React from "react";
import { Link } from "react-router-dom";
import "./seemore.scss";
function Seemore({ text }) {
  return (
    <Link to="#" className="seemore">
      <div className="mb-3">
        {text}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="8.16"
          height="4.666"
          viewBox="0 0 8.16 4.666"
        >
          <path
            id="Icon_ionic-ios-arrow-forward"
            data-name="Icon ionic-ios-arrow-forward"
            d="M14.506,10.275,11.418,7.189a.581.581,0,0,1,0-.824.588.588,0,0,1,.826,0l3.5,3.5a.582.582,0,0,1,.017.8l-3.513,3.52a.583.583,0,0,1-.826-.824Z"
            transform="translate(14.356 -11.246) rotate(90)"
            fill="#7e59d1"
          />
        </svg>
      </div>
    </Link>
  );
}

export default Seemore;
