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
  FormControlLabel,
  Typography,
  RadioGroup,
  Radio,
} from "@material-ui/core";
import { SearchButton } from "./Buttons";
import SwitchViewsButton from "./SwitchViewsButton";
import LocationAutocomplete from "./LocationAutocomplete";

const useStyles = makeStyles((theme) => ({
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

const closeTo = (lat1, lon1, lat2, lon2) => {
  return Math.abs(lat1 - lat2) + Math.abs(lon1 - lon2) < 0.01;
};

function StakeholderSearch(props) {
  const [selectedCategories, setSelectedCategories] = useState(
    props.selectedCategories
  );
  const [searchString, setSearchString] = useState(props.searchString);
  const [latitude] = useState(props.latitude);
  const [longitude] = useState(props.longitude);
  const [customLatitude, setCustomLatitude] = useState(props.selectedLatitude);
  const [customLongitude, setCustomLongitude] = useState(
    props.selectedLongitude
  );
  const [customLocationName, setCustomLocationName] = useState(
    props.selectedLocationName
  );

  const [selectedLatitude, setSelectedLatitude] = useState(
    props.selectedLatitude
  );
  const [selectedLongitude, setSelectedLongitude] = useState(
    props.selectedLongitude
  );
  const [selectedLocationName, setSelectedLocationName] = useState(
    props.selectedLocationName
  );
  const [selectedDistance, setSelectedDistance] = useState(
    props.selectedDistance
  );
  const [useMyLocation, setUseMyLocation] = useState(
    latitude
      ? closeTo(
          props.selectedLatitude,
          props.selectedLongitude,
          props.latitude,
          props.longitude
        )
        ? "my"
        : "custom"
      : "custom"
  );

  const classes = useStyles();

  const handleRadioChange = (evt) => {
    const val = evt.target.value;
    setUseMyLocation(val);
    if (val === "my") {
      setSelectedLatitude(latitude);
      setSelectedLongitude(longitude);
      setSelectedLocationName("");
    } else {
      setSelectedLatitude(customLatitude);
      setSelectedLongitude(customLongitude);
      setSelectedLocationName(customLocationName);
    }
  };

  const setLocation = (location) => {
    setCustomLatitude(location.location.y);
    setCustomLongitude(location.location.x);
    setCustomLocationName(location.address);
    setSelectedLatitude(location.location.y);
    setSelectedLongitude(location.location.x);
    setSelectedLocationName(location.address);
    setUseMyLocation("custom");
  };

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
                    selectedLatitude,
                    selectedLongitude,
                    selectedLocationName,
                    selectedCategories,
                    selectedDistance
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
          <Grid item container alignItems="center">
            <Grid item container>
              <FormLabel className={classes.formLabel}>Name</FormLabel>
              <TextField
                autoComplete="fname"
                name="searchString"
                value={searchString}
                variant="outlined"
                fullWidth
                id="name"
                onChange={(event) => {
                  setSearchString(event.target.value);
                }}
              />
            </Grid>
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
                onChange={(event) => {
                  setSelectedCategories(event.target.value);
                }}
                className={classes.chips}
                input={<Input id="select-categories" />}
                renderValue={(selected) => (
                  <div className={classes.chips}>
                    {selected.map((category) => (
                      <Chip
                        key={category.id}
                        label={category.name}
                        className={classes.chip}
                      />
                    ))}
                  </div>
                )}
              >
                {props.categories.map((category) => (
                  <MenuItem key={category.id} value={category}>
                    <Checkbox
                      checked={
                        selectedCategories
                          .map((cat) => cat.id)
                          .indexOf(category.id) > -1
                      }
                    />
                    <ListItemText primary={category.name} />
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
          <Grid item container>
            <FormLabel className={classes.formLabel}>Location</FormLabel>
            <Grid item container alignItems="center">
              <div style={{ marginRight: "0.5rem" }}>{"Within "}</div>
              <Select
                name="select-distance"
                variant="outlined"
                value={selectedDistance}
                onChange={(event) => {
                  setSelectedDistance(event.target.value);
                }}
                input={<Input id="select-distance" />}
              >
                <MenuItem key={0} value={0}>
                  (Any)
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
              <div style={{ margin: "0 1rem 0 .5rem" }}>{"miles of"}</div>
            </Grid>
            <Grid item xs={12}>
              {/* If we got location from browser, allow using current location */}
              {latitude ? (
                <RadioGroup
                  name="useMyLocation"
                  value={useMyLocation}
                  onChange={handleRadioChange}
                >
                  <FormControlLabel
                    value="my"
                    control={<Radio color="primary" />}
                    style={{ alignItems: "flex-start" }}
                    label={
                      <div>
                        <Typography>My Location: </Typography>
                        <Typography>{`(${latitude}, ${longitude})`}</Typography>
                      </div>
                    }
                  />
                  <FormControlLabel
                    value="custom"
                    control={<Radio color="primary" />}
                    style={{ alignItems: "flex-start" }}
                    label={
                      <div>
                        <hr />
                        <Typography>{`Custom Location:`} </Typography>
                        {customLocationName ? (
                          <Typography>{customLocationName}</Typography>
                        ) : null}
                        {customLatitude ? (
                          <Typography>{`(${customLatitude.toFixed(
                            6
                          )}, ${customLongitude.toFixed(6)})`}</Typography>
                        ) : null}

                        <LocationAutocomplete
                          fullWidth
                          setLocation={setLocation}
                        />
                      </div>
                    }
                  />
                </RadioGroup>
              ) : (
                <div>
                  {customLocationName ? (
                    <Typography>{customLocationName}</Typography>
                  ) : null}
                  {customLatitude ? (
                    <Typography>{`(${customLatitude.toFixed(
                      6
                    )}, ${customLongitude.toFixed(6)})`}</Typography>
                  ) : null}

                  <LocationAutocomplete fullWidth setLocation={setLocation} />
                </div>
              )}
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default StakeholderSearch;
