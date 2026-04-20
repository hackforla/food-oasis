import axios from "axios";
import debounce from "debounce-fn";
import {
  TENANT_ID,
  MAPBOX_ACCESS_TOKEN,
  DEFAULT_VIEWPORTS,
} from "helpers/Constants";
import { useCallback, useReducer, useRef } from "react";

const baseUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places";

export interface MapboxResult {
  id?: string;
  place_name: string;
  center: [number, number];
  [key: string]: unknown;
}

interface State {
  isLoading: boolean;
  error: boolean;
  mapboxResults: MapboxResult[];
  resultsQuery: string;
}

const initialState: State = {
  isLoading: false,
  error: false,
  mapboxResults: [],
  resultsQuery: "",
};

const actionTypes = {
  FETCH_REQUEST: "FETCH_REQUEST",
  FETCH_SUCCESS: "FETCH_SUCCESS",
  FETCH_FAILURE: "FETCH_FAILURE",
} as const;

type Action =
  | {
      type: (typeof actionTypes)["FETCH_REQUEST"];
      query: string;
    }
  | {
      type: (typeof actionTypes)["FETCH_SUCCESS"];
      results: MapboxResult[];
      query: string;
    }
  | { type: (typeof actionTypes)["FETCH_FAILURE"]; error: unknown };

function reducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case actionTypes.FETCH_REQUEST:
      return { ...state, isLoading: true, resultsQuery: action.query };
    case actionTypes.FETCH_SUCCESS:
      return {
        ...state,
        error: false,
        isLoading: false,
        mapboxResults: action.results,
        resultsQuery: action.query,
      };
    case actionTypes.FETCH_FAILURE:
      console.error(action.error);
      return { ...state, isLoading: false, error: true };
    default:
      return state;
  }
}

export function useMapboxGeocoder() {
  const [{ isLoading, error, mapboxResults, resultsQuery }, dispatch] =
    useReducer(reducer, initialState);
  const latestQueryRef = useRef("");

  const performFetch = useCallback(async (searchString: string) => {
    const bbox =
      DEFAULT_VIEWPORTS[TENANT_ID as keyof typeof DEFAULT_VIEWPORTS].bbox;
    const mapboxUrl = `${baseUrl}/${searchString}.json?bbox=${bbox}&access_token=${MAPBOX_ACCESS_TOKEN}`;

    try {
      const response = await axios.get<{ features: MapboxResult[] }>(mapboxUrl);
      const results = response.data.features;

      if (latestQueryRef.current === searchString) {
        dispatch({
          type: actionTypes.FETCH_SUCCESS,
          results,
          query: searchString,
        });
      }

      return results;
    } catch (error) {
      if (latestQueryRef.current === searchString) {
        dispatch({ type: actionTypes.FETCH_FAILURE, error });
      }
      return [];
    }
  }, []);

  const debouncedFetch = useCallback(
    debounce(
      async (searchString: string) => {
        await performFetch(searchString);
      },
      { wait: 300 }
    ),
    [performFetch]
  );

  const clearResults = useCallback(() => {
    debouncedFetch.cancel?.();
    latestQueryRef.current = "";
    dispatch({
      type: actionTypes.FETCH_SUCCESS,
      results: [],
      query: "",
    });
  }, [debouncedFetch]);

  const searchMapboxResults = useCallback(
    (searchString: string) => {
      const normalizedSearchString = searchString.trim();
      latestQueryRef.current = normalizedSearchString;

      if (!normalizedSearchString) {
        clearResults();
        return;
      }

      dispatch({
        type: actionTypes.FETCH_REQUEST,
        query: normalizedSearchString,
      });
      debouncedFetch(normalizedSearchString);
    },
    [clearResults, debouncedFetch]
  );

  const ensureMapboxResults = useCallback(
    async (searchString: string) => {
      const normalizedSearchString = searchString.trim();

      if (!normalizedSearchString) {
        clearResults();
        return [];
      }

      if (!isLoading && resultsQuery === normalizedSearchString) {
        return mapboxResults;
      }

      latestQueryRef.current = normalizedSearchString;
      debouncedFetch.cancel?.();
      dispatch({
        type: actionTypes.FETCH_REQUEST,
        query: normalizedSearchString,
      });

      return performFetch(normalizedSearchString);
    },
    [
      clearResults,
      debouncedFetch,
      isLoading,
      mapboxResults,
      performFetch,
      resultsQuery,
    ]
  );

  return {
    error,
    isLoading,
    mapboxResults,
    resultsQuery,
    searchMapboxResults,
    ensureMapboxResults,
  };
}
