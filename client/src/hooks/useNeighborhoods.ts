import { useState, useEffect, useCallback } from "react";
import * as neighborhoodService from "../services/neighborhood-service";

interface Neighborhood {
  id: number;
  name: string;
  geojson?: unknown;
  zoom?: number;
  [key: string]: unknown;
}

interface UseNeighborhoodsState {
  data: Neighborhood[] | null;
  loading: boolean;
  error: boolean;
}

export const useNeighborhoods = () => {
  const [state, setState] = useState<UseNeighborhoodsState>({
    data: [],
    loading: false,
    error: false,
  });

  const fetch = useCallback(() => {
    const fetchApi = async () => {
      setState({ data: null, loading: true, error: false });
      try {
        const neighborhoods =
          (await neighborhoodService.getAll()) as Neighborhood[];
        setState({ data: neighborhoods || [], loading: false, error: false });
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