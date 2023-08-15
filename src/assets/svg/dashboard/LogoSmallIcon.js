import React from "react";

export default function LogoSmallIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="39"
      height="39"
      viewBox="0 0 39 39"
    >
      <defs>
        <filter
          id="Ellipse_8817"
          x="0"
          y="0"
          width="39"
          height="39"
          filterUnits="userSpaceOnUse"
        >
          <feOffset dy="3" input="SourceAlpha" />
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feFlood flood-opacity="0.161" />
          <feComposite operator="in" in2="blur" />
          <feComposite in="SourceGraphic" />
        </filter>
        <linearGradient
          id="linear-gradient"
          x1="0.017"
          y1="0.349"
          x2="1.085"
          y2="0.319"
          gradientUnits="objectBoundingBox"
        >
          <stop offset="0" stop-color="#3d80e9" />
          <stop offset="1" stop-color="#134a9c" />
        </linearGradient>
      </defs>
      <g
        id="Group_85467"
        data-name="Group 85467"
        transform="translate(-36 -135)"
      >
        <g transform="matrix(1, 0, 0, 1, 36, 135)" filter="url(#Ellipse_8817)">
          <circle
            id="Ellipse_8817-2"
            data-name="Ellipse 8817"
            cx="10.5"
            cy="10.5"
            r="10.5"
            transform="translate(9 6)"
            fill="#f7f7f7"
          />
        </g>
        <path
          id="Path_5609"
          data-name="Path 5609"
          d="M329,140.805a3.274,3.274,0,0,1,2.458,2.948h-1.173a2.069,2.069,0,0,0-.263-.82,2.123,2.123,0,0,0-2.492-.957,1.982,1.982,0,0,0-1.042.846q-.865,1.356-1.688,2.739a3.258,3.258,0,0,1-6.045-.982,3.239,3.239,0,0,1,1.368-3.306,3.189,3.189,0,0,1,3.554-.058,7.922,7.922,0,0,1,.906.828.189.189,0,0,1,.02.273c-.186.288-.359.584-.527.861a9.169,9.169,0,0,0-.776-.805,2.089,2.089,0,1,0,.4,2.729q.851-1.392,1.69-2.79A3.277,3.277,0,0,1,329,140.805Z"
          transform="translate(-269.572 7.535)"
          fill="url(#linear-gradient)"
        />
      </g>
    </svg>
  );
}
