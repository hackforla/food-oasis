export interface Article {
  name: string;
  addr: string;
  lat: number | null;
  lon: number | null;
  phone: string;
  populationServed: string;
  resourceCategories: string;
  generalResources: string;
  additionalOfferings: string;
}

export type ImportAction = "add" | "update" | "replace";

export interface LAPLFoorResource {
  name: string;
  addr: string;
  phone: string;
  population_served: string;
  resource_categories: string;
  general_resources: string;
  additional_offerings: string;
  lat: number;
  lon: number;
}
