export const white = "#FFFFFF";
export const gray = "#545454";
export const primary = "#336699";
export const secondary = "#E57109";
export const hover = "#4C99E5";
export const success = "#219653";
export const error = "#CC3333";
export const confirmed = "#008000";
export const headingText = "#1B1B1B";
export const bodyText = "#313233";
export const inactiveButton = "#949494";
//export const inactiveButtonText = "#4D4D4D";
export const linkNormal = "#1976D2";
export const linkVisited = "#551A8B";
export const linkHovered = "#004BA0";

//Icon and List Colors
export const foodPantry = "#336699"; //blue
export const mealProgram = "#E57109"; //orange | formerly red #CC3333
export const closed = "#545454"; //grey

export const palette = {
  contrastThreshold: 4.5,
  common: {
    black: bodyText,
    gray: gray,
    white: white,
    disabled: "#A0A0A0",
    inactiveButton,
  },
  primary: {
    light: "#6693CA",
    main: primary,
    dark: "#003C6B",
  },
  secondary: {
    main: secondary,
  },
  success: {
    main: success,
    contrastText: "#FFFFFF",
  },
  error: {
    main: error,
    contrastText: "#FFFFFF",
  },
  link: {
    hovered: linkHovered,
    normal: linkNormal,
    visited: linkVisited,
  },
  inactiveButton: {
    light: "#D0D0D0",
    main: inactiveButton,
    dark: "909090",
    contrastText: "#FFFFFF",
  },
  mealProgram: {
    main: mealProgram,
    contrastText: "#FFFFFF",
  },
  foodPantry: {
    main: foodPantry,
  },
  headingText: {
    main: headingText,
  },
  bodyText: {
    main: bodyText,
  },
  confirmed: {
    main: confirmed,
  },
};
