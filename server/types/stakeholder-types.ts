export interface StakeholderBestSearchParams {
  categoryIds: string[];
  latitude: string;
  longitude: string;
  distance: string;
  maxLat: string;
  maxLng: string;
  minLat: string;
  minLng: string;
  isInactive: string;
  verificationStatusId: string;
  tenantId: string;
  name: string;
  neighborhoodId: string;
  tag: string;
}

// not exactly sure why it's complaining so I made everything optional
export interface StakeholderSearchParams {
  assignedLoginId?: string;
  categoryIds?: string[];
  claimedLoginId?: string;
  distance?: string;
  isApproved?: string;
  isAssigned?: string;
  isClaimed?: string;
  isInactive?: string;
  isInactiveTemporary?: string;
  isSubmitted?: string;
  latitude?: string;
  longitude?: string;
  maxCompleteCriticalPercent?: string;
  minCompleteCriticalPercent?: string;
  name?: string;
  neighborhoodId?: string;
  stakeholderId?: string;
  tag?: string;
  tenantId?: string;
  verificationStatusId?: string;
}
export interface StakeholderCategory {
  stakeholder_id: number;
  id: number;
  name: string;
  display_order: number;
}

// Interface with common properties for all the full stakeholder types.
export interface StakeholderBase {
  address1: string;
  address2: string;
  adminContactEmail: string;
  adminContactName: string;
  adminContactPhone: string;
  adminNotes: string;
  allowWalkins: boolean;
  approvedDate: Date;
  assignedDate: Date;
  assignedLoginId: number;
  assignedUser: string;
  categories: StakeholderCategory[];
  categoryNotes: string;
  city: string;
  claimedDate: Date;
  claimedLoginId: number;
  claimedUser: string;
  completeCriticalPercent?: string;
  confirmedAddress: boolean;
  confirmedCategories: boolean;
  confirmedEmail: boolean;
  confirmedFoodTypes: boolean;
  confirmedHours: boolean;
  confirmedName: boolean;
  confirmedPhone: boolean;
  covidNotes: string;
  createdDate: Date;
  createdLoginId: number;
  createdUser: string;
  description: string;
  donationAcceptFrozen: boolean;
  donationAcceptPerishable: boolean;
  donationAcceptRefrigerated: boolean;
  donationContactEmail: string;
  donationContactName: string;
  donationContactPhone: string;
  donationDeliveryInstructions: string;
  donationNotes: string;
  donationPickup: boolean;
  donationSchedule: string;
  eligibilityNotes: string;
  email: string;
  facebook: string;
  foodBakery: boolean;
  foodDairy: boolean;
  foodDryGoods: boolean;
  foodMeat: boolean;
  foodPrepared: boolean;
  foodProduce: boolean;
  foodTypes: string;
  hours:
    | string
    | { weekOfMonth: number; open: Date; close: Date; dayOfWeek: number }[];
  hoursNotes: string;
  id: number;
  inactive: boolean;
  inactiveTemporary: boolean;
  instagram: string;
  items: string;
  languages: string;
  latitude: number | null;
  linkedin: string;
  longitude: number | null;
  modifiedDate: Date;
  modifiedLoginId: number;
  modifiedUser: string;
  name: string;
  neighborhoodId: number;
  neighborhoodName?: string;
  notes: string;
  parentOrganization: string;
  parentOrganizationId: number;
  phone: string;
  physicalAccess: string;
  pinterest: string;
  requirements: string;
  reviewedLoginId: number;
  reviewedUser: string;
  reviewNotes: string;
  services: string;
  state: string;
  submittedDate: Date;
  submittedLoginId: number;
  submittedUser: string;
  tags: string[];
  twitter: string;
  verificationStatusId: number;
  website: string;
  zip: string;
}

// Stakeholder also includes the Primary Key, id
export interface Stakeholder extends StakeholderBase {
  id: number;
  suggestionCount: string;
}

//When searching, an origin (lat,lon) will be specified, and the stakeholder will also include
// the distance from the origin.
export interface StakeholderWithDistance extends Stakeholder {
  distance: number | null;
}

// StakeholderBest also includes a flag to indicate if the best Stakeholder
// has been verified at least once in its history (vs. a "new" stakeholder)
export interface StakeholderBest extends StakeholderWithDistance {
  isVerified: boolean;
}

// StakeholderLog includes a sequention version number indicating the
// sequence of changes to the same stakeholder
export interface StakeholderLog extends Stakeholder {
  version: number;
}

// Parameters to do an insert to Stakeholder.
// loginId identifies the user doing the insert, tenantId identifies the
// site. Categories are specified as an array of numbers for the POST
// request, which is converted to a string for the sproc by the service.
export interface InsertStakeholderParams extends StakeholderBase {
  loginId: number;
  tenantId: number;
  selectedCategoryIds: number[];
}

// Parameters to do an update to Stakeholder. Same as for insert,
// except that we have the primary key (i.e., id) value as well.
export interface UpdateStakeholderParams extends InsertStakeholderParams {
  id: number;
}

export interface ClaimParams {
  loginId: string;
  setClaimed: boolean;
  id: number;
  userLoginId: number;
}

export interface RequestAssignmentParams {
  tenantId: number;
  loginId: number;
}

export interface AssignParams {
  loginId: number;
  userLoginId: number;
  id: number;
}

export interface NeedsVerificationParams {
  userLoginId: number;
  preserveConfirmations: number;
  message: string;
}

export interface FoodSeekerStakeholder {
  address1: string;
  address2: null | string;
  adminContactEmail: null | string;
  adminContactName: null | string;
  adminContactPhone: null | string;
  allowWalkins: boolean;
  approvedDate: null | string;
  categories: StakeholderCategory[];
  categoryIds: number[];
  city: string;
  covidNotes: string;
  createdDate: string;
  description: string;
  email: string;
  facebook: string;
  foodTypes: string;
  hours: Hour[] | null;
  hoursNotes: string;
  id: number;
  inactive: boolean;
  inactiveTemporary: boolean;
  instagram: string;
  isVerified: boolean;
  items: string;
  languages: string;
  latitude: string;
  linkedin: string;
  longitude: string;
  modifiedDate: null | string;
  name: string;
  neighborhoodId: number | null;
  neighborhoodName: null | string;
  notes: string;
  parentOrganization: string;
  parentOrganizationId: null;
  phone: string;
  physicalAccess: string;
  pinterest: string;
  requirements: string;
  reviewNotes: null | string;
  services: string;
  state: string;
  tags: null | string[];
  twitter: string;
  verificationStatusId: number;
  website: string;
  zip: string;
}

export interface Hour {
  close: string;
  day_of_week: DayOfWeek;
  open: string;
  week_of_month: number;
}

export enum DayOfWeek {
  Fri = "Fri",
  Mon = "Mon",
  Sat = "Sat",
  Sun = "Sun",
  Thu = "Thu",
  Tue = "Tue",
  Wed = "Wed",
}

export interface FoodSeekerStakeholderParams {
  tenantId: string;
}
