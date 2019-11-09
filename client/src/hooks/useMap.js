import { useReducer, useEffect } from "react";
import * as stakeholderServices from "../services/stakeholder-service";

const actionTypes = {
  UPDATE_VIEWPORT: "UPDATE_VIEWPORT",
  STAKEHOLDERS: {
    FETCH_REQUEST: "STAKEHOLDERS_FETCH_REQUEST",
    FETCH_SUCCESS: "STAKEHOLDERS_FETCH_SUCCESS",
    FETCH_FAILURE: "STAKEHOLDERS_FETCH_FAILURE",
    SELECT_STAKEHOLDER: "STAKEHOLDERS_SELECT_STAKEHOLDER",
    DESELECT_STAKEHOLDER: "STAKEHOLDERS_DESELECT_STAKEHOLDER",
  },
};

const initialState = {
  viewport: {
    latitude: 34.041018,
    longitude: -118.235528,
    zoom: 10,
  },
  isPopupOpen: false,
  selectedStakeholder: null,
  isLoading: true,
  error: null,
  stakeholders: null,
};

function reducer(state, action) {
  switch (action.type) {
    case actionTypes.UPDATE_VIEWPORT:
      return { ...state, viewport: action.newViewport };
    case actionTypes.STAKEHOLDERS.FETCH_REQUEST:
      return { ...state, isLoading: true };
    case actionTypes.STAKEHOLDERS.FETCH_SUCCESS:
      return { ...state, stakeholders: action.stakeholders, isLoading: false };
    case actionTypes.STAKEHOLDERS.FETCH_FAILURE:
      return { ...state, error: action.error, isLoading: false };
    case actionTypes.STAKEHOLDERS.SELECT_STAKEHOLDER:
      return {
        ...state,
        selectedStakeholder: action.stakeholder,
        isPopupOpen: true,
      };
    case actionTypes.STAKEHOLDERS.DESELECT_STAKEHOLDER:
      return { ...state, selectedStakeholder: null, isPopupOpen: false };
    default:
      return state;
  }
}

export function useMap() {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    const fetchAllStakeholders = async () => {
      const {
        FETCH_FAILURE,
        FETCH_REQUEST,
        FETCH_SUCCESS,
      } = actionTypes.STAKEHOLDERS;
      try {
        dispatch({ type: FETCH_REQUEST });
        /* TODO: confirm the initial search params on mount */
        const categoryIds = [1]; // hard coding this to just grab foodPantry stakeholders
        const stakeholders = await stakeholderServices.search({ categoryIds });
        dispatch({ type: FETCH_SUCCESS, stakeholders });
      } catch (err) {
        console.log(err);
        dispatch({ type: FETCH_FAILURE });
      }
    };

    fetchAllStakeholders();
  }, []);

  return { state, dispatch, actionTypes };
}
