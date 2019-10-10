import React from "react";
import ReactMapGL, { GeolocateControl, NavigationControl } from "react-map-gl";
import { MAPBOX_TOKEN } from "../secrets";
import { MAPBOX_STYLE } from "../constants/map";

const styles = {
  geolocate: {
    position: "absolute",
    top: 0,
    left: 0,
    margin: 10,
  },
  mapContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "0 1rem 1rem",
  },
  controlPanel: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },
  navigationControl: { position: "absolute", top: 0, right: 0, margin: 10 },
};

function Map() {
  const [viewport, setViewport] = React.useState({
    latitude: 34.041018,
    longitude: -118.235528,
    zoom: 8,
  });

  return (
    <div style={styles.mapContainer}>
      <div style={styles.controlPanel}>
        <p>FILTER PANEL</p>
        <p>SEARCH</p>
      </div>

      <ReactMapGL
        {...viewport}
        width={`90vw`}
        height={`82vh`}
        onViewportChange={newViewport => setViewport({ ...newViewport })}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        mapStyle={MAPBOX_STYLE}
      >
        <GeolocateControl
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
          style={styles.geolocate}
        />
        <div style={styles.navigationControl}>
          <NavigationControl />
        </div>
      </ReactMapGL>
    </div>
  );
}

export default Map;
