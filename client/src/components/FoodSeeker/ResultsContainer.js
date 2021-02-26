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

  const [initViewport, setInitViewport] = useState(null);

  const doSelectStakeholder = useCallback(
    (stakeholder) => {
      if (stakeholder) {
        window.dataLayer.push({
          event: "viewDetail",
          action: "click",
          value: stakeholder.id,
          name: stakeholder.name,
        });
        const name = stakeholder.name.toLowerCase().replaceAll(" ", "_");
        history.push(`/organizations?org=${name}`);
      } else {
        history.push("/organizations");
      }
      if (stakeholder && !isMobile) {
        setInitViewport({
          latitude: stakeholder.latitude,
          longitude: stakeholder.longitude,
        });
      }
      onSelectStakeholder(stakeholder);
    },
    [setInitViewport, history]
  );

  useEffect(() => {
    if (location.search.includes("?org=") && data) {
      const org = location.search.replace("?org=", "").replaceAll("_", " ");
      const stakeholder = data.find((s) => s.name.toLowerCase() === org);
      if (stakeholder) {
        onSelectStakeholder(stakeholder);
        setInitViewport({
          latitude: stakeholder.latitude,
          longitude: stakeholder.longitude,
          zoom: 13,
        });
      } else {
        onSelectStakeholder(null);
      }
    }
  }, [data, location.search]);

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

  const handleSearch = useCallback(
    (e, center, bounds) => {
      setStatus("loading");
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

      if (!center) {
        setInitViewport({
          zoom: defaultCoordinates.zoom,
          latitude: origin.latitude,
          longitude: origin.longitude,
        });
      }
      setStatus("loaded");
    },
    [
      search,
      origin.latitude,
      origin.longitude,
      userCoordinates.latitude,
      userCoordinates.longitude,
      categoryIds,
      setInitViewport,
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
            handleSearch={handleSearch}
            origin={origin}
            stakeholders={data}
            doSelectStakeholder={doSelectStakeholder}
            selectedStakeholder={selectedStakeholder}
            categoryIds={categoryIds}
            setToast={setToast}
            initViewport={initViewport}
          />
        )}
      </Grid>
    </>
  );
}
