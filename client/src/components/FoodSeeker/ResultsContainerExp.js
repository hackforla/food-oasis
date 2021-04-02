import React, { useEffect, useState, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { useHistory, useLocation } from "react-router-dom";

import { useOrganizationBests } from "hooks/useOrganizationBests";
import useCategoryIds from "hooks/useCategoryIds";
import { isMobile } from "helpers";
import { defaultCoordinates } from "helpers/Configuration";
import { DEFAULT_CATEGORIES } from "constants/stakeholder";

import Filters from "./ResultsFilters";
import List from "./ResultsList";
import Map from "./ResultsMapExp";

import * as stormly from "../../services/stormly";

const useStyles = makeStyles((theme) => ({
  listMapContainer: {
    height: "100%",
    [theme.breakpoints.up("sm")]: {
      height: "79%",
    },
    overflowY: "hidden",
  },
}));

export default function ResultsContainer({
  userCoordinates,
  origin,
  setOrigin,
  setToast,
  browserLocation,
}) {
  // Component state
  const { data, search } = useOrganizationBests();
  const [sortedData, setSortedData] = useState([]);
  const [status, setStatus] = useState("initial"); // 'initial', 'loading', 'loaded'
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const [selectedStakeholder, onSelectStakeholder] = useState(null);
  const [isMapView, setIsMapView] = useState(true);

  const mobileView = isMobile();

  const { categoryIds, toggleCategory } = useCategoryIds([]);
  const [isVerifiedSelected, selectVerified] = useState(false);

  const [viewport, setViewport] = useState({
    latitude: location?.lat || origin.latitude || defaultCoordinates.lat,
    longitude: location?.lon || origin.longitude || defaultCoordinates.lon,
    zoom: defaultCoordinates.zoom,
  });

  const setCenter = (coords) => {
    setViewport({
      ...viewport,
      latitude: coords.latitude,
      longitude: coords.longitude,
      logoPosition: "top-left",
    });
    setOrigin(coords);
  };

  const doSelectStakeholder = useCallback(
    (stakeholder) => {
      if (stakeholder) {
        // Tell analytics that stakeholder is selected
        window.dataLayer.push({
          event: "viewDetail",
          action: "click",
          value: stakeholder.id,
          name: stakeholder.name,
        });
        stormly.post("getDirections", {
          id: stakeholder.id,
          name: stakeholder.name,
        });

        //Update url history
        const name = stakeholder.name.toLowerCase().replaceAll(" ", "_");
        history.push(`/organizationsexp?org=${name}`);
      } else {
        history.push("/organizationsexp");
      }
      onSelectStakeholder(stakeholder);
    },
    [history]
  );

  useEffect(() => {
    window.stormly("event", "visitMap");
  }, []);

  // useEffect(() => {
  //   if (location.search.includes("?org=") && data) {
  //     const org = location.search.replace("?org=", "").replaceAll("_", " ");
  //     const stakeholder = data.find((s) => s.name.toLowerCase() === org);
  //     if (stakeholder) {
  //       onSelectStakeholder(stakeholder);
  //       setViewport({
  //         ...viewport,
  //         latitude: stakeholder.latitude,
  //         longitude: stakeholder.longitude,
  //       });
  //     } else {
  //       onSelectStakeholder(null);
  //     }
  //   }
  // }, [data, location.search, viewport]);

  const switchResultsView = () => {
    doSelectStakeholder();
    setIsMapView(!isMapView);
  };

  // Component effects

  useEffect(() => {
    setStatus("loading");
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
    setStatus("loaded");
  }, [data]);

  const handleSearchThisArea = useCallback(
    (center, bounds) => {
      if (!center || !bounds) {
        console.error("handleSearchThisArea is missing args");
      }
      setStatus("loading");

      setViewport({
        ...viewport,
        latitude: center.lat,
        longitude: center.lng,
      });

      search({
        latitude: viewport.latitude,
        longitude: viewport.longitude,
        categoryIds: categoryIds.length ? categoryIds : DEFAULT_CATEGORIES,
        isInactive: "either",
        verificationStatusId: 0,
        bounds,
        radius: defaultCoordinates.radius,
      });
      setStatus("loaded");
    },
    [search, categoryIds, viewport]
  );

  const handleSearch = () => {
    setStatus("loading");

    // TODO: This fn is called by ResultsFilter, and unfortunately, neither the
    // filter nor this component know the map component lat, long bounds, so
    // we're just using a radius-based query, which may not get all of the
    // orgs in the map area. Need to try to work out a way to get boundaries
    // for query.
    search({
      latitude: viewport.latitude,
      longitude: viewport.longitude,
      categoryIds: categoryIds.length ? categoryIds : DEFAULT_CATEGORIES,
      isInactive: "either",
      verificationStatusId: 0,
      bounds: null,
      radius: defaultCoordinates.radius,
    });

    setStatus("loaded");
  };

  return (
    <>
      <Filters
        origin={origin}
        setOrigin={setCenter}
        toggleCategory={toggleCategory}
        categoryIds={categoryIds}
        isVerifiedSelected={isVerifiedSelected}
        selectVerified={selectVerified}
        userCoordinates={userCoordinates}
        handleSearch={handleSearch}
        isMapView={isMapView}
        switchResultsView={switchResultsView}
        browserLocation={browserLocation}
      />
      <Grid item container spacing={0} className={classes.listMapContainer}>
        {(!mobileView || (mobileView && !isMapView)) && (
          <List
            selectedStakeholder={selectedStakeholder}
            doSelectStakeholder={doSelectStakeholder}
            stakeholders={sortedData}
            setToast={setToast}
            status={status}
            handleReset={handleSearch}
          />
        )}
        {(!mobileView || (mobileView && isMapView)) && (
          <Map
            handleSearch={handleSearchThisArea}
            stakeholders={data}
            doSelectStakeholder={doSelectStakeholder}
            selectedStakeholder={selectedStakeholder}
            categoryIds={categoryIds}
            setToast={setToast}
            viewport={viewport}
            setViewport={setViewport}
          />
        )}
      </Grid>
    </>
  );
}
