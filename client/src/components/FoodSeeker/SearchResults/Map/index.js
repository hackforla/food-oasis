import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Button } from "@material-ui/core";
import ReactMapGL, * as Map from "react-map-gl";
import { MAPBOX_STYLE } from "constants/map";
import { defaultViewport } from "helpers/Configuration";
import {
  MARKERS_LAYER_ID,
  loadMarkerIcons,
  markersLayerStyles,
  useMarkersGeojson,
} from "./MarkerHelpers";
import useStyles from "./styles";
import * as analytics from "services/analytics";

const ResultsMap = ({
  center,
  stakeholders,
  doSelectStakeholder,
  selectedStakeholder,
  categoryIds,
  loading,
  searchMapArea,
}, ref) => {
  const classes = useStyles();
  const mapRef = useRef();
  const [markersLoaded, setMarkersLoaded] = useState(false);
  const [viewport, setViewport] = useState({
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: defaultViewport.zoom,
  });

  useEffect(() => {
    analytics.postEvent("showMap");
  }, []);

  useEffect(() => {
    setViewport((viewport) => ({
      ...viewport,
      latitude: center.latitude,
      longitude: center.longitude,
    }));
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
  }), []);

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
      <Map.NavigationControl
        showCompass={false}
        className={classes.navigationControl}
      />
      <Map.ScaleControl
        maxWidth={100}
        unit="imperial"
        className={classes.scaleControl}
      />
      {markersLoaded && (
        <Map.Source type="geojson" data={markersGeojson}>
          <Map.Layer {...markersLayerStyles} />
        </Map.Source>
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

export default forwardRef(ResultsMap);
