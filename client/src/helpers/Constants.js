export const MENU_ITEMS = [
  { text: "Find Food", link: "/organizations" },
  { text: "About Us", link: "/about" },
  { text: "Donate", link: "/donate" },
  { text: "FAQs", link: "/faqs" },
  { text: "Suggest New Listing", link: "/suggestion" },
];

const LOS_ANGELES = {
  tenantName: "Los Angeles",
  taglineText: "Locate free food in Los Angeles",
  defaultViewport: {
    center: { latitude: 34.0354899, longitude: -118.2439235 },
    zoom: 11,
  },
  maintainers: [
    {
      name: "Hack for LA",
      website: "https://www.hackforla.org/",
      path: require("images/hackforla.svg"),
    },
  ],
  urlContains: ["la."],
};
const HAWAII = {
  tenantName: "Hawaii",
  taglineText: "Locate free food in Hawaiʻi",
  defaultViewport: {
    center: { latitude: 21.4601548, longitude: -157.99 },
    zoom: 9.5,
  },
  maintainers: [
    {
      name: "Code for Hawaii",
      website: "https://www.codeforhawaii.org/",
      path: require("components/StaticPagesHI/assets/cfh-logo-black-crop.png"),
    },
  ],
  urlContains: ["hi.", "hawaii"],
};
const MCKINNEY = {
  tenantName: "McKinney",
  taglineText: "Locate free food in McKinney",
  defaultViewport: {
    center: { latitude: 33.216239, longitude: -96.65014 },
    zoom: 10.5,
  },
  maintainers: [],
  urlContains: ["mck.", "mckinney."],
};
const SANTA_BARBARA = {
  tenantName: "Santa Barbara",
  taglineText: "Locate free food in Santa Barbara",
  defaultViewport: {
    center: { latitude: 34.68758, longitude: -120.157 },
    zoom: 8.75,
  },
  maintainers: [],
  urlContains: ["sb."],
};

export const PASSWORD_VALIDATION_REGEX =
  /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/;

export const PASSWORD_VALIDATION_ERROR =
  "Password must contain at least 8 characters, one uppercase, one number and one special character.";

export const TENANT_CONFIG = {
  1: LOS_ANGELES,
  3: HAWAII,
  5: MCKINNEY,
  6: SANTA_BARBARA,
  default: LOS_ANGELES,
};
