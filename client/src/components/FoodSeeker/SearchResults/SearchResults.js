import useBreakpoints from "hooks/useBreakpoints";
import useCategoryIds from "hooks/useCategoryIds";
import useNeighborhoodsGeoJSON from "hooks/useNeighborhoodsGeoJSON";
import useOrganizationBests from "hooks/useOrganizationBests";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import * as analytics from "services/analytics";
import {
  useAppDispatch,
  useSearchCoordinates,
  useSelectedOrganization,
  useStakeholders,
} from "../../../appReducer";
import Filters from "./ResultsFilters/ResultsFilters";
import List from "./ResultsList/ResultsList";
import Map from "./ResultsMap/ResultsMap";
import Details from "./StakeholderDetails/StakeholderDetails";
import Preview from "./StakeholderPreview/StakeholderPreview";
import { Desktop, Mobile, Tablet } from "./layouts";

const SearchResults = () => {
  const mapRef = useRef(null);
  const { isDesktop, isTablet } = useBreakpoints();
  const { selectAll, loading } = useOrganizationBests();
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
  const stakeholders = useStakeholders();
  const organizationId = new URLSearchParams(location.search).get("id");

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
    selectAll();

    analytics.postEvent("searchArea");
  }, [categoryIds, selectAll, neighborhoodId, dispatch]);

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
