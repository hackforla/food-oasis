import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import ReactMapGL, { Layer, NavigationControl, Source } from "react-map-gl";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Marker from "components/FoodSeeker/Marker";
import { MAPBOX_STYLE } from "constants/map";
import { DEFAULT_CATEGORIES } from "constants/stakeholder";
import { isMobile } from "helpers";
import StakeholderPreview from "components/FoodSeeker/StakeholderPreview";
import StakeholderDetails from "components/FoodSeeker/StakeholderDetails";
import theme from "theme/clientTheme";
import { defaultViewport } from "helpers/Configuration";
import { Button } from "../../../components/UI";

const styles = {
  navigationControl: {
    position: "absolute",
    top: 0,
    right: 0,
    margin: "10px",
    marginRight: "40px",
    zIndex: 5,
  },
};

// the map layer that shows the bubbles
const clusterLayer = {
  id: "clusters",
  type: "circle",
  source: "stakeholders",
  filter: ["has", "point_count"],
  paint: {
    "circle-color": theme.palette.primary.main,
    "circle-radius": ["step", ["get", "point_count"], 14, 100, 24, 750, 40],
  },
};

// the map layer that shows the numbers on the cluster bubbles
const clusterCountLayer = {
  id: "cluster-count",
  type: "symbol",
  source: "stakeholders",
  filter: ["has", "point_count"],
  layout: {
    "text-field": "{point_count_abbreviated}",
    "text-size": 12,
  },
  paint: {
    "text-color": theme.palette.primary.contrastText,
  },
};

// this one is weird, we don't actually show it on the map however that act as un
// invisible marker to show the actual markers. we need to do this because the actual
// markers have custom html that can not be shown
const unclusteredPointLayer = {
  id: "unclustered-point",
  type: "circle",
  source: "stakeholders",
  filter: ["!", ["has", "point_count"]],
  paint: {
    "circle-radius": 0,
    "circle-stroke-width": 0,
    "circle-stroke-color": "#fff",
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
  },
  searchButton: {
    position: "absolute",
    top: "5px",
    left: "50%",
    transform: "translate(-50%)",
    backgroundColor: "white",
    zIndex: 0,
  },
}));

function Map({
  handleSearch,
  stakeholders,
  categoryIds,
  doSelectStakeholder,
  selectedStakeholder,
  initViewport,
  origin,
  setToast,
}) {
  const [viewport, setViewport] = useState(
    initViewport || {
      zoom: defaultViewport.zoom,
      latitude: origin.latitude,
      longitude: origin.longitude,
      logoPosition: "top-left",
    }
  );
  const [showDetails, setShowDetails] = useState(false);
  const [showSearchArea, setShowSearchArea] = useState(false);
  const [shownStakeholders, setShownStakeholders] = useState([]);

  useEffect(() => {
    setViewport(initViewport);
  }, [initViewport]);

  useEffect(() => {
    if (mapRef.current) {
      // this gets called after the component is mounted

      const mapInstance = mapRef.current.getMap();
      const features = mapInstance.querySourceFeatures("stakeholders");
      const newShownStakeholders = [];

      features.forEach((feature) => {
        const props = feature.properties;
        if (!props.cluster) newShownStakeholders.push(props.stakeholderId);
      });

      if (
        JSON.stringify(newShownStakeholders.sort()) !==
        JSON.stringify(shownStakeholders.sort())
      ) {
        setShownStakeholders(newShownStakeholders);
      }
    }
  }, [viewport, shownStakeholders]);

  const classes = useStyles({ selectedStakeholder });
  const mapRef = useRef();
  const sourceRef = useRef();
  const categoryIdsOrDefault = categoryIds.length
    ? categoryIds
    : DEFAULT_CATEGORIES;

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
    if (mapRef && mapRef.current && mapRef.current) setShowSearchArea(true);
  };

  const searchArea = () => {
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
    handleSearch(null, center, bounds);
  };

  const unselectStakeholder = () => {
    setShowDetails(false);
    doSelectStakeholder(null);
  };

  const mobileView = isMobile();

  if (showDetails && mobileView && selectedStakeholder) {
    return (
      <Grid item xs={12} md={4} className={classes.details}>
        <StakeholderDetails
          doSelectStakeholder={unselectStakeholder}
          selectedStakeholder={selectedStakeholder}
          setToast={setToast}
        />
      </Grid>
    );
  }

  const data = {
    type: "FeatureCollection",
    features: (stakeholders || [])
      .filter(
        (sh) =>
          sh.latitude && sh.longitude && !(sh.inactive || sh.inactiveTemporary)
      )
      .map((stakeholder) => {
        return {
          type: "Feature",
          properties: {
            stakeholderId: stakeholder.id,
          },
          geometry: {
            type: "Point",
            coordinates: [stakeholder.longitude, stakeholder.latitude, 0],
          },
        };
      }),
  };

  const onMapClick = (e) => {
    // if we are clicking on a feature
    if (e.features && e.features.length > 0) {
      const layer = e.features[0].layer.id;

      // if we are clicking on a cluster, then zoom in on it
      if (layer === "clusters" || layer === "cluster-count") {
        const feature = e.features[0];
        const clusterId = feature.properties.cluster_id;

        const mapboxSource = sourceRef.current?.getSource();

        if (mapboxSource) {
          mapboxSource.getClusterExpansionZoom(clusterId, (err, zoom) => {
            if (err) {
              console.error("Error get cluster expansion zoom", err);
              return;
            }

            setViewport({
              ...viewport,
              longitude: feature.geometry.coordinates[0],
              latitude: feature.geometry.coordinates[1],
              zoom: zoom + 1,
              transitionDuration: 500,
            });
          });
        }
      }
    }

    doSelectStakeholder(null);
  };

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
          }}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
          mapStyle={MAPBOX_STYLE}
          onClick={onMapClick}
          onInteractionStateChange={onInteractionStateChange}
        >
          <div style={styles.navigationControl}>
            <NavigationControl showCompass={false} />
          </div>
          {showSearchArea && (
            <Button
              variant="outlined"
              size="small"
              onClick={searchArea}
              className={classes.searchButton}
            >
              Search this area
            </Button>
          )}
          <Source
            id="stakeholders"
            type="geojson"
            data={data}
            cluster={true}
            clusterMaxZoom={14}
            clusterRadius={50}
            ref={sourceRef}
          >
            <Layer {...clusterLayer} />
            <Layer {...clusterCountLayer} />
            <Layer {...unclusteredPointLayer} />
          </Source>

          {stakeholders &&
            stakeholders
              .filter(
                (sh) =>
                  sh.latitude &&
                  sh.longitude &&
                  !(sh.inactive || sh.inactiveTemporary) &&
                  // only show the stakeholders that are not in a cluster
                  shownStakeholders.includes(sh.id)
              )
              .map((stakeholder) => {
                const categories = stakeholder.categories.filter(({ id }) =>
                  categoryIdsOrDefault.includes(id)
                );

                return (
                  <Marker
                    onClick={() => doSelectStakeholder(stakeholder)}
                    key={stakeholder.id}
                    selectedStakeholder={selectedStakeholder}
                    stakeholder={{
                      ...stakeholder,
                      categories,
                    }}
                  />
                );
              })}
        </ReactMapGL>
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
    </>
  );
}

Map.propTypes = {
  stakeholders: PropTypes.array,
  categoryIds: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default Map;
