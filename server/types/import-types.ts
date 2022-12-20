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
