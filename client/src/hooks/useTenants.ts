import { useState, useEffect, useCallback } from "react";
import * as tenantService from "../services/tenant-service";

interface Tenant {
  id: number;
  name: string;
  [key: string]: unknown;
}

interface UseTenantsState {
  data: Tenant[] | null;
  loading: boolean;
  error: boolean;
}

export const useTenants = () => {
  const [state, setState] = useState<UseTenantsState>({
    data: [],
    loading: false,
    error: false,
  });

  const fetch = useCallback(() => {
    const fetchApi = async () => {
      setState({ data: null, loading: true, error: false });
      try {
        const tenants = (await tenantService.getAll()) as Tenant[];
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