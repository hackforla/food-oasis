import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
// Mapbox is tricky, because version 6.* is "incompatible with some Babel transforms
// because of the way it shares code between the maint thread and Web Worker."
// See https://docs.mapbox.com/mapbox-gl-js/guides/install/#transpiling for details
// https://github.com/mapbox/mapbox-gl-js/issues/10565 for current Create-React-App
// recommendation from Mapbox team
// https://github.com/mapbox/mapbox-gl-js/issues/10173  See comment by IvanDreamer on Mar 22
// for craco.config.js contents
import { Box, Grid, ToggleButton, Tooltip } from "@mui/material";
import { MAPBOX_STYLE } from "constants/map";
import { MAPBOX_ACCESS_TOKEN, DEFAULT_VIEWPORT } from "helpers/Constants";
import useBreakpoints from "hooks/useBreakpoints";
import useFeatureFlag from "hooks/useFeatureFlag";
import 'mapbox-gl/dist/mapbox-gl.css';
import Map, { Layer, Marker, NavigationControl, Source } from "react-map-gl";
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
  metroMarkersLayerStyles,
  useMarkersGeojson,
  aLineLayerStyles,
  bdLineLayerStyles,
  cLineLayerStyles,
  eLineLayerStyles,
  kLineLayerStyles,
  busStopStyles,
} from "./MarkerHelpers";
import { regionBorderStyle, regionFillStyle } from "./RegionHelpers";

const ResultsMap = ({ stakeholders, categoryIds, toggleCategory, loading }) => {
  const [markersLoaded, setMarkersLoaded] = useState(false);
  const [cursor, setCursor] = useState("auto");
  const [showTransit, setShowTransit] = useState(false);
  const [tooltip, setTooltip] = useState({
    visible: false,
    content: "",
    x: 0,
    y: 0,
  });
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

  const onMouseMove = useCallback((e) => {
    if (e.features.length && (e.features[0].layer.id === "metroMarkers" || e.features[0].layer.id === "buses")) {
      const { properties } = e.features[0];
  
      setTooltip({
        visible: true,
        content: properties["STOP_NAME"] || `Bus Stop: ${properties["STOPNAME"]}` || "Metro Station",
        x: e.point.x,
        y: e.point.y,
      });
  
    } else {
      setTooltip({ visible: false, content: "", x: 0, y: 0 });
    }
  }, []);

  const onMouseEnter = useCallback(() => setCursor("pointer"), []);
  const onMouseLeave = useCallback(() => setCursor("auto"), []);
  const [interactiveLayerIds, setInteractiveLayerIds] = useState(["nonexist"]);

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
    await loadMarkerIcons(map);
    setMarkersLoaded(true);
    setInteractiveLayerIds([MARKERS_LAYER_ID, "metroMarkers", "buses"]);
    startIconCoordinates &&
      flyTo({
        longitude: startIconCoordinates.longitude,
        latitude: startIconCoordinates.latitude,
      });
  }, [startIconCoordinates, flyTo, mapRef]);

  const onClick = (e) => {
    if (e.features.length && e.features[0].layer.id === MARKERS_LAYER_ID) {
      flyTo({
        latitude: e.lngLat.lat,
        longitude: e.lngLat.lng,
      });
    }

    // if transit station, get station name
    if (e.features.length) {
      let layerId = e.features[0].layer.id;

      if (layerId === "metroMarkers") {
        console.log("Metro Station:", e.features[0].properties["STOP_NAME"]);
      } else if (layerId === "buses") {
        console.log("Bus Stop:", e.features[0].properties["STOPNAME"]);
      }
    }
    
    if (isMobile) {
      dispatch({ type: "TOGGLE_LIST_PANEL" });
    }
    if (!e.features || !e.features.length || !e.features[0].id) {
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

  const {
    markersGeojson,
    metroMarkersGeojson,
    metroALine,
    metroBDLine,
    metroCLine,
    metroELine,
    metroKLine,
    busStops,
  } = useMarkersGeojson({
    stakeholders,
    categoryIds,
  });

  const toggleTransit = () => {
    setShowTransit(!showTransit);
  }

  const listPanelLeftPostion = isListPanelOpen ? 524 : 0;
  const filterPanelLeftPostion = isFilterPanelOpen ? 340 : 0;

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
        onMouseMove={onMouseMove}
      >
        {!isMobile && (
          <NavigationControl showCompass={false} style={{ top: 8, right: 8 }} />
        )}

        <ToggleButton 
          value="toggle" 
          selected={showTransit} 
          style={{ 
            position: "absolute",
            bottom: 28,
            right: 15,
            padding: "1px 4px",
            fontSize: 13,
            fontWeight: "bold",
            color: showTransit ? "#474646b4" : "#343434",
            backgroundColor: showTransit? "#fffffffc" : "#efeded93"
          }}
          onChange={toggleTransit}
        >
          {"Transit"}
        </ToggleButton>

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

        {(markersLoaded && showTransit) && (
          <>
            <Source type="geojson" data={metroALine}>
              <Layer {...aLineLayerStyles} />
            </Source>
            <Source type="geojson" data={metroBDLine}>
              <Layer {...bdLineLayerStyles} />
            </Source>
            <Source type="geojson" data={metroKLine}>
              <Layer {...kLineLayerStyles} />
            </Source>
            <Source type="geojson" data={metroALine}>
              <Layer {...aLineLayerStyles} />
            </Source>
            <Source type="geojson" data={metroELine}>
              <Layer {...eLineLayerStyles} />
            </Source>
            <Source type="geojson" data={metroCLine}>
              <Layer {...cLineLayerStyles} />
            </Source>
          </>
        )}

        {/* display bus stops only if zoomed in */}
        {(markersLoaded && showTransit && viewport.zoom >= 13) && (
          <Source type="geojson" data={busStops}>
            <Layer {...busStopStyles} />
          </Source>
        )}

        {(markersLoaded && showTransit) && (
          <Source type="geojson" data={metroMarkersGeojson}>
            <Layer {...metroMarkersLayerStyles} />
          </Source>
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
              : `${listPanelLeftPostion + filterPanelLeftPostion}px`,
            transition: isMobile ? undefined : "left .5s ease-in-out",
            maxWidth: isMobile ? "100vw": `calc(100vw - ${listPanelLeftPostion + filterPanelLeftPostion}px)`,
          }}
        >
          <AdvancedFilters
            categoryIds={categoryIds}
            toggleCategory={toggleCategory}
          />
        </Grid>
      )}

      {tooltip.visible && (
        <Tooltip
          open={tooltip.visible}
          title={<span style={{ fontSize: 12 }}> {tooltip.content}</span> }
          placement="top"
          componentsProps={{
            tooltip: {
              sx: {
                padding: "1px 8px 3px",
                borderRadius: "4px" 
              },
            },
          }}
        >
          <Box
            sx={{
              position: "absolute",
              left: tooltip.x,
              top: tooltip.y - 10,
            }}
          />
        </Tooltip>
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
