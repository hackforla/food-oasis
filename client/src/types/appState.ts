import type { Stakeholder } from "./Stakeholder";

export interface Coordinates {
  latitude: number;
  longitude: number;
  locationName?: string;
}

export interface DraggablePosition {
  x: number;
  y: number;
}

/** Initial state is the string `"0"`; mobile layout updates to coordinates. */
export type AppPosition = string | DraggablePosition;

export interface OpenTimeFilter {
  radio: string;
  day: string;
  time: string;
}

export interface AppNeighborhood {
  id?: number;
  name?: string;
  geojson?: unknown;
  centroidLatitude?: number;
  centroidLongitude?: number;
  [key: string]: unknown;
}

export type SearchStakeholder = Stakeholder & {
  categoryIds?: number[];
};

export interface AppState {
  stakeholders: SearchStakeholder[];
  defaultCoordinates: Coordinates;
  searchCoordinates: Coordinates | null;
  selectedOrganization: SearchStakeholder | null;
  hoveredOrganization: SearchStakeholder | null;
  userCoordinates: Coordinates | null;
  neighborhood: AppNeighborhood | null;
  isWidget: boolean;
  filterPanel: boolean;
  orgNameFilter: string;
  openTimeFilter: OpenTimeFilter;
  foodTypeFilter: string[];
  listPanel: boolean;
  isListPanelVisible: boolean;
  position: AppPosition;
}

export type AppAction =
  | { type: "STAKEHOLDERS_LOADED"; stakeholders: SearchStakeholder[] }
  | { type: "DEFAULT_COORDINATES_UPDATED"; coordinates: Coordinates }
  | { type: "SEARCH_COORDINATES_UPDATED"; coordinates: Coordinates }
  | { type: "USER_COORDINATES_UPDATED"; coordinates: Coordinates }
  | {
      type: "NEIGHBORHOOD_UPDATED";
      neighborhood: AppNeighborhood;
      coordinates: Coordinates;
    }
  | { type: "DEFAULT_COORDINATES_RESET" }
  | { type: "RESET_COORDINATES" }
  | { type: "SELECTED_ORGANIZATION_UPDATED"; organization: SearchStakeholder }
  | { type: "RESET_SELECTED_ORGANIZATION" }
  | { type: "HOVERED_ORGANIZATION_UPDATED"; organization: SearchStakeholder }
  | { type: "RESET_HOVERED_ORGANIZATION" }
  | { type: "WIDGET"; isWidget: boolean }
  | { type: "FILTER_PANEL_TOGGLE"; filterPanel: boolean }
  | { type: "ORG_NAME_FILTER_UPDATED"; orgNameFilter: string }
  | { type: "OPEN_TIME_FILTER_UPDATED"; openTimeFilter: OpenTimeFilter }
  | { type: "FOOD_TYPE_FILTER_UPDATED"; foodTypeFilter: string[] }
  | { type: "TOGGLE_LIST_PANEL"; listPanel?: boolean }
  | { type: "POSITION"; position: DraggablePosition };
