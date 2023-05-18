import {
  AppBar,
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  Input,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  Stack,
  Tab,
  Tabs,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import AccountAutocomplete from "components/Admin/AccountAutocomplete";
import AssignDialog from "components/Admin/AssignDialog";
import OpenTimeForm from "components/Admin/OpenTimeForm";
import ConfirmDialog from "components/Admin/ui/ConfirmDialog";
import { TabPanel, a11yProps } from "components/Admin/ui/TabPanel";
import {
  VERIFICATION_STATUS,
  VERIFICATION_STATUS_NAMES,
} from "constants/stakeholder";
import { useToasterContext } from "contexts/toasterContext";
import { useUserContext } from "contexts/userContext";
import { Formik } from "formik";
import { useCategories } from "hooks/useCategories";
import { useTags } from "hooks/useTags";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import * as awsService from "services/aws-service";
import * as stakeholderService from "services/stakeholder-service";
import * as Yup from "yup";
import Label from "./ui/Label";
import Textarea from "./ui/Textarea";

const DATE_FORMAT = "MM/DD/YY h:mm a";
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

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  address1: Yup.string().required("Street address is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  zip: Yup.string().required("Zip code is required"),
  latitude: Yup.number().required("Latitude is required").min(-90).max(90),
  longitude: Yup.number().required("Longitude is required").min(-180).max(180),
  email: Yup.string().email("Invalid email address format"),
  selectedCategoryIds: Yup.array().min(
    1,
    "You must select at least one category"
  ),
});

const emptyOrganization = {
  id: 0,
  name: "",
  description: "",
  parentOrganization: "",
  address1: "",
  address2: "",
  city: "",
  state: "",
  zip: "",
  phone: "",
  email: "",
  latitude: "",
  longitude: "",
  physicalAccess: "",
  items: "",
  services: "",
  facebook: "",
  twitter: "",
  pinterest: "",
  linkedin: "",
  inactive: false,
  website: "",
  notes: "",
  requirements: "",
  adminNotes: "",
  createdDate: "",
  createdUser: "",
  modifiedDate: "",
  modifiedUser: "",
  submittedDate: "",
  submittedUser: "",
  approvedDate: "",
  approvedUser: "",
  selectedCategoryIds: [],
  hours: [],
  instagram: "",
  adminContactName: "",
  adminContactPhone: "",
  adminContactEmail: "",
  donationContactName: "",
  donationContactPhone: "",
  donationContactEmail: "",
  donationPickup: false,
  donationAcceptFrozen: false,
  donationAcceptRefrigerated: false,
  donationAcceptPerishable: false,
  donationSchedule: "",
  donationNotes: "",
  donationDeliveryInstructions: "",
  covidNotes: "",
  categoryNotes: "",
  eligibilityNotes: "",
  foodTypes: "",
  languages: "English",
  confirmedName: false,
  confirmedCategories: false,
  confirmedAddress: false,
  confirmedEmail: false,
  confirmedPhone: false,
  confirmedHours: false,
  confirmedFoodTypes: false,
  verificationStatusId: VERIFICATION_STATUS.NEEDS_VERIFICATION,
  inactiveTemporary: false,
  foodBakery: false,
  foodDryGoods: false,
  foodProduce: false,
  foodDairy: false,
  foodPrepared: false,
  foodMeat: false,
  hoursNotes: "",
  allowWalkins: false,
  tags: [],
};

const FOOD_TYPES = [
  {
    name: "foodBakery",
    label: "Baked Goods",
  },
  {
    name: "foodDryGoods",
    label: "Dry Goods",
  },
  {
    name: "foodProduce",
    label: "Produce",
  },
  {
    name: "foodDairy",
    label: "Dairy",
  },
  {
    name: "foodPrepared",
    label: "Prepared Food",
  },
  {
    name: "foodMeat",
    label: "Meat",
  },
];

const CheckboxWithLabel = ({ name, label, checked, onChange, ...props }) => (
  <Grid item xs={12} sm={4}>
    <FormControlLabel
      control={
        <Checkbox
          name={name}
          checked={checked}
          onChange={onChange}
          {...props}
        />
      }
      label={label}
    />
  </Grid>
);

