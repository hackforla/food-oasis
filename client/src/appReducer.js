import { getTenantId } from "contexts/siteContext";
import { TENANT_CONFIG } from "helpers/Constants";
import { createContext, useContext, useMemo, useReducer } from "react";

const tenantId = getTenantId();
export const DEFAULT_COORDINATES =
  TENANT_CONFIG[tenantId].defaultViewport.center;

function stakeholdersReducer(state, action) {
  switch (action.type) {
    case "STAKEHOLDERS_LOADED":
      return action.stakeholders;
    default:
      return state;
  }
}
function defaultCoordinatesReducer(state, action) {
  switch (action.type) {
    case "DEFAULT_COORDINATES_UPDATED":
      return action.coordinates;
    case "NEIGHBORHOOD_UPDATED":
      return action.coordinates;
    case "DEFAULT_COORDINATES_RESET":
      return DEFAULT_COORDINATES;
    default:
      return state;
  }
}

function searchCoordinatesReducer(state, action) {
  switch (action.type) {
    case "SEARCH_COORDINATES_UPDATED":
      return action.coordinates;
    case "USER_COORDINATES_UPDATED":
      return action.coordinates;
    case "NEIGHBORHOOD_UPDATED":
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

function neighborhoodReducer(state, action) {
  switch (action.type) {
    case "NEIGHBORHOOD_UPDATED":
      return action.neighborhood;
    default:
      return state;
  }
}

function widgetReducer(state, action) {
  switch (action.type) {
    case "WIDGET":
      return action.isWidget;
    default:
      return state;
  }
}

export function appReducer(state, action) {
  return {
    defaultCoordinate: defaultCoordinatesReducer(
      state.defaultCoordinates,
      action
    ),
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
    neighborhood: neighborhoodReducer(state.neighborhood, action),
    // isWidget === true indicates that app is implemented as an
    // iframe widget hosted in a third-party application.
    isWidget: widgetReducer(state.isWidget, action),
    stakeholders: stakeholdersReducer(state.stakeholders, action),
  };
}

export function getInitialState() {
  return {
    stakeholders: [],
    defaultCoordinates: DEFAULT_COORDINATES,
    searchCoordinates: null,
    selectedOrganization: null,
    userCoordinates: null,
    neighborhood: null,
    isWidget: false,
  };
}

const AppStateContext = createContext({
  state: getInitialState(),
  dispatch: () => {},
});

export function AppStateProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, getInitialState());

  const value = useMemo(() => {
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
  return useContext(AppStateContext).state;
}

export function useAppDispatch() {
  return useContext(AppStateContext).dispatch;
}

export function useDefaultCoordinates() {
  const { defaultCoordinates } = useAppState();
  return defaultCoordinates;
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

export function useNeighborhood() {
  const { neighborhood } = useAppState();
  return neighborhood;
}

export function useWidget() {
  const { isWidget } = useAppState();
  return isWidget;
}

export function useStakeholders() {
  const { stakeholders } = useAppState();
  return stakeholders;
}
