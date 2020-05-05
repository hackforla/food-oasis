import React from "react";
import PropTypes from "prop-types";
import { Marker } from "react-map-gl";
import { ORGANIZATION_COLORS } from "../constants/map";
import shadows from "@material-ui/core/styles/shadows";

const style = {
  svg: {
    height: "100%",
    cursor: "pointer",
  },
  path: ({ color }) => ({
    fill: color,
  }),
  check: ({ isVerified }) => ({
    opacity: isVerified ? 1 : 0,
    fill: "transparent",
    strokeWidth: 6,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeMiterlimit: 10,
    stroke: "#ffffff",
  }),
  circle: ({ isVerified }) => ({
    opacity: isVerified ? 0 : 1,
  }),
  container: {
    height: 48,
  },
  shadow: {
    position: "absolute",
    borderRadius: 100,
    height: 15,
    width: 15,
    top: 0,
    left: 0,
    background: "radial-gradient(circle, rgba(0,0,0,.5) 0%, rgba(0,0,0,0) 95%)",
    transformOrigin: "center",
    transform: "translate(-50%, -50%) scaleY(.5)",
  },
};

export default function MapMarker({
  latitude,
  longitude,
  onClick,
  isVerified,
  color,
}) {
  return (
    <Marker longitude={longitude} latitude={latitude}>
      <div style={style.container}>
        <svg
          onClick={onClick}
          style={{
            ...style.svg,
            transform: `translate(-50%,-100%)`,
          }}
          viewBox="0 0 35 48"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <clipPath id="outline">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M17.5,48C17.5,48,0,26.9,0,17.4C0,7.8,7.8,0.1,17.5,0.1C27.2,0.1,35,7.8,35,17.4C35,26.9,17.5,48,17.5,48z"
              />
            </clipPath>
          </defs>
          <path
            style={style.path({ color })}
            fillRule="evenodd"
            clipRule="evenodd"
            d="M17.5,48C17.5,48,0,26.9,0,17.4C0,7.8,7.8,0.1,17.5,0.1C27.2,0.1,35,7.8,35,17.4C35,26.9,17.5,48,17.5,48z"
          />
          <circle
            style={style.circle({ isVerified })}
            cx="17.6361"
            cy="16.875"
            r="8.5"
            fill="white"
          />
          <polyline
            style={style.check({ isVerified })}
            points="10,18 17,28.7 34,4"
            clipPath="url(#outline)"
          />
        </svg>
        <div style={style.shadow}></div>
      </div>
    </Marker>
  );
}

MapMarker.propTypes = {
  latitude: PropTypes.number,
  longitude: PropTypes.number,
  onClick: PropTypes.func,
  isVerified: PropTypes.bool,
  color: PropTypes.string,
};
