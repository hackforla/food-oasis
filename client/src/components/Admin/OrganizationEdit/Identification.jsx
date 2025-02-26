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
import { TabPanel } from "components/Admin/ui/TabPanel";
import { useToasterContext } from "contexts/toasterContext";
import { useCategories } from "hooks/useCategories";
import { useTags } from "hooks/useTags";
import { useState } from "react";
import * as awsService from "services/aws-service";
import { disabledText, error as errorColor } from "theme/palette";
import Label from "../ui/Label";
import Textarea from "../ui/Textarea";
import { PatternFormat } from "react-number-format";

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
export default function Identification({
  tabPage,
  values,
  touched,
  errors,
  handleChange,
  handleBlur,
  setFieldValue,
}) {
  const { setToast } = useToasterContext();
  const { data: categories } = useCategories();
  const { data: allTags } = useTags();
  const [geocodeResults, setGeocodeResults] = useState([]);

  const geocode = async (formData) => {
    const address = `${formData.address1} ${formData.city} ${formData.state} ${formData.zip}`;
    try {
      const result = await awsService.getCoords(address);
      if (result.Results) {
        setGeocodeResults(result.Results);
      } else {
        setToast({
          message:
            `Geocoder request failed: ` +
            `Please try again and/or contact support.`,
        });
      }
    } catch (err) {
      console.error(err);
      setToast({
        message:
          `Geocoder request failed: ${err} ` +
          `Please try again and/or contact support.`,
      });
    }
  };

  return (
    <TabPanel value={tabPage} index={0}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box sx={{ display: "flex", alignItems: "flex-start" }}>
            <Stack direction="column" sx={{ width: "100%", marginRight: 1 }}>
              <Label id="name" label="Name *" />
              <TextField
                id="name"
                name="name"
                placeholder="Name *"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={touched.name ? errors.name : ""}
                error={touched.name && Boolean(errors.name)}
              />
            </Stack>

            <FormControlLabel
              sx={{ mt: 5, ml: 0 }}
              control={
                <Checkbox
                  margin="normal"
                  name="confirmedName"
                  value={values.confirmedName}
                  checked={values.confirmedName}
                  onChange={(e) =>
                    setFieldValue("confirmedName", e.target.checked)
                  }
                  onBlur={handleBlur}
                />
              }
              label="Confirm"
            />
          </Box>
        </Grid>

        <Grid item sm={6} xs={12}>
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

                <FormControlLabel
                  control={
                    <Checkbox
                      margin="normal"
                      name="confirmedPhone"
                      value={values.confirmedPhone}
                      checked={values.confirmedPhone}
                      onChange={() =>
                        setFieldValue("confirmedPhone", !values.confirmedPhone)
                      }
                      onBlur={handleBlur}
                    />
                  }
                  label="Confirm"
                />
              </Stack>
            </Stack>
          </Box>
        </Grid>

        <Grid item sm={6} xs={12}>
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
                error={touched.email && Boolean(errors.email)}
              />
            </Stack>
            <FormControlLabel
              sx={{ mt: 5, ml: 0 }}
              control={
                <Checkbox
                  margin="normal"
                  name="confirmedEmail"
                  value={values.confirmedEmail}
                  checked={values.confirmedEmail}
                  onChange={() =>
                    setFieldValue("confirmedEmail", !values.confirmedEmail)
                  }
                  onBlur={handleBlur}
                />
              }
              label="Confirm"
            />
          </Box>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Box sx={{ display: "flex", alignItems: "flex-start" }}>
            <Stack direction="column" sx={{ width: "100%" }}>
              <Label id="selectedCategoryIds" label="Categories *" />
              <Select
                id="selectedCategoryIds"
                name="selectedCategoryIds"
                multiple
                fullWidth
                value={values.selectedCategoryIds}
                onChange={handleChange}
                input={<OutlinedInput />}
                displayEmpty
                renderValue={(selectedCategoryIds) => {
                  if (!categories) {
                    return "Loading categories...";
                  }
                  if (selectedCategoryIds.length === 0) {
                    return (
                      <Typography
                        variant="body1"
                        sx={{
                          fontStyle: "italic",
                          color: `${
                            touched.selectedCategoryIds &&
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
                        categories.filter(
                          (category) => category.id === categoryId
                        )[0].name
                    )
                    .join(", ");
                }}
                MenuProps={MenuProps}
                error={
                  touched.selectedCategoryIds &&
                  Boolean(errors.selectedCategoryIds)
                }
              >
                {!categories || categories.length === 0
                  ? null
                  : categories.map((category) => (
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
                  touched.selectedCategoryIds &&
                  Boolean(errors.selectedCategoryIds)
                }
              >
                {touched.selectedCategoryIds ? errors.selectedCategoryIds : ""}
              </FormHelperText>
            </Stack>

            <FormControlLabel
              sx={{ mt: 5, ml: 0 }}
              control={
                <Checkbox
                  margin="normal"
                  name="confirmedCategories"
                  value={values.confirmedCategories}
                  checked={values.confirmedCategories}
                  onChange={() =>
                    setFieldValue(
                      "confirmedCategories",
                      !values.confirmedCategories
                    )
                  }
                  onBlur={handleBlur}
                />
              }
              label="Confirm"
            />
          </Box>
        </Grid>

        <Grid item xs={12} sm={6}>
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
        <Grid item xs={6} sm={3}>
          <Tooltip title="Check if they are permanently closed.">
            <FormControlLabel
              control={
                <Checkbox
                  margin="normal"
                  name="inactive"
                  label="Inactive"
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
        <Grid item xs={6} sm={3}>
          <Tooltip title="Check if they are temporarily closed.">
            <FormControlLabel
              control={
                <Checkbox
                  margin="normal"
                  name="inactiveTemporary"
                  label="Inactive"
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
              label="Temporarily Closed (COVID)"
            />
          </Tooltip>
        </Grid>
        <Grid item xs={12} sm={6}>
          <div>
            <Label
              id="covidNotes"
              label="COVID Notes"
              tooltipTitle="COVID-related conditions"
            />
            <Textarea
              id="covidNotes"
              name="covidNotes"
              placeholder="COVID Notes"
              value={values.covidNotes}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.covidNotes ? errors.covidNotes : ""}
              error={touched.covidNotes && Boolean(errors.covidNotes)}
            />
          </div>
        </Grid>

        <Grid item xs={12}>
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

        <Grid item xs={12}>
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

        <Grid item xs={12}>
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
        <Grid item xs={12}>
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
        <Grid item xs={12} sm={6}>
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
        <Grid item xs={12} sm={3}>
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
        <Grid item xs={12} sm={3}>
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

        <Grid item xs={6} md={3}>
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
        <Grid item xs={6} md={3}>
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
        <Grid item xs={12} md={6} sx={{ display: "flex" }}>
          <Grid container sx={{ display: "flex", alignItems: "flex-end" }}>
            <Grid
              xs={12}
              item
              sx={{
                display: "flex",
                columnGap: "1rem",
                alignItems: "center",
              }}
            >
              <Tooltip title="Click to get latitude / longitude for address">
                <Grid item>
                  <Button
                    variant="outlined"
                    icon="search"
                    size="large"
                    onClick={() => {
                      (geocodeResults && geocodeResults.length) < 1
                        ? geocode(values)
                        : setGeocodeResults([]);
                    }}
                  >
                    {(geocodeResults && geocodeResults.length) < 1
                      ? "Get Coordinates"
                      : "Close"}
                  </Button>
                </Grid>
              </Tooltip>
              <div>
                <FormControlLabel
                  control={
                    <Checkbox
                      margin="normal"
                      name="confirmedAddress"
                      value={values.confirmedAddress}
                      checked={values.confirmedAddress}
                      onChange={() =>
                        setFieldValue(
                          "confirmedAddress",
                          !values.confirmedAddress
                        )
                      }
                      onBlur={handleBlur}
                    />
                  }
                  label="Confirm Address"
                />
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
                  <Grid container>
                    <Grid item xs={10}>
                      <Typography>{`(${result.Place.Geometry.Point[0]}, ${result.Place.Geometry.Point[1]})`}</Typography>
                      <Typography>{`Match Score: ${result.Relevance}`}</Typography>
                      {/* <Typography>{`${result.attributes.Addr_type}`}</Typography> */}
                    </Grid>
                    <Grid item xs={2}>
                      <Button
                        variant="outlined"
                        type="button"
                        icon="check"
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

        <Grid item xs={12} sm={6}>
          <Stack direction="column" sx={{ width: "100%" }}>
            <Label id="selectedTags-label" label="Tags" />
            <Select
              id="selectedTags-label"
              name="tags"
              multiple
              fullWidth
              value={values.tags || []}
              onChange={handleChange}
              input={<OutlinedInput />}
              displayEmpty
              renderValue={(tags) => {
                if (!allTags) {
                  return "Loading tags...";
                }
                if (tags.length === 0) {
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
                return tags.join(", ");
              }}
              MenuProps={MenuProps}
            >
              {!allTags || allTags.length === 0
                ? null
                : allTags.map((t) => (
                    <MenuItem key={t.name} value={t.name}>
                      <Checkbox
                        checked={
                          values.tags && values.tags.find((tt) => tt === t.name)
                        }
                      />
                      <ListItemText primary={t.name} />
                    </MenuItem>
                  ))}
            </Select>
            <FormHelperText>{touched.tags ? errors.tags : ""}</FormHelperText>
          </Stack>
        </Grid>
      </Grid>
    </TabPanel>
  );
}
