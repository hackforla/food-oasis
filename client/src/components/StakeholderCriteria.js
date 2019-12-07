import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, Grid } from "@material-ui/core";
import { List, ListItem } from "@material-ui/core";
import EditButton from "../components/EditButton";
import SwitchViewsButton from "./SwitchViewsButton";

const useStyles = makeStyles(theme => ({
  card: {
    margin: "0px",
  },
}));

function StakeholderCriteria({
  selectedCategories,
  latitude,
  longitude,
  selectedDistance,
  searchString,
  isMapView,
  switchResultsView,
  openSearchPanel,
}) {
  const classes = useStyles();
  if (!selectedCategories) return null;
  return (
    <Card className={classes.card}>
      <CardContent>
        <Grid container spacing={1} alignItems="center">
          <Grid item container xs={6} justify="space-between">
            <EditButton
              label="Edit"
              onClick={() => {
                openSearchPanel(true);
              }}
            />
          </Grid>
          <Grid item container xs={6} justify="flex-end">
            <SwitchViewsButton
              isMapView={isMapView}
              onClick={switchResultsView}
            />
          </Grid>
          <Grid item>
            <List dense={true}>
              <ListItem>
                {selectedCategories.map(cat => cat.name).join(", ")}
              </ListItem>
              <ListItem>{` Within  ${selectedDistance} mi of (${longitude}, ${latitude})`}</ListItem>
              <ListItem>
                {searchString
                  ? ` Containing "${searchString}" in the name`
                  : null}
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default StakeholderCriteria;
