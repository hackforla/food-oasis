import { useState, useCallback } from "react";
import * as stakeholderService from "../services/stakeholder-best-service";
import * as analytics from "../services/analytics";

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

  const search = useCallback(async ({
    name,
    latitude,
    longitude,
    radius,
    bounds,
    categoryIds,
    isInactive,
    verificationStatusId,
  }) => {
    // if (!latitude || !longitude) {
    //   setState({ data: null, loading: false, error: true });
    //   const msg =
    //     "Call to search function missing latitude and/or longitude parameters";
    //   console.error(msg);
    //   return Promise.reject(msg);
    // }
    analytics.postEvent("searchFoodSeeker", {
      name,
      latitude,
      longitude,
      radius,
      bounds,
      categoryIds,
      isInactive,
      verificationStatusId,
    });
    //if (!categoryIds || categoryIds.length === 0) return;
    try {
      setState({ data: null, loading: true, error: false });
      let params = {
        name,
        categoryIds,
        latitude,
        longitude,
        distance: radius,
        isInactive,
        verificationStatusId,
      };
      if (bounds) {
        const { maxLat, maxLng, minLat, minLng } = bounds;
        params = {
          ...params,
          maxLng,
          maxLat,
          minLng,
          minLat,
        };
      }
      const stakeholders = await stakeholderService.search(params);
      stakeholders.sort(sortOrganizations);
      setState({ data: stakeholders, loading: false, error: false });
      return stakeholders;
    } catch (err) {
      setState({ data: null, loading: false, error: true });
      console.error(err);
      return Promise.reject(err);
    }
  }, []);

  return { ...state, search };
};
