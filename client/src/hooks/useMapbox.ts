import { useRef } from "react";
import { useMap, type MapRef } from "react-map-gl";
import { useListPanel } from "../appReducer";
import useBreakpoints from "./useBreakpoints";

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface Viewport {
  center: Coordinates;
  zoom: number;
  dimensions: {
    width: number;
    height: number;
  };
}

export const useMapbox = () => {
  const mapRef = useRef<MapRef | null>(null);
  const isListPanelOpen = useListPanel() as boolean;
  const { isMobile, isDesktop } = useBreakpoints();
  const mapbox = useMap() as { default?: MapRef };

  const getViewport = (): Viewport => {
    const map = mapbox.default!.getMap();

    const { lat: latitude, lng: longitude } = map.getCenter();
    const zoom = map.getZoom();
    const { width, height } = map.getContainer().getBoundingClientRect();

    return {
      center: { latitude, longitude },
      zoom,
      dimensions: { width, height },
    };
  };

  const flyTo = ({ latitude, longitude }: Coordinates) => {
    if (!mapbox.default) {
      return;
    }

    const currentZoom = mapbox.default.getZoom();

    const baseLongOffset = 0.08;
    const longitudeOffset = baseLongOffset * Math.pow(2, 11 - currentZoom);

    const baseLatOffset = 0.065;
    const screenHeight = window.innerHeight;

    function calculateLatOffset(screenHeightValue: number) {
      const baseHeight = 550;
      const rate = 0.006 / 50;
      return 0.034 + (screenHeightValue - baseHeight) * rate;
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