import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Label from "components/Admin/ui/Label";
import Textarea from "components/Admin/ui/Textarea";
import { FormikProps, withFormik } from "formik";
import * as suggestionService from "services/suggestion-service";
import * as Yup from "yup";
import type { Stakeholder } from "types/Stakeholder";

interface CorrectionFormValues {
  notes: string;
  tipsterName: string;
  tipsterPhone: string;
  tipsterEmail: string;
}

interface CorrectionFormOuterProps {
  stakeholder: Stakeholder | null;
  setToast: (toast: { message: string }) => void;
  onClose: (completed: boolean) => void;
  id?: string;
  open: boolean;
  keepMounted?: boolean;
  notes?: string;
  tipsterName?: string;
  tipsterPhone?: string;
  tipsterEmail?: string;
}

function CorrectionDialog(
  props: CorrectionFormOuterProps & FormikProps<CorrectionFormValues>
) {
  const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
    props;

  const { onClose, open, id, handleReset } = props;
  const handleCancel = () => {
    handleReset();
    onClose(false);
  };

  return (
    <Dialog
      disableEscapeKeyDown
      fullWidth
      maxWidth="sm"
      aria-labelledby="confirmation-dialog-title"
      open={open}
      id={id}
    >
      <form>
        <DialogTitle id="confirmation-dialog-title">
          Send Correction
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={1}>
            <Grid size={12}>
              <Typography>
                Please help us improve our data by letting us know when our
                information is incorrect. All fields are optional, but filling
                in as many as you can helps our volunteers to validate
                efficiently. Thanks!
              </Typography>
            </Grid>
            <Grid style={{ position: "relative" }} size={12}>
              <div>
                <Label id="notes" label="Corrections *" />
                <Textarea
                  placeholder="What needs to be corrected?"
                  name="notes"
                  id="notes"
                  fullWidth
                  value={values.notes}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.notes ? errors.notes : ""}
                  error={touched.notes && Boolean(errors.notes)}
                />
              </div>
            </Grid>
            <Grid size={12}>
              <div>
                <Label id="tipsterName" label="Your Name (optional)" />
                <TextField
                  id="tipsterName"
                  type="text"
                  size="small"
                  placeholder="Your Name (optional)"
                  name="tipsterName"
                  fullWidth
                  value={values.tipsterName}
                  onChange={handleChange}
                />
              </div>
            </Grid>
            <Grid size={12}>
              <div>
                <Label id="tipsterPhone" label="Your Phone (optional)" />
                <TextField
                  id="tipsterPhone"
                  type="text"
                  size="small"
                  placeholder="Your Phone (optional)"
                  name="tipsterPhone"
                  fullWidth
                  value={values.tipsterPhone}
                  onChange={handleChange}
                />
              </div>
            </Grid>
            <Grid size={12}>
              <div>
                <Label id="tipsterEmail" label="Your Email (optional)" />
                <TextField
                  id="tipsterEmail"
                  type="text"
                  size="small"
                  placeholder="Your Email (optional)"
                  name="tipsterEmail"
                  fullWidth
                  value={values.tipsterEmail}
                  onChange={handleChange}
                />
              </div>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" autoFocus onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => handleSubmit()}
            disabled={!values.notes}
          >
            Send
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
const validationsForm = {
  notes: Yup.string()
    .min(3, "Corrections must be at least 3 characters")
    .required("Please enter corrections"),
};

// formats the categories and hours data to an ugly stringify blob to pass validation on backend.
// corrections and suggestions share the same data schema, so this is so it matches
// the suggestion's schema format.
// @TODO maybe clean this up later
const formatArrayToString = (data: unknown[]) => {
  return data.reduce((accl: string, ele: unknown) => {
    return (accl += JSON.stringify(ele));
  }, "");
};

const CorrectionForm = withFormik<
  CorrectionFormOuterProps,
  CorrectionFormValues
>({
  mapPropsToValues: ({ notes, tipsterName, tipsterPhone, tipsterEmail }) => ({
    notes: notes || "",
    tipsterName: tipsterName || "",
    tipsterPhone: tipsterPhone || "",
    tipsterEmail: tipsterEmail || "",
  }),
  validationSchema: Yup.object(validationsForm),
  handleSubmit: (values, formikBag) => {
    // cherry pick the data we need for backend validation
    const org = formikBag.props.stakeholder;
    if (!org) return;
    const orgDetails = {
      stakeholderId: org.id,
      adminNotes: org.adminNotes || "",
      suggestionStatusId: null,
      name: org.name,
      address1: org.address1,
      address2: org.address2,
      city: org.city,
      state: org.state,
      zip: org.zip,
      phone: org.phone,
      email: org.email,
      hours: formatArrayToString(org.hours || []),
      category: formatArrayToString(org.categories),
      tenantId: org.tenantId,
      formType: "correction",
      ...values,
    };

    return suggestionService
      .post(orgDetails)
      .then(() => {
        formikBag.props.setToast({
          message: "Thank you for your help!",
        });
        formikBag.resetForm();
        formikBag.props.onClose(true);
      })
      .catch(() => {
        formikBag.props.setToast({
          message:
            "Sorry, submitting your correction failed, please email us via the Contact Us page.",
        });
      });
  },
})(CorrectionDialog);

export default CorrectionForm;
