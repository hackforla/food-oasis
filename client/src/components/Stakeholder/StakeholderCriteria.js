import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, Grid } from "@material-ui/core";
import { List, ListItem, Typography } from "@material-ui/core";
import { EditButton } from "components/Buttons";
import SwitchViewsButton from "components/SwitchViewsButton";

const useStyles = makeStyles((theme) => ({
  card: {
    margin: "0px",
  },
}));

function StakeholderCriteria({
  selectedCategories,
  latitude,
  longitude,
  selectedLocationName,
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
                <Typography>
                  {selectedCategories.map((cat) => cat.name).join(", ")}
                </Typography>
              </ListItem>
              <ListItem>
                <Typography>
                  <span>
                    {selectedDistance > 0
                      ? ` Within  ${selectedDistance} mi of `
                      : ` By distance from `}
                  </span>
                  <span>
                    {selectedLocationName
                      ? selectedLocationName
                      : `(${longitude}, ${latitude})`}
                  </span>
                </Typography>
              </ListItem>
              <ListItem>
                <Typography>
                  {searchString
                    ? ` Containing "${searchString}" in the name`
                    : null}
                </Typography>
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default StakeholderCriteria;
