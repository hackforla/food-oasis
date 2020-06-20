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
  list: {
    textAlign: "center",
    fontSize: "12px",
    overflow: "scroll",
  },
  map: {
    textAlign: "center",
    fontSize: "12px",
    maxWidth: "100%",
    flexGrow: 1,
  },
}));

export default function ResultsContainer(props) {
  const windowSize = window.innerWidth > 960 ? true : false;
  const [isWindow960orLess, changeWindow] = React.useState(windowSize);
  const mobileTest = new RegExp("Mobi", "i");
  const [isMobile, changeMobile] = React.useState(
    mobileTest.test(navigator.userAgent) ? true : false
  );

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

  const storage = window.localStorage;
  const { userCoordinates, userSearch } = props;
  const { data, search } = useOrganizations();
  const classes = useStyles();
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

  const topLevelProps = {
    radius,
    setRadius,
    origin,
    setOrigin,
    toggleCategory,
    categoryIds,
    isVerifiedSelected,
    selectVerified,
    userCoordinates,
    userSearch,
  };

  return (
    <Grid container direction="row">
      <Grid item xs={12}>
        <ResultsFilters
          {...topLevelProps}
          data={data}
          search={search}
          isWindow960orLess={isWindow960orLess}
        />
      </Grid>
      <Grid item xs={12}>
        <Grid container wrap="wrap-reverse">
          <Grid
            item
            xs={12}
            md={4}
            className={classes.list}
            style={{ height: isWindow960orLess ? "55em" : "" }}
          >
            <ResultsList
              selectedStakeholder={selectedStakeholder}
              doSelectStakeholder={doSelectStakeholder}
              stakeholders={data}
              setSelectedPopUp={setSelectedPopUp}
              setIsPopupOpen={setIsPopupOpen}
              isWindow960orLess={isWindow960orLess}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={8}
            className={classes.map}
            style={{ maxWidth: isMobile ? "100%" : "98%" }}
          >
            {/* above line stopgab for scrolling on smaller desktop devices */}
            <ResultsMap
              stakeholders={data}
              doSelectStakeholder={doSelectStakeholder}
              categoryIds={categoryIds}
              selectedLatitude={origin.latitude}
              selectedLongitude={origin.longitude}
              selectedPopUp={selectedPopUp}
              setSelectedPopUp={setSelectedPopUp}
              isPopupOpen={isPopupOpen}
              setIsPopupOpen={setIsPopupOpen}
              isWindow960orLess={isWindow960orLess}
              isMobile={isMobile}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
