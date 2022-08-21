import React, { useState, useCallback, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import useOrganizationBests from "hooks/useOrganizationBests";
import useCategoryIds from "hooks/useCategoryIds";
import useBreakpoints from "hooks/useBreakpoints";
import useNeighborhoodsGeoJSON from "hooks/useNeighborhoodsGeoJSON";
import { getMapBounds } from "helpers";
import { Mobile, Tablet, Desktop } from "./layouts";
import Filters from "./ResultsFilters/ResultsFilters";
import Map from "./ResultsMap/ResultsMap";
import List from "./ResultsList/ResultsList";
import Preview from "./StakeholderPreview/StakeholderPreview";
import Details from "./StakeholderDetails/StakeholderDetails";
import * as analytics from "services/analytics";
import {
  useSearchCoordinates,
  useAppDispatch,
  useSelectedOrganization,
  DEFAULT_COORDINATES,
} from "../../../appReducer";

const SearchResults = () => {
  const mapRef = useRef(null);
  const { isDesktop, isTablet } = useBreakpoints();
  const { data: stakeholders, search, loading } = useOrganizationBests();
  const { categoryIds, toggleCategory } = useCategoryIds([]);
  const { getGeoJSONById } = useNeighborhoodsGeoJSON();
  const [showList, setShowList] = useState(true);
  const searchCoordinates = useSearchCoordinates();
  const dispatch = useAppDispatch();
  const selectedOrganization = useSelectedOrganization();
  const location = useLocation();
  const neighborhoodId = new URLSearchParams(location.search).get(
    "neighborhood_id"
  );
  const organizationId = new URLSearchParams(location.search).get("id");
  let latitude, longitude;
  if (location.search && !searchCoordinates) {
    const queryParams = new URLSearchParams(location.search);
    longitude = Number(queryParams.get("longitude"));
    latitude = Number(queryParams.get("latitude"));
  } else {
    longitude = searchCoordinates?.longitude || DEFAULT_COORDINATES.longitude;
    latitude = searchCoordinates?.latitude || DEFAULT_COORDINATES.latitude;
  }

  // If path starts with "widget", then set the state variable isWidget to true,
  // so we stay in widget mode (w/o normal App Header and Footer)
  useEffect(() => {
    if (location.pathname.toLowerCase() === "/widget") {
      dispatch({
        type: "WIDGET",
        isWidget: true,
      });
    }
  }, [dispatch, location.pathname]);

  // If neighborhood_id is part of query string, get neighborhood info,
  // stored neighborhood info in reducer, and start with map centered
  // on neighborhood centroid coordinates.
  useEffect(() => {
    async function execute() {
      if (neighborhoodId) {
        try {
          const neighborhood = await getGeoJSONById(neighborhoodId);
          const coordinates = {
            latitude: neighborhood.centroidLatitude,
            longitude: neighborhood.centroidLongitude,
          };
          dispatch({
            type: "NEIGHBORHOOD_UPDATED",
            neighborhood,
            coordinates,
          });
        } catch (err) {
          console.error(err);
        }
      }
    }
    execute();
  }, [neighborhoodId, getGeoJSONById, dispatch]);

  useEffect(() => {
    const { zoom, dimensions } = mapRef.current.getViewport();
    const criteria = {
      latitude,
      longitude,
      bounds: getMapBounds({ longitude, latitude }, zoom, dimensions),
      categoryIds,
      isInactive: "either",
      verificationStatusId: 0,
      neighborhoodId: null,
      tag: null,
    };
    search(criteria);
    analytics.postEvent("searchArea", criteria);
  }, [categoryIds, search, neighborhoodId, longitude, latitude]);

  useEffect(() => {
    if (!location.search) {
      dispatch({ type: "RESET_SELECTED_ORGANIZATION", organization: null });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  useEffect(() => {
    if (!searchCoordinates && stakeholders && organizationId) {
      const organization = stakeholders.find(
        (stakeholder) => stakeholder.id === Number(organizationId)
      );
      dispatch({ type: "SELECTED_ORGANIZATION_UPDATED", organization });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stakeholders]);

  const searchMapArea = useCallback(() => {
    const { center } = mapRef.current.getViewport();
    dispatch({ type: "SEARCH_COORDINATES_UPDATED", coordinates: center });
  }, [dispatch]);

  const resetOrigin = useCallback(() => {
    dispatch({ type: "RESET_COORDINATES" });
  }, [dispatch]);

  const toggleShowList = useCallback(() => {
    dispatch({ type: "RESET_SELECTED_ORGANIZATION" });
    setShowList((showList) => !showList);
  }, [dispatch]);

  const filters = (
    <Filters
      categoryIds={categoryIds}
      toggleCategory={toggleCategory}
      showList={showList}
      toggleShowList={toggleShowList}
    />
  );

  const map = (
    <Map
      ref={mapRef}
      stakeholders={stakeholders}
      categoryIds={categoryIds}
      loading={loading}
      searchMapArea={searchMapArea}
    />
  );

  const list = (
    <List
      stakeholders={stakeholders || []}
      loading={loading}
      handleReset={resetOrigin}
    />
  );

  if (isDesktop) return <Desktop filters={filters} map={map} list={list} />;

  if (isTablet) return <Tablet filters={filters} map={map} list={list} />;

  return (
    <Mobile
      filters={filters}
      map={map}
      list={showList && list}
      preview={
        selectedOrganization && <Preview stakeholder={selectedOrganization} />
      }
      details={selectedOrganization && <Details />}
    />
  );
};

export default SearchResults;
