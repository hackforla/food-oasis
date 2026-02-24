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
import { Formik, FormikHelpers } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as stakeholderService from "services/stakeholder-service";
import * as suggestionService from "services/suggestion-service";
import {
  EditedSuggestions,
  OrganizationFormValues,
  StakeholderVersion,
  Suggestion,
} from "types/Organization";
import * as Yup from "yup";
import BusinessHours from "./OrganizationEdit/BusinessHours";
import ChangeHistory from "./OrganizationEdit/ChangeHistory";
import ContactDetails from "./OrganizationEdit/ContactDetails";
import Donations from "./OrganizationEdit/Donations";
import Identification from "./OrganizationEdit/Identification";
import MoreDetails from "./OrganizationEdit/MoreDetails";
import SuggestionHistory from "./OrganizationEdit/SuggestionHistory";
import Verification from "./OrganizationEdit/Verification";
import Label from "./ui/Label";
import Textarea from "./ui/Textarea";
import {
  FACEBOOK_REGEX,
  INSTAGRAM_REGEX,
  LINKEDIN_REGEX,
  PINTEREST_REGEX,
  TWITTER_REGEX,
  DEFAULT_VIEWPORTS,
  TENANT_ID,
} from "../../helpers/Constants";
import { useSuggestionByStakeholderId } from "hooks/useSuggestionByStakeholderId";
import { useStakeholderLog } from "hooks/useStakeholderLog";

const phoneRegExp = /^\(\d{3}\) \d{3}-\d{4}$/;
const tenantViewport =
  DEFAULT_VIEWPORTS[TENANT_ID as keyof typeof DEFAULT_VIEWPORTS];
const verificationStatusNames = VERIFICATION_STATUS_NAMES as Record<
  number,
  string
>;

const HourSchema = Yup.object().shape({
  weekOfMonth: Yup.number().required("Interval is required"),
  dayOfWeek: Yup.string().required("Day is required"),
  open: Yup.string().required("Opening time is required"),
  close: Yup.string().required("Closing time is required"),
});

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  phone: Yup.string()
    .matches(phoneRegExp, "Invalid phone number")
    .required("Phone number is required"),
  phoneExt: Yup.string(),
  address1: Yup.string().required("Street address is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  zip: Yup.string().required("Zip code is required"),
  latitude: Yup.number()
    .required("Latitude is required")
    .test(
      "latitude-range",
      `Latitude must be between ${Number(
        tenantViewport.bbox.split(",")[1]
      )} and ${Number(tenantViewport.bbox.split(",")[3])}`,
      (value) => {
        const minLat = Number(tenantViewport.bbox.split(",")[1]);
        const maxLat = Number(tenantViewport.bbox.split(",")[3]);
        return Number(value) >= minLat && Number(value) <= maxLat;
      }
    ),
  longitude: Yup.number()
    .required("Longitude is required")
    .test(
      "longitude-range",
      `Longitude must be between ${Number(
        tenantViewport.bbox.split(",")[0]
      )} and ${Number(tenantViewport.bbox.split(",")[2])}`,
      (value) => {
        const minLng = Number(tenantViewport.bbox.split(",")[0]);
        const maxLng = Number(tenantViewport.bbox.split(",")[2]);
        return Number(value) >= minLng && Number(value) <= maxLng;
      }
    ),
  email: Yup.string().email("Invalid email address format"),
  hours: Yup.array()
    .of(HourSchema)
    .test("no-duplicate-hours", function (value) {
      const seen = new Set();
      for (const item of value || []) {
        const key = `${item.weekOfMonth}-${item.dayOfWeek}-${item.open}-${item.close}`;
        if (seen.has(key)) {
          return this.createError({
            path: "hours",
            message: "Duplicate business hours are not allowed",
          });
        }
        seen.add(key);
      }
      return true;
    }),
  instagram: Yup.string()
    .matches(INSTAGRAM_REGEX, "Please enter a valid Instagram URL.")
    .nullable()
    .transform((curr, orig) => (orig === "" ? null : curr)),
  pinterest: Yup.string()
    .matches(PINTEREST_REGEX, "Please enter a valid Pinterest URL.")
    .nullable()
    .transform((curr, orig) => (orig === "" ? null : curr)),
  facebook: Yup.string()
    .matches(FACEBOOK_REGEX, "Please enter a valid Facebook URL.")
    .nullable()
    .transform((curr, orig) => (orig === "" ? null : curr)),
  linkedin: Yup.string()
    .matches(LINKEDIN_REGEX, "Please enter a valid LinkedIn URL.")
    .nullable()
    .transform((curr, orig) => (orig === "" ? null : curr)),
  twitter: Yup.string()
    .matches(TWITTER_REGEX, "Please enter a valid Twitter/X URL.")
    .nullable()
    .transform((curr, orig) => (orig === "" ? null : curr)),
  selectedCategoryIds: Yup.array().min(
    1,
    "You must select at least one category"
  ),
});

