import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import ReactMapGL, {
  NavigationControl,
  ScaleControl,
  Source,
  Layer,
} from "react-map-gl";
import { MAPBOX_STYLE } from "constants/map";
import { defaultCoordinates } from "helpers/Configuration";
import {
  MARKERS_LAYER_ID,
  loadMarkerIcons,
  markersLayerStyles,
  useMarkersGeojson,
} from "./MarkerHelpers";
import * as analytics from "services/analytics";

const useStyles = makeStyles((theme) => ({
  map: {
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
  },
}));

function Map({
  center,
  stakeholders,
  doSelectStakeholder,
  selectedStakeholder,
  categoryIds,
  loading,
  searchMapArea,
}, ref) {
  const classes = useStyles();
  const mapRef = useRef();
  const [markersLoaded, setMarkersLoaded] = useState(false);
  const [viewport, setViewport] = useState({
    ...center,
    zoom: defaultCoordinates.zoom,
  });

  useEffect(() => {
    analytics.postEvent("showMap");
  }, []);

  useEffect(() => {
    setViewport((viewport) => ({ ...viewport, ...center }));
  }, [center]);

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
    categoryIds,
  });

  useImperativeHandle(ref, () => ({
    getViewport: () => {
      const map = mapRef.current.getMap();

      const { lat: latitude, lng: longitude } = map.getCenter();
      const zoom = map.getZoom();
      const { width, height } = map.getContainer().getBoundingClientRect();

      return {
        center: { latitude, longitude },
        zoom,
        dimensions: { width, height },
      };
    },
  }), [])

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
        onClick={searchMapArea}
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

export default forwardRef(Map);
