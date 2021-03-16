import React from "react";
import PropTypes from "prop-types";
import { Marker } from "react-map-gl";
import { makeStyles } from "@material-ui/core/styles";

import mapMarker from "images/mapMarker";
import {
  MEAL_PROGRAM_CATEGORY_ID,
  FOOD_PANTRY_CATEGORY_ID,
} from "constants/stakeholder";

const useStyles = makeStyles(() => ({
  active: {
    zIndex: 1,
  },
}));

const MapMarker = ({ onClick, stakeholder, selectedStakeholder }) => {
  const {
    longitude,
    latitude,
    categories,
    inactive,
    inactiveTemporary,
  } = stakeholder;
  const classes = useStyles();
  const selected =
    selectedStakeholder && selectedStakeholder.id === stakeholder.id;
  return (
    <Marker
      longitude={longitude}
      latitude={latitude}
      className={selected ? classes.active : ""}
    >
      {mapMarker(
        categories[0]?.id === FOOD_PANTRY_CATEGORY_ID &&
          categories[1]?.id === MEAL_PROGRAM_CATEGORY_ID
          ? -1
          : categories[0]?.id === FOOD_PANTRY_CATEGORY_ID
          ? 0
          : 1,
        inactiveTemporary || inactive,
        onClick,
        selected
      )}
    </Marker>
  );
};

MapMarker.propTypes = {
  stakeholder: PropTypes.object,
  onClick: PropTypes.func,
  selectedStakeholder: PropTypes.object,
};

export default MapMarker;
