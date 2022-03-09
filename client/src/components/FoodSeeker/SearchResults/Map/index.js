import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from "react";
import PropTypes from "prop-types";
// Mapbox is tricky, because version 6.* is "incompatible with some Babel transforms
// because of the way it shares code between the maint thread and Web Worker."
// See https://docs.mapbox.com/mapbox-gl-js/guides/install/#transpiling for details
// https://github.com/mapbox/mapbox-gl-js/issues/10565 for current Create-React-App
// recommendation from Mapbox team
// https://github.com/mapbox/mapbox-gl-js/issues/10173  See comment by IvanDreamer on Mar 22
// for craco.config.js contents
import ReactMapGL, * as Map from "react-map-gl";
import { MAPBOX_STYLE } from "constants/map";
import { defaultViewport } from "helpers/Configuration";
import {
  MARKERS_LAYER_ID,
  loadMarkerIcons,
  markersLayerStyles,
  useMarkersGeojson,
} from "./MarkerHelpers";
import { regionFillStyle, regionBorderStyle } from "./RegionHelpers";
import useStyles from "./styles";
import * as analytics from "services/analytics";
import { Button } from "../../../../components/UI";

const ResultsMap = (
  {
    center,
    stakeholders,
    doSelectStakeholder,
    selectedStakeholder,
    categoryIds,
    loading,
    searchMapArea,
    regionGeoJSON,
  },
  ref
) => {
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

  useImperativeHandle(
    ref,
    () => ({
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
    }),
    []
  );

  return (
    <ReactMapGL
      ref={mapRef}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
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
      {regionGeoJSON && (
        <Map.Source id="my-data" type="geojson" data={regionGeoJSON}>
          <Map.Layer {...regionFillStyle} />
          <Map.Layer {...regionBorderStyle} />
        </Map.Source>
      )}
      <Button
        variant="outlined"
        onClick={searchMapArea}
        size="small"
        className={classes.searchButton}
        disabled={loading}
      >
        Search this area
      </Button>
    </ReactMapGL>
  );
};

export default forwardRef(ResultsMap);

ResultsMap.propTypes = {
  ref: PropTypes.any,
  stakeholders: PropTypes.arrayOf(PropTypes.object),
  categoryIds: PropTypes.any,
  loading: PropTypes.bool,
  searchMapArea: PropTypes.any,
  regionGeoJSON: PropTypes.object,
};
