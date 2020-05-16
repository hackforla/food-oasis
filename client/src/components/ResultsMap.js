import React from "react";
import PropTypes from "prop-types";
import ReactMapGL, { NavigationControl } from "react-map-gl";
import MarkerPopup from "./MarkerPopup";
import Marker from "./Marker";
import { MAPBOX_TOKEN } from "../secrets";
import {
  DEFAULT_CATEGORIES,
  FOOD_PANTRY_CATEGORY_ID,
  MAPBOX_STYLE,
  MEAL_PROGRAM_CATEGORY_ID,
  ORGANIZATION_COLORS,
} from "../constants/map";

const styles = {
  geolocate: {
    position: "absolute",
    top: 0,
    left: 0,
    margin: 10,
  },
  navigationControl: { position: "absolute", top: 0, right: 0, margin: 10 },
};

function Map({
  selectedLatitude,
  selectedLongitude,
  stakeholders,
  categoryIds,
}) {
  const categoryIdsOrDefault = categoryIds.length
    ? categoryIds
    : DEFAULT_CATEGORIES;

  const [isPopupOpen, setIsPopupOpen] = React.useState(false);
  const [selectedStakeholder, setSelectedStakeholder] = React.useState(null);
  const [viewport, setViewport] = React.useState({
    zoom: 10, // TODO: can we dynamically control zoom radius based on selectedDistance?
    latitude: selectedLatitude,
    longitude: selectedLongitude,
  });

  const handleMarkerClick = (clickedStakeholder) => {
    setSelectedStakeholder(clickedStakeholder);
    setIsPopupOpen(true);
  };

  const handleClose = () => {
    setIsPopupOpen(false);
    setSelectedStakeholder(null);
  };

  return (
    <div>
      <ReactMapGL
        {...viewport}
        width="100%"
        height="max(calc(100vh - 250px),47em)"
        onViewportChange={(newViewport) => setViewport(newViewport)}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        mapStyle={MAPBOX_STYLE}
      >
        <div style={styles.navigationControl}>
          <NavigationControl />
        </div>
        {stakeholders &&
          stakeholders
            .filter((sh) => sh.latitude && sh.longitude)
            .map((stakeholder, index) => {
              const isVerified = !!stakeholder.approvedDate;
              /*todo
               * implement condition based on api data
               * */

              const categories = stakeholder.categories.filter(({ id }) => {
                return categoryIdsOrDefault.includes(id);
              });

              /* console.log(categories) */

              const color = categories.find(
                ({ id }) => id === MEAL_PROGRAM_CATEGORY_ID
              )
                ? ORGANIZATION_COLORS[MEAL_PROGRAM_CATEGORY_ID]
                : ORGANIZATION_COLORS[FOOD_PANTRY_CATEGORY_ID];
              return (
                <Marker
                  onClick={() => handleMarkerClick(stakeholder)}
                  key={`marker-${index}`}
                  longitude={stakeholder.longitude}
                  latitude={stakeholder.latitude}
                  isVerified={isVerified}
                  color={color}
                />
              );
            })}
        {isPopupOpen && selectedStakeholder && (
          <MarkerPopup entity={selectedStakeholder} handleClose={handleClose} />
        )}
      </ReactMapGL>
    </div>
  );
}

Map.propTypes = {
  stakeholders: PropTypes.array,
  categoryIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  selectedLatitude: PropTypes.number.isRequired,
  selectedLongitude: PropTypes.number.isRequired,
};

export default Map;
