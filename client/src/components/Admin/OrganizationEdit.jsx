import {
  AppBar,
  Badge,
  Box,
  Button,
  Container,
  Stack,
  Tab,
  Tabs,
  Tooltip,
  Typography,
} from "@mui/material";
import WarningIcon from "@mui/icons-material/Warning";
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
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as stakeholderService from "services/stakeholder-service";
import * as suggestionService from "services/suggestion-service";
import * as Yup from "yup";
import BusinessHours from "./OrganizationEdit/BusinessHours";
import ContactDetails from "./OrganizationEdit/ContactDetails";
import Donations from "./OrganizationEdit/Donations";
import Identification from "./OrganizationEdit/Identification";
import MoreDetails from "./OrganizationEdit/MoreDetails";
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
import SuggestionHistory from "./OrganizationEdit/SuggestionHistory";
import ChangeHistory from "./OrganizationEdit/ChangeHistory";

const phoneRegExp = /^\(\d{3}\) \d{3}-\d{4}$/;

const HourSchema = Yup.object().shape({
  weekOfMonth: Yup.number().required("Interval is required."),
  dayOfWeek: Yup.string().required("Day is required."),
  open: Yup.string().required("Opening time is required."),
  close: Yup.string().required("Closing time is required."),
});

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required."),
  phone: Yup.string()
    .matches(phoneRegExp, "Invalid phone number")
    .required("Phone number is required."),
  phoneExt: Yup.string(),
  address1: Yup.string().required("Street address is required."),
  city: Yup.string().required("City is required."),
  state: Yup.string().required("State is required."),
  zip: Yup.string().required("Zip code is required."),
  latitude: Yup.number()
    .required("Latitude is required.")
    .test(
      "latitude-range",
      `Latitude must be between ${Number(
        DEFAULT_VIEWPORTS[TENANT_ID].bbox.split(",")[1]
      )} and ${Number(DEFAULT_VIEWPORTS[TENANT_ID].bbox.split(",")[3])}`,
      (value) => {
        const minLat = Number(DEFAULT_VIEWPORTS[TENANT_ID].bbox.split(",")[1]);
        const maxLat = Number(DEFAULT_VIEWPORTS[TENANT_ID].bbox.split(",")[3]);
        return value >= minLat && value <= maxLat;
      }
    ),
  longitude: Yup.number()
    .required("Longitude is required.")
    .test(
      "longitude-range",
      `Longitude must be between ${Number(
        DEFAULT_VIEWPORTS[TENANT_ID].bbox.split(",")[0]
      )} and ${Number(DEFAULT_VIEWPORTS[TENANT_ID].bbox.split(",")[2])}`,
      (value) => {
        const minLng = Number(DEFAULT_VIEWPORTS[TENANT_ID].bbox.split(",")[0]);
        const maxLng = Number(DEFAULT_VIEWPORTS[TENANT_ID].bbox.split(",")[2]);
        return value >= minLng && value <= maxLng;
      }
    ),
  email: Yup.string().email("Invalid email address format"),
  hours: Yup.array()
    .of(HourSchema)
    .test("no-duplicate-hours", function (value) {
      const seen = new Set();
      for (const item of value) {
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
    "You must select at least one category."
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

const OrganizationEdit = (props) => {
  const navigate = useNavigate();
  const { id: editId } = useParams();
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [assignDialogCallback, setAssignDialogCallback] = useState({});
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [confirmDialogCallback, setConfirmDialogCallback] = useState({});
  const [tabPage, setTabPage] = useState(0);
  const [nextUrl, setNextUrl] = useState(null);
  const [validationMode, setValidationMode] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [originalData, setOriginalData] = useState(emptyOrganization);
  const { user } = useUserContext();
  const { setToast } = useToasterContext();

  const { data: stakeholderSuggestions, refetch: refetchSuggestions } =
    useSuggestionByStakeholderId(editId);

  const {
    data: versionHistory,
    loading: historyLoading,
    error: historyError,
  } = useStakeholderLog(editId);

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
        setIsLoaded(true);
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
    // Dialog returns undefined if cancelled, null if
    // want to unassign, otherwise a loginId > 0
    if (!loginId) return;
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

  const getConfirmationErrors = (values) => {
    // email optional but requires confirmation if it is provided
    const emailConfirmation = values.email 
    ? [{ field: "confirmedEmail", label: "Email" }] 
    : [];

    const isInactive = values.inactive || values.inactiveTemporary;
    const actionWord =
      user?.isAdmin || user?.isCoordinator ? "approval" : "submission";

    const confirmationFields = isInactive
      ? [
          { field: "confirmedName", label: "Name" },
          { field: "confirmedCategories", label: "Categories" },
          { field: "confirmedAddress", label: "Address" },
        ]
      : [
          { field: "confirmedName", label: "Name" },
          { field: "confirmedCategories", label: "Categories" },
          { field: "confirmedAddress", label: "Address" },
          ...emailConfirmation,
          { field: "confirmedPhone", label: "Phone" },
          { field: "confirmedHours", label: "Business Hours" },
          { field: "confirmedFoodTypes", label: "Food Types" },
        ];

    return confirmationFields.reduce((acc, { field, label }) => {
      if (!values[field]) {
        acc[field] = `${label} must be confirmed before ${actionWord}.`;
      }
      return acc;
    }, {});
  };

  const getTabErrorCounts = (yupErrors, confirmErrors = {}) => {
    const counts = {};

    Object.keys(yupErrors).forEach((field) => {
      const tabIndex = field.startsWith("hours") ? 1 : tabs[field];
      if (tabIndex !== undefined) {
        counts[tabIndex] = (counts[tabIndex] || 0) + 1;
      }
    });

    Object.keys(confirmErrors).forEach((field) => {
      const tabIndex = confirmationFieldToTab[field];
      if (tabIndex !== undefined) {
        counts[tabIndex] = (counts[tabIndex] || 0) + 1;
      }
    });

    return counts;
  };

  const focusFirstConfirmationError = (confErrors) => {
    const firstField = Object.keys(confErrors)[0];
    const tabIndex = confirmationFieldToTab[firstField];
    if (tabIndex !== undefined) {
      setTabPage(tabIndex);
      setTimeout(() => {
        const el = document.querySelector(`[name="${firstField}"]`);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 0);
    }
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

  const TAB_NAMES = [
    "Identification",
    "Business Hours",
    "Contact Details",
    "More Details",
    "Donations",
    "Verification",
    "Suggestion History",
    "Change History",
  ];

  const FIELD_LABELS = {
    name: "Name",
    phone: "Phone",
    address1: "Street Address",
    city: "City",
    state: "State",
    zip: "Zip Code",
    latitude: "Latitude",
    longitude: "Longitude",
    email: "Email",
    selectedCategoryIds: "Categories",
    hours: "Business Hours",
    instagram: "Instagram URL",
    twitter: "Twitter/X URL",
    pinterest: "Pinterest URL",
    facebook: "Facebook URL",
    linkedin: "LinkedIn URL",
    confirmedName: "Name",
    confirmedCategories: "Categories",
    confirmedAddress: "Address",
    confirmedEmail: "Email",
    confirmedPhone: "Phone",
    confirmedHours: "Business Hours",
    confirmedFoodTypes: "Food Types",
  };

  // should include all fields that are required for the form to be valid
  const tabs = {
    name: 0,
    phone: 0,
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

  const confirmationFieldToTab = {
    confirmedName: 0,
    confirmedCategories: 0,
    confirmedAddress: 0,
    confirmedEmail: 0,
    confirmedPhone: 0,
    confirmedHours: 1,
    confirmedFoodTypes: 3,
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

  const [editedSuggestions, setEditedSuggestions] = useState({});

  const handleSuggestionEdit = (id, changes) => {
    setEditedSuggestions((prev) => ({
      ...prev,
      [id]: { ...(prev[id] || {}), ...changes },
    }));
  };

  const renderActionButtons = ({ values, errors, isSubmitting, setFieldValue, handleSubmit }) => {
    if (user?.isAdmin || user?.isCoordinator) {
      return (
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
                  (isUnchanged(values) && Object.keys(editedSuggestions).length === 0)
                }
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
                  setFieldValue(
                    "verificationStatusId",
                    VERIFICATION_STATUS.NEEDS_VERIFICATION
                  );
                  setNextUrl("/admin/verificationadmin");
                  handleSubmit();
                }}
                disabled={
                  isSubmitting ||
                  values.verifivation_status_id === VERIFICATION_STATUS.NEEDS_VERIFICATION
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
                  values.verification_status_id === VERIFICATION_STATUS.SUBMITTED
                }
              >
                (Re-)Assign
              </Button>
            </div>
          </Tooltip>
          <Tooltip title={"Submitted record needs changes -> Assigned "}>
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
                  setValidationMode("approve");

                  const confErrors = getConfirmationErrors(values);
                  if (Object.keys(confErrors).length > 0) {
                    focusFirstConfirmationError(confErrors);
                    return;
                  }
                  if (Object.keys(errors).length > 0) return;

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
      );
    }

    if (user?.isDataEntry) {
      return (
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
                  sx={{ minHeight: "3.5rem" }}
                  onClick={() => {
                    setValidationMode("submit");

                    const confErrors = getConfirmationErrors(values);
                    const hasYupErrors = Object.keys(errors).length > 0;
                    const hasConfErrors = Object.keys(confErrors).length > 0;

                    if (hasConfErrors) {
                      focusFirstConfirmationError(confErrors);
                      return;
                    }
                    if (hasYupErrors) return;

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
                    isSubmitting ||
                    values.verificationStatusId ===
                      VERIFICATION_STATUS.SUBMITTED
                  }
              >
                Submit For Review
              </Button>
            </div>
          </Tooltip>
        </Stack>
      );
    }

    return null;
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
          onSubmit={async (values, { setSubmitting, setFieldValue }) => {
            const yupErrors = await validationSchema
              .validate(values, { abortEarly: false })
              .then(() => ({}))
              .catch((err) =>
                err.inner.reduce(
                  (acc, { path, message }) => ({ ...acc, [path]: message }),
                  {}
                )
              );

            if (Object.keys(yupErrors).length > 0) {
              setToast({
                message: "Please fix the errors in the form before saving progress",
                type: "error",
              });

              const firstError = Object.keys(yupErrors)[0];
              const tabIndex = firstError.startsWith("hours")
                ? 1
                : tabs[firstError];

              if (tabIndex !== undefined) {
                setTabPage(tabIndex);
                setTimeout(() => scrollIntoViewHelper(yupErrors), 0);
              }

              setSubmitting(false);
              return;
            }

            try {
              const payload = {
                ...values,
                latitude: Number(values.latitude),
                longitude: Number(values.longitude),
                loginId: user.id,
                tags: values.tags ?? [],
              };

              if (values.id) {
                await stakeholderService.put(payload);
                setOriginalData(payload);
              } else {
                const response = await stakeholderService.post(payload);
                setFieldValue("id", response.id);
                setOriginalData({ ...payload, id: response.id });
              }

              // Save changed suggestions
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
              setValidationMode(null);
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
            submitCount
          }) => {
            const confirmationErrors =
              validationMode === "submit" || validationMode === "approve"
                ? getConfirmationErrors(values)
                : {};

            const hasValidationErrors = Object.keys(errors).length > 0;
            const hasConfirmationErrors = Object.keys(confirmationErrors).length > 0;

            const currentErrors = useMemo(() => {
              try {
                validationSchema.validateSync(values, { abortEarly: false });
                return {};
              } catch (err) {
                return err.inner.reduce(
                  (acc, { path, message }) => ({ ...acc, [path]: message }),
                  {}
                );
              }
            }, [values]);

            const tabErrorCounts = isLoaded ? getTabErrorCounts(currentErrors, confirmationErrors) : {};
            const isAdminOrCoordinator = user && (user.isAdmin || user.isCoordinator);
            const confirmLabel = isAdminOrCoordinator ? "Approval" : "Submitting";

            return (
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
                    {VERIFICATION_STATUS_NAMES[values.verificationStatusId]}
                  </Typography>
                </Box>
              </Stack>
              <Stack spacing={2} sx={{ pb: 2 }}>
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
                      {[
                        "Identification",
                        "Business Hours",
                        "Contact Details",
                        "More Details",
                        "Donations",
                        "Verification",
                        "Suggestion History",
                        ...(user?.isAdmin || user?.isCoordinator ? ["Change History"] : []),
                      ].map((label, index) => (
                        <Tab
                          key={label}
                          label={
                            tabErrorCounts[index] ? (
                              <Badge
                                badgeContent={tabErrorCounts[index]}
                                color="error"
                                sx={{
                                  "& .MuiBadge-badge": {
                                    top: -4,
                                    right: -6,
                                    fontSize: "0.65rem",
                                    height: 18,
                                    minWidth: 18,
                                  },
                                }}
                              >
                                <span style={{ paddingRight: 10 }}>{label}</span>
                              </Badge>
                            ) : (
                              label
                            )
                          }
                          {...a11yProps(index)}
                        />
                      ))}
                    </Tabs>
                  </AppBar>
                  <Identification
                    tabPage={tabPage}
                    values={values}
                    handleChange={handleChange}
                    errors={errors}
                    touched={touched}
                    setFieldValue={setFieldValue}
                    setFieldTouched={setFieldTouched}
                    handleBlur={handleBlur}
                    confirmationErrors={confirmationErrors}
                    submitCount={submitCount}
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
                    confirmationErrors={confirmationErrors}
                  />
                  <ContactDetails
                    tabPage={tabPage}
                    values={values}
                    handleChange={handleChange}
                    errors={errors}
                    touched={touched}
                    handleBlur={handleBlur}
                    confirmationErrors={confirmationErrors}
                  />
                  <MoreDetails
                    tabPage={tabPage}
                    values={values}
                    handleChange={handleChange}
                    errors={errors}
                    touched={touched}
                    setFieldValue={setFieldValue}
                    handleBlur={handleBlur}
                    confirmationErrors={confirmationErrors}
                  />
                  <Donations
                    tabPage={tabPage}
                    values={values}
                    handleChange={handleChange}
                    errors={errors}
                    touched={touched}
                    setFieldValue={setFieldValue}
                    handleBlur={handleBlur}
                    confirmationErrors={confirmationErrors}
                  />
                  <Verification
                    tabPage={tabPage}
                    values={values}
                    handleChange={handleChange}
                    errors={errors}
                    touched={touched}
                    setFieldValue={setFieldValue}
                    handleBlur={handleBlur}
                    confirmationErrors={confirmationErrors}
                  />
                  <SuggestionHistory
                    tabPage={tabPage}
                    suggestions={stakeholderSuggestions}
                    editedSuggestions={editedSuggestions}
                    onEdit={handleSuggestionEdit}
                    confirmationErrors={confirmationErrors}
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
                <Stack direction="column" spacing={2}>
                  <Stack direction="row" alignItems="flex-start" spacing={2}>
                    <Box sx={{ flexBasis: "40%", flexGrow: 0, flexShrink: 0 }}>
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
                    </Box>
                      {(hasValidationErrors || hasConfirmationErrors) && (
                        <Box sx={{ flexBasis: "65%", flexGrow: 2 }}>
                          <Box sx={{ height: "40px", display: "flex", alignItems: "center" }}>
                            <Stack direction="row" alignItems="center" spacing={0.5}>
                              <Typography fontWeight={600} sx={{ color: "error.main" }}>
                                Needs Attention
                              </Typography>
                              <WarningIcon sx={{ fontSize: "1rem", color: "error.main" }} />
                            </Stack>
                          </Box>
                          <Box
                            sx={{
                              border: "1px solid",
                              borderColor: "error.main",
                              borderRadius: 1,
                              p: 1.5,
                            }}
                          >
                            {/* validation errors */}
                            {hasValidationErrors && (
                              <Box sx={{ mb: hasConfirmationErrors ? 1.5 : 0 }}>
                                <Typography
                                  variant="subtitle1"
                                  sx={{
                                    fontWeight: 700,
                                    mb: 0.5,
                                    lineHeight: 1
                                  }}
                                >
                                  Must be Fixed before Saving Progress:
                                </Typography>
                                <ul
                                  style={{
                                    margin: 0,
                                    paddingLeft: "1.25rem",
                                    listStyleType: "disc",
                                  }}
                                >
                                  {Object.entries(errors).map(
                                    ([field]) => {
                                      const tabIndex = field.startsWith("hours")
                                        ? 1
                                        : tabs[field];
                                      return (
                                        <li key={field}>
                                          <Typography variant="body2">
                                            <strong>{FIELD_LABELS[field] || field}</strong>
                                            {tabIndex !== undefined && ` (${TAB_NAMES[tabIndex]} Tab)`}
                                          </Typography>
                                        </li>
                                      );
                                    }
                                  )}
                                </ul>
                              </Box>
                            )}
                            {/* confirmation warnings */}
                            {hasConfirmationErrors && (
                              <Box>
                                <Typography
                                  variant="subtitle1"
                                  sx={{
                                    fontWeight: 700,
                                    mb: 0.5,
                                    lineHeight: 1,
                                  }}
                                >
                                  Must be Confirmed before {confirmLabel}:
                                </Typography>
                                <ul
                                  style={{
                                    margin: 0,
                                    paddingLeft: "1.25rem",
                                    listStyleType: "disc",
                                  }}
                                >
                                  {Object.entries(confirmationErrors).map(
                                    ([field]) => {
                                      const tabIndex = confirmationFieldToTab[field];
                                      return (
                                        <li key={field}>
                                          <Typography variant="body2">
                                            <strong>{FIELD_LABELS[field] || field}</strong>
                                            {tabIndex !== undefined ? ` (${TAB_NAMES[tabIndex]} Tab)` : ""}
                                          </Typography>
                                        </li>
                                      );
                                    }
                                  )}
                                </ul>
                              </Box>
                            )}
                          </Box>
                        </Box>
                      )}
                  </Stack>
                  <Stack direction="row" justifyContent="flex-end" spacing={2}>
                    {renderActionButtons({ values, errors, isSubmitting, setFieldValue, handleSubmit })}
                  </Stack>
                </Stack>
              </Stack>
            </form>
          );
        }}
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
