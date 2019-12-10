import { useReducer, useEffect } from "react";
import * as stakeholderService from "../../services/stakeholder-service";
import * as categoryService from "../../services/category-service";
import { actionTypes } from "./actionTypes";
import { reducer } from "./reducer";
// import { initialState } from "./initialState";

export function useStakeholders(initialState, history) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const search = async (
    searchString,
    latitude,
    longitude,
    selectedLocationName,
    selectedCategories,
    selectedDistance
  ) => {
    const {
      FETCH_FAILURE,
      FETCH_REQUEST,
      FETCH_SUCCESS
    } = actionTypes.STAKEHOLDERS;
    if (!selectedCategories) return;
    try {
      dispatch({ type: FETCH_REQUEST });
      const stakeholders = await stakeholderService.search({
        name: searchString,
        categoryIds: selectedCategories.map(category => category.id),
        latitude,
        longitude,
        distance: selectedDistance
      });
      history.push(
        `/stakeholders?name=${searchString}` +
          `&radius=${selectedDistance}` +
          `&lat=${latitude}` +
          `&lon=${longitude}` +
          `&placeName=${selectedLocationName}` +
          `&categoryIds=${selectedCategories.map(c => c.id).join(",")}`
      );
      dispatch({
        type: FETCH_SUCCESS,
        stakeholders,
        payload: {
          searchString,
          selectedLatitude: latitude,
          selectedLongitude: longitude,
          selectedLocationName,
          selectedCategories,
          selectedDistance
        }
      });
    } catch (err) {
      console.log(err);
      dispatch({ type: FETCH_FAILURE });
    }
  };

  const fetchCategories = async () => {
    const {
      FETCH_FAILURE,
      FETCH_REQUEST,
      FETCH_SUCCESS
    } = actionTypes.CATEGORIES;

    dispatch({ type: FETCH_REQUEST });
    try {
      const allCategories = await categoryService.getAll();
      const categories = allCategories.filter(category => !category.inactive);

      const selectedCategories = categories.filter(
        category => category.id === 1 || category.id === 8 || category.id === 9
      ); // setting the initial selection to FoodPantry, Food Bank, Soup Kitchen
      dispatch({ type: FETCH_SUCCESS, categories, selectedCategories });
      return categories;
    } catch (error) {
      dispatch({ type: FETCH_FAILURE, error });
    }
  };

  const fetchLocation = () => {
    const {
      FETCH_FAILURE,
      FETCH_REQUEST,
      FETCH_SUCCESS
    } = actionTypes.LOCATION;

    let userCoordinates = { latitude: null, longitude: null };

    dispatch({ type: FETCH_REQUEST });
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          if (!position) {
            dispatch({
              type: FETCH_SUCCESS,
              userCoordinates
            });
          }
          userCoordinates.latitude = position.coords.latitude;
          userCoordinates.longitude = position.coords.longitude;
          dispatch({ type: FETCH_SUCCESS, userCoordinates });
        },
        error => {
          dispatch({ type: FETCH_FAILURE, error });
        }
      );
    } else {
      // If browser location permission is denied, the request is
      // "successful", but the result is null coordinates.
      dispatch({
        type: FETCH_SUCCESS,
        userCoordinates
      });
    }
    return userCoordinates;
  };

  useEffect(() => {
    // Runs once on initialization to get list of all active categories
    fetchCategories();

    // Runs once on initialization to get user's browser lat/lon, if
    // browser permits
    fetchLocation();
  }, []);

  useEffect(() => {
    // if we don't have the categories fetched yet, bail
    if (!state.categories) return;

    let {
      searchString,
      selectedLatitude,
      selectedLongitude,
      selectedLocationName,
      selectedDistance,
      selectedCategoryIds
    } = initialState;

    let selectedCategories = selectedCategoryIds.map(
      id => state.categories.filter(cat => cat.id === Number(id))[0]
    );

    search(
      searchString,
      selectedLatitude,
      selectedLongitude,
      selectedLocationName,
      selectedCategories,
      selectedDistance
    );
  }, [state.categories, initialState, search]);

  return { state, dispatch, actionTypes, search };
}
