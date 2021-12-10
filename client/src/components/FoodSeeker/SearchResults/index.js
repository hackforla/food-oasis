import React, { useState, useCallback, useEffect, useRef } from "react";
import useOrganizationBests from "hooks/useOrganizationBests";
import useCategoryIds from "hooks/useCategoryIds";
import useBreakpoints from "hooks/useBreakpoints";
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
import { useHistory, useLocation } from "react-router";

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
  const [showList, setShowList] = useState(true);
  // The following two states are temporarily hard-coded - they eventually should be
  // set from query parameters on the url. This allows the url
  // specified by an iframe (e.g. https://la.foodoasis.net/widget?neighborhoodId=3)
  // to pass  aneightborhoodId or tag parameter to filter the
  // results by neighborhood or tag from an iframe host site.
  const [tag] = useState("");
  const [neighborhoodId] = useState(null);
  const searchCoordinates = useSearchCoordinates();
  const dispatch = useAppDispatch();
  const selectedOrganization = useSelectedOrganization();
  const history = useHistory();
  const location = useLocation();

  React.useEffect(() => {
    if (!location.search) return;
    async function getOrganization() {
      const queryParams = new URLSearchParams(location.search);
      const id = queryParams.get("id");

      if (id) {
        const organization = await getById(id);

        dispatch({
          type: "SELECTED_ORGANIZATION_UPDATED",
          organization,
        });
      }
    }

    getOrganization();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    // eslint-disable-next-line
  }, [selectedOrganization]);

  useEffect(() => {
    const { zoom, dimensions } = mapRef.current.getViewport();
    const criteria = {
      latitude: searchCoordinates.latitude,
      longitude: searchCoordinates.longitude,
      bounds: getMapBounds(searchCoordinates, zoom, dimensions),
      categoryIds,
      isInactive: "either",
      verificationStatusId: 0,
      neighborhoodId: neighborhoodId,
      tag: tag,
    };
    search(criteria);
    analytics.postEvent("searchArea", criteria);
  }, [categoryIds, search, tag, neighborhoodId, searchCoordinates]);

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
