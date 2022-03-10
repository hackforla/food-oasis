import React, { useState, useCallback, useEffect, useRef } from "react";
import { useHistory, useLocation } from "react-router-dom";
import useOrganizationBests from "hooks/useOrganizationBests";
import useCategoryIds from "hooks/useCategoryIds";
import useBreakpoints from "hooks/useBreakpoints";
import useNeighborhoodsGeoJSON from "hooks/useNeighborhoodsGeoJSON";
import { getMapBounds } from "helpers";
import { Mobile, Tablet, Desktop } from "./layouts";
import Filters from "./Filters";
import Map from "./Map";
import List from "./List";
import Preview from "./Preview";
import Details from "./Details";
import * as analytics from "services/analytics";
import {
  useSearchCoordinates,
  useAppDispatch,
  useSelectedOrganization,
} from "../../../appReducer";

const ResultsContainer = () => {
  const mapRef = useRef(null);
  const { isDesktop, isTablet } = useBreakpoints();
  const {
    data: stakeholders,
    search,
    loading,
    getById,
  } = useOrganizationBests();
  const { categoryIds, toggleCategory } = useCategoryIds([]);
  const { getGeoJSONById } = useNeighborhoodsGeoJSON();
  const [showList, setShowList] = useState(true);
  const searchCoordinates = useSearchCoordinates();
  const dispatch = useAppDispatch();
  const selectedOrganization = useSelectedOrganization();
  const history = useHistory();
  const location = useLocation();
  const stakeholderId = new URLSearchParams(location.search).get("id");
  const neighborhoodId = new URLSearchParams(location.search).get(
    "neighborhood_id"
  );

  // IF neighborhood_id is part of query string, get neighborhood info,
  // stored neighborhood info in reducer, and start with map centered
  // on neighborhood centroid coordinates.
  useEffect(() => {
    async function execute() {
      if (neighborhoodId) {
        try {
          const neighborhood = await getGeoJSONById(neighborhoodId);
          const centroid = {
            latitude: neighborhood.centroidLatitude,
            longitude: neighborhood.centroidLongitude,
          };
          dispatch({
            type: "NEIGHBORHOOD_UPDATED",
            neighborhood,
          });
          dispatch({
            type: "DEFAULT_COORDINATES_UPDATED",
            coordinates: centroid,
          });
          dispatch({
            type: "SEARCH_COORDINATES_UPDATED",
            coordinates: centroid,
          });
        } catch (err) {
          console.error(err);
        }
      }
    }
    execute();
  }, [neighborhoodId, getGeoJSONById, dispatch]);

  React.useEffect(() => {
    async function getOrganization() {
      if (stakeholderId) {
        const organization = await getById(stakeholderId);

        dispatch({
          type: "SELECTED_ORGANIZATION_UPDATED",
          organization,
        });
      }
    }

    getOrganization();
  }, [stakeholderId, dispatch, getById]);

  React.useEffect(() => {
    if (!selectedOrganization) return;

    analytics.postEvent("selectOrganization", {
      id: selectedOrganization.id,
      name: selectedOrganization.name,
    });

    //Update url history
    const name = selectedOrganization.name.toLowerCase().replaceAll(" ", "_");
    history.push(
      `${location.pathname}?id=${selectedOrganization.id}&org=${name}`
    );
  }, [selectedOrganization, history, location.pathname]);

  useEffect(() => {
    const { zoom, dimensions } = mapRef.current.getViewport();
    const criteria = {
      latitude: searchCoordinates.latitude,
      longitude: searchCoordinates.longitude,
      bounds: getMapBounds(searchCoordinates, zoom, dimensions),
      categoryIds,
      isInactive: "either",
      verificationStatusId: 0,
      neighborhoodId: null,
      tag: null,
    };
    search(criteria);
    analytics.postEvent("searchArea", criteria);
  }, [categoryIds, search, searchCoordinates]);

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
      preview={selectedOrganization && <Preview />}
      details={selectedOrganization && <Details />}
    />
  );
};

export default ResultsContainer;
