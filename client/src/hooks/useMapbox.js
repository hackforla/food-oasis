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

    // calculates latitude offset for mobile according to zoom level and screen height
    const baseLatOffset = 0.065;
    const screenHeight = window.innerHeight;

    function calculateLatOffset(screenHeight) {
      const baseHeight = 550;
      const rate = 0.006 / 50; // approximately 0.006 deg per 50 pixels
      return 0.034 + (screenHeight - baseHeight) * rate;
    }

    const heightOffsetFactor = !screenHeight
      ? baseLatOffset
      : calculateLatOffset(screenHeight);

    const latitudeOffset = heightOffsetFactor * Math.pow(2, 11 - currentZoom);

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
