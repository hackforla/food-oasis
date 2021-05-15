import React from "react";
import { renderToString } from "react-dom/server";
import MapMarker from "images/mapMarker";
import {
  MEAL_PROGRAM_CATEGORY_ID,
  FOOD_PANTRY_CATEGORY_ID,
} from "constants/stakeholder";

///////////////////// CONSTANTS ///////////////////

// note that we have 3 marker categories, and 2 selected states, for a
// total of 6 possible marker variants.
// the marker categories come from src/images/mapMarker.js
const MARKER_CATEGORIES = [-1, 0, 1];
const SELECTED_VALUES = [false, true];

// using the pixel ratio to scale the marker helps prevent
// blurry edges when the marker is converted to an image
const MARKER_SCALE = window.devicePixelRatio;

////////////////////// FUNCTIONS //////////////////

// each marker variant has a unique id based on its category and
// whether it is selected
function getIconId(markerCategory, isSelected) {
  return `fola-marker::${markerCategory}::${isSelected}`
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
    const svg = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svg);
    icon.src = url;
    icon.onload = () => {
      map.addImage(iconId, icon);
      URL.revokeObjectURL(url);
      resolve();
    };
  });
}

// load an icon for each possible combination of marker category and
// selected value.
export function loadMarkerIcons(map) {
  const iconLoaders = []

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
      )
    })
  })

  return Promise.all(iconLoaders)
}

export const markersLayerStyles = {
  type: "symbol",
  layout: {
    "icon-image": ["get", "iconId"],
    "icon-allow-overlap": true,
    "icon-size": 1 / MARKER_SCALE,
    "icon-anchor": "bottom",
  },
}

// This generates the geojson needed to show the stakeholders in a symbol layer.
// Note that the iconId is added as a property.
export function getMarkersGeojson(stakeholders, selectedStakeholder) {
  return {
    type: "FeatureCollection",
    features: (stakeholders || []).map((sh) => {
      const category = getMarkerCategory(sh)
      const selected = sh.id === selectedStakeholder?.id
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
      }
    }),
  }
}
