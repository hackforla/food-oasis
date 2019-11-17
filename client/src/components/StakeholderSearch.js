import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  Checkbox,
  Input,
  ListItemText,
  MenuItem,
  Select,
  Grid,
  TextField,
  Chip,
  FormLabel,
} from "@material-ui/core";
import SearchButton from "./SearchButton";
import SwitchViewsButton from "./SwitchViewsButton";

const useStyles = makeStyles(theme => ({
  card: {
    margin: "0px",
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  formLabel: {
    margin: "1rem 0 .5rem",
  },
}));

function StakeholderSearch(props) {
  const [selectedCategories, setSelectedCategories] = useState(
    props.selectedCategories,
  );
  const [searchString, setSearchString] = useState(props.searchString);
  const [latitude] = useState(props.latitude);
  const [longitude] = useState(props.longitude);
  const [selectedDistance, setSelectedDistance] = useState(
    props.selectedDistance,
  );

  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent>
        <Grid container spacing={1} alignItems="center">
          <Grid item container alignItems="center">
            <Grid item container xs={6}>
              <SearchButton
                onClick={() => {
                  props.search(
                    searchString,
                    latitude,
                    longitude,
                    selectedCategories,
                    selectedDistance,
                  );
                }}
              />
            </Grid>
            <Grid item container xs={6} justify="flex-end">
              <SwitchViewsButton
                isMapView={props.isMapView}
                onClick={props.switchResultsView}
              />
            </Grid>
          </Grid>
          <Grid item container alignItems="center" lg={6}>
            <Grid item container>
              <FormLabel className={classes.formLabel}>Categories</FormLabel>
              <Select
                multiple
                label="Categories"
                placeholder="Category(ies)"
                name="select-multiple-chip"
                fullWidth
                variant="outlined"
                value={selectedCategories}
                onChange={event => {
                  setSelectedCategories(event.target.value);
                }}
                className={classes.chips}
                input={<Input id="select-categories" />}
                renderValue={selected => (
                  <div className={classes.chips}>
                    {selected.map(category => (
                      <Chip
                        key={category.id}
                        label={category.name}
                        className={classes.chip}
                      />
                    ))}
                  </div>
                )}
              >
                {props.categories.map(category => (
                  <MenuItem key={category.id} value={category}>
                    <Checkbox
                      checked={
                        selectedCategories
                          .map(cat => cat.id)
                          .indexOf(category.id) > -1
                      }
                    />
                    <ListItemText primary={category.name} />
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
          <Grid item container lg={6} direction="column">
            <FormLabel className={classes.formLabel}>Location</FormLabel>
            <Grid item container alignItems="center">
              <div style={{ marginRight: "0.5rem" }}>{"Within "}</div>
              <Select
                name="select-distance"
                variant="outlined"
                value={selectedDistance}
                onChange={event => {
                  setSelectedDistance(event.target.value);
                }}
                input={<Input id="select-distance" />}
              >
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
              <div style={{ margin: "0 1rem 0 .5rem" }}>{"miles of"}</div>
              <div>
                {latitude ? (
                  <Grid container direction="column">
                    <div>longitude: {longitude}</div>
                    <div>latitude: {latitude}</div>
                  </Grid>
                ) : null}
              </div>
            </Grid>
          </Grid>
          <Grid item container>
            <Grid item container>
              <FormLabel className={classes.formLabel}>Name</FormLabel>
              <TextField
                autoComplete="fname"
                name="searchString"
                value={searchString}
                variant="outlined"
                fullWidth
                id="name"
                onChange={event => {
                  setSearchString(event.target.value);
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default StakeholderSearch;
