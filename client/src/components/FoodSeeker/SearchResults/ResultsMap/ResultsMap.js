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
import { Button } from "@mui/material";
import {
  useSearchCoordinates,
  useAppDispatch,
  useNeighborhood,
  DEFAULT_COORDINATES,
  useSelectedOrganization,
  useUserCoordinates,
} from "../../../../appReducer";
import "mapbox-gl/dist/mapbox-gl.css";
import { useNavigate, useLocation } from "react-router-dom";
import useFeatureFlag from "hooks/useFeatureFlag";

const ResultsMap = (
  {
    stakeholders,
    categoryIds,
    loading,
    searchMapArea,
  },
  ref
) => {
  const classes = useStyles();
  const mapRef = useRef();
  const [markersLoaded, setMarkersLoaded] = useState(false);
  const searchCoordinates = useSearchCoordinates();
  const selectedOrganization = useSelectedOrganization();
  const navigate = useNavigate();
  const location = useLocation();

  const longitude =
    searchCoordinates?.longitude ||
    selectedOrganization?.longitude ||
    DEFAULT_COORDINATES.longitude;
  const latitude =
    searchCoordinates?.latitude ||
    selectedOrganization?.latitude ||
    DEFAULT_COORDINATES.latitude;
  const userCoordinates = useUserCoordinates();
  const [viewport, setViewport] = useState({
    latitude,
    longitude,
    zoom: defaultViewport.zoom,
  });
  const dispatch = useAppDispatch();
  const neighborhood = useNeighborhood();
  const regionGeoJSON = neighborhood?.geojson;
  const startIconCoordinates = searchCoordinates || userCoordinates;

  const hasAdvancedFilterFeatureFlag = useFeatureFlag("advancedFilter");

  useEffect(() => {
    analytics.postEvent("showMap");
  }, []);

  useEffect(() => {
    setViewport((viewport) => ({
      ...viewport,
      latitude,
      longitude,
    }));
  }, [searchCoordinates, longitude, latitude]);

  const onLoad = useCallback(async () => {
    const map = mapRef.current.getMap();
    await loadMarkerIcons(map);
    setMarkersLoaded(true);
  }, []);

  const onClick = useCallback(
    (e) => {
      if (!e.features || !e.features.length) {
        dispatch({ type: "RESET_SELECTED_ORGANIZATION" });
      } else if (stakeholders) {
        const { id } = e.features[0];
        const selectedOrganization = stakeholders.find((sh) => sh.id === id);
        dispatch({
          type: "SELECTED_ORGANIZATION_UPDATED",
          organization: selectedOrganization,
        });
        analytics.postEvent("selectOrganization", {
          id: selectedOrganization.id,
          name: selectedOrganization.name,
        });

        //Update url history
        const name = selectedOrganization.name
          .toLowerCase()
          .replaceAll(" ", "_");
        navigate(
          `${location.pathname}?latitude=${selectedOrganization.latitude}&longitude=${selectedOrganization.longitude}&org=${name}&id=${selectedOrganization.id}`
        );
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [stakeholders, dispatch]
  );

  const interactiveLayerIds = markersLoaded ? [MARKERS_LAYER_ID] : undefined;

  const getCursor = useCallback(({ isHovering, isDragging }) => {
    return isDragging ? "grabbing" : isHovering ? "pointer" : "grab";
  }, []);

  const markersGeojson = useMarkersGeojson({
    stakeholders,
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
      {startIconCoordinates && (
        <Map.Marker
          longitude={startIconCoordinates.longitude}
          latitude={startIconCoordinates.latitude}
          offsetTop={-50}
          offsetLeft={-25}
          anchor="bottom"
        >
          <StartIcon />
        </Map.Marker>
      )}
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
      
      {!hasAdvancedFilterFeatureFlag && (
        <Button
          variant="outlined"
          onClick={searchMapArea}
          size="small"
          className={classes.searchButton}
          disabled={loading}
        >
          Search this area
        </Button>
      )}
    </ReactMapGL>
  );
};

export default forwardRef(ResultsMap);

ResultsMap.propTypes = {
  stakeholders: PropTypes.arrayOf(PropTypes.object),
  categoryIds: PropTypes.any,
  loading: PropTypes.bool,
  searchMapArea: PropTypes.any,
};

const StartIcon = () => {
  return (
    <svg
      viewBox="0 0 90 100"
      width="54"
      height="74"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 26.648c0 14.717 27 47.189 27 47.189s27-32.472 27-47.19C54 11.932 41.912 0 27 0S0 11.93 0 26.648Z"
        fill="#CC3333"
      />
      <ellipse cx="27" cy="26.85" rx="13.5" ry="13.425" fill="#B30D0D" />
    </svg>
  );
};