const OrganizationEdit = (props) => {
  const { match, history } = props;
  const editId = match.params.id;
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [assignDialogCallback, setAssignDialogCallback] = useState({});
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [confirmDialogCallback, setConfirmDialogCallback] = useState({});
  const [tabPage, setTabPage] = useState(0);
  const [geocodeResults, setGeocodeResults] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const [originalData, setOriginalData] = useState(emptyOrganization);
  const { user } = useUserContext();
  const { setToast } = useToasterContext();

  const { data: categories } = useCategories();
  const { data: allTags } = useTags();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (editId) {
          const stakeholder = await stakeholderService.getById(editId);
          // For editing purposes, it is better to convert the
          // stakeholder.categories array of objects to an array of
          // categoryIds as stakeholder.categoryIds
          stakeholder.selectedCategoryIds = stakeholder.categories.map(
            (category) => category.id
          );
          delete stakeholder.categories;

          setOriginalData(stakeholder);
        } else {
          setOriginalData(emptyOrganization);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [editId]);

  const handleAssignDialogOpen = async (callbackObject) => {
    setAssignDialogOpen(true);
    setAssignDialogCallback(callbackObject);
  };

  const handleAssignDialogClose = async (loginId) => {
    setAssignDialogOpen(false);
    // Dialog returns false if cancelled, null if
    // want to unassign, otherwise a loginId > 0
    if (loginId === false) return;
    if (assignDialogCallback && assignDialogCallback.callback) {
      assignDialogCallback.callback(loginId);
    }
  };

  const handleConfirmDialogOpen = async (callbackObject) => {
    setConfirmDialogOpen(true);
    setConfirmDialogCallback(callbackObject);
  };

  const handleConfirmDialogClose = async (result) => {
    setConfirmDialogOpen(false);
    // Dialog returns false if cancelled, true to
    // confirm delete
    if (!result) return;
    if (confirmDialogCallback && confirmDialogCallback.callback) {
      confirmDialogCallback.callback();
    }
  };

  // function formatMapAddress(formData) {
  //   return `${formData.address1 || ""} ${formData.address2 || ""} ${
  //     formData.city || ""
  //   }, ${formData.state || ""} ${formData.zip || ""}`;
  // }

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

  const handleChangeTabPage = (event, newValue) => {
    setTabPage(newValue);
  };

  const criticalFieldsValidate = (values) => {
    if (values.inactive || values.inactiveTemporary) {
      return (
        values.confirmedName &&
        values.confirmedCategories &&
        values.confirmedAddress &&
        values.name &&
        values.address1 &&
        values.city &&
        values.state &&
        values.zip &&
        values.latitude &&
        values.longitude
      );
    }
    return (
      values.confirmedName &&
      values.confirmedCategories &&
      values.confirmedAddress &&
      values.confirmedEmail &&
      values.confirmedPhone &&
      values.confirmedHours &&
      values.confirmedFoodTypes &&
      values.name &&
      values.address1 &&
      values.city &&
      values.state &&
      values.zip &&
      values.latitude &&
      values.longitude
    );
  };

  const isUnchanged = (values) => {
    return JSON.stringify(values) === JSON.stringify(originalData);
  };

  const noteTooltip = (
    <Stack spacing={1}>
      <p>These are notes for clients to see, for example:</p>
      <Stack spacing={2}>
        <p>Holiday hours may differ. Call or text message to confirm.</p>
        <p>
          Call ahead to make appointment or confirm that they are actually open
        </p>
        <p>Food tends to run out early on Saturdays</p>
        <p>This pantry was acquired by Shepherds Pantry</p>
        <p>Enter through double doors on Figueroa St.</p>
      </Stack>
    </Stack>
  );

  const adminNoteTooltip = (
    <Stack sx={{ lineHeight: "27px" }}>
      Notes about verification, for example:
      <Stack
        spacing={2}
        sx={{ marginLeft: "24px", marginBottom: "20px", fontWeight: "normal" }}
      >
        <ul>
          <li>They are most responsive to email (or Facebook or whatever).</li>
          <li>We do not have any good contact information for them.</li>
          <li>
            You might have been able to verify some information, but need to
            follow-up with another phone call, Facebook message, etc.
          </li>
          <li>
            You might have been able to verify some information online, but need
            to make phone contact.
          </li>
          <li>
            You might have sent email or Facebook message, and are waiting for a
            response.
          </li>
        </ul>
      </Stack>
      If you don&apos;t get through to them: (choose one)
      <Stack
        sx={{
          marginLeft: "24px !important",

          fontWeight: "normal",
        }}
      >
        <ul>
          <li>The phone was inactive</li>
          <li>Weren't available but call back</li>
          <li>
            Got partial information from voicemail (also enter this information
            in the appropriate formfields)
          </li>
        </ul>
      </Stack>
    </Stack>
  );

  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <div>
        <AssignDialog
          id="assign-dialog"
          keepMounted
          open={assignDialogOpen}
          onClose={handleAssignDialogClose}
        />
        <ConfirmDialog
          id="confirm-dialog"
          keepMounted
          open={confirmDialogOpen}
          onClose={handleConfirmDialogClose}
          title="Permanently Delete Organization"
          message={`Are you sure you want to delete the organization ${originalData.name}?`}
        />
        <Formik
          // Use deep copy of originalData to initialize form, so
          // we can't accidentally mutate originalData in form.
          // This assures isUnchanged function works properly.
          initialValues={JSON.parse(JSON.stringify(originalData))}
          enableReinitialize
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting, setFieldValue }) => {
            if (values.id) {
              return stakeholderService
                .put({ ...values, loginId: user.id })
                .then(() => {
                  setToast({
                    message: "Update successful.",
                  });
                  setOriginalData(values);
                  if (nextUrl) {
                    history.push(nextUrl);
                  }
                })
                .catch((err) => {
                  setToast({
                    message:
                      "Update failed. Please check for validation warnings on the Identification and Business Hours tabs and try again.",
                  });
                  console.error(err);
                  setSubmitting(false);
                });
            } else {
              return stakeholderService
                .post({ ...values, loginId: user.id })
                .then((response) => {
                  setToast({
                    message: "Insert successful.",
                  });
                  setFieldValue("id", response.id);
                  setOriginalData({ ...values, id: response.id });
                  if (nextUrl) {
                    history.push(nextUrl);
                  }
                })
                .catch((err) => {
                  setToast({
                    message:
                      "Insert failed. Please check for validation warnings on the Identification and Business Hours tabs and try again.",
                  });
                  console.error(err);
                  setSubmitting(false);
                });
            }
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            setFieldValue,
          }) => (
            <form noValidate onSubmit={handleSubmit}>
              <Stack direction="row" justifyContent="space-between">
                <Typography component="h1" variant="h5">
                  {`Organization - ${values.name}`}
                </Typography>
                <Box
                  bgcolor="secondary.main"
                  style={{ padding: "0.2em 0.65em" }}
                >
                  <Typography component="h1" variant="h5">
                    {VERIFICATION_STATUS_NAMES[values.verificationStatusId]}
                  </Typography>
                </Box>
              </Stack>
              <Stack spacing={2}>
                <Box sx={{ border: "1px solid lightgray", borderTop: "none" }}>
                  <AppBar position="static">
                    <Tabs
                      value={tabPage}
                      onChange={handleChangeTabPage}
                      variant="scrollable"
                      scrollButtons="auto"
                      aria-label="stakeholder tabs"
                      indicatorColor="secondary"
                    >
                      <Tab label="Identification" {...a11yProps(0)} />
                      <Tab label="Business Hours" {...a11yProps(1)} />
                      <Tab label="Contact Details" {...a11yProps(2)} />
                      <Tab label="More Details" {...a11yProps(3)} />
                      <Tab label="Donations" {...a11yProps(4)} />
                      <Tab label="Verification" {...a11yProps(5)} />
                    </Tabs>
                  </AppBar>
                  <TabPanel value={tabPage} index={0}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} display="flex">
                        <Stack direction="column" sx={{ width: "100%" }}>
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
                          sx={{ mt: 3, ml: 0 }}
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
                      </Grid>
                      <Grid item sm={6} xs={12} display="flex">
                        <Stack direction="column" sx={{ width: "100%" }}>
                          <Label
                            id="phone"
                            label="Phone *"
                            tooltipTitle="Phone number for clients to use"
                          />
                          <TextField
                            id="phone"
                            name="phone"
                            placeholder="Phone *"
                            value={values.phone}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={touched.phone ? errors.phone : ""}
                            error={touched.phone && Boolean(errors.phone)}
                          />
                        </Stack>

                        <FormControlLabel
                          sx={{ mt: 3, ml: 0 }}
                          control={
                            <Checkbox
                              margin="normal"
                              name="confirmedPhone"
                              value={values.confirmedPhone}
                              checked={values.confirmedPhone}
                              onChange={() =>
                                setFieldValue(
                                  "confirmedPhone",
                                  !values.confirmedPhone
                                )
                              }
                              onBlur={handleBlur}
                            />
                          }
                          label="Confirm"
                        />
                      </Grid>
                      <Grid item sm={6} xs={12} display="flex">
                        <Stack direction="column" sx={{ width: "100%" }}>
                          <Label
                            id="email"
                            label="Email *"
                            tooltipTitle="Email for clients to use"
                          />
                          <TextField
                            id="email"
                            name="email"
                            placeholder="Email *"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={touched.email ? errors.email : ""}
                            error={touched.email && Boolean(errors.email)}
                          />
                        </Stack>

                        <FormControlLabel
                          sx={{ mt: 3, ml: 0 }}
                          control={
                            <Checkbox
                              margin="normal"
                              name="confirmedEmail"
                              value={values.confirmedEmail}
                              checked={values.confirmedEmail}
                              onChange={() =>
                                setFieldValue(
                                  "confirmedEmail",
                                  !values.confirmedEmail
                                )
                              }
                              onBlur={handleBlur}
                            />
                          }
                          label="Confirm"
                        />
                      </Grid>

                      <Grid
                        item
                        xs={12}
                        sm={6}
                        display="flex"
                        alignItems="flex-start"
                      >
                        <FormControl fullWidth>
                          <InputLabel id="selectCategoryIds-label">
                            Categories *
                          </InputLabel>

                          <Select
                            labelId="selectCategoryIds-label"
                            id="selectedCategoryIds"
                            variant="outlined"
                            name="selectedCategoryIds"
                            multiple
                            fullWidth
                            value={values.selectedCategoryIds}
                            onChange={handleChange}
                            input={<Input />}
                            renderValue={(selectedCategoryIds) => {
                              if (!categories) {
                                return "Loading categories...";
                              }
                              if (selectedCategoryIds.length === 0) {
                                return "(Select Categories)";
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
                          >
                            {!categories || categories.length === 0
                              ? null
                              : categories.map((category) => (
                                  <MenuItem
                                    key={category.id}
                                    value={category.id}
                                  >
                                    <Checkbox
                                      checked={
                                        values.selectedCategoryIds.indexOf(
                                          category.id
                                        ) > -1
                                      }
                                    />
                                    <ListItemText primary={category.name} />
                                  </MenuItem>
                                ))}
                          </Select>
                          <FormHelperText>
                            {touched.selectedCategoryIds
                              ? errors.selectedCategoryIds
                              : ""}
                          </FormHelperText>
                        </FormControl>
                        <FormControlLabel
                          sx={{ mt: 1, ml: 0 }}
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
                            helperText={
                              touched.categoryNotes ? errors.categoryNotes : ""
                            }
                            error={
                              touched.categoryNotes &&
                              Boolean(errors.categoryNotes)
                            }
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
                                onChange={() =>
                                  setFieldValue("inactive", !values.inactive)
                                }
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
                            helperText={
                              touched.covidNotes ? errors.covidNotes : ""
                            }
                            error={
                              touched.covidNotes && Boolean(errors.covidNotes)
                            }
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
                            helperText={
                              touched.description ? errors.description : ""
                            }
                            error={
                              touched.description && Boolean(errors.description)
                            }
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
                              touched.parentOrganization
                                ? errors.parentOrganization
                                : ""
                            }
                            error={
                              touched.parentOrganization &&
                              Boolean(errors.parentOrganization)
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
                      <Grid item xs={12} md={6}>
                        <Grid container>
                          <Grid
                            xs={12}
                            item
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <Tooltip title="Click to get latitude / longitude for address">
                              <Grid item>
                                <Button
                                  variant="outlined"
                                  icon="search"
                                  // style={{ marginTop: "1.2em" }}
                                  onClick={() => {
                                    (geocodeResults && geocodeResults.length) <
                                    1
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
                                sx={{ mt: { md: "27px" } }}
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
                                    <Typography>{`(${result.Place.Geometry.Point[1]}, ${result.Place.Geometry.Point[0]})`}</Typography>
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
                                          result.Place.Geometry.Point[1]
                                        );
                                        setFieldValue(
                                          "longitude",
                                          result.Place.Geometry.Point[0]
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
                        <div>
                          <FormControl fullWidth>
                            <InputLabel id="selectedTags-label">
                              Tags
                            </InputLabel>

                            <Select
                              labelId="selectedTags-label"
                              id="tags"
                              variant="outlined"
                              name="tags"
                              multiple
                              fullWidth
                              value={values.tags || []}
                              onChange={handleChange}
                              input={<Input />}
                              renderValue={(tags) => {
                                if (!allTags) {
                                  return "Loading tags...";
                                }
                                if (tags.length === 0) {
                                  return "(Select Tags)";
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
                                          values.tags &&
                                          values.tags.find(
                                            (tt) => tt === t.name
                                          )
                                        }
                                      />
                                      <ListItemText primary={t.name} />
                                    </MenuItem>
                                  ))}
                            </Select>
                            <FormHelperText>
                              {touched.tags ? errors.tags : ""}
                            </FormHelperText>
                          </FormControl>
                        </div>
                      </Grid>
                    </Grid>
                  </TabPanel>
                  <TabPanel value={tabPage} index={1}>
                    <Grid container spacing={1}>
                      <Grid item xs={12}>
                        <Typography>Business hours for Food Seekers</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "flex-end",
                          }}
                        >
                          <FormControlLabel
                            control={
                              <Checkbox
                                margin="normal"
                                name="confirmedHours"
                                value={values.confirmedHours}
                                checked={values.confirmedHours}
                                onChange={() =>
                                  setFieldValue(
                                    "confirmedHours",
                                    !values.confirmedHours
                                  )
                                }
                                onBlur={handleBlur}
                              />
                            }
                            label="Confirm Hours"
                          />
                        </div>
                        <OpenTimeForm
                          name="hours"
                          onChange={(e) =>
                            setFieldValue("hours", e.target.value)
                          }
                          value={values.hours}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              margin="normal"
                              name="allowWalkins"
                              value={values.allowWalkins}
                              checked={values.allowWalkins}
                              onChange={() =>
                                setFieldValue(
                                  "allowWalkins",
                                  !values.allowWalkins
                                )
                              }
                              onBlur={handleBlur}
                            />
                          }
                          label="Allow Walk-Ins"
                        />
                        <div>
                          <Label
                            id="hoursNotes"
                            label="Notes about hours"
                            tooltipTitle="Notes and caveats about hours"
                          />
                          <Textarea
                            id="hoursNotes"
                            variant="outlined"
                            name="hoursNotes"
                            placeholder="Notes about hours"
                            value={values.hoursNotes}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={
                              touched.hoursNotes ? errors.hoursNotes : ""
                            }
                            error={
                              touched.hoursNotes && Boolean(errors.hoursNotes)
                            }
                          />
                        </div>
                      </Grid>
                    </Grid>
                  </TabPanel>
                  <TabPanel value={tabPage} index={2}>
                    <Grid container spacing={1}>
                      <Grid item xs={12}>
                        <div>
                          <Label
                            id="website"
                            label="Web Site"
                            tooltipTitle="The organization's web address"
                          />
                          <TextField
                            id="website"
                            name="website"
                            placeholder="Web Site"
                            value={values.website}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={touched.website ? errors.website : ""}
                            error={touched.website && Boolean(errors.website)}
                          />
                        </div>
                      </Grid>
                      <Grid item sm={6} xs={12}>
                        <div>
                          <Label id="instagram" label="Instagram" />
                          <TextField
                            id="instagram"
                            name="instagram"
                            placeholder="Instagram"
                            value={values.instagram}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={
                              touched.instagram ? errors.instagram : ""
                            }
                            error={
                              touched.instagram && Boolean(errors.instagram)
                            }
                          />
                        </div>
                      </Grid>
                      <Grid item sm={6} xs={12}>
                        <div>
                          <Label id="facebook" label="Facebook" />
                          <TextField
                            id="facebook"
                            name="facebook"
                            placeholder="Facebook"
                            value={values.facebook}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={touched.facebook ? errors.facebook : ""}
                            error={touched.facebook && Boolean(errors.facebook)}
                          />
                        </div>
                      </Grid>
                      <Grid item sm={6} xs={12}>
                        <div>
                          <Label id="twitter" label="Twitter" />
                          <TextField
                            id="twitter"
                            name="twitter"
                            placeholder="Twitter"
                            value={values.twitter}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={touched.twitter ? errors.twitter : ""}
                            error={touched.twitter && Boolean(errors.twitter)}
                          />
                        </div>
                      </Grid>
                      <Grid item sm={6} xs={12}>
                        <div>
                          <Label id="pinterest" label="Pinterest" />
                          <TextField
                            id="pinterest"
                            name="pinterest"
                            placeholder="Pinterest"
                            value={values.pinterest}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={
                              touched.pinterest ? errors.pinterest : ""
                            }
                            error={
                              touched.pinterest && Boolean(errors.pinterest)
                            }
                          />
                        </div>
                      </Grid>
                      <Grid item sm={6} xs={12}>
                        <div>
                          <Label id="linkedin" label="LinkedIn" />
                          <TextField
                            id="linkedin"
                            name="linkedin"
                            placeholder="LinkedIn"
                            value={values.linkedin}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={touched.linkedin ? errors.linkedin : ""}
                            error={touched.linkedin && Boolean(errors.linkedin)}
                          />
                        </div>
                      </Grid>
                    </Grid>
                  </TabPanel>
                  <TabPanel value={tabPage} index={3}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Typography>Details for Food Seekers to See</Typography>
                      </Grid>
                      <Grid
                        item
                        container
                        justifyContent="space-between"
                        xs={12}
                        alignItems="center"
                      >
                        <Grid item xs={6}>
                          <Typography>Food Types</Typography>
                        </Grid>
                        <Grid
                          item
                          container
                          justifyContent="flex-end"
                          xs={6}
                          spacing={2}
                        >
                          <FormControlLabel
                            sx={{ mt: 2 }}
                            control={
                              <Checkbox
                                margin="normal"
                                name="confirmedFoodTypes"
                                value={values.confirmedFoodTypes}
                                checked={values.confirmedFoodTypes}
                                onChange={(e) =>
                                  setFieldValue(
                                    "confirmedFoodTypes",
                                    e.target.checked
                                  )
                                }
                                onBlur={handleBlur}
                              />
                            }
                            label="Confirm"
                          />
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        alignItems="center"
                        sx={{ pl: 1.5, maxWidth: "600px" }}
                      >
                        {FOOD_TYPES.map(({ name, label }) => {
                          const checked = values[name];
                          return (
                            <CheckboxWithLabel
                              key={name}
                              name={name}
                              label={label}
                              checked={checked}
                              onChange={() => setFieldValue(name, !checked)}
                              onBlur={handleBlur}
                            />
                          );
                        })}
                      </Grid>

                      <Grid item xs={12}>
                        <div>
                          <Label id="foodTypes" label="Other Food Types" />
                          <Textarea
                            id="foodTypes"
                            name="foodTypes"
                            placeholder="Other Food Types"
                            value={values.foodTypes}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={
                              touched.foodTypes ? errors.foodTypes : ""
                            }
                            error={
                              touched.foodTypes && Boolean(errors.foodTypes)
                            }
                          />
                        </div>
                      </Grid>
                      <Grid item xs={12}>
                        <div>
                          <Label
                            id="items"
                            label="Non-Food Items"
                            tooltipTitle="(Items besides food, i.e. dog food, cat food, hygiene products, diapers, female hygiene products)"
                          />
                          <TextField
                            id="items"
                            name="items"
                            placeholder="Non-Food Items"
                            value={values.items}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={touched.items ? errors.items : ""}
                            error={touched.items && Boolean(errors.items)}
                          />
                        </div>
                      </Grid>
                      <Grid item xs={12}>
                        <div>
                          <Label
                            id="services"
                            label="Services (separated by commas)"
                            tooltipTitle="(Besides feeding ppl, i.e., family counseling, career counseling, drop in for women or homeless, etc.)"
                          />
                          <TextField
                            id="services"
                            name="services"
                            placeholder="Services (separated by commas)"
                            value={values.services}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={touched.services ? errors.services : ""}
                            error={touched.services && Boolean(errors.services)}
                          />
                        </div>
                      </Grid>
                      <Grid item xs={12}>
                        <div>
                          <Label
                            id="requirements"
                            label="Eligibility / Requirements"
                            tooltipTitle="(Must go to chapel service, must be < 18, must show citizenship, etc.)"
                          />
                          <Textarea
                            id="requirements"
                            name="requirements"
                            placeholder="Eligibility / Requirements"
                            value={values.requirements}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={
                              touched.requirements ? errors.requirements : ""
                            }
                            error={
                              touched.requirements &&
                              Boolean(errors.requirements)
                            }
                          />
                        </div>
                      </Grid>
                      <Grid item xs={12}>
                        <div>
                          <Label
                            id="eligibilityNotes"
                            label="Eligibility Notes"
                            tooltipTitle="Other notes about eligibility requirements"
                          />
                          <Textarea
                            id="eligibilityNotes"
                            name="eligibilityNotes"
                            placeholder="Eligibility Notes"
                            value={values.eligibilityNotes}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={
                              touched.eligibilityNotes
                                ? errors.eligibilityNotes
                                : ""
                            }
                            error={
                              touched.eligibilityNotes &&
                              Boolean(errors.eligibilityNotes)
                            }
                          />
                        </div>
                      </Grid>
                      <Grid item xs={12}>
                        <div>
                          <Label id="languages" label="Languages" />
                          <Textarea
                            id="languages"
                            name="languages"
                            placeholder="Languages"
                            value={values.languages}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={
                              touched.languages ? errors.languages : ""
                            }
                            error={
                              touched.languages && Boolean(errors.languages)
                            }
                          />
                        </div>
                      </Grid>
                      <Grid item xs={12}>
                        <div>
                          <Label
                            id="notes"
                            label="Notes for the Public"
                            tooltipTitle={noteTooltip}
                          />
                          <Textarea
                            id="notes"
                            name="notes"
                            placeholder="Notes for the Public"
                            value={values.notes}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={touched.notes ? errors.notes : ""}
                            error={touched.notes && Boolean(errors.notes)}
                          />
                        </div>
                      </Grid>
                    </Grid>
                  </TabPanel>
                  <TabPanel value={tabPage} index={4}>
                    <Grid container spacing={1}>
                      <Grid item xs={12} sm={6}>
                        <div>
                          <Label
                            id="donationContactName"
                            label="Donation Contact Name"
                            tooltipTitle="Name of person(s) to contact for donations"
                          />
                          <TextField
                            id="donationContactName"
                            name="donationContactName"
                            placeholder="Donation Contact Name"
                            value={values.donationContactName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={
                              touched.donationContactName
                                ? errors.donationContactName
                                : ""
                            }
                            error={
                              touched.donationContactName &&
                              Boolean(errors.donationContactName)
                            }
                          />
                        </div>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <div>
                          <Label
                            id="donationContactPhone"
                            label="Donation Phone"
                            tooltipTitle="Phone for donations"
                          />
                          <TextField
                            id="donationContactPhone"
                            name="donationContactPhone"
                            placeholder="Donation Phone"
                            value={values.donationContactPhone}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={
                              touched.donationContactPhone
                                ? errors.donationContactPhone
                                : ""
                            }
                            error={
                              touched.donationContactPhone &&
                              Boolean(errors.donationContactPhone)
                            }
                          />
                        </div>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <div>
                          <Label
                            id="donationContactEmail"
                            label="Donation Email"
                            tooltipTitle="Email for donations"
                          />
                          <TextField
                            id="donationContactEmail"
                            name="donationContactEmail"
                            placeholder="Donation Email"
                            value={values.donationContactEmail}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={
                              touched.donationContactEmail
                                ? errors.donationContactEmail
                                : ""
                            }
                            error={
                              touched.donationContactEmail &&
                              Boolean(errors.donationContactEmail)
                            }
                          />
                        </div>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <div>
                          <Label
                            id="donationSchedule"
                            label="Donation Schedule"
                            tooltipTitle="When can organization receive or pickup donations"
                          />
                          <TextField
                            id="donationSchedule"
                            name="donationSchedule"
                            placeholder="Donation Schedule"
                            value={values.donationSchedule}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={
                              touched.donationSchedule
                                ? errors.donationSchedule
                                : ""
                            }
                            error={
                              touched.donationSchedule &&
                              Boolean(errors.donationSchedule)
                            }
                          />
                        </div>
                      </Grid>
                      <Grid item xs={12}>
                        <Tooltip title="Check if organization can pick up food from source">
                          <FormControlLabel
                            control={
                              <Checkbox
                                margin="normal"
                                name="donationPickup"
                                label="Pick Up"
                                value={values.donationPickup}
                                checked={values.donationPickup}
                                onChange={() =>
                                  setFieldValue(
                                    "donationPickup",
                                    !values.donationPickup
                                  )
                                }
                                onBlur={handleBlur}
                              />
                            }
                            label="Pick Up"
                          />
                        </Tooltip>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Tooltip title="Check if organization can accept frozen food">
                          <FormControlLabel
                            control={
                              <Checkbox
                                margin="normal"
                                name="donationAcceptFrozen"
                                label="Frozen"
                                value={values.donationAcceptFrozen}
                                checked={values.donationAcceptFrozen}
                                onChange={() =>
                                  setFieldValue(
                                    "donationAcceptFrozen",
                                    !values.donationAcceptFrozen
                                  )
                                }
                                onBlur={handleBlur}
                              />
                            }
                            label="Frozen"
                          />
                        </Tooltip>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Tooltip title="Check if organization can accept refrigerated food">
                          <FormControlLabel
                            control={
                              <Checkbox
                                margin="normal"
                                name="donationAcceptRefrigerated"
                                label="Refrigerated"
                                value={values.donationAcceptRefrigerated}
                                checked={values.donationAcceptRefrigerated}
                                onChange={() =>
                                  setFieldValue(
                                    "donationAcceptRefrigerated",
                                    !values.donationAcceptRefrigerated
                                  )
                                }
                                onBlur={handleBlur}
                              />
                            }
                            label="Refrigerated"
                          />
                        </Tooltip>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Tooltip title="Check if organization can accept perishables">
                          <FormControlLabel
                            control={
                              <Checkbox
                                margin="normal"
                                name="donationAcceptPerishable"
                                label="Perishable"
                                value={values.donationAcceptPerishable}
                                checked={values.donationAcceptPerishable}
                                onChange={() =>
                                  setFieldValue(
                                    "donationAcceptPerishable",
                                    !values.donationAcceptPerishable
                                  )
                                }
                                onBlur={handleBlur}
                              />
                            }
                            label="Perishable"
                          />
                        </Tooltip>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <div>
                          <Label
                            id="donationDeliveryInstructions"
                            label="Donation Delivery or Pickup Instructions"
                            tooltipTitle="Delivery Instructions"
                          />
                          <TextField
                            id="donationDeliveryInstructions"
                            name="donationDeliveryInstructions"
                            placeholder="Donation Delivery or Pickup Instructions"
                            value={values.donationDeliveryInstructions}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={
                              touched.donationDeliveryInstructions
                                ? errors.donationDeliveryInstructions
                                : ""
                            }
                            error={
                              touched.donationDeliveryInstructions &&
                              Boolean(errors.donationDeliveryInstructions)
                            }
                          />
                        </div>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <div>
                          <Label
                            id="donationNotes"
                            label="Donation Notes"
                            tooltipTitle="Other donation notes"
                          />
                          <TextField
                            id="donationNotes"
                            name="donationNotes"
                            placeholder="Donation Notes"
                            value={values.donationNotes}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={
                              touched.donationNotes ? errors.donationNotes : ""
                            }
                            error={
                              touched.donationNotes &&
                              Boolean(errors.donationNotes)
                            }
                          />
                        </div>
                      </Grid>
                    </Grid>
                  </TabPanel>
                  <TabPanel value={tabPage} index={5}>
                    <Grid container spacing={1}>
                      <Grid item xs={12} sm={6}>
                        <div>
                          <Label
                            id="adminContactName"
                            label="Verification Contact Name"
                            tooltipTitle="Name of person(s) to contact for organization information"
                          />
                          <TextField
                            id="adminContactName"
                            name="adminContactName"
                            placeholder="Verification Contact Name"
                            value={values.adminContactName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={
                              touched.adminContactName
                                ? errors.adminContactName
                                : ""
                            }
                            error={
                              touched.adminContactName &&
                              Boolean(errors.adminContactName)
                            }
                          />
                        </div>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <div>
                          <Label
                            id="adminContactPhone"
                            label="Verification Phone"
                            tooltipTitle="Phone number for administrative information"
                          />
                          <TextField
                            id="adminContactPhone"
                            name="adminContactPhone"
                            placeholder="Verification Phone"
                            value={values.adminContactPhone}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={
                              touched.adminContactPhone
                                ? errors.adminContactPhone
                                : ""
                            }
                            error={
                              touched.adminContactPhone &&
                              Boolean(errors.adminContactPhone)
                            }
                          />
                        </div>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <div>
                          <Label
                            id="adminContactEmail"
                            label="Verification Email"
                            tooltipTitle="Email for administrative information"
                          />
                          <TextField
                            id="adminContactEmail"
                            name="adminContactEmail"
                            placeholder="Verification Email"
                            value={values.adminContactEmail}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={
                              touched.adminContactEmail
                                ? errors.adminContactEmail
                                : ""
                            }
                            error={
                              touched.adminContactEmail &&
                              Boolean(errors.adminContactEmail)
                            }
                          />
                        </div>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sx={{
                          mt: 2,
                          border: "1px solid gray",
                          borderRadius: "4px",
                          padding: "0.5em",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <Stack direction="row">
                          <Typography flexBasis="20%">Id:</Typography>
                          <Typography flexBasis="20%">{values.id}</Typography>
                        </Stack>
                        <Stack direction="row">
                          <Typography flexBasis="20%">Entered:</Typography>
                          <Typography flexBasis="20%">
                            {values.createdUser}
                          </Typography>

                          <Typography flexBasis="20%">
                            {!values.createdDate
                              ? null
                              : dayjs(values.createdDate).format(DATE_FORMAT)}
                          </Typography>
                        </Stack>
                        <Stack direction="row">
                          <Typography flexBasis="20%">
                            Last Modified:
                          </Typography>
                          <Typography flexBasis="20%">
                            {values.modifiedUser}
                          </Typography>
                          <Typography flexBasis="20%">
                            {!values.modifiedDate
                              ? null
                              : dayjs(values.modifiedDate).format(DATE_FORMAT)}
                          </Typography>
                        </Stack>
                        <Stack direction="row">
                          <Typography flexBasis="20%">Assigned:</Typography>
                          <Typography flexBasis="20%">
                            {values.assignedUser}
                          </Typography>
                          <Typography flexBasis="20%">
                            {!values.assignedDate
                              ? null
                              : dayjs(values.assignedDate).format(DATE_FORMAT)}
                          </Typography>
                          {/* <div >
                        <UserContext.Consumer>
                          {(user) =>
                            user && user.isAdmin ? (
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  justifyContent: "flex-end",
                                }}
                              >
                                <AccountAutocomplete
                                  accountId={values.assignedLoginId || ""}
                                  setAccount={(login) => {
                                    if (login) {
                                      setFieldValue(
                                        "assignedLoginId",
                                        login.id
                                      );
                                      setFieldValue(
                                        "assignedUser",
                                        `${login.firstName} ${login.lastName}`
                                      );
                                      setFieldValue("assignedDate", moment());
                                      setFieldValue(
                                        "verificationStatusId",
                                        VERIFICATION_STATUS.ASSIGNED
                                      );
                                    } else {
                                      setFieldValue("assignedLoginId", "");
                                      setFieldValue("assignedUser", "");
                                      setFieldValue("assignedDate", "");
                                      setFieldValue(
                                        "verificationStatusId",
                                        VERIFICATION_STATUS.NEEDS_VERIFICATION
                                      );
                                    }
                                  }}
                                />
                              </div>
                            ) : null
                          }
                        </UserContext.Consumer>
                      </div>*/}
                        </Stack>
                        <Stack direction="row">
                          <Typography flexBasis="20%">Submitted:</Typography>
                          <Typography flexBasis="20%">
                            {values.submittedUser}
                          </Typography>
                          <Typography flexBasis="20%">
                            {!values.submittedDate
                              ? null
                              : dayjs(values.submittedDate).format(DATE_FORMAT)}
                          </Typography>
                        </Stack>
                        <Stack direction="row">
                          <Typography flexBasis="20%">Approved:</Typography>
                          <Typography flexBasis="20%">
                            {values.reviewedUser}
                          </Typography>
                          <Typography flexBasis="20%">
                            {values.approvedDate
                              ? dayjs(values.approvedDate).format(DATE_FORMAT)
                              : ""}
                          </Typography>
                        </Stack>
                        <Stack direction="row">
                          <Typography flexBasis="20%">Claimed:</Typography>
                          <Typography flexBasis="20%">
                            {values.claimedUser}
                          </Typography>
                          <Typography flexBasis="20%">
                            {!values.claimedDate
                              ? ""
                              : dayjs(values.claimedDate).format(DATE_FORMAT)}
                          </Typography>
                          {user && (user.isAdmin || user.isCoordinator) ? (
                            <div
                              style={{
                                flexBasis: "40%",
                              }}
                            >
                              <AccountAutocomplete
                                style={{ width: "100%" }}
                                accountId={values.claimedLoginId || ""}
                                setAccount={(login) => {
                                  if (login) {
                                    setFieldValue("claimedLoginId", login.id);
                                    setFieldValue(
                                      "claimedUser",
                                      `${login.firstName} ${login.lastName}`
                                    );
                                    setFieldValue("claimedDate", dayjs());
                                  } else {
                                    setFieldValue("claimedLoginId", "");
                                    setFieldValue("claimedUser", "");
                                    setFieldValue("claimedDate", "");
                                  }
                                }}
                              />
                            </div>
                          ) : null}
                        </Stack>
                      </Grid>
                      <Grid item xs={12}>
                        <div>
                          <Label
                            id="reviewNotes"
                            label="Reviewer Notes"
                            tooltipTitle="Verification review comments and instructions"
                          />
                          <Textarea
                            id="reviewNotes"
                            name="reviewNotes"
                            placeholder="Reviewer Notes"
                            value={values.reviewNotes}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={
                              touched.reviewNotes ? errors.reviewNotes : ""
                            }
                            error={
                              touched.reviewNotes && Boolean(errors.reviewNotes)
                            }
                          />
                        </div>
                      </Grid>
                    </Grid>
                  </TabPanel>
                </Box>
                <Stack direction="row">
                  <div style={{ flexBasis: "20%", flexGrow: 1 }}>
                    <div>
                      <Label
                        id="adminNotes"
                        label="Verification Notes"
                        tooltipTitle={adminNoteTooltip}
                      />
                      <Textarea
                        id="adminNotes"
                        name="adminNotes"
                        placeholder="Verification Notes"
                        value={values.adminNotes}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={touched.adminNotes ? errors.adminNotes : ""}
                        error={touched.adminNotes && Boolean(errors.adminNotes)}
                      />
                    </div>
                  </div>

                  {user && (user.isAdmin || user.isCoordinator) ? (
                    <Stack
                      direction="row"
                      spacing={2}
                      alignItems="flex-end"
                      flexBasis="65%"
                    >
                      <Tooltip title="Save updated information, but do not change the verification status">
                        <div>
                          <Button
                            variant="contained"
                            type="submit"
                            disabled={isSubmitting || isUnchanged(values)}
                            sx={{
                              minHeight: "3.5rem",
                            }}
                          >
                            Save Progress
                          </Button>
                        </div>
                      </Tooltip>
                      <Tooltip title="Mark for re-verification">
                        <div>
                          <Button
                            variant="contained"
                            type="button"
                            style={{
                              minHeight: "3.5rem",
                              display: "flex",
                            }}
                            onClick={() => {
                              setFieldValue("reviewedLoginId", "");
                              setFieldValue("reviewedUser", "");
                              setFieldValue("approvedDate", "");
                              setFieldValue("assignedLoginId", "");
                              setFieldValue("assignedUser", "");
                              setFieldValue("assignedDate", "");

                              // TODO: Really need to pop up a dialog and prompt the
                              // user to determine for information about what needs
                              // to be verified.
                              setFieldValue(
                                "verificationStatusId",
                                VERIFICATION_STATUS.NEEDS_VERIFICATION
                              );
                              setNextUrl("/verificationadmin");
                              handleSubmit();
                            }}
                            disabled={
                              isSubmitting ||
                              values.verifivation_status_id ===
                                VERIFICATION_STATUS.NEEDS_VERIFICATION
                            }
                          >
                            Needs Verfication
                          </Button>
                        </div>
                      </Tooltip>
                      <Tooltip title="Assign for Verification">
                        <div>
                          <Button
                            variant="contained"
                            type="button"
                            style={{
                              minHeight: "3.5rem",
                              display: "flex",
                            }}
                            onClick={() => {
                              handleAssignDialogOpen({
                                callback: (loginId) => {
                                  setFieldValue("reviewedLoginId", "");
                                  setFieldValue("reviewedUser", "");
                                  setFieldValue("approvedDate", "");
                                  setFieldValue("assignedLoginId", loginId);
                                  setFieldValue("assignedDate", dayjs());
                                  setFieldValue(
                                    "verificationStatusId",
                                    VERIFICATION_STATUS.ASSIGNED
                                  );
                                  setNextUrl("/verificationadmin");
                                  handleSubmit();
                                },
                              });
                            }}
                            disabled={
                              isSubmitting ||
                              values.verification_status_id ===
                                VERIFICATION_STATUS.SUBMITTED
                            }
                          >
                            (Re-)Assign
                          </Button>
                        </div>
                      </Tooltip>
                      <Tooltip
                        title={"Submitted record needs changes -> Assigned "}
                      >
                        <div>
                          <Button
                            variant="contained"
                            type="button"
                            style={{
                              minHeight: "3.5rem",
                              display: "flex",
                            }}
                            onClick={() => {
                              setFieldValue(
                                "reviewedUser",
                                user.firstName + " " + user.lastName
                              );
                              setFieldValue("reviewedLoginId", user.id);

                              // TODO: Really need to pop up a dialog and prompt the
                              // user for a review comment
                              // about what needs to be fixed.
                              setFieldValue(
                                "verificationStatusId",
                                VERIFICATION_STATUS.ASSIGNED
                              );

                              setNextUrl("/verificationadmin");
                              handleSubmit();
                            }}
                            disabled={
                              isSubmitting ||
                              !values.submittedDate ||
                              values.verificationStatusId !== 3
                            }
                          >
                            Request Changes
                          </Button>
                        </div>
                      </Tooltip>
                      <Tooltip title="Approve as Verified">
                        <div>
                          <Button
                            variant="contained"
                            type="button"
                            style={{
                              minHeight: "3.5rem",
                              display: "flex",
                            }}
                            onClick={() => {
                              setFieldValue("approvedDate", dayjs());
                              setFieldValue(
                                "reviewedUser",
                                user.firstName + " " + user.lastName
                              );
                              setFieldValue("reviewedLoginId", user.id);
                              setFieldValue(
                                "verificationStatusId",
                                VERIFICATION_STATUS.VERIFIED
                              );
                              setNextUrl("/verificationadmin");
                              handleSubmit();
                            }}
                            disabled={
                              isSubmitting ||
                              !criticalFieldsValidate(values) ||
                              (user.isCoordinator && !user.isAdmin)
                            }
                          >
                            Approve
                          </Button>
                        </div>
                      </Tooltip>
                      <Tooltip title="Delete Organization from Database Permanently">
                        <div>
                          <Button
                            variant="contained"
                            type="button"
                            style={{
                              minHeight: "3.5rem",
                              display: "flex",
                            }}
                            onClick={() => {
                              handleConfirmDialogOpen({
                                callback: () => {
                                  stakeholderService.remove(values.id);
                                  setNextUrl("/verificationadmin");
                                  handleSubmit();
                                },
                              });
                            }}
                            disabled={!user.isAdmin || !values.id}
                          >
                            Delete
                          </Button>
                        </div>
                      </Tooltip>
                    </Stack>
                  ) : user && user.isDataEntry ? (
                    <Stack
                      direction="row"
                      justifyContent="center"
                      alignItems="flex-end"
                      spacing={2}
                    >
                      <Tooltip title="Save changes to work on later">
                        <div>
                          <Button
                            variant="contained"
                            type="submit"
                            style={{
                              minHeight: "3.5rem",
                              display: "flex",
                            }}
                            disabled={isSubmitting || isUnchanged(values)}
                          >
                            Save Progress
                          </Button>
                        </div>
                      </Tooltip>
                      <Tooltip title="Unable to complete six critical fields (*), but need to hand off to someone else to complete">
                        <div>
                          <Button
                            variant="contained"
                            type="button"
                            style={{
                              minHeight: "3.5rem",
                              display: "flex",
                            }}
                            onClick={() => {
                              setFieldValue("assignedLoginId", "");
                              setFieldValue("assignedUser", "");
                              setFieldValue("assignedDate", "");
                              setFieldValue(
                                "verificationStatusId",
                                VERIFICATION_STATUS.NEEDS_VERIFICATION
                              );
                              setNextUrl("/verificationdashboard");
                              handleSubmit();
                            }}
                            disabled={
                              criticalFieldsValidate(values) ||
                              values.verificationStatusId ===
                                VERIFICATION_STATUS.NEEDS_VERIFICATION
                            }
                          >
                            Hand Off
                          </Button>
                        </div>
                      </Tooltip>
                      <Tooltip title="Critical information entered, Submit for Review.">
                        <div>
                          <Button
                            variant="contained"
                            type="button"
                            style={{
                              minHeight: "3.5rem",
                              display: "flex",
                            }}
                            onClick={() => {
                              setFieldValue("submittedDate", dayjs());
                              setFieldValue(
                                "submittedUser",
                                user.firstName + " " + user.lastName
                              );
                              setFieldValue("submittedLoginId", user.id);
                              setFieldValue(
                                "verificationStatusId",
                                VERIFICATION_STATUS.SUBMITTED
                              );
                              setNextUrl("/verificationdashboard");
                              handleSubmit();
                            }}
                            disabled={
                              !criticalFieldsValidate(values) ||
                              values.verificationStatusId ===
                                VERIFICATION_STATUS.SUBMITTED
                            }
                          >
                            Submit For Review
                          </Button>
                        </div>
                      </Tooltip>
                    </Stack>
                  ) : null}
                </Stack>
              </Stack>
            </form>
          )}
        </Formik>
      </div>
    </Container>
  );
};

OrganizationEdit.propTypes = {
  classes: PropTypes.object,
  match: PropTypes.object,
  history: PropTypes.object,
};

export default withRouter(OrganizationEdit);
