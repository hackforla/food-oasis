import { DEFAULT_CATEGORIES } from "constants/stakeholder";
import { useSiteContext } from "contexts/siteContext";
import { checkIfStaleData, computeDistances, getNextDateForDay } from "helpers";
import { useCallback, useState } from "react";
import {
  DEFAULT_COORDINATES,
  useAppDispatch,
  useFoodTypeFilter,
  useOpenTimeFilter,
  useOrgNameFilter,
  useSearchCoordinates,
} from "../appReducer";
import { stakeholdersDaysHours } from "../components/FoodSeeker/SearchResults/StakeholderPreview/StakeholderPreview";
import * as analytics from "../services/analytics";
import * as stakeholderService from "../services/stakeholder-best-service";
import dayjs from "dayjs";

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
  const searchCoordinates = useSearchCoordinates();
  const openTimeFilter = useOpenTimeFilter();
  const orgNameFilter = useOrgNameFilter();
  const foodTypeFilter = useFoodTypeFilter();
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
        filteredStakeholders = filteredStakeholders.filter((stakeholder) => {
          return !stakeholder.inactive && !stakeholder.inactiveTemporary;
        });
      }

      const { day, time } = filters.openTimeFilter;
      if (day && time && time !== "Any") {
        filteredStakeholders = filteredStakeholders.filter((stakeholder) => {
          const nextDateForDay = getNextDateForDay(day, time, tenantTimeZone);
          return !!stakeholdersDaysHours(
            stakeholder,
            tenantTimeZone,
            nextDateForDay
          );
        });
      } else if (day && (time === "" || time === "Any")) {
        filteredStakeholders = filteredStakeholders.filter((stakeholder) => {
          return stakeholder.hours?.some((h) =>
            h.day_of_week.toUpperCase().startsWith(day.slice(0, 3))
          );
        });
      } else if (!day && time && time !== "Any") {
        filteredStakeholders = filteredStakeholders.filter((stakeholder) => {
          return stakeholder.hours?.some((h) => {
            //hour format: (0,Wed,15:00:00,19:00:00)
            const openTime = dayjs(h.open, "HH:mm:ss");
            const closeTime = dayjs(h.close, "HH:mm:ss");
            const filterTime = dayjs(time, "hh:mmA");
            return (
              filterTime.isAfter(openTime) && filterTime.isBefore(closeTime)
            );
          });
        });
      }
      if (filters.orgNameFilter) {
        filteredStakeholders = filteredStakeholders.filter((stakeholder) => {
          return filters.orgNameFilter
            .toLowerCase()
            .split(" ")
            .every((word) => stakeholder.name.toLowerCase().includes(word));
        });
      }
      if (filters.foodTypeFilter) {
        filteredStakeholders = filteredStakeholders.filter((stakeholder) => {
          return filters.foodTypeFilter.every((foodType) => {
            return stakeholder[foodType] === true;
          });
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
        if (foodTypeFilter.length) {
          filters.foodTypeFilter = foodTypeFilter;
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
      foodTypeFilter,
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
