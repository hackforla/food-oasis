import { useState, useEffect, useCallback } from "react";
import * as tenantService from "../services/tenant-service";

export const useTenants = () => {
  const [state, setState] = useState({
    data: [],
    loading: false,
    error: false,
  });

  const fetch = useCallback(() => {
    const fetchApi = async () => {
      setState({ data: null, loading: true, error: false });
      try {
        const tenants = await tenantService.getAll();
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