const emptyOrganization: OrganizationFormValues = {
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
  phoneExt: "",
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
  neighborhoodName: "",
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

interface CallbackObject {
  callback?: (value?: number) => void;
}

const OrganizationEdit = () => {
  const navigate = useNavigate();
  const { id: editId } = useParams();
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [assignDialogCallback, setAssignDialogCallback] =
    useState<CallbackObject | null>(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [confirmDialogCallback, setConfirmDialogCallback] =
    useState<CallbackObject | null>(null);
  const [tabPage, setTabPage] = useState(0);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [originalData, setOriginalData] =
    useState<OrganizationFormValues>(emptyOrganization);
  const { user } = useUserContext();
  const { setToast } = useToasterContext();

  const { data: stakeholderSuggestionsData, refetch: refetchSuggestions } =
    useSuggestionByStakeholderId(editId);

  const {
    data: versionHistoryData,
    loading: historyLoading,
    error: historyError,
  } = useStakeholderLog(editId);

  const stakeholderSuggestions =
    ((stakeholderSuggestionsData || []) as Suggestion[]) || [];
  const versionHistory =
    ((versionHistoryData || []) as StakeholderVersion[]) || [];

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (editId) {
          const stakeholder = (await stakeholderService.getById(editId)) as
            | (OrganizationFormValues & { categories?: Array<{ id: number }> })
            | undefined;

          if (stakeholder) {
            stakeholder.selectedCategoryIds = (
              stakeholder.categories || []
            ).map((category) => category.id);
            delete stakeholder.categories;
            setOriginalData(stakeholder);
          }
        } else {
          setOriginalData(emptyOrganization);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [editId]);

  const handleAssignDialogOpen = async (callbackObject: CallbackObject) => {
    setAssignDialogOpen(true);
    setAssignDialogCallback(callbackObject);
  };

  const handleAssignDialogClose = async (loginId?: number | null) => {
    setAssignDialogOpen(false);
    if (!loginId) return;
    if (assignDialogCallback?.callback) {
      assignDialogCallback.callback(loginId);
    }
  };

  const handleConfirmDialogOpen = async (callbackObject: CallbackObject) => {
    setConfirmDialogOpen(true);
    setConfirmDialogCallback(callbackObject);
  };

  const handleConfirmDialogClose = async (result?: boolean) => {
    setConfirmDialogOpen(false);
    if (!result) return;
    if (confirmDialogCallback?.callback) {
      confirmDialogCallback.callback();
    }
  };

  const handleChangeTabPage = (
    _event: React.SyntheticEvent,
    newValue: number
  ) => {
    setTabPage(newValue);
  };

  const criticalFieldsValidate = (values: OrganizationFormValues) => {
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

  const isUnchanged = (values: OrganizationFormValues) => {
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
          <li>Weren&apos;t available but call back</li>
          <li>
            Got partial information from voicemail (also enter this information
            in the appropriate formfields)
          </li>
        </ul>
      </Stack>
    </Stack>
  );

  const [isSubmitClicked, setSubmitClicked] = useState(false);

  const tabs: Record<string, number> = {
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
    instagram: 2,
    twitter: 2,
    pinterest: 2,
    facebook: 2,
    linkedin: 2,
  };

  const scrollIntoViewHelper = (errors: Record<string, string>) => {
    const firstError = Object.keys(errors)[0];
    if (!firstError || firstError.startsWith("hours")) {
      return;
    }
    const el = document.querySelector(`[name="${firstError}"]`);
    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  const [editedSuggestions, setEditedSuggestions] = useState<EditedSuggestions>(
    {}
  );

  const handleSuggestionEdit = (id: number, changes: Partial<Suggestion>) => {
    setEditedSuggestions((prev) => ({
      ...prev,
      [id]: { ...(prev[id] || {}), ...changes },
    }));
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
        <Formik<OrganizationFormValues>
          initialValues={
            JSON.parse(JSON.stringify(originalData)) as OrganizationFormValues
          }
          enableReinitialize
          validationSchema={validationSchema}
          validate={(values) => {
            try {
              validationSchema.validateSync(values, { abortEarly: false });
            } catch (error) {
              if (isSubmitClicked && error instanceof Yup.ValidationError) {
                setSubmitClicked(false);
                setToast({
                  message:
                    "Please fix the errors in the form before save progress.",
                });

                const fieldErrors = error.inner.reduce<Record<string, string>>(
                  (acc, item) => {
                    if (item.path) {
                      acc[item.path] = item.message;
                    }
                    return acc;
                  },
                  {}
                );

                const firstError = Object.keys(fieldErrors)[0];
                const tabIndex = firstError?.startsWith("hours")
                  ? tabs.hours
                  : tabs[firstError];

                if (tabIndex !== undefined) {
                  setTabPage(tabIndex);
                  setTimeout(() => {
                    scrollIntoViewHelper(fieldErrors);
                  }, 0);
                }
              }
            }
          }}
          onSubmit={async (
            values,
            {
              setSubmitting,
              setFieldValue,
            }: FormikHelpers<OrganizationFormValues>
          ) => {
            try {
              if (values.id) {
                await stakeholderService.put({ ...values, loginId: user?.id });
                setOriginalData(values);
              } else {
                const response = await stakeholderService.post({
                  ...values,
                  loginId: user?.id,
                });
                setFieldValue("id", response.id);
                setOriginalData({ ...values, id: response.id });
              }

              const suggestionUpdates = Object.entries(editedSuggestions).map(
                ([id, changes]) =>
                  suggestionService.update({ id: Number(id), ...changes })
              );
              await Promise.all(suggestionUpdates);
              refetchSuggestions();

              setToast({
                message: `${values.id ? "Update" : "Insert"} successful.`,
              });
              setEditedSuggestions({});

              if (nextUrl) navigate(nextUrl);
            } catch (err) {
              setToast({
                message: `${
                  values.id ? "Update" : "Insert"
                } failed. Please check for validation warnings on the Identification and Business Hours tabs and try again.`,
              });
              console.error(err);
            } finally {
              setSubmitting(false);
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
              <SuggestionHistory
                suggestions={stakeholderSuggestions}
                editedSuggestions={editedSuggestions}
                onEdit={handleSuggestionEdit}
                showNewOnly={true}
              />
              <Stack direction="row" justifyContent="space-between">
                <Typography component="h1" variant="h5">
                  {`Organization - ${values.name}`}
                </Typography>
                <Box
                  bgcolor="secondary.main"
                  style={{ padding: "0.2em 0.65em" }}
                >
                  <Typography component="h1" variant="h5">
                    {verificationStatusNames[values.verificationStatusId]}
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
                      <Tab label="Suggestion History" {...a11yProps(6)} />
                      {(user?.isAdmin || user?.isCoordinator) && (
                        <Tab label="Change History" {...a11yProps(7)} />
                      )}
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
                  <SuggestionHistory
                    tabPage={tabPage}
                    suggestions={stakeholderSuggestions}
                    editedSuggestions={editedSuggestions}
                    onEdit={handleSuggestionEdit}
                  />
                  {(user?.isAdmin || user?.isCoordinator) && (
                    <ChangeHistory
                      tabPage={tabPage}
                      versions={versionHistory}
                      loading={historyLoading}
                      error={historyError}
                    />
                  )}
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
                            disabled={
                              isSubmitting ||
                              (isUnchanged(values) &&
                                Object.keys(editedSuggestions).length === 0)
                            }
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
                                  setFieldValue(
                                    "assignedLoginId",
                                    loginId || ""
                                  );
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
                                `${user.firstName} ${user.lastName}`
                              );
                              setFieldValue("reviewedLoginId", user.id);
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
                                `${user.firstName} ${user.lastName}`
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
                            disabled={
                              isSubmitting ||
                              (isUnchanged(values) &&
                                Object.keys(editedSuggestions).length === 0)
                            }
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
                              isSubmitting ||
                              Boolean(criticalFieldsValidate(values)) ||
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
                                `${user.firstName} ${user.lastName}`
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
                              isSubmitting ||
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

export default OrganizationEdit;
