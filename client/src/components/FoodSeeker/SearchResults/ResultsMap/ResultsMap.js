import PropTypes from "prop-types";
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
// Mapbox is tricky, because version 6.* is "incompatible with some Babel transforms
// because of the way it shares code between the maint thread and Web Worker."
// See https://docs.mapbox.com/mapbox-gl-js/guides/install/#transpiling for details
// https://github.com/mapbox/mapbox-gl-js/issues/10565 for current Create-React-App
// recommendation from Mapbox team
// https://github.com/mapbox/mapbox-gl-js/issues/10173  See comment by IvanDreamer on Mar 22
// for craco.config.js contents
import { Grid } from "@mui/material";
import { MAPBOX_STYLE } from "constants/map";
import { defaultViewport } from "helpers/Configuration";
import useBreakpoints from "hooks/useBreakpoints";
import useFeatureFlag from "hooks/useFeatureFlag";
import "mapbox-gl/dist/mapbox-gl.css";
import { useLocation, useNavigate } from "react-router-dom";
import * as analytics from "services/analytics";
import {
  DEFAULT_COORDINATES,
  useAppDispatch,
  useNeighborhood,
  useSearchCoordinates,
  useSelectedOrganization,
  useUserCoordinates,
} from "../../../../appReducer";
import AdvancedFilters from "../AdvancedFilters/AdvancedFilters";
import {
  MARKERS_LAYER_ID,
  loadMarkerIcons,
  markersLayerStyles,
  useMarkersGeojson,
} from "./MarkerHelpers";
import { regionBorderStyle, regionFillStyle } from "./RegionHelpers";
import Map, { Marker, Source, Layer, NavigationControl } from "react-map-gl";

const ResultsMap = (
  { stakeholders, categoryIds, toggleCategory, loading, searchMapArea },
  ref
) => {
  const mapRef = useRef();
  const [markersLoaded, setMarkersLoaded] = useState(false);
  const [cursor, setCursor] = useState("auto");
  const searchCoordinates = useSearchCoordinates();
  const selectedOrganization = useSelectedOrganization();
  const navigate = useNavigate();
  const location = useLocation();
  const { isMobile } = useBreakpoints();

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

  const onMouseEnter = useCallback(() => setCursor("pointer"), []);
  const onMouseLeave = useCallback(() => setCursor("auto"), []);
  const [interactiveLayerIds, setInteractiveLayerIds] = useState(["nonexist"]);

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
    setInteractiveLayerIds([MARKERS_LAYER_ID]);
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
    <div style={{ position: "relative", height: "100%" }}>
      <Map
        ref={mapRef}
        {...viewport}
        onMove={(e) => setViewport(e.viewState)}
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        mapStyle={MAPBOX_STYLE}
        draggable={true}
        onLoad={onLoad}
        onClick={onClick}
        interactiveLayerIds={interactiveLayerIds}
        cursor={cursor}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {!isMobile && (
          <NavigationControl showCompass={false} style={{ top: 8, right: 8 }} />
        )}
        {startIconCoordinates && (
          <Marker
            longitude={startIconCoordinates.longitude}
            latitude={startIconCoordinates.latitude}
            offsetTop={-50}
            offsetLeft={-25}
            anchor="bottom"
          >
            <StartIcon />
          </Marker>
        )}
        {markersLoaded && (
          <Source type="geojson" data={markersGeojson}>
            <Layer {...markersLayerStyles} />
          </Source>
        )}
        {regionGeoJSON && (
          <Source id="my-data" type="geojson" data={regionGeoJSON}>
            <Layer {...regionFillStyle} />
            <Layer {...regionBorderStyle} />
          </Source>
        )}
      </Map>
      <Grid
        container={isMobile}
        wrap={isMobile ? "nowrap" : undefined}
        position="absolute"
        display="inline-flex"
        alignItems="flex-start"
        sx={{
          overflow: "auto",
          gap: "0.5rem",
          padding: isMobile ? "0 0 0.3rem 0.75rem" : "0 0 0.3rem 2.25rem",
          scrollbarWidth: "none",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        {!loading && hasAdvancedFilterFeatureFlag && (
          <AdvancedFilters
            categoryIds={categoryIds}
            toggleCategory={toggleCategory}
          />
        )}
      </Grid>
    </div>
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
