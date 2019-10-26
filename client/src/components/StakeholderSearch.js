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
  Typography
} from "@material-ui/core";
import SearchButton from "./SearchButton";

const useStyles = makeStyles(theme => ({
  card: {
    margin: "0px"
  },
  chips: {
    display: "flex",
    flexWrap: "wrap"
  },
  chip: {
    margin: 2
  }
}));

function StakeholderSearch(props) {
  //const [categories, setCategories] = useState(props.categories);
  const [selectedCategories, setSelectedCategories] = useState(
    props.selectedCategories
  );
  const [searchString, setSearchString] = useState(props.searchString);
  const [latitude, setLatitude] = useState(props.latitude);
  const [longitude, setLongitude] = useState(props.longitude);
  const [selectedDistance, setSelectedDistance] = useState(
    props.selectedDistance
  );

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
            <SearchButton
              onClick={() => {
                props.search(
                  searchString,
                  latitude,
                  longitude,
                  selectedCategories,
                  selectedDistance
                );
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormLabel>Categories</FormLabel>
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
          <Grid item xs={12}>
            <FormLabel>Location</FormLabel>
            <div>
              <span>{"Within "}</span>
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
              <span>{" miles of "}</span>
            </div>
            {latitude ? (
              <div>
                longitude: {longitude} latitude: {latitude}{" "}
              </div>
            ) : null}
          </Grid>
          <Grid item xs={12}>
            <FormLabel>Name</FormLabel>
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
      </CardContent>
    </Card>
  );
}

export default StakeholderSearch;
