import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  filterButton: {
    margin: "0 .25rem",
    padding: "0 0.5rem",
    fontSize: "12px",
  },
  div: {
    padding: "1rem 0",
    textAlign: "center",
    fontSize: "12px",
    border: "1px solid blue",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    // flexGrow: 1,
  },
  resultsContainer: {
    width: "100%",
    height: "100%",
  },
  controlPanel: {
    width: "100%",
    padding: ".5rem 1rem",
  },
}));

export default function ResultsContainer() {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <SearchFilter />
      <Results />
    </div>
  );
}

function Results() {
  const classes = useStyles();
  return (
    <Grid container wrap="wrap-reverse" className={classes.resultsContainer}>
      <Grid item xs={12} md={4}>
        <div className={classes.div}>LIST</div>
      </Grid>
      <Grid item xs={12} md={8}>
        <div className={classes.div}>MAP</div>
      </Grid>
    </Grid>
  );
}

function SearchFilter() {
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
          <Button
            variant="outlined"
            className={classes.filterButton}
            onClick={() => {}}
          >
            Distance
          </Button>
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
