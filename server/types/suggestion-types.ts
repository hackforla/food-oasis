export interface Suggestion {
  id: number | null;
  name: string | null;
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
  adminNotes?: string;
  stakeholderId: number | null;
  tenantId: number;
}
