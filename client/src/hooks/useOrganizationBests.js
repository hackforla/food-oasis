import { DEFAULT_CATEGORIES } from "constants/stakeholder";
import { computeDistances, checkIfStaleData } from "helpers";
import { useCallback, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  DEFAULT_COORDINATES,
  useAppDispatch,
  useSearchCoordinates,
} from "../appReducer";
import * as analytics from "../services/analytics";
import * as stakeholderService from "../services/stakeholder-best-service";

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

export default function useOrganizationBests() {
  const [state, setState] = useState({
    data: null,
    loading: false,
    error: false,
  });
  const location = useLocation();
  const searchCoordinates = useSearchCoordinates();

  let latitude, longitude;
  if (location.search && !searchCoordinates) {
    const queryParams = new URLSearchParams(location.search);
    longitude = Number(queryParams.get("longitude"));
    latitude = Number(queryParams.get("latitude"));
  } else {
    longitude = searchCoordinates?.longitude || DEFAULT_COORDINATES.longitude;
    latitude = searchCoordinates?.latitude || DEFAULT_COORDINATES.latitude;
  }

  const dispatch = useAppDispatch();

  const processStakeholders = useCallback(
    (stakeholders, filters) => {
      let filteredStakeholders = stakeholders;

      if (latitude && longitude) {
        filteredStakeholders = computeDistances(
          latitude,
          longitude,
          filteredStakeholders
        );
      }

      if (filters.categoryIds && filters.categoryIds.length) {
        filteredStakeholders = filteredStakeholders.filter((stakeholder) =>
          filters.categoryIds.some((catId) =>
            stakeholder.categoryIds.includes(catId)
          )
        );
      }

      if (filters.neighborhoodId) {
        filteredStakeholders = filteredStakeholders.filter(
          (stakeholder) => stakeholder.neighborhoodId === filters.neighborhoodId
        );
      }

      const stakeholdersWithDistances = computeDistances(
        latitude,
        longitude,
        filteredStakeholders
      );
      stakeholdersWithDistances.sort(sortOrganizations);
      dispatch({
        type: "STAKEHOLDERS_LOADED",
        stakeholders: stakeholdersWithDistances,
      });
      setState({
        data: stakeholdersWithDistances,
        loading: false,
        error: false,
      });
    },
    [dispatch, longitude, latitude]
  );

  const selectAll = useCallback(
    async ({ categoryIds }) => {
      if (!latitude || !longitude) {
        setState({ data: null, loading: false, error: true });
        const msg =
          "Call to search function missing latitude and/or longitude parameters";
        console.error(msg);
        return Promise.reject(msg);
      }
      analytics.postEvent("searchFoodSeeker", {
        latitude,
        longitude,
        categoryIds,
      });

      try {
        setState({ data: null, loading: true, error: false });

        const filters = {
          categoryIds: categoryIds.length ? categoryIds : DEFAULT_CATEGORIES,
        };

        let stakeholders;
        const isStaleData = checkIfStaleData();
        if (!isStaleData) {
          stakeholders = JSON.parse(localStorage.getItem("stakeholders"));
        } else {
          stakeholders = await stakeholderService.selectAll();
          const currentTimestamp = new Date().getTime();
          localStorage.setItem("stakeholders", JSON.stringify(stakeholders));
          localStorage.setItem(
            "stakeholdersTimestamp",
            currentTimestamp.toString()
          );
        }
        processStakeholders(stakeholders, filters);
      } catch (err) {
        setState({ data: null, loading: false, error: true });
        console.error(err);
        return Promise.reject(err);
      }
    },
    [processStakeholders, latitude, longitude]
  );

  const getById = useCallback(async (id) => {
    if (!id) {
      setState({ data: null, loading: false, error: true });
      const msg = "Call to getById missing id parameter";
      console.error(msg);
      return Promise.reject(msg);
    }
    try {
      setState((prev) => ({ ...prev, loading: true, error: false }));

      const stakeholder = await stakeholderService.getById(id);
      setState((prev) => ({ ...prev, loading: false }));
      return stakeholder;
    } catch (err) {
      setState((prev) => ({ ...prev, loading: false, error: true }));
      console.error(err);
      return Promise.reject(err);
    }
  }, []);

  return { ...state, selectAll, getById };
}
