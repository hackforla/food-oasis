import { FormikErrors, FormikTouched } from "formik";
import React from "react";

export interface OrganizationHour {
  weekOfMonth: string | number;
  dayOfWeek: string;
  open: string;
  close: string;
}

export interface OrganizationFormValues {
  id: number;
  name: string;
  description: string;
  parentOrganization: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  phoneExt: string;
  email: string;
  latitude: string | number;
  longitude: string | number;
  physicalAccess: string;
  items: string;
  services: string;
  facebook: string;
  twitter: string;
  pinterest: string;
  linkedin: string;
  inactive: boolean;
  website: string;
  notes: string;
  requirements: string;
  adminNotes: string;
  createdDate: string;
  createdUser: string;
  modifiedDate: string;
  modifiedUser: string;
  submittedDate: string;
  submittedUser: string;
  approvedDate: string;
  approvedUser: string;
  neighborhoodName: string;
  selectedCategoryIds: number[];
  hours: OrganizationHour[];
  instagram: string;
  adminContactName: string;
  adminContactPhone: string;
  adminContactEmail: string;
  donationContactName: string;
  donationContactPhone: string;
  donationContactEmail: string;
  donationPickup: boolean;
  donationAcceptFrozen: boolean;
  donationAcceptRefrigerated: boolean;
  donationAcceptPerishable: boolean;
  donationSchedule: string;
  donationNotes: string;
  donationDeliveryInstructions: string;
  covidNotes: string;
  categoryNotes: string;
  eligibilityNotes: string;
  foodTypes: string;
  languages: string;
  confirmedName: boolean;
  confirmedCategories: boolean;
  confirmedAddress: boolean;
  confirmedEmail: boolean;
  confirmedPhone: boolean;
  confirmedHours: boolean;
  confirmedFoodTypes: boolean;
  verificationStatusId: number;
  inactiveTemporary: boolean;
  foodBakery: boolean;
  foodDryGoods: boolean;
  foodProduce: boolean;
  foodDairy: boolean;
  foodPrepared: boolean;
  foodMeat: boolean;
  hoursNotes: string;
  allowWalkins: boolean;
  tags: string[];
  reviewNotes?: string;
  assignedLoginId?: number | string;
  assignedUser?: string;
  assignedDate?: string;
  reviewedLoginId?: number | string;
  reviewedUser?: string;
  submittedLoginId?: number | string;
  claimedLoginId?: number | string;
  claimedUser?: string;
  claimedDate?: string;
  verification_status_id?: number;
  verifivation_status_id?: number;
  [key: string]: unknown;
}

export interface Suggestion {
  id: number;
  createdDate?: string;
  tipsterName?: string;
  tipsterEmail?: string;
  tipsterPhone?: string;
  notes?: string;
  adminNotes?: string;
  suggestionStatusId?: number;
}

export interface StakeholderVersion {
  id: number;
  version: number;
  modifiedDate: string;
  modifiedUser: string;
  modifiedUserRole?: string;
  verificationStatusId: number;
  [key: string]: unknown;
}

export type EditedSuggestions = Record<number, Partial<Suggestion>>;

export interface OrganizationSectionBaseProps {
  tabPage: number;
  values: OrganizationFormValues;
  touched: FormikTouched<OrganizationFormValues>;
  errors: FormikErrors<OrganizationFormValues>;
  handleChange: (event: React.ChangeEvent<any>) => void;
  handleBlur: (event: React.FocusEvent<any>) => void;
  confirmationErrors?: Record<string, string>;
}

export interface OrganizationSectionWithSetFieldValueProps
  extends OrganizationSectionBaseProps {
  setFieldValue: (
    field: string,
    value: unknown,
    shouldValidate?: boolean
  ) => void;
}

export interface OrganizationSectionWithSetFieldTouchedProps
  extends OrganizationSectionWithSetFieldValueProps {
  setFieldTouched: (
    field: string,
    isTouched?: boolean,
    shouldValidate?: boolean
  ) => void;
}
