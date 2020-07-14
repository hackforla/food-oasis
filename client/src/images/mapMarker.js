import React from "react";
import { foodPantry, mealProgram, closed } from "../theme/colors";

const MapMarker = (color, isVerified, splitInactive, onClick = null) => {
  if (splitInactive && !color)
    return (
      <svg
        version="1.1"
        id="Layer_2"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        width="35px"
        height="48px"
        viewBox="0 0 35 48"
        enable-background="new 0 0 35 48"
        xmlSpace="preserve"
      >
        <path
          fill={closed}
          d="M17.5,24.898c-4.766,0-8.627-3.863-8.627-8.628s3.863-8.628,8.627-8.628h0V0.093h0
  C7.97,0.093,0.245,7.819,0.245,17.35c0,9.529,17.255,30.557,17.255,30.557l0-0.001L17.5,24.898L17.5,24.898z"
        />
        <path
          fill={closed}
          d="M17.5,0.093v7.549c4.766,0,8.627,3.863,8.627,8.628s-3.861,8.628-8.627,8.628v23.007
  c0.011-0.013,17.256-21.029,17.256-30.556C34.756,7.818,27.029,0.094,17.5,0.093z"
        />
      </svg>
    );

  if (!color) {
    const splitUnverified = (
      <svg
        version="1.1"
        id="Layer_2"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        width="35px"
        height="48px"
        viewBox="0 0 35 48"
        enable-background="new 0 0 35 48"
        xmlSpace="preserve"
        onClick={onClick}
      >
        <path
          fill={foodPantry}
          d="M17.5,24.898c-4.766,0-8.627-3.863-8.627-8.628s3.863-8.628,8.627-8.628h0V0.093h0
   C7.97,0.093,0.245,7.819,0.245,17.35c0,9.529,17.255,30.557,17.255,30.557l0-0.001L17.5,24.898L17.5,24.898z"
        />
        <path
          fill={mealProgram}
          d="M17.5,0.093v7.549c4.766,0,8.627,3.863,8.627,8.628s-3.861,8.628-8.627,8.628v23.007
   c0.011-0.013,17.256-21.029,17.256-30.556C34.756,7.818,27.029,0.094,17.5,0.093z"
        />
        <circle cx="17.6361" cy="16.875" r="8.5" fill="white" />
      </svg>
    );

    return splitUnverified;
  }

  const unverfied = (
    <svg x="0px" y="0px" width="35px" height="48px" viewBox="0 0 35 48">
      <path
        fill={color}
        d="M17.5,0.094c-9.53,0-17.255,7.726-17.255,17.256c0,9.529,17.255,30.557,17.255,30.557 S34.756,26.879,34.756,17.35C34.756,7.819,27.029,0.094,17.5,0.094z M17.5,24.898c-4.765,0-8.627-3.862-8.627-8.627 s3.863-8.628,8.627-8.628c4.765,0,8.627,3.863,8.627,8.628S22.265,24.898,17.5,24.898z"
      />
    </svg>
  );

  return unverfied;
};

export default MapMarker;
