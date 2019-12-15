import React from "react";
import ReactMapGL from "react-map-gl";
import DeckGL, { GeoJsonLayer } from "deck.gl";
import Geocoder from "react-map-gl-geocoder";
import FilterMenu from "./FilterMenu";
import CurrentLocationIcon from "./CurrentLocationIcon";
import SearchBarAutocomplete from "./SearchBarAutocomplete";
import { MAPBOX_TOKEN } from "../secrets";
import { MAPBOX_STYLE } from "../constants/map";
import { makeStyles } from "@material-ui/core/styles";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "./SearchPage.css";

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
  const [searchResultLayer, setSearchResultLayer] = React.useState(null);
  const mapRef = React.useRef();
  const geocoderContainerRef = React.useRef();

  const handleOnResult = event => {
    console.log(event.result);
    const layer = new GeoJsonLayer({
      id: "search-result",
      data: event.result.geometry,
      getFillColor: [255, 0, 0, 128],
      getRadius: 1000,
      pointRadiusMinPixels: 10,
      pointRadiusMaxPixels: 10,
    });
    console.log(layer);
    setSearchResultLayer(layer);
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
        height={`80vh`}
        onViewportChange={newViewport => setViewport(newViewport)}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        mapStyle={MAPBOX_STYLE}
      >
        <Geocoder
          mapRef={mapRef}
          containerRef={geocoderContainerRef}
          onResult={handleOnResult}
          onViewportChange={newViewport => setViewport(newViewport)}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          proximity={{ latitude: 34.041001, longitude: -118.235036 }}
          placeholder="Search"
        />
        <DeckGL {...viewport} layers={[searchResultLayer]} />
      </ReactMapGL>
    </>
  );
}

export default SearchPage;
