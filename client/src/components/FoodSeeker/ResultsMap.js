import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import ReactMapGL, { NavigationControl } from "react-map-gl";
import { Grid, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Marker from "components/FoodSeeker/Marker";
import { MAPBOX_STYLE } from "constants/map";
import { DEFAULT_CATEGORIES } from "constants/stakeholder";
import { isMobile } from "helpers";
import StakeholderPreview from "components/FoodSeeker/StakeholderPreview";
import StakeholderDetails from "components/FoodSeeker/StakeholderDetails";
<<<<<<< HEAD
import * as analytics from "../../services/analytics";
=======
>>>>>>> origin/develop

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
    zIndex: 5,
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
  const [showDetails, setShowDetails] = useState(false);
  const [showSearchArea, setShowSearchArea] = useState(false);

  const classes = useStyles({ selectedStakeholder });
  const mapRef = useRef();
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
    if (mapRef && mapRef.current && mapRef.current) {
      setShowSearchArea(true);
    }
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
<<<<<<< HEAD
    analytics.postEvent("searchArea", {});
=======
>>>>>>> origin/develop
    handleSearch(center, bounds);
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
          onClick={unselectStakeholder}
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
          {stakeholders &&
            stakeholders
              .filter(
                // Only show markers for orgs that are active
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
  setZoom: PropTypes.func,
};

export default Map;
