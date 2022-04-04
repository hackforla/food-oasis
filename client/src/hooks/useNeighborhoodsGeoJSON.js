import { useState, useCallback } from "react";
import * as neighborhoodService from "../services/neighborhood-service";

export default function useNeighborhoodsGeoJSON() {
  const [state, setState] = useState({
    neighborhoods: null,
    loading: true,
    error: false,
  });

  const getAll = useCallback(async () => {
    try {
      setState((prevState) => ({
        neighborhoods: null,
        loading: true,
        error: false,
      }));
      const stakeholders = await neighborhoodService.getAll();
      setState((prevState) => ({
        ...prevState,
        data: stakeholders,
        loading: false,
      }));
      return stakeholders;
    } catch (err) {
      setState((prevState) => ({ loading: false, error: true }));
      console.error(err);
      return Promise.reject(err);
    }
  }, []);

  const getGeoJSONById = useCallback(async (id) => {
    if (!id) {
      setState((prevState) => ({ loading: false, error: true }));
      const msg = "Call to getById missing id parameter";
      console.error(msg);
      return Promise.reject(msg);
    }
    try {
      setState((prevState) => ({ loading: true, error: false }));

      const neighborhood = await neighborhoodService.getGeoJSONById(id);
      setState((prevState) => ({ loading: false }));
      return neighborhood;
    } catch (err) {
      setState((prevState) => ({ loading: false, error: true }));
      console.error(err);
      return Promise.reject(err);
    }
  }, []);

  return { ...state, getAll, getGeoJSONById };
}
