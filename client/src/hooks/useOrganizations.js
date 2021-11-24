import { useState, useCallback } from "react";
import * as stakeholderService from "../services/stakeholder-service";
import * as analytics from "../services/analytics";

export const useOrganizations = () => {
  const [state, setState] = useState({
    data: null,
    loading: false,
    error: false,
  });

  const search = async ({
    tenantId,
    name,
    latitude,
    longitude,
    radius,
    categoryIds,
    isInactive,
    isAssigned,
    isSubmitted,
    isApproved,
    isClaimed,
    assignedLoginId,
    claimedLoginId,
    verificationStatusId,
    isInactiveTemporary,
    stakeholderId,
    neighborhoodId,
    minCompleteCriticalPercent,
    maxCompleteCriticalPercent,
    tag,
  }) => {
    try {
      analytics.postEvent("searchAdmin", {
        name,
        latitude,
        longitude,
        radius,
        categoryIds,
        isInactive,
        isAssigned,
        isSubmitted,
        isApproved,
        isClaimed,
        assignedLoginId,
        verificationStatusId,
        isInactiveTemporary,
        neighborhoodId,
        minCompleteCriticalPercent,
        maxCompleteCriticalPercent,
        tag,
      });

      setState({ data: null, loading: true, error: false });
      const stakeholders = await stakeholderService.search({
        tenantId,
        name,
        latitude,
        longitude,
        distance: radius,
        categoryIds,
        isInactive,
        isAssigned,
        isSubmitted,
        isApproved,
        isClaimed,
        assignedLoginId,
        claimedLoginId,
        verificationStatusId,
        isInactiveTemporary,
        stakeholderId,
        neighborhoodId,
        minCompleteCriticalPercent,
        maxCompleteCriticalPercent,
        tag,
      });
      setState({ data: stakeholders, loading: false, error: false });
      return stakeholders;
    } catch (err) {
      setState({ data: null, loading: false, error: err.response || true });
      console.error(err);
      return Promise.reject(err);
    }
  };

  const searchCallback = useCallback((searchCriteria) => {
    search(searchCriteria);
  }, []);

  return { ...state, search, searchCallback };
};
