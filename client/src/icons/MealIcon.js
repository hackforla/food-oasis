import React from "react";
import { mealProgram, closed, white } from "theme/palette";

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
        d="M7 25.142C7 35.16 25.85 57.267 25.85 57.267S44.7 35.16 44.7 25.14c0-10.019-8.44-18.14-18.85-18.14C15.438 7 7 15.121 7 25.14Z"
        fill={isClosed ? closed : selected ? white : mealProgram}
      />
      <path
        d="m25.85 57.267.76.648-.76.893-.762-.892.761-.65Zm0 0-.762.648-.004-.004-.01-.013-.042-.049-.16-.19a172.391 172.391 0 0 1-2.752-3.382 176.944 176.944 0 0 1-6.517-8.745c-2.369-3.408-4.754-7.153-6.55-10.691-1.778-3.502-3.054-6.943-3.054-9.7 0-10.607 8.924-19.14 19.85-19.14C36.776 6 45.7 14.533 45.7 25.14c0 2.757-1.276 6.198-3.053 9.7-1.797 3.538-4.181 7.283-6.55 10.691a177.003 177.003 0 0 1-6.518 8.745 171.789 171.789 0 0 1-2.751 3.382l-.16.19-.042.05-.01.012-.004.003v.001l-.762-.648Z"
        stroke={selected ? mealProgram : white}
        stroke-width="2"
      />
    </g>
    <path
      d="M30.992 14.587c.955 0 1.141.998 1.141.998v9.351c0 2.897-3.42 3.57-3.42 3.57l.03 9.35s-.03 1.865-2.295 1.865h-1.152c-2.2 0-2.24-1.866-2.24-1.866l-.03-9.35s-3.46-.652-3.46-3.559v-9.404s.027-.955 1.141-.955 1.132.034 1.132.955c0 .92.036 6.746.036 6.746s.078.889.597.889c.518 0 .478-.89.478-.89v-6.745c0-.955.014-.955 1.154-.955s1.192.034 1.192.955v6.844s.04.856.557.856c.516 0 .568-.921.568-.921v-6.8c0-.934.2-.934 1.235-.934 1.035 0 1.1.056 1.1.912v6.708s-.04 1.068.517 1.068c.577 0 .61-1.01.61-1.01s.01-5.726.01-6.702.145-.976 1.1-.976Z"
      fill={selected ? mealProgram : white}
    />
    <defs>
      <filter
        id="a"
        x="0"
        y="0"
        width="51.699"
        height="65.349"
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
          result="effect1_dropShadow_5756_11790"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_5756_11790"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);

export default PantryIcon;
