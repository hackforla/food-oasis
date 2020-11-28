import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import ReactMapGL, { Layer, NavigationControl, Source } from "react-map-gl";
import { Grid, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { MAPBOX_STYLE } from "constants/map";
// import { DEFAULT_CATEGORIES } from "constants/stakeholder";
import { isMobile } from "helpers";

import StakeholderPreview from "components/Stakeholder/StakeholderPreview";
import StakeholderDetails from "components/Stakeholder/StakeholderDetails";

const styles = {
  navigationControl: {
    position: "absolute",
    top: 0,
    right: 0,
    margin: 10,
    zIndex: 5,
  },
};

const useStyles = makeStyles((theme, props) => ({
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
    left: 0,
    right: 0,
    margin: "auto",
    backgroundColor: "white",
    zIndex: 2,
  },
}));

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
  const classes = useStyles({ selectedStakeholder });
  const mapRef = useRef();
  const sourceRef = useRef();
  // const categoryIdsOrDefault = categoryIds.length
  //   ? categoryIds
  //   : DEFAULT_CATEGORIES;

  const [showDetails, setShowDetails] = useState(false);
  const [showSearchArea, setShowSearchArea] = useState(false);

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

  const clusterLayer = {
    id: "clusters",
    type: "circle",
    source: "stakeholders",
    filter: ["has", "point_count"],
    paint: {
      "circle-color": [
        "step",
        ["get", "point_count"],
        "#51bbd6",
        100,
        "#f1f075",
        750,
        "#f28cb1",
      ],
      "circle-radius": ["step", ["get", "point_count"], 20, 100, 30, 750, 40],
    },
    // layout: {
    //   'icon-image': 'custom-marker',
    // }
  };

  const clusterCountLayer = {
    id: "cluster-count",
    type: "symbol",
    source: "stakeholders",
    filter: ["has", "point_count"],
    layout: {
      "text-field": "{point_count_abbreviated}",
      "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
      "text-size": 12,
    },
  };

  const unclusteredPointLayer = {
    id: "unclustered-point",
    type: "circle",
    source: "stakeholders",
    filter: ["!", ["has", "point_count"]],
    paint: {
      "circle-color": "#11b4da",
      "circle-radius": 4,
      "circle-stroke-width": 1,
      "circle-stroke-color": "#fff",
    },
  };

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

        const mapboxSource = sourceRef.current.getSource();

        mapboxSource.getClusterExpansionZoom(clusterId, (err, zoom) => {
          if (err) {
            return;
          }

          setViewport({
            ...viewport,
            longitude: feature.geometry.coordinates[0],
            latitude: feature.geometry.coordinates[1],
            zoom,
            transitionDuration: 500,
          });
        });

        return;
      }

      // if we are clicking on a place
      if (layer === "unclustered-point") {
        // select the stakeholder
        stakeholders.forEach((sh) => {
          if (sh.id === e.features[0].properties.stakeholderId) {
            doSelectStakeholder(sh);
          }
        });

        return;
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
          onViewportChange={(newViewport) => setViewport(newViewport)}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          mapStyle={MAPBOX_STYLE}
          onClick={onMapClick}
          onInteractionStateChange={onInteractionStateChange}
        >
          <div style={styles.navigationControl}>
            <NavigationControl showCompass={false} />
          </div>
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
          <Source
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

          {/* {stakeholders &&
            stakeholders
              .filter(
                (sh) =>
                  sh.latitude &&
                  sh.longitude &&
                  !(sh.inactive || sh.inactiveTemporary)
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
              })} */}
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
