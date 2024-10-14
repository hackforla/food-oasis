import { DEFAULT_VIEWPORT } from "helpers/Constants";
import { createContext, useContext, useMemo, useReducer } from "react";

export const DEFAULT_COORDINATES = DEFAULT_VIEWPORT.center;

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

function filterPanelReducer(state, action) {
  switch (action.type) {
    case "FILTER_PANEL_TOGGLE":
      return action.filterPanel;
    default:
      return state;
  }
}

function openTimeFilterReducer(state, action) {
  switch (action.type) {
    case "OPEN_TIME_FILTER_UPDATED":
      return action.openTimeFilter;
    default:
      return state;
  }
}

function noKnownEligibilityRequirementsFilterReducer(state, action) {
  switch (action.type) {
    case "NO_KNOWN_ELIGIBILITY_REQUIREMENTS_FILTER_TOGGLE":
      return action.noKnownEligibilityRequirementsFilter;
    default:
      return state;
  }
}

function listPanelReducer(state, action) {
  switch (action.type) {
    case "TOGGLE_LIST_PANEL":
      return action.listPanel;
    default:
      return state;
  }
}

function isListPanelVisibleReducer(state, action) {
  switch (action.type) {
    case "TOGGLE_LIST_PANEL":
      return !state; // Toggle the state
    default:
      return state;
  }
}

function position(state, action) {
  switch (action.type) {
    case "POSITION":
      return action.position; // Toggle the state
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
    filterPanel: filterPanelReducer(state.filterPanel, action),
    openTimeFilter: openTimeFilterReducer(state.openTimeFilter, action),
    noKnownEligibilityRequirementsFilter:
      noKnownEligibilityRequirementsFilterReducer(
        state.noKnownEligibilityRequirementsFilter,
        action
      ),
    listPanel: listPanelReducer(state.listPanel, action),
    isListPanelVisible: isListPanelVisibleReducer(
      state.isListPanelVisible,
      action
    ),
    position: position(state.position, action),
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
    filterPanel: false,
    openTimeFilter: { radio: "Show All", day: "", time: "" },
    noKnownEligibilityRequirementsFilter: false,
    listPanel: true,
    isListPanelVisible: false,
    position: "0",
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

export function useFilterPanel() {
  const { filterPanel } = useAppState();
  return filterPanel;
}

export function useOpenTimeFilter() {
  const { openTimeFilter } = useAppState();
  return openTimeFilter;
}

export function useNoKnownEligibilityRequirementsFilter() {
  const { noKnownEligibilityRequirementsFilter } = useAppState();
  return noKnownEligibilityRequirementsFilter;
}

export function useListPanel() {
  const { listPanel } = useAppState();
  return listPanel;
}

export function useIsListPanelVisible() {
  const { isListPanelVisible } = useAppState();
  return isListPanelVisible;
}

export function usePosition() {
  const { position } = useAppState();
  return position;
}
