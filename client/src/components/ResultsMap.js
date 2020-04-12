import React from "react";
import ReactMapGL, { NavigationControl } from "react-map-gl";
import MarkerPopup from "./MarkerPopup";
import Marker from "./Marker";
import { MAPBOX_TOKEN } from "../secrets";
import { MAPBOX_STYLE } from "../constants/map";

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
  selectedLatitude = 34.07872,
  selectedLongitude = -118.243328,
  stakeholders,
}) {
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
        width={`66vw`} // TODO: this should be calculated depending on the screen width...
        height={`calc(100vh - 250px)`} // TODO: this should be calculated depending on the screen width...
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
            .map((stakeholder, index) => (
              <Marker
                onClick={() => handleMarkerClick(stakeholder)}
                key={`marker-${index}`}
                longitude={stakeholder.longitude}
                latitude={stakeholder.latitude}
              />
            ))}
        {isPopupOpen && selectedStakeholder && (
          <MarkerPopup entity={selectedStakeholder} handleClose={handleClose} />
        )}
      </ReactMapGL>
    </div>
  );
}

export default Map;
