import React, { useState, useCallback, useEffect, useRef } from "react";
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
import geoViewport from '@mapbox/geo-viewport';

function getBounds(center, zoom, dimensions) {
  const [minLng, minLat, maxLng, maxLat] = geoViewport.bounds(
    [center.longitude, center.latitude],
    zoom,
    [dimensions.width, dimensions.height],
    512,
  )

  return { minLng, minLat, maxLng, maxLat };
}

export default function ResultsContainer({
  origin,
  setOrigin,
  userCoordinates,
  setToast,
}) {
  const mapRef = useRef(null);
  const { isMobile, isTablet } = useBreakpoints();
  const { data: stakeholders, search, loading } = useOrganizationBests();
  const [isMapView, setIsMapView] = useState(true);
  const { categoryIds, toggleCategory } = useCategoryIds([]);
  const { selectedStakeholder, doSelectStakeholder } = useSelectedStakeholder();
  const [isVerifiedSelected, selectVerified] = useState(false);

  useEffect(() => {
    const { latitude, longitude } = origin;
    const { zoom, dimensions } = mapRef.current.getViewport();
    const bounds = getBounds(origin, zoom, dimensions);

    search({
      latitude,
      longitude,
      bounds,
      categoryIds,
      isInactive: "either",
      verificationStatusId: 0,
    });

    analytics.postEvent("searchArea", {});
  }, [categoryIds, origin, search]);

  const searchMapArea = useCallback(() => {
    const { center } = mapRef.current.getViewport();
    setOrigin(center);
  }, [setOrigin]);

  const switchResultsView = useCallback(() => {
    doSelectStakeholder(null);
    setIsMapView((isMapView) => !isMapView);
  }, [doSelectStakeholder]);

  const filters = (
    <Filters
      origin={origin}
      setOrigin={setOrigin}
      toggleCategory={toggleCategory}
      categoryIds={categoryIds}
      isVerifiedSelected={isVerifiedSelected}
      selectVerified={selectVerified}
      userCoordinates={userCoordinates}
      isMapView={isMapView}
      switchResultsView={switchResultsView}
    />
  );

  const list = (
    <List
      selectedStakeholder={selectedStakeholder}
      doSelectStakeholder={doSelectStakeholder}
      stakeholders={stakeholders || []}
      setToast={setToast}
      loading={loading}
      handleReset={setOrigin.bind(null, userCoordinates)}
    />
  );

  const map = (
    <Map
      ref={mapRef}
      origin={origin}
      stakeholders={stakeholders}
      doSelectStakeholder={doSelectStakeholder}
      selectedStakeholder={selectedStakeholder}
      categoryIds={categoryIds}
      loading={loading}
      searchMapArea={searchMapArea}
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
