import { useState, useCallback } from "react";
import * as neighborhoodService from "../services/neighborhood-service";

interface Neighborhood {
  id: number;
  name: string;
  geojson?: unknown;
  zoom?: number;
  [key: string]: unknown;
}

interface NeighborhoodsGeoJSONState {
  neighborhoods?: Neighborhood[] | null;
  data?: Neighborhood[];
  loading: boolean;
  error: boolean;
}

export default function useNeighborhoodsGeoJSON() {
  const [state, setState] = useState<NeighborhoodsGeoJSONState>({
    neighborhoods: null,
    loading: true,
    error: false,
  });

  const getAll = useCallback(async () => {
    try {
      setState((_prevState) => ({
        neighborhoods: null,
        loading: true,
        error: false,
      }));
      const stakeholders = (await neighborhoodService.getAll()) as Neighborhood[];
      setState((prevState) => ({
        ...prevState,
        data: stakeholders,
        loading: false,
      }));
      return stakeholders;
    } catch (err) {
      setState((_prevState) => ({ loading: false, error: true }));
      console.error(err);
      return Promise.reject(err);
    }
  }, []);

  const getGeoJSONById = useCallback(async (id?: string | number) => {
    if (!id) {
      setState((_prevState) => ({ loading: false, error: true }));
      const msg = "Call to getById missing id parameter";
      console.error(msg);
      return Promise.reject(msg);
    }
    try {
      setState((_prevState) => ({ loading: true, error: false }));

      const neighborhood = await neighborhoodService.getGeoJSONById(id);
      setState((_prevState) => ({ loading: false, error: false }));
      return neighborhood;
    } catch (err) {
      setState((_prevState) => ({ loading: false, error: true }));
      console.error(err);
      return Promise.reject(err);
    }
  }, []);

  return { ...state, getAll, getGeoJSONById };
}