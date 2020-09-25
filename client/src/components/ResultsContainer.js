import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { useOrganizations } from "../hooks/useOrganizations/useOrganizations";
import ResultsFilters from "./ResultsFilters";
import ResultsList from "./ResultsList";
import ResultsMap from "./ResultsMap";
import useCategoryIds from "../hooks/useCategoryIds";

const useStyles = makeStyles((theme) => ({
  filterButton: {
    margin: "0 .25rem",
    padding: "0 0.5rem",
    fontSize: "12px",
  },
  div: {
    textAlign: "center",
    fontSize: "12px",
    border: "1px solid blue",
  },
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
  const { data, search } = useOrganizations();
  const [sortedData, setSortedData] = useState([]);
  const classes = useStyles();

  const windowSize = window.innerWidth > 960 ? true : false;
  const [isWindowWide, changeWindow] = useState(windowSize);

  const mobileTest = new RegExp("Mobi", "i");
  const [isMobile, changeMobile] = useState(
    mobileTest.test(navigator.userAgent) ? true : false
  );
  const [selectedStakeholder, onSelectStakeholder] = useState(null);
  const [isMapView, setIsMapView] = useState(true);

  const doSelectStakeholder = (stakeholder) => {
    if (stakeholder) {
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
      : 34.07872,
    longitude: userSearch
      ? userSearch.longitude
      : storage.origin
      ? JSON.parse(storage.origin).longitude
      : userCoordinates
      ? userCoordinates.longitude
      : -118.243328,
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
      mobileTest.test(navigator.userAgent)
        ? changeMobile(true)
        : changeMobile(false);
    };

    window.addEventListener("resize", changeInputContainerWidth);

    return () =>
      window.removeEventListener("resize", changeInputContainerWidth);
  }, [mobileTest]);

  useEffect(() => {
    return () => {
      sessionStorage.clear();
    };
  }, []);

  return (
    <>
      <ResultsFilters
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
        isMobile={isMobile}
        isMapView={isMapView}
        switchResultsView={switchResultsView}
      />
      <Grid item container spacing={0} className={classes.listMapContainer}>
        {(!isMobile || (isMobile && !isMapView)) && (
          <ResultsList
            selectedStakeholder={selectedStakeholder}
            doSelectStakeholder={doSelectStakeholder}
            stakeholders={sortedData}
            setToast={setToast}
            isMobile={isMobile}
          />
        )}
        {(!isMobile || (isMobile && isMapView)) && (
          <ResultsMap
            selectedLatitude={initialCoords.latitude}
            selectedLongitude={initialCoords.longitude}
            viewport={viewport}
            setViewport={setViewport}
            stakeholders={data}
            doSelectStakeholder={doSelectStakeholder}
            selectedStakeholder={selectedStakeholder}
            categoryIds={categoryIds}
            isWindowWide={isWindowWide}
            isMobile={isMobile}
            setToast={setToast}
          />
        )}
      </Grid>
    </>
  );
}
