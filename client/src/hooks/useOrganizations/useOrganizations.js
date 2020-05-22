import { useState } from "react";
import * as stakeholderService from "../../services/stakeholder-service";

export const useOrganizations = () => {
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
    categoryIds,
    isInactive,
    isAssigned,
    isSubmitted,
    isApproved,
    isRejected,
    isClaimed,
    assignedLoginId,
    claimedLoginId,
    verificationStatusId,
  }) => {
    //if (!categoryIds || categoryIds.length === 0) return;
    try {
      setState({ data: null, loading: true, error: false });
      const stakeholders = await stakeholderService.search({
        name,
        categoryIds,
        latitude,
        longitude,
        distance: radius,
        isInactive,
        isAssigned,
        isSubmitted,
        isApproved,
        isRejected,
        isClaimed,
        assignedLoginId,
        claimedLoginId,
        verificationStatusId,
      });
      setState({ data: stakeholders, loading: false, error: false });
      return stakeholders;
    } catch (err) {
      setState({ data: null, loading: false, error: true });
      Promise.reject(err);
      console.log(err);
    }
  };

  const searchDashboard = async ({
    name,
    latitude,
    longitude,
    radius,
    categoryIds,
    isInactive,
    isAssigned,
    isSubmitted,
    isApproved,
    isRejected,
    isClaimed,
    assignedLoginId,
    claimedLoginId,
    verificationStatusId,
  }) => {
    //if (!categoryIds || categoryIds.length === 0) return;
    try {
      setState({ data: null, loading: true, error: false });
      const stakeholders = await stakeholderService.searchDashboard({
        name,
        categoryIds,
        latitude,
        longitude,
        distance: radius,
        isInactive,
        isAssigned,
        isSubmitted,
        isApproved,
        isRejected,
        isClaimed,
        assignedLoginId,
        claimedLoginId,
        verificationStatusId,
      });
      setState({ data: stakeholders, loading: false, error: false });
      return stakeholders;
    } catch (err) {
      setState({ data: null, loading: false, error: true });
      Promise.reject(err);
      console.log(err);
    }
  };

  return { ...state, search, searchDashboard };
};
