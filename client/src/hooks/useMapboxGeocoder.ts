import axios from "axios";
import debounce from "debounce-fn";
import {
  TENANT_ID,
  MAPBOX_ACCESS_TOKEN,
  DEFAULT_VIEWPORTS,
} from "helpers/Constants";
import { useCallback, useReducer } from "react";

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
}

const initialState: State = {
  isLoading: false,
  error: false,
  mapboxResults: [],
};

const actionTypes = {
  FETCH_REQUEST: "FETCH_REQUEST",
  FETCH_SUCCESS: "FETCH_SUCCESS",
  FETCH_FAILURE: "FETCH_FAILURE",
} as const;

type Action =
  | { type: (typeof actionTypes)["FETCH_REQUEST"] }
  | {
      type: (typeof actionTypes)["FETCH_SUCCESS"];
      results: MapboxResult[];
    }
  | { type: (typeof actionTypes)["FETCH_FAILURE"]; error: unknown };

function reducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case actionTypes.FETCH_REQUEST:
      return { ...state, isLoading: true };
    case actionTypes.FETCH_SUCCESS:
      return {
        ...state,
        error: false,
        isLoading: false,
        mapboxResults: action.results,
      };
    case actionTypes.FETCH_FAILURE:
      console.error(action.error);
      return { ...state, isLoading: false, error: true };
    default:
      return state;
  }
}

export function useMapboxGeocoder() {
  const [{ isLoading, error, mapboxResults }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const debouncedFetch = useCallback(
    debounce(
      async (searchString: string) => {
        const bbox = DEFAULT_VIEWPORTS[TENANT_ID as keyof typeof DEFAULT_VIEWPORTS].bbox;
        const mapboxUrl = `${baseUrl}/${searchString}.json?bbox=${bbox}&access_token=${MAPBOX_ACCESS_TOKEN}`;

        try {
          const response = await axios.get<{ features: MapboxResult[] }>(
            mapboxUrl
          );
          dispatch({
            type: actionTypes.FETCH_SUCCESS,
            results: response.data.features,
          });
        } catch (error) {
          dispatch({ type: actionTypes.FETCH_FAILURE, error });
        }
      },
      { wait: 300 }
    ),
    []
  );

  const fetchMapboxResults = useCallback(
    (searchString: string) => {
      dispatch({ type: actionTypes.FETCH_REQUEST });
      debouncedFetch(searchString);
    },
    [debouncedFetch]
  );

  return { error, isLoading, mapboxResults, fetchMapboxResults };
}