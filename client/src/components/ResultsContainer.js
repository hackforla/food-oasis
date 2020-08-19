import React from "react";
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
  const storage = window.sessionStorage;
  const { userCoordinates, userSearch } = props;
  const { data, search } = useOrganizations();
  const [sortedData, setSortedData] = React.useState([]);
  const classes = useStyles();

  const windowSize = window.innerWidth > 960 ? true : false;
  const [isWindowWide, changeWindow] = React.useState(windowSize);

  const mobileTest = new RegExp("Mobi", "i");
  const [isMobile, changeMobile] = React.useState(
    mobileTest.test(navigator.userAgent) ? true : false
  );

  React.useEffect(() => {
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

  React.useEffect(() => {
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

  React.useEffect(() => {
    return () => {
      sessionStorage.clear();
    };
  }, []);

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

  const [radius, setRadius] = React.useState(
    storage?.radius ? JSON.parse(storage.radius) : 5
  );
  const [origin, setOrigin] = React.useState(initialCoords);
  const [isVerifiedSelected, selectVerified] = React.useState(
    storage?.verified ? JSON.parse(storage.verified) : false
  );
  const [selectedStakeholder, doSelectStakeholder] = React.useState(null);
  const [selectedPopUp, setSelectedPopUp] = React.useState(null);
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);

  const viewPortHash = {
    1: 13.5,
    2: 12.5,
    3: 12,
    5: 11,
    10: 10,
    20: 9,
    50: 8,
  };

  const [viewport, setViewport] = React.useState({
    zoom: viewPortHash[radius],
    latitude: origin.latitude || JSON.parse(storage.origin).latitude,
    longitude: origin.longitude || JSON.parse(storage.origin).longitude,
    logoPosition: "top-left",
  });

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
        setIsPopupOpen={setIsPopupOpen}
        doSelectStakeholder={doSelectStakeholder}
        viewPortHash={viewPortHash}
      />
      <Grid item container spacing={0} className={classes.listMapContainer}>
        <ResultsList
          selectedStakeholder={selectedStakeholder}
          doSelectStakeholder={doSelectStakeholder}
          stakeholders={sortedData}
          setSelectedPopUp={setSelectedPopUp}
          setIsPopupOpen={setIsPopupOpen}
          isWindowWide={isWindowWide}
          viewport={viewport}
          setViewport={setViewport}
        />
        <ResultsMap
          selectedLatitude={initialCoords.latitude}
          selectedLongitude={initialCoords.longitude}
          viewport={viewport}
          setViewport={setViewport}
          stakeholders={data}
          doSelectStakeholder={doSelectStakeholder}
          categoryIds={categoryIds}
          selectedPopUp={selectedPopUp}
          setSelectedPopUp={setSelectedPopUp}
          isPopupOpen={isPopupOpen}
          setIsPopupOpen={setIsPopupOpen}
          isWindowWide={isWindowWide}
          isMobile={isMobile}
        />
      </Grid>
    </>
  );
}
