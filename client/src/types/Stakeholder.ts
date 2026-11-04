export interface StakeholderCategory {
  stakeholder_id: number;
  id: number;
  name: string;
  display_order: number;
  isForFoodSeeker: boolean;
}

export interface Hour {
  close: string;
  day_of_week: string;
  open: string;
  week_of_month: number;
}

export interface Stakeholder {
  id: number;
  name: string;
  address1: string;
  address2: string | null;
  city: string;
  state: string;
  zip: string;
  phone: string;
  email: string;
  website: string;
  notes: string;
  hoursNotes: string;
  covidNotes: string;
  items: string;
  foodTypes: string;
  requirements: string;
  languages: string;
  services: string;
  description: string;
  facebook: string;
  instagram: string;
  linkedin: string;
  pinterest: string;
  twitter: string;
  adminNotes: string;
  tenantId: number;
  categories: StakeholderCategory[];
  hours: Hour[] | null;
  allowWalkins: boolean;
  inactive: boolean;
  inactiveTemporary: boolean;
  verificationStatusId: number;
  approvedDate: string | null;
  modifiedDate: string | null;
  createdDate: string;
  latitude: string;
  longitude: string;
  distance?: number | null;
  foodBakery?: boolean;
  foodDairy?: boolean;
  foodDryGoods?: boolean;
  foodMeat?: boolean;
  foodPrepared?: boolean;
  foodProduce?: boolean;
  [key: string]: unknown;
}
