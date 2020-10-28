import React, { useEffect, useState, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

import { useOrganizationBests } from "hooks/useOrganizationBests";
import useCategoryIds from "hooks/useCategoryIds";
import { isMobile } from "helpers";
import { defaultCoordinates } from "helpers/Configuration";
import { DEFAULT_CATEGORIES } from "constants/stakeholder";

import Filters from "./ResultsFilters";
import List from "./ResultsList";
import Map from "./ResultsMap";

const useStyles = makeStyles((theme) => ({
  listMapContainer: {
    [theme.breakpoints.down("sm")]: {
      height: "100%",
    },
    [theme.breakpoints.up("md")]: {
      height: "79%",
    },
  },
}));

export default function ResultsContainer({
  userCoordinates,
  origin,
  setOrigin,
  setToast,
}) {
  // Component state
  const { data, search } = useOrganizationBests();
  const [sortedData, setSortedData] = useState([]);
  const classes = useStyles();

  const windowSize = window.innerWidth > 960 ? true : false;
  const [isWindowWide, changeWindow] = useState(windowSize);

  const [selectedStakeholder, onSelectStakeholder] = useState(null);
  const [isMapView, setIsMapView] = useState(true);

  const [isVerifiedSelected, selectVerified] = useState(false);
  const [viewport, setViewport] = useState({
    zoom: defaultCoordinates.zoom,
    latitude: origin.latitude,
    longitude: origin.longitude,
    logoPosition: "top-left",
  });

  const { categoryIds, toggleCategory } = useCategoryIds([]);

  const doSelectStakeholder = useCallback(
    (stakeholder) => {
      if (stakeholder && !isMobile) {
        setViewport({
          ...viewport,
          latitude: stakeholder.latitude,
          longitude: stakeholder.longitude,
        });
      }
      onSelectStakeholder(stakeholder);
    },
    [viewport, setViewport]
  );

  const switchResultsView = () => {
    doSelectStakeholder();
    setIsMapView(!isMapView);
  };

  // Component effects

  useEffect(() => {
    const sortOrganizations = (a, b) => {
      if (
        (a.inactive || a.inactiveTemporary) &&
        !b.inactive &&
        !b.inactiveTemporary
      ) {
        return 1;
      } else if (
        !a.inactive &&
        !a.inactiveTemporary &&
        (b.inactive || b.inactiveTemporary)
      ) {
        return -1;
      } else {
        return a.distance < b.distance ? -1 : a.distance > b.distance ? 1 : 0;
      }
    };
    if (!data) {
      return;
    }
    setSortedData(data.sort(sortOrganizations));
  }, [data]);

  useEffect(() => {
    const changeInputContainerWidth = () => {
      window.innerWidth > 960 ? changeWindow(true) : changeWindow(false);
    };

    window.addEventListener("resize", changeInputContainerWidth);

    return () =>
      window.removeEventListener("resize", changeInputContainerWidth);
  }, []);

  const handleSearch = useCallback(
    (e, center, bounds) => {
      if (e) e.preventDefault();
      search({
        latitude:
          (center && center.lat) || origin.latitude || userCoordinates.latitude,
        longitude:
          (center && center.lng) ||
          origin.longitude ||
          userCoordinates.longitude,
        categoryIds: categoryIds.length ? categoryIds : DEFAULT_CATEGORIES,
        isInactive: "either",
        verificationStatusId: 0,
        bounds,
        radius: defaultCoordinates.radius,
      });

      if (!center)
        setViewport({
          zoom: defaultCoordinates.zoom,
          latitude: origin.latitude,
          longitude: origin.longitude,
        });
      doSelectStakeholder(null);
    },
    [
      search,
      origin.latitude,
      origin.longitude,
      userCoordinates.latitude,
      userCoordinates.longitude,
      categoryIds,
      setViewport,
      doSelectStakeholder,
    ]
  );

  return (
    <>
      <Filters
        origin={origin}
        setOrigin={setOrigin}
        toggleCategory={toggleCategory}
        categoryIds={categoryIds}
        isVerifiedSelected={isVerifiedSelected}
        selectVerified={selectVerified}
        userCoordinates={userCoordinates}
        handleSearch={handleSearch}
        isWindowWide={isWindowWide}
        isMapView={isMapView}
        switchResultsView={switchResultsView}
      />
      <Grid item container spacing={0} className={classes.listMapContainer}>
        {(!isMobile || (isMobile && !isMapView)) && (
          <List
            selectedStakeholder={selectedStakeholder}
            doSelectStakeholder={doSelectStakeholder}
            stakeholders={sortedData}
            setToast={setToast}
          />
        )}
        {(!isMobile || (isMobile && isMapView)) && (
          <Map
            handleSearch={handleSearch}
            viewport={viewport}
            setViewport={setViewport}
            stakeholders={data}
            doSelectStakeholder={doSelectStakeholder}
            selectedStakeholder={selectedStakeholder}
            categoryIds={categoryIds}
            isWindowWide={isWindowWide}
            setToast={setToast}
          />
        )}
      </Grid>
    </>
  );
}
