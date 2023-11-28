import React from "react";
import { foodPantry, closed, white } from "theme/palette";

const PantryIcon = ({
  height = "53px",
  width = "67px",
  onClick,
  selected = false,
  viewBox = "0 0 64 84",
  isClosed,
}) => (
  <svg
    width={width}
    height={height}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    onClick={onClick}
    viewBox={viewBox}
  >
    <g filter="url(#a)">
      <path
        d="m26.2 58.663.763.645-.764.904-.763-.904.763-.645Zm0 0-.765.645v-.001l-.003-.003-.011-.014-.043-.05a116.008 116.008 0 0 1-.778-.94 176.37 176.37 0 0 1-2.187-2.73 181.655 181.655 0 0 1-6.636-8.987c-2.413-3.502-4.841-7.35-6.67-10.985C7.297 31.999 6 28.469 6 25.645 6 14.768 15.072 6 26.2 6c11.127 0 20.198 8.768 20.198 19.645 0 2.824-1.296 6.354-3.106 9.953-1.829 3.635-4.257 7.483-6.67 10.985a181.655 181.655 0 0 1-6.636 8.987 176.37 176.37 0 0 1-2.802 3.475l-.163.195-.043.05-.01.014-.004.003-.765-.644Z"
        fill={isClosed ? closed : selected ? white : foodPantry}
        stroke={selected ? foodPantry : white}
        stroke-width="2"
      />
      <path
        d="M26.373 38.29c-.706.64-2.084.999-3.268.999-4.071 0-9.648-5.886-9.648-11.13 0-5.243 2.65-8.962 6.72-8.962 2.209 0 3.99.219 4.942 1.139l-.018-.058s-.735-2.563-1.937-3.1c.664-.29 1.894-1.103 1.894-1.103s1.893 2.1 1.893 4.206v.055c1.399-1.004 3.071-1.626 5.615-1.626 4.071 0 6.722 4.206 6.722 9.45 0 5.243-5.775 11.129-9.846 11.129-1.194 0-2.36-.348-3.07-1Z"
        fill={selected ? foodPantry : white}
      />
      <path
        d="M31.452 16.845c-1.085 1.46-3.471 1.898-3.471 1.898s-.627-1.927.459-3.386c1.085-1.458 3.47-1.899 3.47-1.899s.626 1.927-.458 3.387Z"
        fill={white}
      />
    </g>
    <defs>
      <filter
        id="a"
        x="0"
        y="0"
        width="52.398"
        height="66.761"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset />
        <feGaussianBlur stdDeviation="2.5" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0" />
        <feBlend
          in2="BackgroundImageFix"
          result="effect1_dropShadow_5756_11836"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_5756_11836"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);

export default PantryIcon;
