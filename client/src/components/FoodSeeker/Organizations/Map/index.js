import React, { useState, useRef, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import ReactMapGL, {
  NavigationControl,
  ScaleControl,
  Source,
  Layer,
} from "react-map-gl";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { MAPBOX_STYLE } from "constants/map";
import { DEFAULT_CATEGORIES } from "constants/stakeholder";
import * as analytics from "services/analytics";
import {
  MARKERS_LAYER_ID,
  loadMarkerIcons,
  markersLayerStyles,
  useMarkersGeojson,
} from "./MarkerHelpers";

const useStyles = makeStyles((theme) => ({
  map: {
    width: '100%',
    height: '100%',
    position: 'relative',
    '& .mapboxgl-ctrl-attrib-button': {
      display: 'none',
    },
  },
  scaleControl: {
    top: 8,
    left: 8,
  },
  navigationControl: {
    top: 8,
    right: 8,
  },
  searchButton: {
    position: "absolute",
    top: 5,
    left: "50%",
    transform: "translate(-50%)",
    backgroundColor: "white",
    zIndex: 1000,
  },
}));

function Map({
  handleSearch,
  stakeholders,
  categoryIds,
  doSelectStakeholder,
  selectedStakeholder,
  viewport,
  setViewport,
  setToast,
  loading,
}) {
  const classes = useStyles();
  const mapRef = useRef();
  const [markersLoaded, setMarkersLoaded] = useState(false);

  useEffect(() => {
    analytics.postEvent("showMap");
  }, []);

  const onLoad = useCallback(async () => {
    const map = mapRef.current.getMap();
    await loadMarkerIcons(map);
    setMarkersLoaded(true);
  }, []);

  const onClick = useCallback(
    (e) => {
      if (!e.features || !e.features.length) {
        doSelectStakeholder(null);
      } else if (stakeholders) {
        const { id } = e.features[0];
        const selectedStakeholder = stakeholders.find((sh) => sh.id === id);
        doSelectStakeholder(selectedStakeholder);
      }
    },
    [stakeholders, doSelectStakeholder]
  );

  const interactiveLayerIds = markersLoaded ? [MARKERS_LAYER_ID] : undefined;

  const getCursor = useCallback(({ isHovering, isDragging }) => {
    return isDragging ? "grabbing" : isHovering ? "pointer" : "grab";
  }, []);

  const markersGeojson = useMarkersGeojson({
    stakeholders,
    selectedStakeholder,
    categoryIds: categoryIds.length ? categoryIds : DEFAULT_CATEGORIES,
  });

  const searchArea = (e) => {
    const map = mapRef.current.getMap();
    const center = map.getCenter();
    const mapBounds = map.getBounds();
    const bounds = {
      maxLat: mapBounds._ne.lat,
      minLat: mapBounds._sw.lat,
      maxLng: mapBounds._ne.lng,
      minLng: mapBounds._sw.lng,
    };
    analytics.postEvent("searchArea", {});
    handleSearch(center, bounds);
  };

  return (
    <ReactMapGL
      ref={mapRef}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      mapStyle={MAPBOX_STYLE}
      {...viewport}
      onViewportChange={setViewport}
      onLoad={onLoad}
      onClick={onClick}
      interactiveLayerIds={interactiveLayerIds}
      getCursor={getCursor}
      width="100%"
      height="100%"
      className={classes.map}
    >
      <NavigationControl
        showCompass={false}
        className={classes.navigationControl}
      />
      <ScaleControl
        maxWidth={100}
        unit="imperial"
        className={classes.scaleControl}
      />
      {markersLoaded && (
        <Source type="geojson" data={markersGeojson}>
          <Layer {...markersLayerStyles} />
        </Source>
      )}
      <Button
        onClick={searchArea}
        variant="outlined"
        size="small"
        className={classes.searchButton}
        disabled={loading}
      >
        Search this area
      </Button>
    </ReactMapGL>
  );
}

Map.propTypes = {
  stakeholders: PropTypes.array,
  categoryIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  setZoom: PropTypes.func,
};

export default Map;
