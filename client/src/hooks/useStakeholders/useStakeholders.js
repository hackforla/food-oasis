import { useReducer, useEffect } from "react";
import * as stakeholderService from "../../services/stakeholder-service";
import * as categoryService from "../../services/category-service";
import { actionTypes } from "./actionTypes";
import { reducer } from "./reducer";
import { initialState } from "./initialState";

export function useStakeholders() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const search = async (
    searchString,
    latitude,
    longitude,
    selectedCategories,
    selectedDistance,
  ) => {
    const {
      FETCH_FAILURE,
      FETCH_REQUEST,
      FETCH_SUCCESS,
    } = actionTypes.STAKEHOLDERS;
    if (!selectedCategories) return;
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
      dispatch({
        type: actionTypes.UPDATE_CRITERIA,
        payload: {
          searchString,
          selectedLatitude: latitude,
          selectedLongitude: longitude,
          selectedCategories,
          selectedDistance,
        },
      });
    } catch (err) {
      console.log(err);
      dispatch({ type: FETCH_FAILURE });
    }
  };

  useEffect(() => {
    const fetchCategories = async (latitude = null, longitude = null) => {
      const {
        FETCH_FAILURE,
        FETCH_REQUEST,
        FETCH_SUCCESS,
      } = actionTypes.CATEGORIES;

      const {
        searchString,
        selectedLatitude,
        selectedLongitude,
        selectedDistance,
      } = initialState;

      dispatch({ type: FETCH_REQUEST });
      try {
        const categories = await categoryService.getAll();
        const selectedCategories = categories.filter(
          category => category.id === 1,
        ); // setting the initial selection to FoodPantry
        dispatch({ type: FETCH_SUCCESS, categories, selectedCategories });

        if (latitude && longitude) {
          search(
            searchString,
            latitude,
            longitude,
            selectedCategories,
            selectedDistance,
          );
        } else {
          search(
            searchString,
            selectedLatitude,
            selectedLongitude,
            selectedCategories,
            selectedDistance,
          );
        }
      } catch (error) {
        dispatch({ type: FETCH_FAILURE, error });
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
            fetchCategories(latitude, longitude);
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

  return { state, dispatch, actionTypes, search };
}
