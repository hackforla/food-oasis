import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  Grid,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import { TabPanel } from "components/Admin/ui/TabPanel";
import { useToasterContext } from "contexts/toasterContext";
import { useCategories } from "hooks/useCategories";
import { useTags } from "hooks/useTags";
import { useState } from "react";
import { PatternFormat } from "react-number-format";
import * as awsService from "services/aws-service";
import { OrganizationSectionWithSetFieldValueProps } from "types/Organization";
import { disabledText, error as errorColor } from "theme/palette";
import Label from "../ui/Label";
import Textarea from "../ui/Textarea";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface Category {
  id: number;
  name: string;
}

interface Tag {
  name: string;
}

interface GeocodeResult {
  Relevance: number;
  Place: {
    Geometry: {
      Point: [number, number];
    };
  };
}

interface IdentificationProps
  extends OrganizationSectionWithSetFieldValueProps {
  setFieldTouched: (
    field: string,
    isTouched?: boolean,
    shouldValidate?: boolean
  ) => void;
  submitCount: number;
  confirmationErrors?: Record<string, string>;
}

export default function Identification({
  tabPage,
  values,
  touched,
  errors,
  handleChange,
  handleBlur,
  setFieldValue,
  setFieldTouched,
  submitCount,
  confirmationErrors = {},
}: IdentificationProps) {
  const { setToast } = useToasterContext();
  const { data: categories } = useCategories();
  const { data: allTags } = useTags();
  const [geocodeResults, setGeocodeResults] = useState<GeocodeResult[]>([]);

  const categoryList = (categories || []) as Category[];
  const tagList = (allTags || []) as Tag[];

  const geocode = async () => {
    const address = `${values.address1} ${values.city} ${values.state} ${values.zip}`;
    try {
      const result = await awsService.getCoords(address);
      if (result.Results) {
        setGeocodeResults(result.Results as GeocodeResult[]);
      } else {
        setToast({
          message:
            "Geocoder request failed: Please try again and/or contact support.",
        });
      }
    } catch (err) {
      console.error(err);
      setToast({
        message: `Geocoder request failed: ${err} Please try again and/or contact support.`,
      });
    }
  };

  const errorBorderSx = (fieldName: string) => ({
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor:
        Boolean(errors[fieldName]) && (touched[fieldName] || submitCount > 0)
          ? "red"
          : "rgba(0,0,0,0.23)",
    },
  });

  const confirmationErrorSx = (fieldName: string) =>
    confirmationErrors[fieldName]
      ? {
          color: "error.main",
        }
      : {};

  const handleCategorySelectChange = (event: SelectChangeEvent<number[]>) => {
    const { value } = event.target;
    const selectedCategoryIds = Array.isArray(value)
      ? value.map((item) => Number(item))
      : String(value)
          .split(",")
          .map((item) => Number(item.trim()))
          .filter((item) => !Number.isNaN(item));

    setFieldValue("selectedCategoryIds", selectedCategoryIds);
  };

  return (
    <TabPanel value={tabPage} index={0}>
      <Grid container spacing={2}>
        <Grid size={12}>
          <Box sx={{ display: "flex", alignItems: "flex-start" }}>
            <Stack direction="column" sx={{ width: "100%", marginRight: 1 }}>
              <Label id="name" label="Name *" />
              <TextField
                id="name"
                name="name"
                placeholder="Organization Name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={touched.name ? errors.name : ""}
                error={touched.name && Boolean(errors.name)}
              />
            </Stack>

            <FormControlLabel
              sx={{ mt: 5, ml: 0 }}
              slotProps={{
                typography: {
                  sx: {
                    color: confirmationErrors["confirmedName"]
                      ? "error.main"
                      : "inherit",
                  },
                },
              }}
              control={
                <Checkbox
                  name="confirmedName"
                  value={values.confirmedName}
                  checked={values.confirmedName}
                  sx={confirmationErrorSx("confirmedName")}
                  onChange={(e) =>
                    setFieldValue("confirmedName", e.target.checked)
                  }
                  onBlur={handleBlur}
                />
              }
              label={"Confirm"}
            />
          </Box>
        </Grid>

        <Grid
          size={{
            sm: 6,
            xs: 12,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
            }}
          >
            <Stack
              sx={{
                width: "100%",
              }}
            >
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 1, sm: 2, md: 4 }}
                alignItems="flex-end"
              >
                <Box sx={{ width: { xs: "100%", sm: "auto" } }}>
                  <Label
                    id="phone"
                    label="Phone"
                    tooltipTitle="Phone number for clients to use"
                  />
                  <PatternFormat
                    format="(###) ###-####"
                    customInput={TextField}
                    mask="_"
                    id="phone"
                    name="phone"
                    placeholder="Phone"
                    value={values.phone}
                    onValueChange={(formattedValues) => {
                      setFieldValue("phone", formattedValues.formattedValue);
                    }}
                    onBlur={handleBlur}
                    helperText={touched.phone ? errors.phone : ""}
                    error={touched.phone && Boolean(errors.phone)}
                  />
                </Box>
                <Box sx={{ width: { xs: "100%", sm: "auto" } }}>
                  <Label id="phone_ext" label="Ext" />
                  <TextField
                    id="phoneExt"
                    name="phoneExt"
                    placeholder="Ext or name"
                    value={values.phoneExt}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Box>

                <Box sx={confirmationErrorSx("confirmedPhone")}>
                  <FormControlLabel
                    slotProps={{
                      typography: {
                        sx: {
                          color: confirmationErrors["confirmedPhone"]
                            ? "error.main"
                            : "inherit",
                        },
                      },
                    }}
                    control={
                      <Checkbox
                        name="confirmedPhone"
                        value={values.confirmedPhone}
                        checked={values.confirmedPhone}
                        sx={confirmationErrorSx("confirmedPhone")}
                        onChange={() =>
                          setFieldValue(
                            "confirmedPhone",
                            !values.confirmedPhone
                          )
                        }
                        onBlur={handleBlur}
                      />
                    }
                    label={"Confirm"}
                  />
                </Box>
              </Stack>
            </Stack>
          </Box>
        </Grid>

        <Grid
          size={{
            sm: 6,
            xs: 12,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "flex-start" }}>
            <Stack direction="column" sx={{ width: "100%" }}>
              <Label
                id="email"
                label="Email"
                tooltipTitle="Email for clients to use"
              />
              <TextField
                id="email"
                name="email"
                placeholder="Email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={touched.email ? errors.email : ""}
                error={false}
                InputProps={{ sx: errorBorderSx("email") }}
              />
            </Stack>
            <Box sx={{ mt: 5, ...confirmationErrorSx("confirmedEmail") }}>
              <FormControlLabel
                sx={{ ml: 0 }}
                slotProps={{
                  typography: {
                    sx: {
                      color: confirmationErrors["confirmedEmail"]
                        ? "error.main"
                        : "inherit",
                    },
                  },
                }}
                control={
                  <Checkbox
                    name="confirmedEmail"
                    value={values.confirmedEmail}
                    checked={values.confirmedEmail}
                    sx={confirmationErrorSx("confirmedEmail")}
                    onChange={() =>
                      setFieldValue("confirmedEmail", !values.confirmedEmail)
                    }
                    onBlur={handleBlur}
                  />
                }
                label={"Confirm"}
              />
            </Box>
          </Box>
        </Grid>

        <Grid
          size={{
            xs: 12,
            sm: 6,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "flex-start" }}>
            <Stack direction="column" sx={{ width: "100%" }}>
              <Label id="selectedCategoryIds" label="Categories *" />
              <Select
                id="selectedCategoryIds"
                name="selectedCategoryIds"
                multiple
                fullWidth
                value={values.selectedCategoryIds}
                onChange={handleCategorySelectChange}
                onClose={() => setFieldTouched("selectedCategoryIds", true)}
                input={<OutlinedInput />}
                displayEmpty
                renderValue={(selected) => {
                  const selectedCategoryIds = selected as number[];
                  if (!categoryList.length) {
                    return "Loading categories...";
                  }
                  if (selectedCategoryIds.length === 0) {
                    return (
                      <Typography
                        variant="body1"
                        sx={{
                          fontStyle: "italic",
                          color: `${
                            (touched.selectedCategoryIds || submitCount > 0) &&
                            Boolean(errors.selectedCategoryIds)
                              ? errorColor
                              : disabledText
                          }`,
                        }}
                      >
                        Select Categories
                      </Typography>
                    );
                  }
                  return selectedCategoryIds
                    .map(
                      (categoryId) =>
                        categoryList.find(
                          (category) => category.id === categoryId
                        )?.name
                    )
                    .filter(Boolean)
                    .join(", ");
                }}
                MenuProps={MenuProps}
                error={
                  (touched.selectedCategoryIds || submitCount > 0) &&
                  Boolean(errors.selectedCategoryIds)
                }
              >
                {!categoryList.length
                  ? null
                  : categoryList.map((category) => (
                      <MenuItem key={category.id} value={category.id}>
                        <Checkbox
                          checked={
                            values.selectedCategoryIds.indexOf(category.id) > -1
                          }
                        />
                        <ListItemText primary={category.name} />
                      </MenuItem>
                    ))}
              </Select>

              <FormHelperText
                sx={{ marginLeft: "14px" }}
                error={
                  (touched.selectedCategoryIds || submitCount > 0) &&
                  Boolean(errors.selectedCategoryIds)
                }
              >
                {touched.selectedCategoryIds || submitCount > 0
                  ? errors.selectedCategoryIds
                  : ""}
              </FormHelperText>
            </Stack>

            <Box sx={{ mt: 5, ...confirmationErrorSx("confirmedCategories") }}>
              <FormControlLabel
                sx={{ ml: 0 }}
                slotProps={{
                  typography: {
                    sx: {
                      color: confirmationErrors["confirmedCategories"]
                        ? "error.main"
                        : "inherit",
                    },
                  },
                }}
                control={
                  <Checkbox
                    name="confirmedCategories"
                    value={values.confirmedCategories}
                    checked={values.confirmedCategories}
                    sx={confirmationErrorSx("confirmedCategories")}
                    onChange={() =>
                      setFieldValue(
                        "confirmedCategories",
                        !values.confirmedCategories
                      )
                    }
                    onBlur={handleBlur}
                  />
                }
                label={"Confirm"}
              />
            </Box>
          </Box>
        </Grid>

        <Grid
          size={{
            xs: 12,
            sm: 6,
          }}
        >
          <div>
            <Label
              id="categoryNotes"
              label="Category Notes"
              tooltipTitle="Notes about identifying organization category"
            />
            <Textarea
              id="categoryNotes"
              name="categoryNotes"
              placeholder="Category Notes"
              value={values.categoryNotes}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.categoryNotes ? errors.categoryNotes : ""}
              error={touched.categoryNotes && Boolean(errors.categoryNotes)}
            />
          </div>
        </Grid>
        <Grid
          size={{
            xs: 6,
            sm: 3,
          }}
        >
          <Tooltip title="Check if they are permanently closed.">
            <FormControlLabel
              control={
                <Checkbox
                  name="inactive"
                  value={values.inactive}
                  checked={values.inactive}
                  onChange={() => setFieldValue("inactive", !values.inactive)}
                  onBlur={handleBlur}
                />
              }
              label="Permanently Closed"
            />
          </Tooltip>
        </Grid>
        <Grid
          size={{
            xs: 6,
            sm: 3,
          }}
        >
          <Tooltip title="Check if they are temporarily closed.">
            <FormControlLabel
              control={
                <Checkbox
                  name="inactiveTemporary"
                  value={values.inactiveTemporary}
                  checked={values.inactiveTemporary}
                  onChange={() =>
                    setFieldValue(
                      "inactiveTemporary",
                      !values.inactiveTemporary
                    )
                  }
                  onBlur={handleBlur}
                />
              }
              label="Temporarily Closed"
            />
          </Tooltip>
        </Grid>
        <Grid
          size={{
            xs: 12,
            sm: 6,
          }}
        >
          <div>
            <Label
              id="covidNotes"
              label="Closure Notes"
              tooltipTitle="Add details about closures or service changes"
            />
            <Textarea
              id="covidNotes"
              name="covidNotes"
              placeholder="Closure Notes"
              value={values.covidNotes}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.covidNotes ? errors.covidNotes : ""}
              error={touched.covidNotes && Boolean(errors.covidNotes)}
            />
          </div>
        </Grid>

        <Grid size={12}>
          <div>
            <Label
              id="description"
              label="Description"
              tooltipTitle="The mission statement or other description."
            />
            <Textarea
              id="description"
              name="description"
              placeholder="Description"
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.description ? errors.description : ""}
              error={touched.description && Boolean(errors.description)}
            />
          </div>
        </Grid>

        <Grid size={12}>
          <div>
            <Label
              id="parentOrganization"
              label="Parent Organization"
              tooltipTitle="If part of a larger organization, the parent name"
            />
            <TextField
              id="parentOrganization"
              name="parentOrganization"
              placeholder="Parent Organization"
              value={values.parentOrganization}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={
                touched.parentOrganization ? errors.parentOrganization : ""
              }
              error={
                touched.parentOrganization && Boolean(errors.parentOrganization)
              }
            />
          </div>
        </Grid>

        <Grid size={12}>
          <div>
            <Label id="address1" label="Address Line 1 *" />
            <TextField
              id="address1"
              name="address1"
              placeholder="Address Line 1 *"
              value={values.address1}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.address1 ? errors.address1 : ""}
              error={touched.address1 && Boolean(errors.address1)}
            />
          </div>
        </Grid>
        <Grid size={12}>
          <div>
            <Label id="address2" label="Address Line 2" />
          </div>
          <TextField
            id="address2"
            name="address2"
            placeholder="Address Line 2"
            value={values.address2}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={touched.address2 ? errors.address2 : ""}
            error={touched.address2 && Boolean(errors.address2)}
          />
        </Grid>
        <Grid
          size={{
            xs: 12,
            sm: 6,
          }}
        >
          <div>
            <Label id="city" label="City *" />
            <TextField
              id="city"
              name="city"
              placeholder="City *"
              value={values.city}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.city ? errors.city : ""}
              error={touched.city && Boolean(errors.city)}
            />
          </div>
        </Grid>
        <Grid
          size={{
            xs: 12,
            sm: 3,
          }}
        >
          <div>
            <Label id="state" label="State *" />
            <TextField
              id="state"
              name="state"
              placeholder="State *"
              value={values.state}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.state ? errors.state : ""}
              error={touched.state && Boolean(errors.state)}
            />
          </div>
        </Grid>
        <Grid
          size={{
            xs: 12,
            sm: 3,
          }}
        >
          <div>
            <Label id="zip" label="Zip Code *" />
            <TextField
              id="zip"
              name="zip"
              placeholder="Zip Code *"
              value={values.zip}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.zip ? errors.zip : ""}
              error={touched.zip && Boolean(errors.zip)}
            />
          </div>
        </Grid>

        <Grid
          size={{
            xs: 6,
            md: 3,
          }}
        >
          <div>
            <Label id="latitude" label="Latitude *" />
          </div>
          <TextField
            id="latitude"
            name="latitude"
            placeholder="Latitude *"
            value={values.latitude}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={touched.latitude ? errors.latitude : ""}
            error={touched.latitude && Boolean(errors.latitude)}
          />
        </Grid>
        <Grid
          size={{
            xs: 6,
            md: 3,
          }}
        >
          <div>
            <Label id="longitude" label="Longitude *" />
          </div>
          <TextField
            id="longitude"
            name="longitude"
            placeholder="Longitude *"
            value={values.longitude}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={touched.longitude ? errors.longitude : ""}
            error={touched.longitude && Boolean(errors.longitude)}
          />
        </Grid>
        <Grid
          sx={{ display: "flex" }}
          size={{
            xs: 12,
            md: 6,
          }}
        >
          <Grid
            container
            sx={{ display: "flex", alignItems: "flex-end", width: "100%" }}
          >
            <Grid
              sx={{
                display: "flex",
                columnGap: "1rem",
                alignItems: "center",
              }}
              size={12}
            >
              <Tooltip title="Click to get latitude / longitude for address">
                <Grid>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={() => {
                      geocodeResults.length < 1
                        ? geocode()
                        : setGeocodeResults([]);
                    }}
                  >
                    {geocodeResults.length < 1 ? "Get Coordinates" : "Close"}
                  </Button>
                </Grid>
              </Tooltip>
              <div>
                <Box sx={confirmationErrorSx("confirmedAddress")}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="confirmedAddress"
                        value={values.confirmedAddress}
                        checked={values.confirmedAddress}
                        sx={confirmationErrorSx("confirmedAddress")}
                        onChange={() =>
                          setFieldValue(
                            "confirmedAddress",
                            !values.confirmedAddress
                          )
                        }
                        onBlur={handleBlur}
                      />
                    }
                    slotProps={{
                      typography: {
                        sx: {
                          color: confirmationErrors["confirmedAddress"]
                            ? "error.main"
                            : "inherit",
                        },
                      },
                    }}
                    label={"Confirm"}
                  />
                </Box>
              </div>
            </Grid>
          </Grid>
          <div style={{ padding: "0.5em 0" }}>
            {geocodeResults ? (
              geocodeResults.map((result, index) => (
                <div
                  style={{
                    border: "1px solid black",
                    backgroundColor: "#EEE",
                    margin: "0.1em",
                    padding: "0.5em",
                  }}
                  key={index}
                >
                  <Grid container sx={{ width: "100%" }}>
                    <Grid size={10}>
                      <Typography>{`(${result.Place.Geometry.Point[0]}, ${result.Place.Geometry.Point[1]})`}</Typography>
                      <Typography>{`Match Score: ${result.Relevance}`}</Typography>
                    </Grid>
                    <Grid size={2}>
                      <Button
                        variant="outlined"
                        type="button"
                        style={{ paddingRight: "0" }}
                        onClick={() => {
                          setFieldValue(
                            "latitude",
                            result.Place.Geometry.Point[0]
                          );
                          setFieldValue(
                            "longitude",
                            result.Place.Geometry.Point[1]
                          );
                          setGeocodeResults([]);
                        }}
                      >
                        Set
                      </Button>
                    </Grid>
                  </Grid>
                </div>
              ))
            ) : (
              <div>No Results</div>
            )}
          </div>
        </Grid>

        <Grid
          sx={{
            display: "flex",
            columnGap: "1rem",
            rowGap: "1rem",
            flexDirection: { xs: "column", sm: "row" },
          }}
          size={12}
        >
          <Grid
            size={{
              xs: 12,
              sm: 6,
            }}
          >
            <Box>
              <Label id="neighborhoodCouncil" label="Neighborhood Council" />
              <TextField
                id="neighborhoodCouncil"
                name="neighborhoodName"
                placeholder="Neighborhood Council"
                value={values.neighborhoodName ?? ""}
                disabled
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={
                  touched.neighborhoodName ? errors.neighborhoodName : ""
                }
                error={
                  touched.neighborhoodName && Boolean(errors.neighborhoodName)
                }
              />
            </Box>
          </Grid>

          <Grid
            sx={{ display: "flex", alignItems: "flex-end" }}
            size={{
              xs: 12,
              sm: 6,
            }}
          >
            <Stack direction="column" sx={{ width: "100%" }}>
              <Label id="selectedTags-label" label="Tags" />
              <Select
                id="selectedTags-label"
                name="tags"
                multiple
                fullWidth
                value={values.tags || []}
                onChange={(event) => handleChange(event as any)}
                input={<OutlinedInput />}
                displayEmpty
                renderValue={(selected) => {
                  const selectedTags = selected as string[];
                  if (!tagList.length) {
                    return "Loading tags...";
                  }
                  if (selectedTags.length === 0) {
                    return (
                      <Typography
                        variant="body1"
                        sx={{
                          fontStyle: "italic",
                          color: disabledText,
                        }}
                      >
                        Select Tags
                      </Typography>
                    );
                  }
                  return selectedTags.join(", ");
                }}
                MenuProps={MenuProps}
              >
                {!tagList.length
                  ? null
                  : tagList.map((tag) => (
                      <MenuItem key={tag.name} value={tag.name}>
                        <Checkbox
                          checked={Boolean(
                            values.tags &&
                              values.tags.find((entry) => entry === tag.name)
                          )}
                        />
                        <ListItemText primary={tag.name} />
                      </MenuItem>
                    ))}
              </Select>
              <FormHelperText>{touched.tags ? errors.tags : ""}</FormHelperText>
            </Stack>
          </Grid>
        </Grid>
      </Grid>
    </TabPanel>
  );
}
