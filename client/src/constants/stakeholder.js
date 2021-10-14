export const FOOD_PANTRY_CATEGORY_ID = 1;
export const MEAL_PROGRAM_CATEGORY_ID = 9;
export const DEFAULT_CATEGORIES = [
  FOOD_PANTRY_CATEGORY_ID,
  MEAL_PROGRAM_CATEGORY_ID,
];

export const VERIFICATION_STATUS = {
  NEEDS_VERIFICATION: 1,
  ASSIGNED: 2,
  SUBMITTED: 3,
  VERIFIED: 4,
};

export const VERIFICATION_STATUS_NAMES = {
  1: "Needs Verification",
  2: "Assigned",
  3: "Submitted",
  4: "Approved",
};

export const DEFAULT_STAKEHOLDER = {
  id: 0,
  name: "",
  address1: "",
  address2: "",
  city: "",
  state: "",
  zip: "",
  phone: "",
  email: "",
  notes: "",
  hours: "",
  tipsterName: "",
  tipsterPhone: "",
  tipsterEmail: "",
  category: "",
  status: "Open",
};
