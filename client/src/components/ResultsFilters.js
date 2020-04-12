import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Select, MenuItem, FormControl, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  filterButton: {
    margin: "0 .25rem",
    padding: "0 0.5rem",
    fontSize: "12px",
  },
  div: {
    textAlign: "center",
    fontSize: "12px",
    border: "1px solid blue",
  },
  controlPanel: {
    width: "100%",
    padding: ".5rem 1rem",
  },
}));

function ResultsFilters() {
  const classes = useStyles();

  return (
    <Grid container wrap="wrap-reverse" className={classes.controlPanel}>
      <Grid
        item
        container
        xs={12}
        sm={6}
        md={4}
        justify="center"
        alignItems="center"
      >
        <Grid item>
          <FormControl className={classes.filterButton} variant="outlined">
            <Select
              name="select-distance"
              value={0} // TODO: plug in live value
              onChange={() => {}} // TODO: plug in handler function
              inputProps={{
                name: "select-distance",
                id: "select-distance",
              }}
            >
              <MenuItem key={0} value={0}>
                Distance
              </MenuItem>
              <MenuItem key={1} value={1}>
                1
              </MenuItem>
              <MenuItem key={2} value={2}>
                2
              </MenuItem>
              <MenuItem key={3} value={3}>
                3
              </MenuItem>
              <MenuItem key={5} value={5}>
                5
              </MenuItem>
              <MenuItem key={10} value={10}>
                10
              </MenuItem>
              <MenuItem key={20} value={20}>
                20
              </MenuItem>
              <MenuItem key={50} value={50}>
                50
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            className={classes.filterButton}
            onClick={() => {}}
          >
            Food Pantries
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            className={classes.filterButton}
            onClick={() => {}}
          >
            Meals
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={6} md={8}>
        <div className={classes.div}>Search Input</div>
      </Grid>
    </Grid>
  );
}

ResultsFilters.propTypes = {
  distance: PropTypes.number,
  placeName: PropTypes.string,
  isPantryCategorySelected: PropTypes.bool,
  isMealCategorySelected: PropTypes.bool,
  isVerifiedFilterSelected: PropTypes.bool,
};

export default ResultsFilters;
