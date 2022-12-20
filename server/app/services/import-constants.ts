export const WEEKS_HOURLY = [
  { label: "hoursWeek1", value: 1 },
  { label: "hoursWeek2", value: 2 },
  { label: "hoursWeek3", value: 3 },
  { label: "hoursWeek4", value: 4 },
  { label: "hoursWeekLast", value: -1 },
];

export const MAP_NUM_TO_DAY = {
  1: "Sun",
  2: "Mon",
  3: "Tue",
  4: "Wed",
  5: "Thu",
  6: "Fri",
  7: "Sat",
};

export const STAKEHOLDER_SCHEMA = [
  {
    name: "id",
    required: false,
    default_value: "",
  },
  {
    name: "name",
    required: true,
    default_value: "",
  },
  {
    name: "address1",
    required: true,
    default_value: "",
  },
  {
    name: "address2",
    required: false,
    default_value: "",
  },
  {
    name: "city",
    required: true,
    default_value: "",
  },
  {
    name: "state",
    required: true,
    default_value: "",
  },
  {
    name: "zip",
    required: true,
    default_value: "",
  },
  {
    name: "phone",
    required: true,
    default_value: "",
  },
  {
    name: "latitude",
    required: false,
    default_value: "",
  },
  {
    name: "longitude",
    required: false,
    default_value: "",
  },
  {
    name: "website",
    required: false,
    default_value: "",
  },
  {
    name: "fmId",
    required: false,
    default_value: "",
  },
  {
    name: "notes",
    required: false,
    default_value: "",
  },
  {
    name: "createdDate",
    required: false,
    default_value: "",
  },
  {
    name: "createdLoginId",
    required: false,
    default_value: "Auto",
  },
  {
    name: "modifiedDate",
    required: false,
    default_value: "",
  },
  {
    name: "modifiedLoginId",
    required: false,
    default_value: "",
  },
  {
    name: "submittedDate",
    required: false,
    default_value: "",
  },
  {
    name: "submittedLoginId",
    required: true,
    default_value: "",
  },
  {
    name: "requirements",
    required: false,
    default_value: "",
  },
  {
    name: "adminNotes",
    required: false,
    default_value: "",
  },
  {
    name: "inactive",
    required: true,
    default_value: "f",
  },
  {
    name: "parentOrganization",
    required: false,
    default_value: "",
  },
  {
    name: "physicalAccess",
    required: true,
    default_value: "",
  },
  {
    name: "email",
    required: false,
    default_value: "",
  },
  {
    name: "items",
    required: false,
    default_value: "",
  },
  {
    name: "services",
    required: true,
    default_value: "",
  },
  {
    name: "facebook",
    required: false,
    default_value: "",
  },
  {
    name: "twitter",
    required: false,
    default_value: "",
  },
  {
    name: "pinterest",
    required: false,
    default_value: "",
  },
  {
    name: "linkedin",
    required: false,
    default_value: "",
  },
  {
    name: "description",
    required: false,
    default_value: "",
  },
  {
    name: "approvedDate",
    required: false,
    default_value: "",
  },
  {
    name: "reviewedLoginId",
    required: false,
    default_value: "",
  },
  {
    name: "assignedLoginId",
    required: false,
    default_value: "",
  },
  {
    name: "agencyType",
    required: false,
    default_value: "",
  },
  {
    name: "assignedDate",
    required: false,
    default_value: "",
  },
  {
    name: "reviewNotes",
    required: false,
    default_value: "",
  },
  {
    name: "claimedLoginId",
    required: false,
    default_value: "",
  },
  {
    name: "claimedDate",
    required: false,
    default_value: "",
  },
  {
    name: "instagram",
    required: false,
    default_value: "",
  },
  {
    name: "adminContactName",
    required: false,
    default_value: "",
  },
  {
    name: "adminContactPhone",
    required: false,
    default_value: "",
  },
  {
    name: "adminContactEmail",
    required: false,
    default_value: "",
  },
  {
    name: "donationContactName",
    required: false,
    default_value: "",
  },
  {
    name: "donationContactPhone",
    required: false,
    default_value: "",
  },
  {
    name: "donationContactEmail",
    required: false,
    default_value: "",
  },
  {
    name: "donationPickup",
    required: false,
    default_value: "",
  },
  {
    name: "donationAcceptFrozen",
    required: false,
    default_value: "",
  },
  {
    name: "donationAcceptRefrigerated",
    required: false,
    default_value: "",
  },
  {
    name: "donationAcceptPerishable",
    required: false,
    default_value: "",
  },
  {
    name: "donationSchedule",
    required: false,
    default_value: "",
  },
  {
    name: "donationDeliveryInstructions",
    required: false,
    default_value: "",
  },
  {
    name: "covidNotes",
    required: false,
    default_value: "",
  },
  {
    name: "donationNotes",
    required: false,
    default_value: "",
  },
  {
    name: "categoryNotes",
    required: false,
    default_value: "",
  },
  {
    name: "eligibilityNotes",
    required: false,
    default_value: "",
  },
  {
    name: "foodTypes",
    required: true,
    default_value: "",
  },
  {
    name: "languages",
    required: false,
    default_value: "English",
  },
  {
    name: "confirmedName",
    required: false,
    default_value: "f",
  },
  {
    name: "confirmedCategories",
    required: false,
    default_value: "f",
  },
  {
    name: "confirmedAddress",
    required: false,
    default_value: "f",
  },
  {
    name: "confirmedPhone",
    required: false,
    default_value: "f",
  },
  {
    name: "confirmedEmail",
    required: false,
    default_value: "f",
  },
  {
    name: "confirmedHours",
    required: false,
    default_value: "f",
  },
  {
    name: "confirmedFoodTypes",
    required: false,
    default_value: "f",
  },
  {
    name: "verificationStatusId",
    required: false,
    default_value: "1",
  },
  {
    name: "inactiveTemporary",
    required: false,
    default_value: "f",
  },
  {
    name: "hours",
    required: false,
    default_value: "",
  },
  {
    name: "hoursWeek1",
    required: true,
    default_value: "",
  },
  {
    name: "hoursWeek2",
    required: true,
    default_value: "",
  },
  {
    name: "hoursWeek3",
    required: true,
    default_value: "",
  },
  {
    name: "hoursWeek4",
    required: true,
    default_value: "",
  },
  {
    name: "hoursWeekLast",
    required: true,
    default_value: "",
  },
  {
    name: "selectedCategoryIds",
    required: true,
    default_value: "1",
  },
  {
    name: "neighborhoodId",
    required: true,
    default_value: "",
  },
  {
    name: "completeCriticalPercent",
    required: false,
    default_value: "",
  },
  {
    name: "foodBakery",
    required: false,
    default_value: "f",
  },
  {
    name: "foodDryGoods",
    required: false,
    default_value: "f",
  },
  {
    name: "foodProduce",
    required: false,
    default_value: "f",
  },
  {
    name: "foodDairy",
    required: false,
    default_value: "f",
  },
  {
    name: "foodPrepared",
    required: false,
    default_value: "f",
  },
  {
    name: "foodMeat",
    required: false,
    default_value: "f",
  },
];
