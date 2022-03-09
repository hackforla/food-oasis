export const REGIONS_LAYER_ID = "markers";

export const regionFillStyle = {
  id: "point",
  type: "fill",
  paint: {
    "fill-color": "#d0d0d0",
    "fill-opacity": 0.4,
  },
};

export const regionBorderStyle = {
  id: "regionBorder",
  type: "line",
  paint: {
    "line-color": "#808080",
    "line-width": 2,
    "line-dasharray": [8, 2],
  },
};
