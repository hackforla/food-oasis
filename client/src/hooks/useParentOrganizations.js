import { useState, useEffect, useCallback } from "react";
import * as parentOrganizations from "../services/parent-organization-service";

export const useParentOrganization = () => {
  const [state, setState] = useState({
    data: [],
    loading: false,
    error: false,
  });

  const fetch = useCallback(() => {
    const fetchApi = async () => {
      setState({ data: null, loading: true, error: false });
      try {
        const tenants = await parentOrganizations.getAllByTenantId();
        setState({ data: tenants || [], loading: false, error: false });
      } catch (err) {
        setState({ data: [], loading: false, error: true });
        console.error(err);
      }
    };

    fetchApi();
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { ...state, refetch: fetch };
};
