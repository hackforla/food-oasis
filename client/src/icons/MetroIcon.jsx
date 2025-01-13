import { white } from "theme/palette";

const MetroIcon = ({
  height = "43px",
  width = "56px",
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
    <g>
      {/* background */}
      <path
        d="M7 25.142C7 35.16 25.85 57.267 25.85 57.267S44.7 35.16 44.7 25.14c0-10.019-8.44-18.14-18.85-18.14C15.438 7 7 15.121 7 25.14Z"
        fill={selected ? "#262626" : white}
      />
    </g>
    {/* inner icon */}
    <path
      d="M 15.5 2.5 C 11.640625 2.5 8.5 5.515625 8.5 9.21875 L 8.5 35.78125 C 8.5 38.777344 10.542969 41.328125 13.375 42.1875 L 9.78125 45.78125 C 9.382813 46.179688 9.382813 46.820313 9.78125 47.21875 C 10.179688 47.617188 10.820313 47.617188 11.21875 47.21875 L 15.9375 42.5 L 35.0625 42.5 L 39.78125 47.21875 C 40.179688 47.617188 40.820313 47.617188 41.21875 47.21875 C 41.617188 46.820313 41.617188 46.179688 41.21875 45.78125 L 37.625 42.1875 C 40.457031 41.328125 42.5 38.777344 42.5 35.78125 L 42.5 9.21875 C 42.5 5.515625 39.359375 2.5 35.5 2.5 Z M 17.5 6.5 L 33.5 6.5 C 34.054688 6.5 34.5 6.949219 34.5 7.5 C 34.5 8.050781 34.054688 8.5 33.5 8.5 L 17.5 8.5 C 16.949219 8.5 16.5 8.050781 16.5 7.5 C 16.5 6.949219 16.949219 6.5 17.5 6.5 Z M 10.5 12.5 L 24.5 12.5 L 24.5 25.5 L 10.5 25.5 Z M 26.5 12.5 L 40.5 12.5 L 40.5 25.5 L 26.5 25.5 Z M 16.5 30.5 C 18.15625 30.5 19.5 31.84375 19.5 33.5 C 19.5 35.15625 18.15625 36.5 16.5 36.5 C 14.84375 36.5 13.5 35.15625 13.5 33.5 C 13.5 31.84375 14.84375 30.5 16.5 30.5 Z M 34.5 30.5 C 36.15625 30.5 37.5 31.84375 37.5 33.5 C 37.5 35.15625 36.15625 36.5 34.5 36.5 C 32.84375 36.5 31.5 35.15625 31.5 33.5 C 31.5 31.84375 32.84375 30.5 34.5 30.5 Z"
      fill={!selected ? "#000000" : white}
    />

    {/* unclear what defs does */}
    {/* <defs>
      <filter
        id="a"
        x="0"
        y="0"
        width="51.699"
        height="65.349"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
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
    </defs> */}
  </svg>
);

export default MetroIcon;
