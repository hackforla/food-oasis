import { mealProgram, closed, foodPantry, white } from "theme/palette";

const SplitPantryMealIcon = ({
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
        d="m25.5 56.34.761.649-.761.892-.761-.892.761-.649Zm0 0-.761.648h-.001l-.003-.004-.01-.012-.041-.049a78.34 78.34 0 0 1-.75-.898c-.51-.617-1.236-1.508-2.108-2.608a173.614 173.614 0 0 1-6.397-8.585c-2.326-3.346-4.667-7.022-6.43-10.496C7.254 30.898 6 27.517 6 24.806 6 14.385 14.767 6 25.5 6S45 14.384 45 24.807c0 2.71-1.254 6.09-2.999 9.529-1.764 3.474-4.104 7.15-6.43 10.496a173.614 173.614 0 0 1-6.397 8.585 169.281 169.281 0 0 1-2.7 3.32 78.34 78.34 0 0 1-.158.186l-.04.049-.011.012-.003.003v.001l-.762-.648Z"
        fill={selected ? foodPantry : white}
        stroke={white}
        stroke-width="2"
      />
    </g>
    <path
      d="M25.5 56.166c5.918-6.53 16.725-21.3 18.407-29.61a17.1 17.1 0 0 0-.831-7.324 17.626 17.626 0 0 0-3.854-6.372 18.515 18.515 0 0 0-6.215-4.325A19.187 19.187 0 0 0 25.499 7v49.166Z"
      fill={isClosed ? closed : foodPantry}
    />
    <path
      d="M25.5 56.166c-5.92-6.53-16.726-21.3-18.408-29.61-.258-2.47.025-4.965.832-7.324a17.628 17.628 0 0 1 3.853-6.372 18.516 18.516 0 0 1 6.215-4.325A19.188 19.188 0 0 1 25.5 7v49.166Z"
      fill={isClosed ? closed : mealProgram}
    />
    <circle cx="25.5" cy="25.501" r="9.25" fill="#fff" />
    <defs>
      <filter
        id="a"
        x="0"
        y="0"
        width="51"
        height="64.423"
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
          result="effect1_dropShadow_5756_11853"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_5756_11853"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);

export default SplitPantryMealIcon;
