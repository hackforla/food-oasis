import {
  AppBar,
  Box,
  Button,
  Container,
  Stack,
  Tab,
  Tabs,
  Tooltip,
  Typography,
} from "@mui/material";
import AssignDialog from "components/Admin/AssignDialog";
import ConfirmDialog from "components/Admin/ui/ConfirmDialog";
import { a11yProps } from "components/Admin/ui/TabPanel";
import {
  VERIFICATION_STATUS,
  VERIFICATION_STATUS_NAMES,
} from "constants/stakeholder";
import { useToasterContext } from "contexts/toasterContext";
import { useUserContext } from "contexts/userContext";
import dayjs from "dayjs";
import { Formik } from "formik";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as stakeholderService from "services/stakeholder-service";
import * as Yup from "yup";
import BusinessHours from "./OrganizationEdit/BusinessHours";
import ContactDetails from "./OrganizationEdit/ContactDetails";
import Donations from "./OrganizationEdit/Donations";
import Identification from "./OrganizationEdit/Identification";
import MoreDetails from "./OrganizationEdit/MoreDetails";
import Verification from "./OrganizationEdit/Verification";
import Label from "./ui/Label";
import Textarea from "./ui/Textarea";

const HourSchema = Yup.object().shape({
  weekOfMonth: Yup.number().required("Interval is required"),
  dayOfWeek: Yup.string().required("Day is required"),
  open: Yup.string().required("Opening time is required"),
  close: Yup.string().required("Closing time is required"),
});

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  address1: Yup.string().required("Street address is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  zip: Yup.string().required("Zip code is required"),
  latitude: Yup.number().required("Latitude is required").min(-90).max(90),
  longitude: Yup.number().required("Longitude is required").min(-180).max(180),
  email: Yup.string().email("Invalid email address format"),
  hours: Yup.array().of(HourSchema),
  twitter: Yup.string()
    .matches(
      /^https?:\/\/(www\.)?(twitter\.com|x\.com)\/.*/,
      "Invalid URL, e.g. 'https://twitter.com/ or https://x.com/'"
    )
    .required("Full Twitter/X URL is required."),
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

const OrganizationEdit = (props) => {
  const navigate = useNavigate();
  const { id: editId } = useParams();
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [assignDialogCallback, setAssignDialogCallback] = useState({});
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [confirmDialogCallback, setConfirmDialogCallback] = useState({});
  const [tabPage, setTabPage] = useState(0);
  const [nextUrl, setNextUrl] = useState(null);
  const [originalData, setOriginalData] = useState(emptyOrganization);
  const { user } = useUserContext();
  const { setToast } = useToasterContext();

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

  const [isSubmitClicked, setSubmitClicked] = useState(false);
  // should include all fields that are required for the form to be valid
  const tabs = {
    name: 0,
    address1: 0,
    city: 0,
    state: 0,
    zip: 0,
    latitude: 0,
    longitude: 0,
    email: 0,
    selectedCategoryIds: 0,
    hours: 1,
  };

  const scrollIntoViewHelper = (errors) => {
    const firstError = Object.keys(errors)[0];
    if (firstError.startsWith("hours")) {
      return;
    }
    let el = document.querySelector(`[name="${firstError}"]`);
    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  return (
    <Container component="main" maxWidth="lg">
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
          validate={(values) => {
            try {
              validationSchema.validateSync(values, { abortEarly: false });
            } catch (error) {
              if (isSubmitClicked) {
                setSubmitClicked(false);
                const errors = error.inner.reduce(
                  (errors, { path, message }) => ({
                    ...errors,
                    [path]: message,
                  }),
                  {}
                );
                const firstError = Object.keys(errors)[0];
                let tabIndex;
                // Check if the first part of the key matches 'hours'
                if (firstError.startsWith("hours")) {
                  tabIndex = tabs["hours"];
                } else {
                  tabIndex = tabs[firstError];
                }

                if (tabIndex !== undefined) {
                  setTabPage(tabIndex); // change to the tab of the first error field

                  // Scroll to the error field after the new tab contents have rendered
                  setTimeout(() => {
                    scrollIntoViewHelper(errors);
                  }, 0);
                }
              }
            }
          }}
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
                    navigate(nextUrl);
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
                    navigate(nextUrl);
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
            setFieldTouched,
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
                  <Identification
                    tabPage={tabPage}
                    values={values}
                    handleChange={handleChange}
                    errors={errors}
                    touched={touched}
                    setFieldValue={setFieldValue}
                    handleBlur={handleBlur}
                  />
                  <BusinessHours
                    tabPage={tabPage}
                    values={values}
                    handleChange={handleChange}
                    errors={errors}
                    touched={touched}
                    setFieldValue={setFieldValue}
                    setFieldTouched={setFieldTouched}
                    handleBlur={handleBlur}
                  />
                  <ContactDetails
                    tabPage={tabPage}
                    values={values}
                    handleChange={handleChange}
                    errors={errors}
                    touched={touched}
                    handleBlur={handleBlur}
                  />
                  <MoreDetails
                    tabPage={tabPage}
                    values={values}
                    handleChange={handleChange}
                    errors={errors}
                    touched={touched}
                    setFieldValue={setFieldValue}
                    handleBlur={handleBlur}
                  />
                  <Donations
                    tabPage={tabPage}
                    values={values}
                    handleChange={handleChange}
                    errors={errors}
                    touched={touched}
                    setFieldValue={setFieldValue}
                    handleBlur={handleBlur}
                  />
                  <Verification
                    tabPage={tabPage}
                    values={values}
                    handleChange={handleChange}
                    errors={errors}
                    touched={touched}
                    setFieldValue={setFieldValue}
                    handleBlur={handleBlur}
                  />
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
                            onClick={() => setSubmitClicked(true)}
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
                              setNextUrl("/admin/verificationadmin");
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
                                  setNextUrl("/admin/verificationadmin");
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

                              setNextUrl("/admin/verificationadmin");
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
                              setNextUrl("/admin/verificationadmin");
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
                                  setNextUrl("/admin/verificationadmin");
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
                              setNextUrl("/admin/verificationdashboard");
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
                              setNextUrl("/admin/verificationdashboard");
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

export default OrganizationEdit;
