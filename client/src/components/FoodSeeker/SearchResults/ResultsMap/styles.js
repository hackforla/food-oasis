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
  },
  searchButton: {
    position: "absolute",
    top: 5,
    left: "50%",
    transform: "translate(-50%)",
    backgroundColor: "white",
    "&:hover": {
      background: theme.palette.primary.main,
      color: "#FFFFFF",
    },
  },
}));

export default useStyles;
