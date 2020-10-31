import { useState } from "react";
import * as stakeholderService from "../services/stakeholder-best-service";

export const useOrganizationBests = () => {
  const [state, setState] = useState({
    data: null,
    loading: false,
    error: false,
  });

  const search = async ({
    name,
    latitude,
    longitude,
    radius,
    bounds,
    categoryIds,
    isInactive,
    verificationStatusId,
  }) => {
    if (!latitude || !longitude) {
      setState({ data: null, loading: false, error: true });
      const msg =
        "Call to search function missing latitude and/or longitude parameters";
      console.error(msg);
      return Promise.reject(msg);
    }
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
      setState({ data: stakeholders, loading: false, error: false });
      return stakeholders;
    } catch (err) {
      setState({ data: null, loading: false, error: true });
      console.error(err);
      return Promise.reject(err);
    }
  };

  return { ...state, search };
};
