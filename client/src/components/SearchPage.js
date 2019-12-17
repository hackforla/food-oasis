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
  const mapRef = React.useRef();
  const geocoderContainerRef = React.useRef();
  const classes = useStyles();

  const [viewport, setViewport] = React.useState({
    zoom: 10, // TODO: can we dynamically control zoom radius based on selectedDistance?
    latitude: 34.041001,
    longitude: -118.235036,
  });
  const [searchResultLayer, setSearchResultLayer] = React.useState(null);
  const [isTrackingEnabled, setIsTrackingEnabled] = React.useState(false);
  const [coordinates, setCoordinates] = React.useState({
    latitude: null,
    longitude: null,
  });

  const handleTrackingToggle = async () => {
    if (isTrackingEnabled) {
      setIsTrackingEnabled(false);
      setCoordinates({ latitude: null, longitude: null });
      return;
    }

    // TODO: Handle the loading state for this operation at the Icon Button
    navigator.geolocation.getCurrentPosition(
      position => {
        setIsTrackingEnabled(true);
        setCoordinates({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });

        const layer = new GeoJsonLayer({
          id: "search-result",
          data: {
            coordinates: [position.coords.longitude, position.coords.latitude],
            type: "Point",
          },
          getFillColor: [255, 0, 0, 128],
          getRadius: 1000,
          pointRadiusMinPixels: 10,
          pointRadiusMaxPixels: 10,
        });
        setSearchResultLayer(layer);
        setViewport({
          ...viewport,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      error => {
        console.log(error);
        setIsTrackingEnabled(false);
        setCoordinates({ latitude: null, longitude: null });
      },
    );
  };

  const handleOnSearchResult = event => {
    const [longitude, latitude] = event.result.geometry.coordinates;
    setCoordinates({ longitude, latitude });

    // create new geojsonlayer for searchresult flyto
    const layer = new GeoJsonLayer({
      id: "search-result",
      data: event.result.geometry,
      getFillColor: [255, 0, 0, 128],
      getRadius: 1000,
      pointRadiusMinPixels: 10,
      pointRadiusMaxPixels: 10,
    });

    setSearchResultLayer(layer);
  };

  return (
    <>
      <div className={classes.searchBarContainer}>
        <SearchBarAutocomplete ref={geocoderContainerRef} />
        <CurrentLocationIcon
          isTrackingEnabled={isTrackingEnabled}
          onClick={handleTrackingToggle}
        />
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
          onResult={handleOnSearchResult}
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
