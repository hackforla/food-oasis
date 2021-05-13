import React, { useState, useRef, useEffect, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import ReactMapGL, {
  NavigationControl,
  ScaleControl,
  Source,
  Layer,
} from "react-map-gl";
import { MAPBOX_STYLE } from "constants/map";
import { DEFAULT_CATEGORIES } from "constants/stakeholder";
import {
  MARKERS_LAYER_ID,
  loadMarkerIcons,
  markersLayerStyles,
  useMarkersGeojson,
} from "./MarkerHelpers";
import * as analytics from "services/analytics";

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
  stakeholders,
  categoryIds,
  doSelectStakeholder,
  selectedStakeholder,
  setToast,
  loading,
  setMapPosition,
  origin,
}, ref) {
  const classes = useStyles();
  const mapRef = useRef();
  const [markersLoaded, setMarkersLoaded] = useState(false);
  const [viewport, setViewport] = useState(null);

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

  const updateMapPosition = useCallback(() => {
    const map = mapRef.current.getMap();
    const center = map.getCenter();
    const bounds = map.getBounds();
    setMapPosition({
      center: {
        latitude: center.lat,
        longitude: center.lng,
      },
      bounds: {
        maxLat: bounds._ne.lat,
        minLat: bounds._sw.lat,
        maxLng: bounds._ne.lng,
        minLng: bounds._sw.lng,
      },
    })
  }, [setMapPosition])

  useEffect(() => {
    const { latitude, longitude, zoom } = origin;

    setViewport((viewport) => ({
      ...viewport,
      latitude,
      longitude,
      zoom: zoom || 13.5,
    }))

    const map = mapRef.current.getMap();
    const event = map.loaded() ? 'moveend' : 'load';
    map.once(event, updateMapPosition);
  }, [origin, updateMapPosition])

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
        onClick={updateMapPosition}
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

export default Map;
