export interface Neighborhood {
  id: number;
  name: string;
  zoom: number;
}

export interface NeighborhoodGeoJSON extends Neighborhood {
  certified: string;
  serviceRegion: string;
  centroidLongitude: number;
  centroidLatitude: number;
  geojson: GeoJSON;
}

export interface GeoJSON {
  id: number;
  name: string;
  type: string; // For Neighborhoods, this has the value "Feature"
  geometry: Geometry;
}

export interface Geometry {
  type: string; // for Neighborhoods, this has the value "MultiPolygon"
  coordinates: number[][][][];
}
