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

export interface Stakeholder {
  address1: string;
  address2: string;
  adminNotes: string;
  allowWalkins?: boolean;
  approvedDate: Date;
  assignedDate: Date;
  assignedLoginId: number;
  assignedUser: string;
  categories: StakeholderCategory[];
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
  distance: number | null;
  email: string;
  foodBakery: boolean;
  foodDairy: boolean;
  foodDryGoods: boolean;
  foodMeat: boolean;
  foodPrepared: boolean;
  foodProduce: boolean;
  hoursNotes?: string;
  id: number;
  inactive: boolean;
  inactiveTemporary: boolean;
  latitude: number | null;
  longitude: number | null;
  modifiedDate: Date;
  modifiedLoginId: number;
  modifiedUser: string;
  name: string;
  neighborhoodId: number;
  neighborhoodName?: string;
  parentOrganizationId?: number;
  phone: string;
  requirements: string;
  reviewedLoginId: number;
  reviewedUser: string;
  state: string;
  submittedDate: Date;
  submittedLoginId: number;
  submittedUser: string;
  tags?: string[];
  verificationStatusId: number;
  version?: number;
  website: string;
  zip: string;
}

export interface StakeholderBest {
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
  distance: number | null;
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
  hours: string;
  hoursNotes: string;
  id: number;
  inactive: boolean;
  inactiveTemporary: boolean;
  instagram: string;
  isVerified: boolean;
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

export interface InsertStakeholderParams extends Stakeholder {
  adminContactEmail: string;
  adminContactName: string;
  adminContactPhone: string;
  categoryNotes: string;
  description: string;
  donationAcceptFrozen: string;
  donationAcceptPerishable: string;
  donationAcceptRefrigerated: string;
  donationContactEmail: string;
  donationContactName: string;
  donationContactPhone: string;
  donationDeliveryInstructions: string;
  donationNotes: string;
  donationPickup: string;
  donationSchedule: string;
  eligibilityNotes: string;
  facebook: string;
  foodTypes: string;
  hours:
    | string
    | { weekOfMonth: number; open: Date; close: Date; dayOfWeek: number }[];
  instagram: string;
  items: string;
  languages: string;
  linkedin: string;
  loginId: string;
  notes: string;
  parentOrganization: string;
  physicalAccess: string;
  pinterest: string;
  reviewNotes: string;
  selectedCategoryIds: string[];
  services: string;
  tenantId: string;
  twitter: string;
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
