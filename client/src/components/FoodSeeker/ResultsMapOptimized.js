import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import PropTypes from "prop-types";
import ReactMapGL, {
  NavigationControl,
  ScaleControl,
  AttributionControl,
  Source,
  Layer,
} from "react-map-gl";
import { Grid, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { MAPBOX_STYLE } from "constants/map";
import { DEFAULT_CATEGORIES } from "constants/stakeholder";
import { isMobile } from "helpers";
import StakeholderPreview from "components/FoodSeeker/StakeholderPreview";
import StakeholderDetails from "components/FoodSeeker/StakeholderDetails";
import * as analytics from "services/analytics";
import {
  loadMarkerIcons,
  markersLayerStyles,
  getMarkersGeojson,
} from "./MarkerHelpers";

const styles = {
  navigationControl: {
    position: "absolute",
    top: 0,
    right: 30,
    margin: "8px",
    marginRight: "40px",
    zIndex: 5,
  },
  scaleControl: {
    position: "absolute",
    top: 0,
    left: 0,
    margin: "8px",

    zIndex: 5,
  },
  attributionStyle: {
    right: 10,
    bottom: 0,
  },
};

const useStyles = makeStyles((theme) => ({
  map: {
    textAlign: "center",
    fontSize: "12px",
    [theme.breakpoints.up("md")]: {
      height: "100%",
    },
    [theme.breakpoints.down("xs")]: {
      height: (props) =>
        props.selectedStakeholder ? "calc(100% - 120px)" : "100%",
    },
    [theme.breakpoints.only("sm")]: {
      order: 0,
      height: "50%",
    },
    position: "relative",
  },
  preview: {
    margin: "0 1em",
  },
  details: {
    textAlign: "center",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "0 1em",
    position: "absolute",
    height: "100%",
    backgroundColor: theme.palette.background.default,
    zIndex: 10000,
  },
  searchButton: {
    position: "absolute",
    top: "5px",
    left: "50%",
    transform: "translate(-50%)",
    backgroundColor: "white",
    zIndex: 1000,
  },
}));

const MARKERS_LAYER_ID = "markers";

const getCursor = ({ isHovering, isDragging }) => {
  return isDragging ? "grabbing" : isHovering ? "pointer" : "grab";
};

function Map({
  handleSearch,
  stakeholders,
  categoryIds,
  doSelectStakeholder,
  selectedStakeholder,
  viewport,
  setViewport,
  setToast,
}) {
  const [showDetails, setShowDetails] = useState(false);
  const [showSearchArea, setShowSearchArea] = useState(false);
  const [mapReady, setMapReady] = useState(false);
  const classes = useStyles({ selectedStakeholder });
  const mapRef = useRef();
  const categoryIdsOrDefault = categoryIds.length
    ? categoryIds
    : DEFAULT_CATEGORIES;

  useEffect(() => {
    analytics.postEvent("showMap");

    const map = mapRef.current.getMap();
    map.on("load", async () => {
      await loadMarkerIcons(map);
      setMapReady(true);
    });
  }, []);

  // modify the stakeholders array by:
  // 1. filtering out the inactive orgs
  // 2. limiting the categories for each org to the ones currently selecte4d
  const modifiedStakeholders = useMemo(() => {
    if (!stakeholders) return null;

    return stakeholders
      .filter(
        (sh) =>
          sh.latitude && sh.longitude && !(sh.inactive || sh.inactiveTemporary)
      )
      .map((stakeholder) => ({
        ...stakeholder,
        categories: stakeholder.categories.filter(({ id }) =>
          categoryIdsOrDefault.includes(id)
        ),
      }));
  }, [stakeholders, categoryIdsOrDefault]);

  const markersGeojson = useMemo(() => {
    return getMarkersGeojson(modifiedStakeholders, selectedStakeholder);
  }, [modifiedStakeholders, selectedStakeholder]);

  const onInteractionStateChange = (s) => {
    // don't do anything if the mapview is moving
    if (
      s.isDragging ||
      s.inTransition ||
      s.isRotating ||
      s.isZooming ||
      s.isHovering ||
      s.isPanning
    )
      return;
    // make sure map has already loaded
    if (mapRef && mapRef.current && mapRef.current) {
      setShowSearchArea(true);
    }
  };

  const searchArea = (e) => {
    setShowSearchArea(false);
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

  const unselectStakeholder = useCallback(() => {
    setShowDetails(false);
    doSelectStakeholder(null);
  }, [doSelectStakeholder]);

  const handleClick = useCallback(
    (e) => {
      if (!e.features || !e.features.length) {
        unselectStakeholder();
      } else if (stakeholders) {
        const { id } = e.features[0];
        const selectedStakeholder = stakeholders.find((sh) => sh.id === id);
        doSelectStakeholder(selectedStakeholder);
      }
    },
    [stakeholders, unselectStakeholder, doSelectStakeholder]
  );

  const mobileView = isMobile();

  return (
    <>
      <Grid item xs={12} md={8} className={classes.map}>
        <ReactMapGL
          {...viewport}
          ref={mapRef}
          width="100%"
          height="100%"
          onViewportChange={(newViewport) => {
            setViewport(newViewport);
            // // Pass zooom level up to parent control, this allows us
            // // to maintain zoom when search is re-executed, etc.
            // setZoom(newViewport.zoom);
          }}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          mapStyle={MAPBOX_STYLE}
          onClick={handleClick}
          onInteractionStateChange={onInteractionStateChange}
          interactiveLayerIds={mapReady ? [MARKERS_LAYER_ID] : undefined}
          getCursor={getCursor}
        >
          <AttributionControl
            compact={mobileView}
            style={styles.attributionStyle}
          />
          <div style={styles.navigationControl}>
            <NavigationControl showCompass={false} />
          </div>
          <div style={styles.scaleControl}>
            <ScaleControl
              maxWidth={100}
              unit="imperial"
              className={classes.scaleControl}
            />
          </div>
          {mapReady && (
            <Source type="geojson" data={markersGeojson}>
              <Layer id={MARKERS_LAYER_ID} {...markersLayerStyles} />
            </Source>
          )}
        </ReactMapGL>
        {showSearchArea && (
          <Button
            onClick={searchArea}
            variant="outlined"
            size="small"
            className={classes.searchButton}
          >
            Search this area
          </Button>
        )}
      </Grid>
      {!!selectedStakeholder && mobileView && (
        <Grid
          item
          xs={12}
          md={8}
          className={classes.preview}
          onClick={() => setShowDetails(true)}
        >
          <StakeholderPreview
            doSelectStakeholder={doSelectStakeholder}
            stakeholder={selectedStakeholder}
          />
        </Grid>
      )}
      {!!selectedStakeholder && mobileView && showDetails && (
        <Grid item xs={12} md={4} className={classes.details}>
          <StakeholderDetails
            doSelectStakeholder={unselectStakeholder}
            selectedStakeholder={selectedStakeholder}
            setToast={setToast}
          />
        </Grid>
      )}
    </>
  );
}

Map.propTypes = {
  stakeholders: PropTypes.array,
  categoryIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  setZoom: PropTypes.func,
};

export default Map;
