import { DEFAULT_CATEGORIES } from "constants/stakeholder";
import { useSiteContext } from "contexts/siteContext";
import { checkIfStaleData, computeDistances } from "helpers";
import { useCallback, useState } from "react";
import {
  DEFAULT_COORDINATES,
  useAppDispatch,
  useFoodTypeFilter,
  useOpenTimeFilter,
  useSearchFilter,
  useSearchCoordinates,
} from "../appReducer";
import * as analytics from "../services/analytics";
import * as stakeholderService from "../services/stakeholder-best-service";
import dayjs from "dayjs";
import type { Stakeholder } from "../types/Stakeholder";

type SearchStakeholder = Stakeholder & {
  categoryIds: number[];
  distance?: number | null;
};

interface OpenTimeFilter {
  day?: string;
  time?: string;
}

interface StakeholderFilters {
  categoryIds: number[];
  showActiveOnly?: boolean;
  openTimeFilter?: OpenTimeFilter;
  searchFilter?: string;
  foodTypeFilter?: string[];
}

interface SelectAllParams {
  categoryIds: number[];
}

// Public-facing text fields searched by the "searchFilter" free-text search
// (label reads "Search" in the UI). Deliberately excludes internal/admin-only
// fields such as `adminNotes` -- only fields a food seeker can already see on
// the listing/detail page belong here.
const SEARCHABLE_FIELDS = [
  "name",
  "address1",
  "address2",
  "city",
  "zip",
  "phone",
  "email",
  "requirements",
  "notes",
  "services",
  "items",
] as const;

interface UseOrganizationBestsState {
  data: SearchStakeholder[] | null;
  loading: boolean;
  error: boolean;
}

const sortOrganizations = (a: SearchStakeholder, b: SearchStakeholder) => {
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
    return a.distance! < b.distance! ? -1 : a.distance! > b.distance! ? 1 : 0;
  }
};

export default function useOrganizationBests() {
  const [state, setState] = useState<UseOrganizationBestsState>({
    data: null,
    loading: false,
    error: false,
  });
  const searchCoordinates = useSearchCoordinates() as Coordinates | null;
  const openTimeFilter = useOpenTimeFilter() as OpenTimeFilter;
  const searchFilter = useSearchFilter() as string;
  const foodTypeFilter = useFoodTypeFilter() as string[];
  const { tenantTimeZone } = useSiteContext();

  const longitude =
    searchCoordinates?.longitude || DEFAULT_COORDINATES.longitude;
  const latitude = searchCoordinates?.latitude || DEFAULT_COORDINATES.latitude;

  const dispatch = useAppDispatch() as (action: {
    type: string;
    stakeholders: SearchStakeholder[];
  }) => void;

  const processStakeholders = useCallback(
    (stakeholders: SearchStakeholder[], filters: StakeholderFilters) => {
      let filteredStakeholders = stakeholders;

      if (latitude && longitude) {
        filteredStakeholders = computeDistances(
          latitude,
          longitude,
          filteredStakeholders
        ) as SearchStakeholder[];
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

      const { day, time } = filters.openTimeFilter || {};
      if (day || (time && time !== "Any")) {
        filteredStakeholders = filteredStakeholders.filter((stakeholder) => {
          return stakeholder.hours?.some((h) => {
            const dayMatch = day ? h.day_of_week.toUpperCase() === day : true;

            const timeMatch =
              !time || time === "Any"
                ? true
                : (() => {
                    const openTime = dayjs(h.open, "HH:mm:ss");
                    const closeTime = dayjs(h.close, "HH:mm:ss");
                    const filterTime = dayjs(time, "hh:mmA");

                    return (
                      filterTime.isSame(openTime) ||
                      filterTime.isSame(closeTime) ||
                      (filterTime.isAfter(openTime) &&
                        filterTime.isBefore(closeTime))
                    );
                  })();

            return dayMatch && timeMatch;
          });
        });
      }
      if (filters.searchFilter) {
        const searchWords = filters
          .searchFilter!.toLowerCase()
          .split(" ")
          .filter(Boolean);
        filteredStakeholders = filteredStakeholders.filter((stakeholder) => {
          const searchableText = SEARCHABLE_FIELDS.map(
            (field) => stakeholder[field] || ""
          )
            .join(" ")
            .toLowerCase();
          return searchWords.every((word) => searchableText.includes(word));
        });
      }
      if (filters.foodTypeFilter) {
        filteredStakeholders = filteredStakeholders.filter((stakeholder) => {
          return filters.foodTypeFilter!.every((foodType) => {
            return stakeholder[foodType] === true;
          });
        });
      }

      const stakeholdersWithDistances = computeDistances(
        latitude,
        longitude,
        filteredStakeholders
      ) as SearchStakeholder[];
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
    async ({ categoryIds }: SelectAllParams) => {
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

        const filters: StakeholderFilters = {
          categoryIds: categoryIds.length ? categoryIds : DEFAULT_CATEGORIES,
        };

        if (openTimeFilter) {
          filters.openTimeFilter = openTimeFilter;
          filters.showActiveOnly = true;
        }
        if (searchFilter) {
          filters.searchFilter = searchFilter;
        }
        if (foodTypeFilter.length) {
          filters.foodTypeFilter = foodTypeFilter;
        }

        let stakeholders: SearchStakeholder[];
        const isStaleData = checkIfStaleData();
        if (!isStaleData) {
          stakeholders = JSON.parse(
            localStorage.getItem("stakeholders") as string
          ) as SearchStakeholder[];
        } else {
          stakeholders = (await stakeholderService.selectAll()) as SearchStakeholder[];
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
      searchFilter,
      foodTypeFilter,
    ]
  );

  const getById = useCallback(async (id?: string | number) => {
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

interface Coordinates {
  latitude: number;
  longitude: number;
}