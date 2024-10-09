export const typography = {
  fontFamily: '"Helvetica Neue", Helvetica, sans-serif;',
  h1: {
    fontWeight: 500,
    fontSize: "1.5rem",
    "@media (min-width:600px)": {
      fontSize: "2.5rem",
    },
  },
  h2: {
    fontWeight: 500,
    fontSize: "1.375rem",
    "@media (min-width:600px)": {
      fontSize: "1.5rem",
    },
  },
  h3: {
    fontWeight: 500,
    fontSize: "1.25rem",
    "@media (min-width:600px)": {
      fontSize: "1.375rem",
    },
  },
  h4: {
    fontWeight: 500,
    fontSize: "1.125rem",
    "@media (min-width:600px)": {
      fontSize: "1.25rem",
    },
  },
  h5: {
    fontWeight: 500,
    fontSize: "1rem",
    "@media (min-width:600px)": {
      fontSize: "1.125rem",
    },
  },
  h6: {
    fontWeight: 500,
    fontSize: "0.875rem",
    "@media (min-width:600px)": {
      fontSize: "1rem",
    },
  },
  subtitle1: {
    fontWeight: 600,
    fontSize: "0.875rem",
    "@media (min-width:600px)": {
      fontSize: "1rem",
    },
  },
  subtitle2: {
    fontWeight: 400,
    fontSize: "0.75rem",
    "@media (min-width:600px)": {
      fontSize: "1=0.875rem",
    },
  },
  body1: {
    fontWeight: 400,
    fontSize: "0.875rem",
    "@media (min-width:600px)": {
      fontSize: "1rem",
    },
  },
  body2: {
    fontWeight: 400,
    fontSize: "0.75rem",
    "@media (min-width:600px)": {
      fontSize: ".875rem",
    },
  },
  // The variant "button" is not overridden, so that the text on a button
  // is controlled by styles from the button itself. This allows us to
  // have different button variants with different font charactreristics.
};
