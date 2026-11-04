import { useState, useCallback } from "react";
import * as stakeholderService from "../services/stakeholder-service";
import * as analytics from "../services/analytics";
import type { Stakeholder } from "../types/Stakeholder";

interface SearchCriteria {
  tenantId?: number;
  name?: string;
  latitude?: number;
  longitude?: number;
  radius?: number;
  categoryIds?: number[];
  isInactive?: string | boolean;
  isAssigned?: string | boolean;
  isSubmitted?: string | boolean;
  isApproved?: string | boolean;
  isClaimed?: string | boolean;
  assignedLoginId?: number | null;
  claimedLoginId?: number | null;
  verificationStatusId?: number;
  isInactiveTemporary?: string | boolean;
  stakeholderId?: string | number;
  neighborhoodId?: number;
  minCompleteCriticalPercent?: number;
  maxCompleteCriticalPercent?: number;
  tag?: string;
}

interface ApiLikeError {
  status?: number;
}

interface UseOrganizationsState {
  data: Stakeholder[] | null;
  loading: boolean;
  error: boolean | ApiLikeError;
}

export const useOrganizations = () => {
  const [state, setState] = useState<UseOrganizationsState>({
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
  }: SearchCriteria) => {
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
      const stakeholders = (await stakeholderService.search({
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
      })) as Stakeholder[];

      setState({ data: stakeholders, loading: false, error: false });
      return stakeholders;
    } catch (err) {
      const error =
        typeof err === "object" && err !== null && "response" in err
          ? (((err as { response?: ApiLikeError }).response as ApiLikeError) ||
              true)
          : true;
      setState({ data: null, loading: false, error });
      console.error(err);
      return Promise.reject(err);
    }
  };

  const searchCallback = useCallback((searchCriteria: SearchCriteria) => {
    search(searchCriteria);
  }, []);

  return { ...state, search, searchCallback };
};