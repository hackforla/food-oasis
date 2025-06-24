import { DEFAULT_CATEGORIES } from "constants/stakeholder";
import { computeDistances, checkIfStaleData, getNextDateForDay } from "helpers";
import { useCallback, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  DEFAULT_COORDINATES,
  useAppDispatch,
  useOpenTimeFilter,
  useSearchCoordinates,
  useOrgNameFilter,
} from "../appReducer";
import * as analytics from "../services/analytics";
import * as stakeholderService from "../services/stakeholder-best-service";
import { useSiteContext } from "contexts/siteContext";
import { stakeholdersDaysHours } from "../components/FoodSeeker/SearchResults/StakeholderPreview/StakeholderPreview";

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
  const openTimeFilter = useOpenTimeFilter();
  const orgNameFilter = useOrgNameFilter();
  const { tenantTimeZone } = useSiteContext();

  const longitude =
    searchCoordinates?.longitude || DEFAULT_COORDINATES.longitude;
  const latitude = searchCoordinates?.latitude || DEFAULT_COORDINATES.latitude;

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

      if (filters.showActiveOnly) {
        // filter out inactive, inactiveTemporary stakeholders
        filteredStakeholders = filteredStakeholders.filter((stakeholder) => {
          return !stakeholder.inactive && !stakeholder.inactiveTemporary;
        });
      }

      const { day, time } = filters.openTimeFilter;
      if (day !== "" && time !== "") {
        filteredStakeholders = filteredStakeholders.filter((stakeholder) => {
          const nextDateForDay = getNextDateForDay(day, time, tenantTimeZone);
          const hours = stakeholdersDaysHours(
            stakeholder,
            tenantTimeZone,
            nextDateForDay
          );

          return !!hours;
        });
      }
      if (filters.orgNameFilter) {
        filteredStakeholders = filteredStakeholders.filter((stakeholder) => {
          return stakeholder.name
            .toLowerCase()
            .includes(filters.orgNameFilter.toLowerCase());
        });
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
    [latitude, longitude, dispatch, tenantTimeZone]
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

        if (openTimeFilter) {
          filters.openTimeFilter = openTimeFilter;
          filters.showActiveOnly = true;
        }
        if (orgNameFilter) {
          filters.orgNameFilter = orgNameFilter;
        }

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
    [
      openTimeFilter,
      latitude,
      longitude,
      processStakeholders,
      orgNameFilter,
    ]
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
