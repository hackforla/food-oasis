import React from "react";
import PropTypes from "prop-types";
import ReactMapGL, { NavigationControl } from "react-map-gl";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MarkerPopup from "./MarkerPopup";
import Marker from "./Marker";
import { MAPBOX_TOKEN } from "../secrets";
import {
  MAPBOX_STYLE,
  ORGANIZATION_COLORS,
  CLOSED_COLOR,
} from "../constants/map";
import {
  DEFAULT_CATEGORIES,
  FOOD_PANTRY_CATEGORY_ID,
  MEAL_PROGRAM_CATEGORY_ID,
} from "../constants/stakeholder";

const styles = {
  geolocate: {
    position: "absolute",
    top: 0,
    left: 0,
    margin: 10,
  },
  navigationControl: { position: "absolute", top: 0, right: 0, margin: 10 },
};

const useStyles = makeStyles((theme) => ({
  map: {
    textAlign: "center",
    fontSize: "12px",
    // height: "100%",
    [theme.breakpoints.down("sm")]: {
      order: 0,
    },
  },
}));

function Map({
  stakeholders,
  categoryIds,
  doSelectStakeholder,
  selectedPopUp,
  setSelectedPopUp,
  isPopupOpen,
  setIsPopupOpen,
  isWindowWide,
  isMobile,
  viewport,
  setViewport,
}) {
  const classes = useStyles();
  const categoryIdsOrDefault = categoryIds.length
    ? categoryIds
    : DEFAULT_CATEGORIES;

  const handleMarkerClick = (clickedStakeholder) => {
    setSelectedPopUp(clickedStakeholder);
    setIsPopupOpen(true);
    doSelectStakeholder(clickedStakeholder);
    // setViewport({
    //   ...viewport,
    //   latitude: clickedStakeholder.latitude,
    //   longitude: clickedStakeholder.longitude,
    // });
  };

  const handleClose = () => {
    setIsPopupOpen(false);
    setSelectedPopUp(null);
  };

  return (
    <Grid
      item
      xs={12}
      md={8}
      className={classes.map}
      style={{ height: isWindowWide ? "100%" : "50%" }}
    >
      <ReactMapGL
        {...viewport}
        /* dragPan={isWindowWide && isMobile ? false : true} */
        // touchAction="pan-y pinch-zoom"
        width="100%"
        height="100%"
        onViewportChange={(newViewport) => setViewport(newViewport)}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        mapStyle={MAPBOX_STYLE}
      >
        <div style={styles.navigationControl}>
          <NavigationControl showCompass={false} />
        </div>
        {stakeholders &&
          stakeholders
            .filter((sh) => sh.latitude && sh.longitude)
            .map((stakeholder, index) => {
              const isVerified = stakeholder.verificationStatusId === 4;

              const categories = stakeholder.categories.filter(({ id }) => {
                return categoryIdsOrDefault.includes(id);
              });

              const color =
                stakeholder.inactiveTemporary || stakeholder.inactive
                  ? CLOSED_COLOR
                  : categories.find(({ id }) => id === MEAL_PROGRAM_CATEGORY_ID)
                  ? ORGANIZATION_COLORS[MEAL_PROGRAM_CATEGORY_ID]
                  : ORGANIZATION_COLORS[FOOD_PANTRY_CATEGORY_ID];
              return (
                <Marker
                  onClick={() => handleMarkerClick(stakeholder)}
                  key={`marker-${index}`}
                  longitude={stakeholder.longitude}
                  latitude={stakeholder.latitude}
                  isVerified={isVerified}
                  color={color}
                  categories={stakeholder.categories}
                  inactive={stakeholder.inactive}
                  inactiveTemporary={stakeholder.inactiveTemporary}
                />
              );
            })}
        {isPopupOpen && selectedPopUp && (
          <MarkerPopup entity={selectedPopUp} handleClose={handleClose} />
        )}
      </ReactMapGL>
    </Grid>
  );
}

Map.propTypes = {
  stakeholders: PropTypes.array,
  categoryIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  selectedLatitude: PropTypes.number.isRequired,
  selectedLongitude: PropTypes.number.isRequired,
};

export default Map;
