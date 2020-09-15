import React from "react";
import axios from "axios";
import debounce from "debounce-fn";

const baseUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places`;

const hawaiiLatLong = "-178.334698,	18.910361, -154.806773, 28.402123";
const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

const initialState = {
  isLoading: false,
  error: false,
  mapboxResults: [],
};

const actionTypes = {
  FETCH_REQUEST: "FETCH_REQUEST",
  FETCH_SUCCESS: "FETCH_SUCCESS",
  FETCH_FAILURE: "FETCH_FAILURE",
};

function reducer(state = initialState, action) {
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
      console.log(action.error);
      return { ...state, isLoading: false, error: true };
    default:
      return state;
  }
}

export function useMapboxGeocoder() {
  const [{ isLoading, error, mapboxResults }, dispatch] = React.useReducer(
    reducer,
    initialState
  );

  const fetchMapboxResults = debounce(
    async (searchString) => {
      const bbox = hawaiiLatLong;
      const mapboxUrl = `${baseUrl}/${searchString}.json?bbox=${bbox}&access_token=${MAPBOX_TOKEN}`;

      dispatch({ type: actionTypes.FETCH_REQUEST });
      try {
        const response = await axios.get(mapboxUrl);
        dispatch({
          type: actionTypes.FETCH_SUCCESS,
          results: response.data.features,
        });
      } catch (error) {
        dispatch({ type: actionTypes.FETCH_FAILURE, error });
      }
    },
    { wait: 300 }
  );

  return { error, isLoading, mapboxResults, fetchMapboxResults };
}
