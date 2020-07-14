import React from "react";
import PropTypes from "prop-types";
import { Marker } from "react-map-gl";
import mapMarker from "../images/mapMarker";
import {
  MEAL_PROGRAM_CATEGORY_ID,
  FOOD_PANTRY_CATEGORY_ID,
} from "../constants/stakeholder";

const MapMarker = ({
  latitude,
  longitude,
  onClick,
  categories,
  inactive,
  inactiveTemporary,
}) => (
  <Marker longitude={longitude} latitude={latitude}>
    {mapMarker(
      categories[0]?.id === FOOD_PANTRY_CATEGORY_ID &&
        categories[1]?.id === MEAL_PROGRAM_CATEGORY_ID
        ? -1
        : categories[0]?.id === FOOD_PANTRY_CATEGORY_ID
        ? 0
        : 1,
      inactiveTemporary || inactive ? true : false,
      onClick
    )}
  </Marker>
);

MapMarker.propTypes = {
  latitude: PropTypes.number,
  longitude: PropTypes.number,
  onClick: PropTypes.func,
  isVerified: PropTypes.bool,
  color: PropTypes.string,
};

export default MapMarker;
