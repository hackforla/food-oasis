import React from "react";
import { foodPantry, mealProgram, closed, white } from "theme/palette";

const MealIconStakeholder = ({
  height = "48px",
  width = "36px",
  viewBox = "0 0 36 48",
  isClosed,
}) => (
  <svg
    height={height}
    width={width}
    viewBox={viewBox}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M-0.00294876 17.3233C-0.00294876 26.8907 17.9946 48 17.9946 48C17.9946 48 35.9922 26.8907 35.9922 17.3233C35.9922 7.75591 27.9344 0 17.9946 0C8.05484 0 -0.00294876 7.75591 -0.00294876 17.3233Z"
      fill={isClosed ? closed : foodPantry}
    />
    <path
      d="M18 47.8351C23.759 41.4811 34.2728 27.111 35.9094 19.0272C36.1616 16.624 35.8858 14.1959 35.1007 11.901C34.3155 9.60606 33.0383 7.49431 31.3511 5.70161C29.6638 3.90936 27.6043 2.47582 25.3046 1.49369C23.005 0.511563 20.5169 0.00311929 18 0V7.63735V24.838V47.8351Z"
      fill={isClosed ? closed : foodPantry}
    />
    <path
      d="M18 47.8351C12.241 41.4811 1.72715 27.111 0.0905285 19.0272C-0.161116 16.624 0.114208 14.1963 0.899321 11.901C1.68443 9.60606 2.96169 7.49431 4.64892 5.70161C6.33614 3.90936 8.39572 2.47582 10.6953 1.49369C12.995 0.511563 15.4831 0.00311929 18 0V7.63735V24.838V47.8351Z"
      fill={isClosed ? closed : mealProgram}
    />
    <circle cx="18" cy="18" r="10" fill={white} />
  </svg>
);

export default MealIconStakeholder;
