import {
  Box,
  Card,
  CardContent,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  Input,
  ListItemText,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material/Select";
import { DEFAULT_VIEWPORT } from "helpers/Constants";
import { useEffect, useState } from "react";
import AccountAutocomplete from "./AccountAutocomplete";
import LocationAutocomplete from "./LocationAutocomplete";
import Label from "./ui/Label";
import RadioTrueFalseEither from "./ui/RadioTrueFalseEither";

interface Category {
  id: number;
  name: string;
}

interface Neighborhood {
  id: number;
  name: string;
}

interface Tag {
  name: string;
}

interface SearchCriteriaValues {
  name: string;
  latitude: number;
  longitude: number;
  placeName: string;
  radius: number;
  categoryIds: number[];
  tags: string[];
  isInactive: string;
  isAssigned: string;
  isSubmitted: string;
  isApproved: string;
  isClaimed: string;
  isInactiveTemporary: string;
  stakeholderId: string;
  minCompleteCriticalPercent: number;
  maxCompleteCriticalPercent: number;
  verificationStatusId: number;
  neighborhoodId: number;
  tag: string;
  assignedLoginId: number | null;
  claimedLoginId: number | null;
}

interface LocationResult {
  Geometry: {
    Point: [number, number];
  };
  Label: string;
}

interface SearchCriteriaProps {
  userLatitude: number;
  userLongitude: number;
  categories?: Category[];
  neighborhoods?: Neighborhood[];
  tags?: Tag[];
  criteria: SearchCriteriaValues;
  setCriteria: React.Dispatch<React.SetStateAction<SearchCriteriaValues>>;
}

type CriteriaChangeEvent =
  | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  | SelectChangeEvent<number | string | string[]>;

const closeTo = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  return Math.abs(lat1 - lat2) + Math.abs(lon1 - lon2) < 0.01;
};

