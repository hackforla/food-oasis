import { useReducer, useEffect } from "react";
import * as stakeholderService from "../../services/stakeholder-service";
import * as categoryService from "../../services/category-service";
import { actionTypes } from "./actionTypes";
import { reducer } from "./reducer";
import { initialState } from "./initialState";

export function useStakeholders() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchCategories = async () => {
      const {
        FETCH_FAILURE,
        FETCH_REQUEST,
        FETCH_SUCCESS,
      } = actionTypes.CATEGORIES;

      dispatch({ type: FETCH_REQUEST });
      try {
        const categories = await categoryService.getAll();
        const selectedCategories = categories.filter(
          category => category.id === 1, // filtering for Food Pantries
        );
        dispatch({ type: FETCH_SUCCESS, categories, selectedCategories });
        fetchStakeholders();
      } catch (error) {
        dispatch({ type: FETCH_FAILURE, error });
      }
    };

    const fetchStakeholders = async () => {
      const {
        FETCH_FAILURE,
        FETCH_REQUEST,
        FETCH_SUCCESS,
      } = actionTypes.STAKEHOLDERS;

      const {
        searchString: name,
        selectedCategories,
        selectedLatitude: latitude,
        selectedLongitude: longitude,
        selectedDistance: distance,
      } = state;

      try {
        dispatch({ type: FETCH_REQUEST });
        const stakeholders = await stakeholderService.search({
          name,
          categoryIds: selectedCategories.map(category => category.id),
          latitude,
          longitude,
          distance,
        });
        dispatch({ type: FETCH_SUCCESS, stakeholders });
      } catch (err) {
        console.log(err);
        dispatch({ type: FETCH_FAILURE });
      }
    };

    // The fact that the geolocation api only uses callbacks makes
    // this function convoluted - need to work on cleaning this up
    // somehow. If user agent (browser) does not support geolocation
    // of machine, or user disables location, we currently use the
    // lat, lon of LACI as the current location. Need to work on
    // allowing user to enter a street address of their choosing.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async position => {
          if (position) {
            let latitude = position.coords.latitude;
            let longitude = position.coords.longitude;
            dispatch({ type: actionTypes.UPDATE.LATITUDE, latitude });
            dispatch({ type: actionTypes.UPDATE.LONGITUDE, longitude });
            fetchCategories();
          }
        },
        async error => {
          console.log(error);
          fetchCategories();
        },
      );
    } else {
      fetchCategories();
    }
  }, []);

  const search = async (
    searchString = state.searchString,
    latitude = state.selectedLatitude,
    longitude = state.selectedLongitude,
    selectedCategories = state.selectedCategories,
    selectedDistance = state.selectedDistance,
  ) => {
    const {
      FETCH_FAILURE,
      FETCH_REQUEST,
      FETCH_SUCCESS,
    } = actionTypes.STAKEHOLDERS;

    try {
      dispatch({ type: FETCH_REQUEST });
      const stakeholders = await stakeholderService.search({
        name: searchString,
        categoryIds: selectedCategories.map(category => category.id),
        latitude,
        longitude,
        distance: selectedDistance,
      });
      dispatch({ type: FETCH_SUCCESS, stakeholders });
    } catch (err) {
      console.log(err);
      dispatch({ type: FETCH_FAILURE });
    }
  };

  return { state, dispatch, actionTypes, search };
}
