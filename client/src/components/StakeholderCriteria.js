import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, Grid, Typography } from "@material-ui/core";
import { List, ListItem, Button } from "@material-ui/core";
import EditButton from "../components/EditButton";

const useStyles = makeStyles(theme => ({
  card: {
    margin: "0px"
  }
}));

function StakeholderCriteria(props) {
  const {
    selectedCategories,
    latitude,
    longitude,
    selectedDistance,
    searchString
  } = props;

  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent>
        <Grid container spacing={1} alignItems="center">
          <Grid item container xs={6} justify="space-between">
            <Typography variant={"h5"} component={"h2"}>
              Criteria
            </Typography>
          </Grid>
          <Grid item container xs={6} justify="flex-end">
            <EditButton
              label="Change"
              onClick={() => {
                props.openSearchPanel(true);
              }}
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
