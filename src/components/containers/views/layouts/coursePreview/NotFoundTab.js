import React from "react";

function NotFoundTab({ title, detailOne, detailTwo }) {
  return (
    <div className="notFoundTab text-center">
      <div className="">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="114"
          height="117.001"
          viewBox="0 0 114 117.001"
        >
          <g
            id="svgexport-6_-_2022-01-30T123045.852"
            data-name="svgexport-6 - 2022-01-30T123045.852"
            transform="translate(-31 -23.782)"
          >
            <g
              id="_x37_3_x2C__clear_x2C__cross_x2C__bad_review_x2C__cancel_x2C__magnifying_glass"
              transform="translate(31 24.025)"
            >
              <g id="XMLID_1433_" transform="translate(0 0)">
                <g id="XMLID_1434_">
                  <ellipse
                    id="XMLID_1088_"
                    cx="3.5"
                    cy="4"
                    rx="3.5"
                    ry="4"
                    transform="translate(0 26.757)"
                    fill="#b5b5b5"
                  />
                  <circle
                    id="XMLID_1087_"
                    cx="3.5"
                    cy="3.5"
                    r="3.5"
                    transform="translate(63 105.756)"
                    fill="#b5b5b5"
                  />
                  <circle
                    id="XMLID_1086_"
                    cx="4"
                    cy="4"
                    r="4"
                    transform="translate(93 -0.243)"
                    fill="#b5b5b5"
                  />
                  <ellipse
                    id="XMLID_1085_"
                    cx="3"
                    cy="2.5"
                    rx="3"
                    ry="2.5"
                    transform="translate(108 14.756)"
                    fill="#b5b5b5"
                  />
                  <ellipse
                    id="XMLID_1084_"
                    cx="3"
                    cy="2"
                    rx="3"
                    ry="2"
                    transform="translate(108 105.756)"
                    fill="#b5b5b5"
                  />
                  <ellipse
                    id="XMLID_1083_"
                    cx="2.5"
                    cy="3"
                    rx="2.5"
                    ry="3"
                    transform="translate(18 1.757)"
                    fill="#b5b5b5"
                  />
                  <ellipse
                    id="XMLID_1082_"
                    cx="2.5"
                    cy="3"
                    rx="2.5"
                    ry="3"
                    transform="translate(5 57.756)"
                    fill="#b5b5b5"
                  />
                  <path
                    id="XMLID_1081_"
                    d="M134.657,324.16a6.3,6.3,0,0,0-8.905,8.906l7.124,7.124a6.3,6.3,0,0,0,8.905-8.905Z"
                    transform="translate(-100.506 -247.42)"
                    fill="#b5b5b5"
                  />
                  <path
                    id="XMLID_1080_"
                    d="M40.076,387.112a8.922,8.922,0,1,0,12.337,12.337l12.2-18.85-5.684-5.684Z"
                    transform="translate(-34.741 -286.768)"
                    fill="#b5b5b5"
                  />
                  <path
                    id="XMLID_1438_"
                    d="M235.24,107.465a30.611,30.611,0,1,0,0,43.29,30.41,30.41,0,0,0,0-43.29Zm-6.516,34.223a1.259,1.259,0,1,1-1.781,1.781L213.98,130.506l-12.963,12.963a1.259,1.259,0,0,1-1.781-1.781L212.2,128.725l-12.963-12.963a1.259,1.259,0,1,1,1.781-1.781l12.963,12.963,12.963-12.963a1.259,1.259,0,0,1,1.781,1.781l-12.963,12.963Z"
                    transform="translate(-144.714 -79.975)"
                    fill="#b5b5b5"
                  />
                  <path
                    id="XMLID_1435_"
                    d="M210.419,67.2a41.56,41.56,0,0,0-58.777,58.773l.005.005A41.56,41.56,0,0,0,210.419,67.2Zm-5.961,52.814a33.129,33.129,0,1,1,0-46.852A33.026,33.026,0,0,1,204.457,120.015Z"
                    transform="translate(-112.149 -47.455)"
                    fill="#b5b5b5"
                  />
                </g>
              </g>
            </g>
          </g>
        </svg>
      </div>
      <h5>{title}</h5>
      <p>
        {detailOne} <br /> {detailTwo}
      </p>
    </div>
  );
}

export default NotFoundTab;
