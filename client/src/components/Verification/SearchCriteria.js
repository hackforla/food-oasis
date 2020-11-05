import React, { useState, useEffect } from "react";
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
  FormControl,
  FormLabel,
  FormControlLabel,
  Typography,
  RadioGroup,
  Radio,
} from "@material-ui/core";
import RadioTrueFalseEither from "../RadioTrueFalseEither";
import LocationAutocomplete from "../LocationAutocomplete";
import AccountAutocomplete from "../AccountAutocomplete";
import { defaultCoordinates } from "../../helpers/Configuration";

const useStyles = makeStyles((theme) => ({
  card: {
    margin: "0px",
  },
  formLabel: {
    margin: "1rem 0 .5rem",
  },
}));

const closeTo = (lat1, lon1, lat2, lon2) => {
  return Math.abs(lat1 - lat2) + Math.abs(lon1 - lon2) < 0.01;
};

const SearchCriteria = ({
  tenants,
  userLatitude,
  userLongitude,
  categories,
  neighborhoods,
  criteria,
  setCriteria,
  search,
}) => {
  const [useMyLocation, setUseMyLocation] = useState(
    criteria.latitude
      ? closeTo(
          criteria.latitude,
          criteria.longitude,
          userLatitude,
          userLongitude
        )
        ? "my"
        : "custom"
      : "custom"
  );

  const [customLatitude, setCustomLatitude] = useState(defaultCoordinates.lat);
  const [customLongitude, setCustomLongitude] = useState(
    defaultCoordinates.lon
  );
  const [customPlaceName, setCustomPlaceName] = useState("");

  useEffect(() => {
    setCustomLatitude(userLatitude);
    setCustomLongitude(userLongitude);
  }, [userLatitude, userLongitude]);

  // handler to set one criteria at a time
  const setCriterion = (evt) => {
    const {
      target: { name, value },
    } = evt;

    // max and min props on number inputs don't stop user from entering invalid values
    // implementing guard logic to prevent those values being entered
    if (
      name === "minCompleteCriticalPercent" ||
      name === "maxCompleteCriticalPercent"
    ) {
      if (value < 0) {
        setCriteria({ ...criteria, [evt.target.name]: "" });
        return;
      }

      if (value > 100) {
        setCriteria({ ...criteria, [evt.target.name]: 100 });
        return;
      }
    }

    setCriteria({ ...criteria, [evt.target.name]: evt.target.value });
  };

  const classes = useStyles();

  const handleRadioChange = (evt) => {
    const val = evt.target.value;
    setUseMyLocation(val);
    if (val === "my") {
      setCriteria({
        ...criteria,
        latitude: userLatitude,
        longitude: userLongitude,
        placeName: "",
      });
    } else {
      setCriteria({
        ...criteria,
        latitude: customLatitude,
        longitude: customLongitude,
        placeName: customPlaceName,
      });
    }
  };

  const setLocation = (location) => {
    setCustomLatitude(location.location.y);
    setCustomLongitude(location.location.x);
    setCustomPlaceName(location.address);
    setCriteria({
      ...criteria,
      latitude: location.location.y,
      longitude: location.location.x,
      placeName: location.address,
    });
    setUseMyLocation("custom");
  };

  return (
    <Card className={classes.card}>
      <CardContent>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <FormControl variant="outlined" fullWidth>
              <FormLabel
                id="verification-status-id-label"
                className={classes.formLabel}
              >
                Region
              </FormLabel>
              <Select
                labelId="tenant-id-label"
                name="tenantId"
                variant="outlined"
                size="small"
                value={criteria.tenantId}
                onChange={setCriterion}
              >
                <MenuItem key={0} value={0}>
                  (Any)
                </MenuItem>
                {tenants
                  ? tenants.map((tenant) => (
                      <MenuItem key={tenant.id} value={tenant.id}>
                        {tenant.name}
                      </MenuItem>
                    ))
                  : null}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl variant="outlined" fullWidth>
              <FormLabel
                id="verification-status-id-label"
                className={classes.formLabel}
              >
                Verification Status
              </FormLabel>
              <Select
                labelId="verification-status-id-label"
                name="verificationStatusId"
                variant="outlined"
                size="small"
                value={criteria.verificationStatusId}
                onChange={setCriterion}
              >
                <MenuItem key={0} value={0}>
                  (Any)
                </MenuItem>
                <MenuItem key={1} value={1}>
                  Needs Verification
                </MenuItem>
                <MenuItem key={2} value={2}>
                  Assigned
                </MenuItem>
                <MenuItem key={3} value={3}>
                  Submitted
                </MenuItem>
                <MenuItem key={4} value={4}>
                  Approved
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormLabel className={classes.formLabel}>Categories</FormLabel>
            {categories ? (
              <Select
                multiple
                displayEmpty
                label="Categories"
                placeholder="Category(ies)"
                name="select-multiple-chip"
                fullWidth
                height="50"
                variant="outlined"
                value={criteria.categoryIds}
                onChange={(event) => {
                  const categoryIds = event.target.value;
                  setCriteria({ ...criteria, categoryIds });
                }}
                input={<Input id="select-categories" />}
                renderValue={(ids) => (
                  <div className={classes.chips}>
                    {ids &&
                    ids.length > 0 &&
                    categories &&
                    categories.length > 0 ? (
                      ids
                        .map(
                          (categoryId) =>
                            categories.find(
                              (category) => category.id === categoryId
                            ).name
                        )
                        .join(", ")
                    ) : (
                      <em>(Any)</em>
                    )}
                  </div>
                )}
              >
                <MenuItem disabled value="">
                  <em>(All Categories)</em>
                </MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    <Checkbox
                      checked={
                        criteria.categoryIds &&
                        criteria.categoryIds.includes(category.id)
                      }
                    />
                    <ListItemText primary={category.name} />
                  </MenuItem>
                ))}
              </Select>
            ) : null}
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormLabel className={classes.formLabel}>Name</FormLabel>
            <TextField
              autoComplete="off"
              name="name"
              value={criteria.name}
              variant="outlined"
              fullWidth
              size="small"
              id="name"
              onChange={setCriterion}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormLabel className={classes.formLabel}>Assigned To</FormLabel>
            <AccountAutocomplete
              name="assignedLoginId"
              accountId={criteria.assignedLoginId || ""}
              setAccountId={(assignedLoginId) =>
                setCriteria({ ...criteria, assignedLoginId })
              }
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <RadioTrueFalseEither
              label="Permanently Closed"
              name="isInactive"
              value={criteria.isInactive || "either"}
              onChange={setCriterion}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <RadioTrueFalseEither
              label="Closed for COVID"
              name="isInactiveTemporary"
              value={criteria.isInactiveTemporary || "either"}
              onChange={setCriterion}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormLabel className={classes.formLabel}>Organization ID</FormLabel>
            <TextField
              autoComplete="off"
              type="number"
              name="stakeholderId"
              value={criteria.stakeholderId}
              variant="outlined"
              fullWidth
              size="small"
              id="stakeholderId"
              onChange={setCriterion}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormLabel className={classes.formLabel}>
              Min % Critical Complete
            </FormLabel>
            <TextField
              autoComplete="off"
              type="number"
              min="0"
              max="100"
              name="minCompleteCriticalPercent"
              value={criteria.minCompleteCriticalPercent}
              variant="outlined"
              fullWidth
              size="small"
              onChange={setCriterion}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormLabel className={classes.formLabel}>
              Max % Critical Complete
            </FormLabel>
            <TextField
              autoComplete="off"
              type="number"
              min="0"
              max="100"
              name="maxCompleteCriticalPercent"
              value={criteria.maxCompleteCriticalPercent}
              variant="outlined"
              fullWidth
              size="small"
              onChange={setCriterion}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl variant="outlined" size="small" fullWidth>
              <FormLabel
                id="neighborhood-id-label"
                className={classes.formLabel}
              >
                Neighborhood
              </FormLabel>
              <Select
                labelId="neighborhood-id-label"
                name="neighborhoodId"
                value={criteria.neighborhoodId}
                onChange={setCriterion}
              >
                <MenuItem key={0} value={0}>
                  (Any)
                </MenuItem>
                {neighborhoods
                  ? neighborhoods.map((n) => {
                      return (
                        <MenuItem key={n.id} value={n.id}>
                          {n.name}
                        </MenuItem>
                      );
                    })
                  : null}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Grid container>
            <FormLabel className={classes.formLabel}>Location</FormLabel>
            <Grid item container alignItems="center">
              <div style={{ marginRight: "0.5rem" }}>{"Within "}</div>
              <Select
                name="radius"
                variant="outlined"
                value={criteria.radius}
                onChange={setCriterion}
                input={<Input id="radius" />}
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
              {userLatitude ? (
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
                        <Typography>{`(${userLatitude.toFixed(
                          6
                        )}, ${userLongitude.toFixed(6)})`}</Typography>
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
                        {customPlaceName ? (
                          <Typography>{customPlaceName}</Typography>
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
                  {customPlaceName ? (
                    <Typography>{customPlaceName}</Typography>
                  ) : null}
                  {customLatitude ? (
                    <Typography>{`(${customLatitude.toFixed(
                      6
                    )}, ${customLongitude.toFixed(6)})`}</Typography>
                  ) : null}

                  <LocationAutocomplete
                    size="small"
                    fullWidth
                    setLocation={setLocation}
                  />
                </div>
              )}
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default SearchCriteria;
