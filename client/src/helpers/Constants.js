import hackForLaLogoUrl from "images/hackforla.svg";
import foodOasisLogoUrl from "images/foodoasis.svg";
import alohaHarvestLogoUrl from "components/StaticPagesHI/assets/aloha-harvest-bg-none.png";
import codeForHawaiiLogoUrl from "components/StaticPagesHI/assets/cfh-logo-black-crop.png";

function requiredEnvVar(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Required environment variable "${name}" not found`);
  }
  return value;
}

function optionalEnvVar(name) {
  const value = process.env[name];
  if (!value) {
    return null;
  }
  return value;
}

// Begin application constants

export const MENU_ITEMS = [
  { text: "Find Food", link: "/organizations" },
  { text: "About Us", link: "/about" },
  { text: "Donate", link: "/donate" },
  { text: "FAQs", link: "/faqs" },
  { text: "Contact Us", link: "/contact" },
  { text: "Suggest New Listing", link: "/suggestion" },
];

export const PASSWORD_VALIDATION_REGEX =
  /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/;

export const PASSWORD_VALIDATION_ERROR =
  "Password must contain at least 8 characters, one uppercase, one number and one special character.";

export const MAPBOX_ACCESS_TOKEN = requiredEnvVar(
  "REACT_APP_MAPBOX_ACCESS_TOKEN"
);

// End Application Constants

// Begin Tenant-Specific Constants

const TENANT_SUBDOMAINS = {
  1: ["la."],
  3: ["hi.", "hawaii"],
  5: ["mck.", "mckinney."],
  6: ["sb."],
};

function getTenantId() {
  if (process.env.NODE_ENV === "development") {
    return Number(optionalEnvVar("REACT_APP_TENANT_ID")) || 1;
  }
  const tenant = Object.entries(TENANT_SUBDOMAINS).find(([id, values]) => {
    return values.some((value) =>
      window.location.hostname.toLowerCase().includes(value)
    );
  });

  return tenant ? Number(tenant[0]) : 1;
}

export const TENANT_ID = getTenantId();

const TENANT_NAMES = {
  1: "Los Angeles",
  3: "Hawaii",
  5: "McKinney",
  6: "Santa Barbara",
};

const TENANT_TIME_ZONES = {
  1: "America/Los_Angeles",
  3: "Pacific/Honolulu",
  5: "America/Chicago",
  6: "America/Los_Angeles",
};

const TENANT_LOGO_URLS = {
  1: foodOasisLogoUrl,
  3: alohaHarvestLogoUrl,
  5: foodOasisLogoUrl,
  6: foodOasisLogoUrl,
};

const TENANT_MAINTAINER_LOGO_URLS = {
  1: hackForLaLogoUrl,
  3: codeForHawaiiLogoUrl,
  5: hackForLaLogoUrl,
  6: hackForLaLogoUrl,
};

const DEFAULT_VIEWPORTS = {
  1: {
    center: { latitude: 34.0354899, longitude: -118.2439235 },
    zoom: 11,
  },
  3: {
    center: { latitude: 21.4601548, longitude: -157.99 },
    zoom: 9.5,
  },
  5: {
    center: { latitude: 33.216239, longitude: -96.65014 },
    zoom: 10.5,
  },
  6: {
    center: { latitude: 34.68758, longitude: -120.157 },
    zoom: 8.75,
  },
};

const LOS_ANGELES = {
  tenantName: "Los Angeles",
  taglineText: "Locate free food in Los Angeles",
  defaultViewport: DEFAULT_VIEWPORTS[1],
  maintainers: [
    {
      name: "Hack for LA",
      website: "https://www.hackforla.org/",
      path: hackForLaLogoUrl,
    },
  ],
  urlContains: ["la."],
};

const HAWAII = {
  tenantName: "Hawaii",
  taglineText: "Locate free food in Hawaiʻi",
  defaultViewport: DEFAULT_VIEWPORTS[3],
  maintainers: [
    {
      name: "Code for Hawaii",
      website: "https://www.codeforhawaii.org/",
      path: codeForHawaiiLogoUrl,
    },
  ],
  urlContains: ["hi.", "hawaii"],
};

const MCKINNEY = {
  tenantName: "McKinney",
  taglineText: "Locate free food in McKinney",
  defaultViewport: DEFAULT_VIEWPORTS[5],
  maintainers: [],
  urlContains: ["mck.", "mckinney."],
};

const SANTA_BARBARA = {
  tenantName: "Santa Barbara",
  taglineText: "Locate free food in Santa Barbara",
  defaultViewport: DEFAULT_VIEWPORTS[6],
  maintainers: [],
  urlContains: ["sb."],
};

const TENANT_CONFIGS = {
  1: LOS_ANGELES,
  3: HAWAII,
  5: MCKINNEY,
  6: SANTA_BARBARA,
  default: LOS_ANGELES,
};

export const DEFAULT_VIEWPORT = DEFAULT_VIEWPORTS[TENANT_ID];
export const TENANT_CONFIG = TENANT_CONFIGS[TENANT_ID];
export const TENANT_LOGO_URL = TENANT_LOGO_URLS[TENANT_ID];
export const TENANT_MAINTAINER_LOGO_URL =
  TENANT_MAINTAINER_LOGO_URLS[TENANT_ID];

export const TENANT_METADATA = {
  tenantId: TENANT_ID,
  tenantName: TENANT_NAMES[TENANT_ID],
  tenantDetails: TENANT_CONFIG,
  defaultViewport: DEFAULT_VIEWPORT,
  tenantTimeZone: TENANT_TIME_ZONES[TENANT_ID],
  tenantLogoUrl: TENANT_LOGO_URL,
};

export const LINKEDIN_REGEX =
  /^https?:\/\/(www\.)?linkedin\.com\/(in|company|school|pub|groups|showcase)\/[a-zA-Z0-9\-_%]+\/?$/;
export const FACEBOOK_REGEX =
  /^https?:\/\/(www\.)?facebook\.com\/[a-zA-Z0-9.]{5,50}\/?$/;
export const INSTAGRAM_REGEX =
  /^https?:\/\/(www\.)?instagram\.com\/[a-zA-Z0-9._]{1,30}\/?$/;
export const PINTEREST_REGEX =
  /^https?:\/\/(www\.)?pinterest\.com\/[a-zA-Z][a-zA-Z0-9_]{2,14}\/?$/;
export const TWITTER_REGEX =
  /^https?:\/\/(www\.)?(twitter\.com|x\.com)\/[a-zA-Z0-9_]{1,15}\/?$/;
