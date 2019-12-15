import React from "react";
import ReactMapGL from "react-map-gl";
import { makeStyles } from "@material-ui/core/styles";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "./SearchPage.css";
import Geocoder from "react-map-gl-geocoder";
import FilterMenu from "./FilterMenu";
import CurrentLocationIcon from "./CurrentLocationIcon";
import SearchBarAutocomplete from "./SearchBarAutocomplete";
import { MAPBOX_TOKEN } from "../secrets";
import { MAPBOX_STYLE } from "../constants/map";

const useStyles = makeStyles(theme => ({
  searchBarContainer: {
    backgroundColor: "white",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    margin: ".5rem",
    boxShadow: "0px 2px 10px -1px #bfbfbf",
    borderRadius: "30px",
    paddingLeft: "1rem",
  },
}));

function SearchPage() {
  const classes = useStyles();
  const [viewport, setViewport] = React.useState({
    zoom: 10, // TODO: can we dynamically control zoom radius based on selectedDistance?
    latitude: 34.041001,
    longitude: -118.235036,
  });
  const mapRef = React.useRef();
  const geocoderContainerRef = React.useRef();

  const handleOnResult = event => {
    console.log(event.result);
  };

  return (
    <>
      <div className={classes.searchBarContainer}>
        <SearchBarAutocomplete ref={geocoderContainerRef} />
        {/* TODO: hook up to user location tracking logic */}
        <CurrentLocationIcon isTrackingEnabled={true} />
        <FilterMenu />
      </div>
      <ReactMapGL
        ref={mapRef}
        {...viewport}
        width={`100vw`}
        height={`90vh`}
        onViewportChange={newViewport => setViewport(newViewport)}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        mapStyle={MAPBOX_STYLE}
      >
        <Geocoder
          mapRef={mapRef}
          containerRef={geocoderContainerRef}
          onResult={handleOnResult}
          onViewportChange={() => {}}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          proximity={{ latitude: 34.041001, longitude: -118.235036 }}
          placeholder="Search"
        />
      </ReactMapGL>
    </>
  );
}

export default SearchPage;
