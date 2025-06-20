import useBreakpoints from "hooks/useBreakpoints";
import useCategoryIds from "hooks/useCategoryIds";
import useNeighborhoodsGeoJSON from "hooks/useNeighborhoodsGeoJSON";
import useOrganizationBests from "hooks/useOrganizationBests";
import { FOOD_PANTRY_CATEGORY_ID, MEAL_PROGRAM_CATEGORY_ID } from "constants/stakeholder";
import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import * as analytics from "services/analytics";
import {
  useAppDispatch,
  useIsListPanelVisible,
  usePosition,
  useSearchCoordinates,
  useStakeholders,
} from "../../../appReducer";
import Filters from "./ResultsFilters/ResultsFilters";
import List from "./ResultsList/ResultsList";
import Map from "./ResultsMap/ResultsMap";
import { Desktop, Mobile } from "./layouts";
import SEO from "../../SEO";

const SearchResults = () => {
  const isListPanelVisible = useIsListPanelVisible();
  const { isDesktop } = useBreakpoints();
  const { selectAll, loading } = useOrganizationBests();
  const { categoryIds, toggleCategory } = useCategoryIds([FOOD_PANTRY_CATEGORY_ID, MEAL_PROGRAM_CATEGORY_ID]);
  const { getGeoJSONById } = useNeighborhoodsGeoJSON();
  const [showList, setShowList] = useState(true);
  const searchCoordinates = useSearchCoordinates();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const neighborhoodId = new URLSearchParams(location.search).get(
    "neighborhood_id"
  );
  const stakeholders = useStakeholders();
  const organizationId = new URLSearchParams(location.search).get("id");
  const positionDraggable = usePosition();

  useEffect(() => {
    const windowHeightPercentage = window.innerHeight / 100;
    const triggerHeightTop = 54 * windowHeightPercentage;

    if (positionDraggable.y === 0) {
      setShowList(true);
    } else if (positionDraggable.y === triggerHeightTop) {
      setShowList(false);
    } else {
      return;
    }
  }, [positionDraggable]);

  // USE EFFECT BASED ON THIS FUNCTION IN Mobile.js
  // const handleStop = (e, ui) => {
  //   const windowHeight = window.innerHeight / 100;
  //   let newY;
  //   if (ui.y < 20 * windowHeight) {
  //     newY = hasAdvancedFilterFeatureFlag ? (100 / window.innerHeight) * 60 : 0;
  //   } else if (ui.y > 20 * windowHeight && ui.y < 40 * windowHeight) {
  //     newY = 17;
  //   } else if (ui.y > 40 * windowHeight) {
  //     newY = 54;
  //   }
  //   setPosition({ x: 0, y: newY * windowHeight });
  // };

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
    selectAll({ categoryIds });

    analytics.postEvent("searchArea");
  }, [categoryIds, selectAll, neighborhoodId, dispatch]);

  useEffect(() => {
    if (!location.search) {
      dispatch({ type: "RESET_SELECTED_ORGANIZATION" });
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

  const resetOrigin = useCallback(() => {
    dispatch({ type: "RESET_COORDINATES" });
  }, [dispatch]);

  const toggleShowList = useCallback(() => {
    setShowList((showList) => !showList);
  }, []);

  useEffect(() => {
    setShowList(true);
  }, [isListPanelVisible]);

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
      stakeholders={stakeholders}
      categoryIds={categoryIds}
      toggleCategory={toggleCategory}
      loading={loading}
    />
  );

  const list = (
    <List
      stakeholders={stakeholders || []}
      loading={loading}
      handleReset={resetOrigin}
    />
  );
  return (
    <>
      <SEO
        title="Map | Food Oasis"
        description="Enter your zip code or address to search for PANTRIES or MEALS"
        url="https://www.foodoasis.la/organizations"
      />
      {isDesktop ? (
        <Desktop
          filters={filters}
          map={map}
          list={list}
          stakeholders={stakeholders}
          categoryIds={categoryIds}
          toggleCategory={toggleCategory}
          loading={loading}
        />
      ) : (
        <Mobile showList={showList} filters={filters} map={map} list={list} />
      )}
    </>
  );
};

export default SearchResults;
