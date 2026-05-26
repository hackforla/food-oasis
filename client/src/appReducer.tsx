import { DEFAULT_VIEWPORT } from "helpers/Constants";
import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  type Dispatch,
  type ReactNode,
} from "react";
import type {
  AppAction,
  AppNeighborhood,
  AppPosition,
  AppState,
  Coordinates,
  OpenTimeFilter,
  SearchStakeholder,
} from "./types/appState";

export type {
  AppAction,
  AppNeighborhood,
  AppPosition,
  AppState,
  Coordinates,
  OpenTimeFilter,
  SearchStakeholder,
} from "./types/appState";

export const DEFAULT_COORDINATES = DEFAULT_VIEWPORT.center;

function stakeholdersReducer(
  state: SearchStakeholder[],
  action: AppAction
): SearchStakeholder[] {
  switch (action.type) {
    case "STAKEHOLDERS_LOADED":
      return action.stakeholders;
    default:
      return state;
  }
}
function defaultCoordinatesReducer(
  state: Coordinates,
  action: AppAction
): Coordinates {
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

function searchCoordinatesReducer(
  state: Coordinates | null,
  action: AppAction
): Coordinates | null {
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

function userCoordinatesReducer(
  state: Coordinates | null,
  action: AppAction
): Coordinates | null {
  switch (action.type) {
    case "USER_COORDINATES_UPDATED":
      return action.coordinates;
    default:
      return state;
  }
}

function selectedOrganizationReducer(
  state: SearchStakeholder | null,
  action: AppAction
): SearchStakeholder | null {
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

function hoveredOrganizationReducer(
  state: SearchStakeholder | null,
  action: AppAction
): SearchStakeholder | null {
  switch (action.type) {
    case "HOVERED_ORGANIZATION_UPDATED":
      return action.organization;
    case "RESET_HOVERED_ORGANIZATION":
      return null;
    default:
      return state;
  }
}

function neighborhoodReducer(
  state: AppNeighborhood | null,
  action: AppAction
): AppNeighborhood | null {
  switch (action.type) {
    case "NEIGHBORHOOD_UPDATED":
      return action.neighborhood;
    default:
      return state;
  }
}

function widgetReducer(state: boolean, action: AppAction): boolean {
  switch (action.type) {
    case "WIDGET":
      return action.isWidget;
    default:
      return state;
  }
}

function filterPanelReducer(state: boolean, action: AppAction): boolean {
  switch (action.type) {
    case "FILTER_PANEL_TOGGLE":
      return action.filterPanel;
    default:
      return state;
  }
}
function orgNameFilterReducer(state: string, action: AppAction): string {
  switch (action.type) {
    case "ORG_NAME_FILTER_UPDATED":
      return action.orgNameFilter;
    default:
      return state;
  }
}

function openTimeFilterReducer(
  state: OpenTimeFilter,
  action: AppAction
): OpenTimeFilter {
  switch (action.type) {
    case "OPEN_TIME_FILTER_UPDATED":
      return action.openTimeFilter;
    default:
      return state;
  }
}

function foodTypeFilterReducer(state: string[], action: AppAction): string[] {
  switch (action.type) {
    case "FOOD_TYPE_FILTER_UPDATED":
      return action.foodTypeFilter;
    default:
      return state;
  }
}

function listPanelReducer(state: boolean, action: AppAction): boolean {
  switch (action.type) {
    case "TOGGLE_LIST_PANEL":
      return action.listPanel ?? state;
    default:
      return state;
  }
}

function isListPanelVisibleReducer(state: boolean, action: AppAction): boolean {
  switch (action.type) {
    case "TOGGLE_LIST_PANEL":
      return !state; // Toggle the state
    default:
      return state;
  }
}

function positionReducer(state: AppPosition, action: AppAction): AppPosition {
  switch (action.type) {
    case "POSITION":
      return action.position; // Toggle the state
    default:
      return state;
  }
}

export function appReducer(state: AppState, action: AppAction): AppState {
  return {
    defaultCoordinates: defaultCoordinatesReducer(
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
    hoveredOrganization: hoveredOrganizationReducer(
      state.hoveredOrganization,
      action
    ),
    neighborhood: neighborhoodReducer(state.neighborhood, action),
    // isWidget === true indicates that app is implemented as an
    // iframe widget hosted in a third-party application.
    isWidget: widgetReducer(state.isWidget, action),
    stakeholders: stakeholdersReducer(state.stakeholders, action),
    filterPanel: filterPanelReducer(state.filterPanel, action),
    orgNameFilter: orgNameFilterReducer(state.orgNameFilter, action),
    openTimeFilter: openTimeFilterReducer(state.openTimeFilter, action),
    foodTypeFilter: foodTypeFilterReducer(state.foodTypeFilter, action),
    listPanel: listPanelReducer(state.listPanel, action),
    isListPanelVisible: isListPanelVisibleReducer(
      state.isListPanelVisible,
      action
    ),
    position: positionReducer(state.position, action),
  };
}

export function getInitialState(): AppState {
  return {
    stakeholders: [],
    defaultCoordinates: DEFAULT_COORDINATES,
    searchCoordinates: null,
    selectedOrganization: null,
    hoveredOrganization: null,
    userCoordinates: null,
    neighborhood: null,
    isWidget: false,
    filterPanel: false,
    orgNameFilter: "",
    openTimeFilter: { radio: "Show All", day: "", time: "" },
    foodTypeFilter: [],
    listPanel: true,
    isListPanelVisible: false,
    position: "0",
  };
}

interface AppStateContextValue {
  state: AppState;
  dispatch: Dispatch<AppAction>;
}

const noopDispatch: Dispatch<AppAction> = () => {
  if (import.meta.env.DEV) {
    console.warn("dispatch called outside AppStateProvider");
  }
};

const AppStateContext = createContext<AppStateContextValue>({
  state: getInitialState(),
  dispatch: noopDispatch,
});

interface AppStateProviderProps {
  children: ReactNode;
}

export function AppStateProvider({ children }: AppStateProviderProps) {
  const [state, dispatch] = useReducer(appReducer, undefined, getInitialState);

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

export function useAppState(): AppState {
  return useContext(AppStateContext).state;
}

export function useAppDispatch(): Dispatch<AppAction> {
  return useContext(AppStateContext).dispatch;
}

export function useDefaultCoordinates(): Coordinates {
  const { defaultCoordinates } = useAppState();
  return defaultCoordinates;
}

export function useSearchCoordinates(): Coordinates | null {
  const { searchCoordinates } = useAppState();
  return searchCoordinates;
}

export function useSelectedOrganization(): SearchStakeholder | null {
  const { selectedOrganization } = useAppState();
  return selectedOrganization;
}

export function useHoveredOrganization(): SearchStakeholder | null {
  const { hoveredOrganization } = useAppState();
  return hoveredOrganization;
}

export function useUserCoordinates(): Coordinates | null {
  const { userCoordinates } = useAppState();
  return userCoordinates;
}

export function useNeighborhood(): AppNeighborhood | null {
  const { neighborhood } = useAppState();
  return neighborhood;
}

export function useWidget(): boolean {
  const { isWidget } = useAppState();
  return isWidget;
}

export function useStakeholders(): SearchStakeholder[] {
  const { stakeholders } = useAppState();
  return stakeholders;
}

export function useFilterPanel(): boolean {
  const { filterPanel } = useAppState();
  return filterPanel;
}

export function useOrgNameFilter(): string {
  const { orgNameFilter } = useAppState();
  return orgNameFilter;
}

export function useOpenTimeFilter(): OpenTimeFilter {
  const { openTimeFilter } = useAppState();
  return openTimeFilter;
}

export function useFoodTypeFilter(): string[] {
  const { foodTypeFilter } = useAppState();
  return foodTypeFilter;
}

export function useListPanel(): boolean {
  const { listPanel } = useAppState();
  return listPanel;
}

export function useIsListPanelVisible(): boolean {
  const { isListPanelVisible } = useAppState();
  return isListPanelVisible;
}

export function usePosition(): AppPosition {
  const { position } = useAppState();
  return position;
}
