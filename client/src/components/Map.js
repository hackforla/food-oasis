import React from "react";
import ReactMapGL, { GeolocateControl, NavigationControl } from "react-map-gl";
import MarkerPopup from "./MarkerPopup";
import Marker from "./Marker";
import { useMap } from "../hooks/useMap";
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
  const { state, dispatch, actionTypes } = useMap();
  if (state.isLoading) return <div>LOADING...</div>;

  return (
    <div style={styles.mapContainer}>
      <div style={styles.controlPanel}>
        <p>FILTER PANEL</p>
        <p>SEARCH</p>
      </div>

      <ReactMapGL
        {...state.viewport}
        width={`90vw`}
        height={`82vh`}
        onViewportChange={newViewport =>
          dispatch({ type: actionTypes.UPDATE_VIEWPORT, newViewport })
        }
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
        {state.stakeholders &&
          state.stakeholders.map((stakeholder, index) => (
            <Marker
              onClick={() =>
                dispatch({
                  type: actionTypes.STAKEHOLDERS.SELECT_STAKEHOLDER,
                  stakeholder,
                })
              }
              key={`marker-${index}`}
              longitude={stakeholder.longitude}
              latitude={stakeholder.latitude}
            />
          ))}
        {state.isPopupOpen && state.selectedStakeholder && (
          <MarkerPopup
            entity={state.selectedStakeholder}
            handleClose={() =>
              dispatch({ type: actionTypes.STAKEHOLDERS.DESELECT_STAKEHOLDER })
            }
          />
        )}
      </ReactMapGL>
    </div>
  );
}

export default Map;
