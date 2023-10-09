import { useState, useCallback } from "react";
import * as stakeholderService from "../services/stakeholder-best-service";
import * as analytics from "../services/analytics";
import { DEFAULT_CATEGORIES } from "constants/stakeholder";
import { useAppDispatch } from "../appReducer";
import { computeDistances, isStaleData } from "helpers";

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

  const dispatch = useAppDispatch();

  const processStakeholders = useCallback(
    (stakeholders, latitude, longitude, filters) => {
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

      // do we want to show inactive organizations?
      if (filters.isInactive !== undefined && filters.isInactive !== "either") {
        filteredStakeholders = filteredStakeholders.filter(
          (stakeholder) => stakeholder.inactive === filters.isInactive
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
    [dispatch]
  );

  const selectAll = useCallback(
    async ({
      name,
      latitude,
      longitude,
      radius,
      bounds,
      categoryIds,
      isInactive,
      verificationStatusId,
      neighborhoodId,
      tag,
    }) => {
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
        radius,
        bounds,
        categoryIds,
        isInactive,
        verificationStatusId,
        neighborhoodId,
        tag,
      });

      try {
        setState({ data: null, loading: true, error: false });

        const filters = {
          categoryIds: categoryIds.length ? categoryIds : DEFAULT_CATEGORIES,
          isInactive,
          verificationStatusId,
          neighborhoodId,
          tag,
        };
        const localStorageStakeholders = JSON.parse(
          localStorage.getItem("stakeholders")
        );

        if (localStorageStakeholders && !isStaleData()) {
          processStakeholders(
            localStorageStakeholders,
            latitude,
            longitude,
            filters
          );
        } else {
          const stakeholders = await stakeholderService.selectAll();

          const currentTimestamp = new Date().getTime();
          localStorage.setItem("stakeholders", JSON.stringify(stakeholders));
          localStorage.setItem(
            "stakeholdersTimestamp",
            currentTimestamp.toString()
          );

          processStakeholders(stakeholders, latitude, longitude, filters);
        }
      } catch (err) {
        setState({ data: null, loading: false, error: true });
        console.error(err);
        return Promise.reject(err);
      }
    },
    [processStakeholders]
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
