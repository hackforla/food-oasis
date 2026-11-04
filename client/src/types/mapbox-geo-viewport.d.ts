declare module "@mapbox/geo-viewport" {
  const geoViewport: {
    bounds(
      center: [number, number],
      zoom: number,
      dimensions: [number, number],
      tileSize?: number
    ): [number, number, number, number];
  };

  export default geoViewport;
}
