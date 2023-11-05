import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  map: {
    position: "relative",
    "& .mapboxgl-ctrl-attrib-button": {
      display: "none",
    },
  },
  scaleControl: {
    top: 8,
    left: 8,
  },
  navigationControl: {
    top: 8,
    right: 8,
  }
}));

export default useStyles;
