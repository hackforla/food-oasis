import React, { useState, useCallback, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { defaultCoordinates } from "helpers/Configuration";
import { DEFAULT_CATEGORIES } from "constants/stakeholder";
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
  const mapRef = useRef(null);
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
    console.log('setting center:', coords);
    setViewport((viewport) => ({
      latitude: coords.latitude,
      longitude: coords.longitude,
    }));
    setOrigin(coords);
  };

  const handleSearch = useCallback(
    (mapPosition, categoryIds) => {
      console.log('searching from:', mapPosition)
      const { center, bounds } = mapPosition

      // console.log('searching from:', mapRef.current.getBounds());
      // const { center, bounds } = mapRef.current.getBounds();

      search({
        latitude: center.lat,
        longitude: center.lng,
        bounds,
        categoryIds: categoryIds.length ? categoryIds : DEFAULT_CATEGORIES,
        isInactive: "either",
        verificationStatusId: 0,
      });

      analytics.postEvent("searchArea", {});
    },
    [search],
  );

  useEffect(() => {
    if (!mapPosition || !categoryIds) return
    handleSearch(mapPosition, categoryIds);
  }, [categoryIds, mapPosition, handleSearch]);

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
      handleReset={() => setCenter(userCoordinates)}
    />
  );

  const map = (
    <Map
      ref={mapRef}
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
        isMapView={isMapView}
        filters={filters}
        list={list}
        map={map}
        preview={preview}
        details={details}
      />
    )

  if (isTablet)
    return (
      <Tablet
        filters={filters}
        list={list}
        map={map}
      />
    )

  return (
    <Desktop
      filters={filters}
      list={list}
      map={map}
    />
  )
}
