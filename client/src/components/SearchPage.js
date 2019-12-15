import React from "react";
import ReactMapGL from "react-map-gl";
import { makeStyles } from "@material-ui/core/styles";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";

import FilterMenu from "./FilterMenu";
import CurrentLocationIcon from "./CurrentLocationIcon";
import { MAPBOX_TOKEN } from "../secrets";
import { MAPBOX_STYLE } from "../constants/map";

const useStyles = makeStyles(theme => ({
  searchBarContainer: {
    backgroundColor: "white",
    display: "flex",
    justifyContent: "flex-start",
    margin: ".5rem",
    boxShadow: "0px 2px 10px -1px #bfbfbf",
    borderRadius: "30px",
  },
}));

function SearchPage() {
  const classes = useStyles();
  const [viewport, setViewport] = React.useState({
    zoom: 10, // TODO: can we dynamically control zoom radius based on selectedDistance?
    latitude: 34.041001,
    longitude: -118.235036,
  });

  return (
    <ReactMapGL
      {...viewport}
      width={`100vw`}
      height={`90vh`}
      onViewportChange={newViewport => setViewport(newViewport)}
      mapboxApiAccessToken={MAPBOX_TOKEN}
      mapStyle={MAPBOX_STYLE}
    >
      <div className={classes.searchBarContainer}>
        <FilterMenu />
        {/* TODO: hook up to user location tracking logic */}
        <CurrentLocationIcon isTrackingEnabled={true} />
        <div>🔎 LocationAutoComplete</div>
      </div>
    </ReactMapGL>
  );
}

export default SearchPage;
