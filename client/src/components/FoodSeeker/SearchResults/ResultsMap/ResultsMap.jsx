import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
// Mapbox is tricky, because version 6.* is "incompatible with some Babel transforms
// because of the way it shares code between the maint thread and Web Worker."
// See https://docs.mapbox.com/mapbox-gl-js/guides/install/#transpiling for details
// https://github.com/mapbox/mapbox-gl-js/issues/10565 for current Create-React-App
// recommendation from Mapbox team
// https://github.com/mapbox/mapbox-gl-js/issues/10173  See comment by IvanDreamer on Mar 22
// for craco.config.js contents
import { Grid, Box, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/AddRounded";
import RemoveIcon from "@mui/icons-material/RemoveRounded";
import { MAPBOX_STYLE } from "constants/map";
import { MAPBOX_ACCESS_TOKEN, DEFAULT_VIEWPORT } from "helpers/Constants";
import useBreakpoints from "hooks/useBreakpoints";
import useFeatureFlag from "hooks/useFeatureFlag";
import "mapbox-gl/dist/mapbox-gl.css";
import Map, { Layer, Marker, Source } from "react-map-gl";
import { useLocation, useNavigate } from "react-router-dom";
import * as analytics from "services/analytics";
import {
  DEFAULT_COORDINATES,
  useAppDispatch,
  useFilterPanel,
  useListPanel,
  useNeighborhood,
  useSearchCoordinates,
  useSelectedOrganization,
  useUserCoordinates,
} from "../../../../appReducer";
import { useMapbox } from "../../../../hooks/useMapbox";
import AdvancedFilters from "../AdvancedFilters/AdvancedFilters";
import {
  MARKERS_LAYER_ID,
  loadMarkerIcons,
  markersLayerStyles,
  useMarkersGeojson,
} from "./MarkerHelpers";
import { regionBorderStyle, regionFillStyle } from "./RegionHelpers";
import Geolocate from "../ResultsFilters/Geolocate";

const ResultsMap = ({ stakeholders, categoryIds, toggleCategory, loading }) => {
  const [markersLoaded, setMarkersLoaded] = useState(false);
  const [cursor, setCursor] = useState("auto");
  const searchCoordinates = useSearchCoordinates();
  const selectedOrganization = useSelectedOrganization();
  const navigate = useNavigate();
  const location = useLocation();
  const { isMobile } = useBreakpoints();
  const isListPanelOpen = useListPanel();
  const isFilterPanelOpen = useFilterPanel();
  const { mapRef, flyTo } = useMapbox();

  const longitude =
    searchCoordinates?.longitude ||
    selectedOrganization?.longitude ||
    DEFAULT_COORDINATES.longitude;
  const latitude =
    searchCoordinates?.latitude || selectedOrganization?.latitude || isMobile
      ? DEFAULT_COORDINATES.latitude - 0.06
      : DEFAULT_COORDINATES.latitude;
  const userCoordinates = useUserCoordinates();
  const [viewport, setViewport] = useState({
    latitude,
    longitude,
    zoom: DEFAULT_VIEWPORT.zoom,
  });
  const dispatch = useAppDispatch();
  const neighborhood = useNeighborhood();
  const regionGeoJSON = neighborhood?.geojson;
  const startIconCoordinates = searchCoordinates || userCoordinates;
  const hasAdvancedFilterFeatureFlag = useFeatureFlag("advancedFilter");

  const onMouseEnter = useCallback(() => setCursor("pointer"), []);
  const onMouseLeave = useCallback(() => setCursor("auto"), []);
  const [interactiveLayerIds, setInteractiveLayerIds] = useState(["nonexist"]);
  const [currMap, setCurrMap] = useState(null);

  useEffect(() => {
    analytics.postEvent("showMap");
  }, []);

  useEffect(() => {
    setViewport((viewport) => ({
      ...viewport,
      latitude: latitude,
      longitude,
    }));
  }, [searchCoordinates, longitude, latitude, isMobile]);

  const onLoad = useCallback(async () => {
    const map = mapRef.current.getMap();
    window.dispatchEvent(new Event("resize"))
    setCurrMap(map);
    await loadMarkerIcons(map);
    setMarkersLoaded(true);
    setInteractiveLayerIds([MARKERS_LAYER_ID]);
    startIconCoordinates &&
      flyTo({
        longitude: startIconCoordinates.longitude,
        latitude: startIconCoordinates.latitude,
      });
  }, [startIconCoordinates, flyTo, mapRef]);

  const onClick = (e) => {
    flyTo({
      latitude: e.lngLat.lat,
      longitude: e.lngLat.lng,
    });
    if (isMobile) {
      dispatch({ type: "TOGGLE_LIST_PANEL" });
    }
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
      const name = selectedOrganization.name.toLowerCase().replaceAll(" ", "_");
      navigate(
        `${location.pathname}?latitude=${selectedOrganization.latitude}&longitude=${selectedOrganization.longitude}&org=${name}&id=${selectedOrganization.id}`
      );
    }
  };

  const markersGeojson = useMarkersGeojson({
    stakeholders,
    categoryIds,
  });

  const listPanelLeftPosition = isListPanelOpen ? 524 : 0;
  const filterPanelLeftPosition = isFilterPanelOpen ? 340 : 0;

  const CustomNavigationControl = () => {
    if (!currMap) return;
    const zoom = currMap.getZoom();
    const currentCenter = currMap.getCenter();

    const handleZoomIn = () => {
      const longOffset = 0.0399 * Math.pow(2, 11 - zoom);
      const newCenter = {
        lng: isListPanelOpen ? currentCenter.lng + longOffset : currentCenter.lng,
        lat: selectedOrganization ? selectedOrganization.latitude : currentCenter.lat
      };

      currMap.easeTo({
        center: isListPanelOpen ? newCenter : currentCenter,
        zoom: zoom + 1,
        duration: 500,
      });
    };

    const handleZoomOut = () => {
      const zoomOutOffset = 0.0399 * Math.pow(2, 12 - zoom);
      const newCenter = {
        lng: currentCenter.lng - zoomOutOffset,
        lat: currentCenter.lat,
      };

      currMap.easeTo({
        center: isListPanelOpen ? newCenter : currentCenter,
        zoom: zoom - 1,
        duration: 500,
      });
    };

    const buttonStyles = {
      color: "#313131",
      borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
      borderRadius: 0,
      width: "28px",
      height: "28px",
      "&:hover": {
        backgroundColor: "#f5f5f5",
      },
      "&:active": {
        backgroundColor: "#e0e0e0",
      },
    };

    return (
      <Box
        sx={{
          position: "absolute",
          top: 10,
          right: 10,
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          background: "#fff",
          borderRadius: "6px",
          boxShadow: "0 1px 6px rgba(0, 0, 0, 0.416)",
          border: "1.5px solid rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
        }}
      >
        <IconButton onClick={handleZoomIn} sx={buttonStyles} size="small">
          <AddIcon />
        </IconButton>
        <IconButton onClick={handleZoomOut} sx={buttonStyles}>
          <RemoveIcon />
        </IconButton>
      </Box>
    );
  };

  return (
    <div style={{ position: "relative", height: "100%", width: "100%" }}>
      <Map
        ref={mapRef}
        {...viewport}
        onMove={(e) => setViewport(e.viewState)}
        mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
        mapStyle={MAPBOX_STYLE}
        draggable={true}
        onLoad={onLoad}
        interactive={true}
        onClick={onClick}
        interactiveLayerIds={interactiveLayerIds}
        cursor={cursor}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {!isMobile && (
          <>
            <CustomNavigationControl />
            <Box
              sx={{
                position: "absolute",
                top: 80,
                right: 10,
                zIndex: 10,
                borderRadius: "6px",
                boxShadow: "0 1px 6px rgba(0, 0, 0, 0.416)",
                border: "1.5px solid rgba(0, 0, 0, 0.1)",
              }}
            >
              <Geolocate />
            </Box>
          </>
        )}

        {startIconCoordinates && (
          <Marker
            longitude={startIconCoordinates.longitude}
            latitude={startIconCoordinates.latitude}
            offsetTop={-50}
            offsetLeft={-25}
            anchor="center"
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
      {!loading && hasAdvancedFilterFeatureFlag && (
        <Grid
          container={isMobile}
          wrap={isMobile ? "nowrap" : undefined}
          position="absolute"
          display="inline-flex"
          alignItems="flex-start"
          sx={{
            overflowX: "auto",
            overflowY: "hidden",
            gap: "0.5rem",
            padding: isMobile ? "0 0 0.3rem 0.75rem" : "0 0 0.3rem 2.25rem",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": {
              display: "none",
            },
            top: 0,
            left: isMobile
              ? 0
              : `${listPanelLeftPosition + filterPanelLeftPosition}px`,
            transition: isMobile ? undefined : "left .5s ease-in-out",
            maxWidth: isMobile
              ? "100vw"
              : `calc(100vw - ${
                  listPanelLeftPosition + filterPanelLeftPosition
                }px)`,
          }}
        >
          <AdvancedFilters
            categoryIds={categoryIds}
            toggleCategory={toggleCategory}
          />
        </Grid>
      )}
    </div>
  );
};

export default ResultsMap;

ResultsMap.propTypes = {
  stakeholders: PropTypes.arrayOf(PropTypes.object),
  categoryIds: PropTypes.any,
  loading: PropTypes.bool,
};

const StartIcon = () => {
  return (
    <svg
      viewBox="0 0 90 100"
      width="44"
      height="64"
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
