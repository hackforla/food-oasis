export const tenantId = 3;

export const originCoordinates = (() => {
  switch (tenantId) {
    case 3:
      return { lat: 21.3101548, lon: -157.8428712, zoom: 12, radius: 5 };
    case 2:
      return { lat: 38.3949164, lon: -122.7287326, zoom: 10, radius: 8 };
    default:
      return { lat: 34.0354899, lon: -118.2439235, zoom: 12, radius: 5 };
  }
})();
