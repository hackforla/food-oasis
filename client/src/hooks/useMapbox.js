import { useRef } from "react";
import { useMap } from "react-map-gl";
import { useListPanel } from "../appReducer";
import useBreakpoints from "./useBreakpoints";

export const useMapbox = () => {
  const mapRef = useRef();
  const isListPanelOpen = useListPanel();
  const { isMobile, isDesktop } = useBreakpoints();
  const mapbox = useMap();

  const getViewport = () => {
    const map = mapbox.default.getMap();

    const { lat: latitude, lng: longitude } = map.getCenter();
    const zoom = map.getZoom();
    const { width, height } = map.getContainer().getBoundingClientRect();

    return {
      center: { latitude, longitude },
      zoom,
      dimensions: { width, height },
    };
  };

  const flyTo = ({ latitude, longitude }) => {
    if (!mapbox.default) {
      return;
    }

    // gets the user's current zoom level
    const currentZoom = mapbox.default.getZoom();

    // calculates longitude offset according to zoom level for panel open desktop
    const baseLongOffset = 0.08;
    const longitudeOffset = baseLongOffset * Math.pow(2, 11 - currentZoom);

    // calculates latitude offset for mobile according to zoom level and takes screen height into account
    const baseLatOffset = 0.05;
    const screenHeight = window.innerHeight;
    const referenceHeight = 800;
    const screenHeightFactor = screenHeight / referenceHeight;
    const latitudeOffset =
      baseLatOffset * Math.pow(2, 11 - currentZoom) * screenHeightFactor;

    mapbox.default.flyTo({
      center: [
        isListPanelOpen && isDesktop ? longitude - longitudeOffset : longitude,
        isMobile ? latitude - latitudeOffset : latitude,
      ],
      zoom: currentZoom,
      duration: 2000,
    });
  };

  return { mapRef, getViewport, flyTo };
};
