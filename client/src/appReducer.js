import React from "react";
import { getTenantId, DEFAULT_VIEWPORTS } from "contexts/siteContext";

const tenantId = getTenantId();
const DEFAULT_COORDINATES = DEFAULT_VIEWPORTS[tenantId].center;

function searchCoordinatesReducer(state, action) {
  switch (action.type) {
    case "SEARCH_COORDINATES_UPDATED":
      return action.coordinates;
    case "RESET_COORDINATES":
      return DEFAULT_COORDINATES;
    default:
      return state;
  }
}

function userCoordinatesReducer(state, action) {
  switch (action.type) {
    case "USER_COORDINATES_UPDATED":
      return action.coordinates;
    default:
      return state;
  }
}

function selectedOrganizationReducer(state, action) {
  switch (action.type) {
    case "SELECTED_ORGANIZATION_UPDATED":
      return action.organization;
    case "RESET_SELECTED_ORGANIZATION":
      return null;
    case "SEARCH_COORDINATES_UPDATED":
      return null;
    default:
      return state;
  }
}

export function appReducer(state, action) {
  return {
    searchCoordinates: searchCoordinatesReducer(
      state.searchCoordinates,
      action
    ),
    // userCoordinates is the user's location if geolocation is enabled
    userCoordinates: userCoordinatesReducer(state.userCoordinates, action),
    selectedOrganization: selectedOrganizationReducer(
      state.selectedOrganization,
      action
    ),
  };
}

export function getInitialState() {
  return {
    searchCoordinates: DEFAULT_COORDINATES,
    selectedOrganization: null,
    userCoordinates: null,
  };
}

const AppStateContext = React.createContext({
  state: getInitialState(),
  dispatch: () => {},
});

export function AppStateProvider({ children }) {
  const [state, dispatch] = React.useReducer(appReducer, getInitialState());

  const value = React.useMemo(() => {
    return {
      state,
      dispatch,
    };
  }, [state, dispatch]);

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  return React.useContext(AppStateContext).state;
}

export function useAppDispatch() {
  return React.useContext(AppStateContext).dispatch;
}

export function useSearchCoordinates() {
  const { searchCoordinates } = useAppState();
  return searchCoordinates;
}

export function useSelectedOrganization() {
  const { selectedOrganization } = useAppState();
  return selectedOrganization;
}

export function useUserCoordinates() {
  const { userCoordinates } = useAppState();
  return userCoordinates;
}
