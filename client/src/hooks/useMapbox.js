import { defaultViewport } from "helpers/Configuration";
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
    mapbox.default.flyTo({
      center: [
        isListPanelOpen && isDesktop ? longitude - 0.08 : longitude,
        isMobile ? latitude - 0.04 : latitude,
      ],
      zoom: defaultViewport.zoom,
      duration: 2000,
    });
  };

  return { mapRef, getViewport, flyTo };
};
