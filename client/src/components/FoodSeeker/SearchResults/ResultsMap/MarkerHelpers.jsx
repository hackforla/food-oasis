import { useMemo } from "react";
import { renderToString } from "react-dom/server";
import MapMarker from "images/mapMarker";
import {
  MEAL_PROGRAM_CATEGORY_ID,
  FOOD_PANTRY_CATEGORY_ID,
  DEFAULT_CATEGORIES,
} from "constants/stakeholder";
import { useSelectedOrganization } from "../../../../appReducer";

// metro json imports
import metroGeojson from "./TransitJSON/GeoJSON4326.json";
import metroALine from "./TransitJSON/AMetroLine.json";
import metroBDLine from "./TransitJSON/BandDMetroLine.json";
import metroCLine from "./TransitJSON/MetroCLine.json";
import metroELine from "./TransitJSON/MetroELine.json";
import metroKLine from "./TransitJSON/KMetroLine.json";
import busStops from "./TransitJSON/busstops.json";
import busLines from "./TransitJSON/bus_lines.json";

export const MARKERS_LAYER_ID = "markers";

// note that we have 3 marker categories, and 2 selected states, for a
// total of 6 possible marker variants.
// the marker categories come from src/images/mapMarker.js
const MARKER_CATEGORIES = [-1, 0, 1, 2];
const SELECTED_VALUES = [false, true];

// using the pixel ratio to scale the marker helps prevent
// blurry edges when the marker is converted to an image
const MARKER_SCALE = window.devicePixelRatio;

// each marker variant has a unique id based on its category and
// whether it is selected
function getIconId(markerCategory, isSelected) {
  return `fola-marker::${markerCategory}::${isSelected}`;
}

// selects the right marker category based on the stakeholder categories array.
// category ids are from src/images/mapMarker.js
function getMarkerCategory(stakeholder) {
  if (
    stakeholder.categories[0]?.id === FOOD_PANTRY_CATEGORY_ID &&
    stakeholder.categories[1]?.id === MEAL_PROGRAM_CATEGORY_ID
  )
    return -1;

  if (stakeholder.categories[0]?.id === FOOD_PANTRY_CATEGORY_ID) return 0;

  return 1;
}

// This converts the given marker to an icon, and then loads that icon into the
// map. Once loaded, the icon can be used in a symbol layer.
// see https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/#symbol
function loadMarkerIcon({ map, marker, iconId }) {
  return new Promise((resolve, reject) => {
    const icon = new Image();
    const svgString = renderToString(marker);
    const svg = new Blob([svgString], { type: "image/svg+xml" });
    const url = URL.createObjectURL(svg);
    icon.onload = () => {
      map.addImage(iconId, icon);
      URL.revokeObjectURL(url);
      resolve();
    };
    icon.src = url;
  });
}

// load an icon for each possible combination of marker category and
// selected value.
export function loadMarkerIcons(map) {
  const iconLoaders = [];

  MARKER_CATEGORIES.forEach((category) => {
    SELECTED_VALUES.forEach((selected) => {
      iconLoaders.push(
        loadMarkerIcon({
          map,
          marker: (
            <MapMarker
              category={category}
              selected={selected}
              scale={MARKER_SCALE}
            />
          ),
          iconId: getIconId(category, selected),
        })
      );
    });
  });

  return Promise.all(iconLoaders);
}

// symbol layer style definition
export const markersLayerStyles = {
  id: MARKERS_LAYER_ID,
  type: "symbol",
  layout: {
    "icon-image": ["get", "iconId"],
    "icon-allow-overlap": true,
    "icon-size": 1 / MARKER_SCALE,
    "icon-anchor": "bottom",
  },
};

export const metroMarkersLayerStyles = {
  id: "metroMarkers",
  type: "symbol",
  layout: {
    "icon-image": ["get", "iconId"],
    "icon-allow-overlap": true,
    "icon-size": 1 / MARKER_SCALE,
  },
};

export const aLineLayerStyles = {
  id: "aMetro",
  type: "line",
  paint: {
    "line-color": "#0072BC",
    "line-width": 2,
    "line-opacity": 0.8,
  },
  layout: {
    "line-cap": "round",
  },
};

export const bdLineLayerStyles = {
  id: "bdMetro",
  type: "line",
  paint: {
    "line-color": "#E3131B",
    "line-width": 2,
    "line-opacity": 0.8,
  },
  layout: {
    "line-cap": "round",
  },
};

export const cLineLayerStyles = {
  id: "cMetro",
  type: "line",
  paint: {
    "line-color": "#58A738",
    "line-width": 2,
    "line-opacity": 0.8,
  },
  layout: {
    "line-cap": "round",
  },
};

export const eLineLayerStyles = {
  id: "eMetro",
  type: "line",
  paint: {
    "line-color": "#F7B618",
    "line-width": 2,
    "line-opacity": 0.8,
  },
  layout: {
    "line-cap": "round",
  },
};

export const kLineLayerStyles = {
  id: "kMetro",
  type: "line",
  paint: {
    "line-color": "#E96BB0",
    "line-width": 2,
    "line-opacity": 0.8,
  },
  layout: {
    "line-cap": "round",
  },
};

export const busStopStyles = {
  id: "buses",
  type: "circle",
  paint: {
    "circle-radius": 4,
    "circle-color": "#8a6ea1",
    "circle-stroke-width": 1,
    "circle-stroke-color": "#FFFFFF",
  },
};

export const busLineStyles = {
  id: "busLines",
  type: "line",
  paint: {
    "line-color": "#8a6ea1",
    "line-width": 2,
    "line-opacity": 0.4,
  },
  layout: {
    "line-cap": "round",
  },
}


// symbol layer data
export function useMarkersGeojson({ stakeholders, categoryIds }) {
  const catIds = categoryIds.length ? categoryIds : DEFAULT_CATEGORIES;
  const selectedOrganization = useSelectedOrganization();

  // modify the stakeholders array by:
  // 1. filtering out the inactive orgs
  // 2. limiting the categories for each org to the ones currently selected
  const modifiedStakeholders = useMemo(
    () =>
      (stakeholders || [])
        .filter(
          (sh) =>
            sh.latitude &&
            sh.longitude &&
            !(sh.inactive || sh.inactiveTemporary)
        )
        .map((sh) => ({
          ...sh,
          categories: sh.categories.filter(({ id }) => catIds.includes(id)),
        })),
    [stakeholders, catIds]
  );

  // This generates the geojson needed to show the stakeholders in a symbol
  // layer. Note that the iconId is added as a property.
  const markersGeojson = useMemo(
    () => ({
      type: "FeatureCollection",
      features: modifiedStakeholders.map((sh) => {
        const category = getMarkerCategory(sh);
        const selected = sh.id === selectedOrganization?.id;
        return {
          type: "Feature",
          id: sh.id,
          geometry: {
            type: "Point",
            coordinates: [sh.longitude, sh.latitude],
          },
          properties: {
            iconId: getIconId(category, selected),
          },
        };
      }),
    }),
    [modifiedStakeholders, selectedOrganization]
  );

  const metroMarkersGeojson = {
    ...metroGeojson,
    features: metroGeojson.features.map((feature) => {
      return {
        ...feature,
        properties: {
          ...feature.properties,
          // iconId: "fola-marker::2::false",
          iconId: getIconId(2, false),
        },
      };
    }),
  };

  return {
    markersGeojson,
    metroMarkersGeojson,
    metroALine,
    metroBDLine,
    metroCLine,
    metroELine,
    metroKLine,
    busStops,
    busLines,
  };
}
