import { actionTypes } from "./actionTypes";

export function reducer(state, action) {
  switch (action.type) {
    case actionTypes.STAKEHOLDERS.FETCH_REQUEST:
      return { ...state, isLoading: true };
    case actionTypes.STAKEHOLDERS.FETCH_SUCCESS:
      return {
        ...state,
        stakeholders: action.stakeholders,
        isLoading: false,
        isSearchPanelOpen: false,
      };
    case actionTypes.STAKEHOLDERS.FETCH_FAILURE:
      return { ...state, stakeholdersError: action.error, isLoading: false };
    case actionTypes.CATEGORIES.FETCH_REQUEST:
      return { ...state, isLoading: true };
    case actionTypes.CATEGORIES.FETCH_SUCCESS:
      return {
        ...state,
        categories: action.categories,
        selectedCategories: action.selectedCategories,
        isLoading: false,
      };
    case actionTypes.CATEGORIES.FETCH_FAILURE:
      return { ...state, categoriesError: action.error, isLoading: false };
    case actionTypes.TOGGLE_SEARCH_PANEL:
      return { ...state, isSearchPanelOpen: action.isOpen };
    case actionTypes.UPDATE_CRITERIA:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
