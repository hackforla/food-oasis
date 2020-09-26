import React from "react";
import PropTypes from "prop-types";
import { Marker } from "react-map-gl";

import mapMarker from "images/mapMarker";
import {
  MEAL_PROGRAM_CATEGORY_ID,
  FOOD_PANTRY_CATEGORY_ID,
} from "constants/stakeholder";

const MapMarker = ({ onClick, stakeholder, selectedStakeholder }) => {
  const {
    longitude,
    latitude,
    categories,
    inactive,
    inactiveTemporary,
  } = stakeholder;
  return (
    <div
      style={{
        opacity:
          !!selectedStakeholder && selectedStakeholder.id !== stakeholder.id
            ? 0.6
            : 1,
      }}
    >
      <Marker longitude={longitude} latitude={latitude}>
        {mapMarker(
          categories[0]?.id === FOOD_PANTRY_CATEGORY_ID &&
            categories[1]?.id === MEAL_PROGRAM_CATEGORY_ID
            ? -1
            : categories[0]?.id === FOOD_PANTRY_CATEGORY_ID
            ? 0
            : 1,
          inactiveTemporary || inactive ? true : false,
          onClick,
          selectedStakeholder && selectedStakeholder.id === stakeholder.id
        )}
      </Marker>
    </div>
  );
};

MapMarker.propTypes = {
  stakeholder: PropTypes.object,
  onClick: PropTypes.func,
  selectedStakeholder: PropTypes.object,
};

export default MapMarker;
