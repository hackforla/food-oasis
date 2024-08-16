export interface Suggestion {
  id: number;
  name: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  email: string;
  notes: string;
  tipsterName: string;
  tipsterPhone: string;
  tipsterEmail: string;
  hours: string;
  category: string;
  suggestionStatusId: number;
  adminNotes: string;
  stakeholderId: number;
  tenantId: number;
  formType: FormTypeEnum;
}

export enum FormTypeEnum {
  Suggestion = "suggestion",
  Correction = "correction",
}
