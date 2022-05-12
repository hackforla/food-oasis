export const MENU_ITEMS = [
  { text: "About Us", link: "/about" },
  { text: "Find Food", link: "/organizations" },
  { text: "Donate", link: "/donate" },
  { text: "FAQs", link: "/faqs" },
  { text: "Suggest New Listing", link: "/suggestion" },
];

export const TENANT_CONFIG = {
  1: {
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
  },
  2: {
    tenantName: "California",
    taglineText: "Locate free food in California",
    defaultViewport: {
      center: { latitude: 37.96, longitude: -118.87 },
      zoom: 4.5,
    },
    maintainers: [
      {
        name: "Hack for LA",
        website: "https://www.hackforla.org/",
        path: require("images/hackforla.svg"),
      },
    ],
  },
  3: {
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
  },
  4: {
    tenantName: "Oregon",
    taglineText: "Locate free food in Oregon",
    defaultViewport: {
      center: { latitude: 45.52445, longitude: -122.65066 },
      zoom: 8,
    },
    maintainers: [],
  },
  5: {
    tenantName: "McKinney",
    taglineText: "Locate free food in McKinney",
    defaultViewport: {
      center: { latitude: 33.216239, longitude: -96.65014 },
      zoom: 10.5,
    },
    maintainers: [],
  },
  6: {
    tenantName: "Santa Barbara",
    taglineText: "Locate free food in Santa Barbara",
    defaultViewport: {
      center: { latitude: 34.68758, longitude: -120.157 },
      zoom: 8.75,
    },
    maintainers: [],
  },
  default: {
    tenantName: "Los Angeles",
    taglineText: "Locate free food in Los Angeles",
    defaultViewport: {
      center: { latitude: 34.0354899, longitude: -118.2439235 },
      zoom: 11,
    },
    maintainers: [],
  },
};
