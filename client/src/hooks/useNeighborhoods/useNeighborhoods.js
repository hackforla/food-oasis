import { useState, useEffect, useCallback } from "react";
import * as neighborhoodService from "../../services/neighborhood-service";

export const useNeighborhoods = () => {
  const [state, setState] = useState({
    data: [],
    loading: false,
    error: false,
  });

  const fetch = useCallback(() => {
    const fetchApi = async () => {
      setState({ data: null, loading: true, error: false });
      try {
        const neighborhoods = await neighborhoodService.getAll();
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