const SearchCriteria = ({
  userLatitude,
  userLongitude,
  categories,
  neighborhoods,
  tags,
  criteria,
  setCriteria,
}: SearchCriteriaProps) => {
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

  const [customLatitude, setCustomLatitude] = useState(
    DEFAULT_VIEWPORT.center.latitude
  );
  const [customLongitude, setCustomLongitude] = useState(
    DEFAULT_VIEWPORT.center.longitude
  );
  const [customPlaceName, setCustomPlaceName] = useState("");

  useEffect(() => {
    setCustomLatitude(userLatitude);
    setCustomLongitude(userLongitude);
  }, [userLatitude, userLongitude]);

  const setCriterion = (evt: CriteriaChangeEvent) => {
    const name = evt.target.name as keyof SearchCriteriaValues;
    const value = evt.target.value;

    if (!name) {
      return;
    }

    if (
      name === "minCompleteCriticalPercent" ||
      name === "maxCompleteCriticalPercent"
    ) {
      const numericValue = Number(value);
      if (numericValue < 0) {
        setCriteria({ ...criteria, [name]: 0 } as SearchCriteriaValues);
        return;
      }

      if (numericValue > 100) {
        setCriteria({ ...criteria, [name]: 100 } as SearchCriteriaValues);
        return;
      }

      setCriteria({
        ...criteria,
        [name]: numericValue,
      } as SearchCriteriaValues);
      return;
    }

    if (
      name === "verificationStatusId" ||
      name === "neighborhoodId" ||
      name === "radius"
    ) {
      setCriteria({
        ...criteria,
        [name]: Number(value),
      } as SearchCriteriaValues);
      return;
    }

    setCriteria({ ...criteria, [name]: value } as SearchCriteriaValues);
  };

  const handleRadioChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
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

  const setLocation = (location: LocationResult) => {
    setCustomLatitude(location.Geometry.Point[0]);
    setCustomLongitude(location.Geometry.Point[1]);
    setCustomPlaceName(location.Label);
    setCriteria({
      ...criteria,
      latitude: location.Geometry.Point[0],
      longitude: location.Geometry.Point[1],
      placeName: location.Label,
    });
    setUseMyLocation("custom");
  };

  const handleCategoryChange = (event: SelectChangeEvent<unknown>) => {
    const rawValue = event.target.value;
    const values = Array.isArray(rawValue) ? rawValue : [rawValue];
    const categoryIds = values.map((value) => Number(value));
    setCriteria({ ...criteria, categoryIds });
  };

  const renderCategoryValue = (selected: unknown) => {
    const ids = (Array.isArray(selected) ? selected : []) as Array<
      number | string
    >;

    if (!ids.length || !categories?.length) {
      return <Typography>(Any)</Typography>;
    }

    const names = ids
      .map(
        (categoryId) =>
          categories.find((category) => category.id === Number(categoryId))
            ?.name
      )
      .filter(Boolean)
      .join(", ");

    return <Typography>{names || "(Any)"}</Typography>;
  };

  return (
    <Card>
      <CardContent>
        <Grid container spacing={4}>
          <Grid
            size={{
              xs: 12,
              sm: 6
            }}>
            <Label
              id="verification-status-id-label"
              label="Verification Status"
            />
            <Select
              labelId="verification-status-id-label"
              name="verificationStatusId"
              variant="outlined"
              size="small"
              value={criteria.verificationStatusId}
              fullWidth
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
          </Grid>

          <Grid
            size={{
              xs: 12,
              sm: 6
            }}>
            <Label id="select-multiple-chip" label="Categories" />
            {categories ? (
              <Select
                multiple
                displayEmpty
                name="select-multiple-chip"
                variant="outlined"
                fullWidth
                labelId="select-multiple-chip"
                value={criteria.categoryIds}
                onChange={handleCategoryChange}
                inputProps={{ id: "select-categories" }}
                renderValue={renderCategoryValue}
              >
                <MenuItem disabled value="">
                  <Typography sx={{ fontStyle: "italic" }}>
                    (All Categories)
                  </Typography>
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
          <Grid
            size={{
              xs: 12,
              sm: 6
            }}>
            <Label id="name" label="Name" />
            <TextField
              variant="outlined"
              autoComplete="off"
              name="name"
              value={criteria.name}
              fullWidth
              size="small"
              id="name"
              onChange={setCriterion}
            />
          </Grid>
          <Grid
            size={{
              xs: 12,
              sm: 6
            }}>
            <Label id="assignedLoginId" label="Assigned To" />
            <AccountAutocomplete
              accountId={criteria.assignedLoginId || ""}
              setAccountId={(assignedLoginId) =>
                setCriteria({ ...criteria, assignedLoginId })
              }
            />
          </Grid>

          <Grid
            size={{
              xs: 12,
              sm: 4
            }}>
            <RadioTrueFalseEither
              label="Permanently Closed"
              name="isInactive"
              value={criteria.isInactive || "either"}
              onChange={setCriterion}
            />
          </Grid>
          <Grid
            size={{
              xs: 12,
              sm: 4
            }}>
            <RadioTrueFalseEither
              label="Temporarily Closed"
              name="isInactiveTemporary"
              value={criteria.isInactiveTemporary || "either"}
              onChange={setCriterion}
            />
          </Grid>
          <Grid
            size={{
              xs: 12,
              sm: 4
            }}>
            <Label id="stakeholderId" label="Organization ID" />
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
          <Grid
            size={{
              xs: 12,
              sm: 4
            }}>
            <Label
              id="minCompleteCriticalPercent"
              label="Min % Critical Complete"
            />
            <TextField
              autoComplete="off"
              type="number"
              name="minCompleteCriticalPercent"
              value={criteria.minCompleteCriticalPercent}
              variant="outlined"
              fullWidth
              size="small"
              inputProps={{ min: 0, max: 100 }}
              onChange={setCriterion}
            />
          </Grid>
          <Grid
            size={{
              xs: 12,
              sm: 4
            }}>
            <Label
              id="maxCompleteCriticalPercent"
              label="Max % Critical Complete"
            />
            <TextField
              autoComplete="off"
              type="number"
              name="maxCompleteCriticalPercent"
              value={criteria.maxCompleteCriticalPercent}
              variant="outlined"
              fullWidth
              size="small"
              inputProps={{ min: 0, max: 100 }}
              onChange={setCriterion}
            />
          </Grid>
          <Grid
            size={{
              xs: 12,
              sm: 6
            }}>
            <Label id="neighborhood-id-label" label="Neighborhood" />
            <Select
              labelId="neighborhood-id-label"
              name="neighborhoodId"
              value={criteria.neighborhoodId}
              onChange={setCriterion}
              variant="outlined"
              size="small"
              fullWidth
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
          </Grid>
          <Grid
            size={{
              xs: 12,
              sm: 6
            }}>
            <Label id="tag-label" label="Tag" />
            <Select
              labelId="tag-label"
              name="tag"
              value={criteria.tag}
              onChange={setCriterion}
              variant="outlined"
              size="small"
              fullWidth
              displayEmpty
            >
              <MenuItem key="1" value="">
                (Any)
              </MenuItem>
              {tags
                ? tags.map((n) => {
                    return (
                      <MenuItem key={n.name} value={n.name}>
                        {n.name}
                      </MenuItem>
                    );
                  })
                : null}
            </Select>
          </Grid>
          <Grid
            size={{
              xs: 12,
              sm: 6
            }}>
            <Grid container>
              <Label id="radius" label="Location" />
              <Grid container alignItems="center">
                <Typography sx={{ marginRight: "0.5rem" }}>
                  {"Within "}
                </Typography>
                <Select
                  name="radius"
                  variant="outlined"
                  value={criteria.radius}
                  size="small"
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
                <Typography sx={{ margin: "0 1rem 0 .5rem" }}>
                  {"miles of"}
                </Typography>
              </Grid>
              <Grid size={12}>
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
                        <Box>
                          <Typography>My Location: </Typography>
                          <Typography>{`(${userLatitude.toFixed(
                            6
                          )}, ${userLongitude.toFixed(6)})`}</Typography>
                        </Box>
                      }
                    />
                    <FormControlLabel
                      value="custom"
                      control={<Radio color="primary" />}
                      style={{ alignItems: "flex-start" }}
                      label={
                        <Box>
                          <Divider />
                          <Typography>{`Custom Location:`} </Typography>
                          {customPlaceName ? (
                            <Typography>{customPlaceName}</Typography>
                          ) : null}
                          {customLatitude ? (
                            <Typography>{`(${customLatitude.toFixed(
                              6
                            )}, ${customLongitude.toFixed(6)})`}</Typography>
                          ) : null}

                          <LocationAutocomplete setLocation={setLocation} />
                        </Box>
                      }
                    />
                  </RadioGroup>
                ) : (
                  <Box>
                    {customPlaceName ? (
                      <Typography>{customPlaceName}</Typography>
                    ) : null}
                    {customLatitude ? (
                      <Typography>{`(${customLatitude.toFixed(
                        6
                      )}, ${customLongitude.toFixed(6)})`}</Typography>
                    ) : null}

                    <LocationAutocomplete setLocation={setLocation} />
                  </Box>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default SearchCriteria;
