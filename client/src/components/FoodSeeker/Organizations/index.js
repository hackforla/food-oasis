import React, { useState, useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { defaultCoordinates } from "helpers/Configuration";
import useOrganizationBests from "hooks/useOrganizationBests";
import useCategoryIds from "hooks/useCategoryIds";
import useSelectedStakeholder from "hooks/useSelectedStakeholder";
import useBreakpoints from "hooks/useBreakpoints";
import { Mobile, Tablet, Desktop } from "./layouts";
import Filters from "./Filters";
import List from "./List";
import Map from "./Map";
import Preview from "./Preview";
import Details from "./Details";
import * as analytics from "services/analytics";

export default function ResultsContainer({
  userCoordinates,
  origin,
  setOrigin,
  setToast,
  browserLocation,
}) {
  const { data: stakeholders, search, loading } = useOrganizationBests();
  const location = useLocation();
  const [mapPosition, setMapPosition] = useState(null);
  const [isMapView, setIsMapView] = useState(true);
  const { categoryIds, toggleCategory } = useCategoryIds([]);
  const { selectedStakeholder, doSelectStakeholder } = useSelectedStakeholder();
  const [isVerifiedSelected, selectVerified] = useState(false);

  const [viewport, setViewport] = useState({
    latitude: location?.lat || origin.latitude || defaultCoordinates.lat,
    longitude: location?.lon || origin.longitude || defaultCoordinates.lon,
    zoom: defaultCoordinates.zoom,
  })

  const setCenter = (coords) => {
    setViewport((viewport) => ({
      latitude: coords.latitude,
      longitude: coords.longitude,
    }));
    setOrigin(coords);
  };

  useEffect(() => {
    if (!mapPosition || !categoryIds) return

    const {
      center: { lat: latitude, lng: longitude },
      bounds
    } = mapPosition

    search({
      latitude,
      longitude,
      bounds,
      categoryIds,
      isInactive: "either",
      verificationStatusId: 0,
    });

    analytics.postEvent("searchArea", {});
  }, [categoryIds, mapPosition, search]);

  const switchResultsView = useCallback(() => {
    doSelectStakeholder(null);
    setIsMapView((isMapView) => !isMapView);
  }, [doSelectStakeholder]);

  const { isMobile, isTablet } = useBreakpoints();

  const filters = (
    <Filters
      origin={origin}
      setOrigin={setCenter}
      toggleCategory={toggleCategory}
      categoryIds={categoryIds}
      isVerifiedSelected={isVerifiedSelected}
      selectVerified={selectVerified}
      userCoordinates={userCoordinates}
      isMapView={isMapView}
      switchResultsView={switchResultsView}
      browserLocation={browserLocation}
    />
  );

  const list = (
    <List
      selectedStakeholder={selectedStakeholder}
      doSelectStakeholder={doSelectStakeholder}
      stakeholders={stakeholders || []}
      setToast={setToast}
      loading={loading}
      handleReset={setCenter.bind(null, userCoordinates)}
    />
  );

  const map = (
    <Map
      stakeholders={stakeholders}
      doSelectStakeholder={doSelectStakeholder}
      selectedStakeholder={selectedStakeholder}
      categoryIds={categoryIds}
      setToast={setToast}
      loading={loading}
      setMapPosition={setMapPosition}
      viewport={viewport}
    />
  );

  const preview = isMobile && selectedStakeholder && (
    <Preview
      doSelectStakeholder={doSelectStakeholder}
      stakeholder={selectedStakeholder}
    />
  );

  const details = isMobile && selectedStakeholder && (
    <Details
      selectedStakeholder={selectedStakeholder}
      onClose={doSelectStakeholder.bind(null, null)}
      setToast={setToast}
    />
  );

  if (isMobile)
    return (
      <Mobile
        filters={filters}
        list={list}
        map={map}
        preview={preview}
        details={details}
        isMapView={isMapView}
      />
    )
  else if (isTablet)
    return (
      <Tablet
        filters={filters}
        list={list}
        map={map}
      />
    )
  else
    return (
      <Desktop
        filters={filters}
        list={list}
        map={map}
      />
    )
}
