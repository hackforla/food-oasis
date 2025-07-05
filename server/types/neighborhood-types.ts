export interface Neighborhood {
  id: number;
  name: string;
  website: string;
  empowerLink: string;
  ncId: number;
  certified: string;
  serviceRegion: string;
  zoom: number;
}

export interface NeighborhoodGeoJSON extends Neighborhood {
  centroidLongitude: number;
  centroidLatitude: number;
  geojson: GeoJSON;
}

export interface NeighborhoodPutRequest {
  neighborhoodId: number;
  zoom: number;
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
