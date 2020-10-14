import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

import { useOrganizationBests } from "hooks/useOrganizationBests";
import useCategoryIds from "hooks/useCategoryIds";
import { isMobile } from "helpers";
import { defaultCoordinates } from "../../helpers/Configuration";

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

export default function ResultsContainer(props) {
  // Component state
  const storage = window.sessionStorage;
  const { userCoordinates, userSearch, setToast } = props;
  const { data, search } = useOrganizationBests();
  const [sortedData, setSortedData] = useState([]);
  const classes = useStyles();

  const windowSize = window.innerWidth > 960 ? true : false;
  const [isWindowWide, changeWindow] = useState(windowSize);

  const [selectedStakeholder, onSelectStakeholder] = useState(null);
  const [isMapView, setIsMapView] = useState(true);

  const doSelectStakeholder = (stakeholder) => {
    if (stakeholder && !isMobile) {
      setViewport({
        ...viewport,
        latitude: stakeholder.latitude,
        longitude: stakeholder.longitude,
      });
    }
    onSelectStakeholder(stakeholder);
  };

  const switchResultsView = () => {
    doSelectStakeholder();
    setIsMapView(!isMapView);
  };

  const initialCategories = storage.categoryIds
    ? JSON.parse(storage.categoryIds)
    : [];
  const { categoryIds, toggleCategory } = useCategoryIds(initialCategories);

  const initialCoords = {
    locationName: userSearch
      ? userSearch.locationName
      : storage.origin
      ? JSON.parse(storage.origin).locationName
      : "",
    latitude: userSearch
      ? userSearch.latitude
      : storage.origin
      ? JSON.parse(storage.origin).latitude
      : userCoordinates
      ? userCoordinates.latitude
      : defaultCoordinates.lat,
    longitude: userSearch
      ? userSearch.longitude
      : storage.origin
      ? JSON.parse(storage.origin).longitude
      : userCoordinates
      ? userCoordinates.longitude
      : defaultCoordinates.lon,
  };

  const [radius, setRadius] = useState(
    storage?.radius ? JSON.parse(storage.radius) : 5
  );
  const [origin, setOrigin] = useState(initialCoords);
  const [isVerifiedSelected, selectVerified] = useState(
    storage?.verified ? JSON.parse(storage.verified) : false
  );

  const viewPortHash = {
    1: 13.5,
    2: 12.5,
    3: 12,
    5: 11,
    10: 10,
    20: 9,
    50: 8,
  };

  const [viewport, setViewport] = useState({
    zoom: viewPortHash[radius],
    latitude: origin.latitude || JSON.parse(storage.origin).latitude,
    longitude: origin.longitude || JSON.parse(storage.origin).longitude,
    logoPosition: "top-left",
  });

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

  useEffect(() => {
    return () => {
      sessionStorage.clear();
    };
  }, []);

  return (
    <>
      <Filters
        radius={radius}
        setRadius={setRadius}
        origin={origin}
        setOrigin={setOrigin}
        toggleCategory={toggleCategory}
        categoryIds={categoryIds}
        isVerifiedSelected={isVerifiedSelected}
        selectVerified={selectVerified}
        userCoordinates={userCoordinates}
        search={search}
        isWindowWide={isWindowWide}
        viewport={viewport}
        setViewport={setViewport}
        doSelectStakeholder={doSelectStakeholder}
        viewPortHash={viewPortHash}
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
            selectedLatitude={initialCoords.latitude}
            selectedLongitude={initialCoords.longitude}
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
