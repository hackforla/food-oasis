import React from "react";
import { withFormik } from "formik";
import PropTypes from "prop-types";
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
import * as suggestionService from "services/suggestion-service";
import { DEFAULT_STAKEHOLDER } from "../../../../constants/stakeholder";
import * as Yup from "yup";
import Label from "components/Admin/ui/Label";
import Textarea from "components/Admin/ui/Textarea";

function SuggestionDialog(props) {
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
            <Grid item xs={12}>
              <Typography>
                Please help us improve our data by letting us know when our
                information is incorrect. All fields are optional, but filling
                in as many as you can helps our volunteers to validate
                efficiently. Thanks!
              </Typography>
            </Grid>
            <Grid item xs={12} style={{ position: "relative" }}>
              <div>
                <Label id="notes" label="Corrections *" />
                <Textarea
                  type="text"
                  size="small"
                  minRows={2}
                  maxRows={12}
                  placeholder="Corrections"
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
            <Grid item xs={12}>
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
            <Grid item xs={12}>
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
            <Grid item xs={12}>
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
            onClick={handleSubmit}
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

const SuggestionForm = withFormik({
  mapPropsToValues: ({ notes, tipsterName, tipsterPhone, tipsterEmail }) => ({
    notes: notes || "",
    tipsterName: tipsterName || "",
    tipsterPhone: tipsterPhone || "",
    tipsterEmail: tipsterEmail || "",
  }),
  validationSchema: Yup.object(validationsForm),
  handleSubmit: (values, formikBag) => {
    const stakeholder = {
      ...DEFAULT_STAKEHOLDER,
      ...formikBag.stakeholder,
    };

    // Construct the suggestion by starting with the stakeholder record,
    // adding values from the suggestion form properties, and then
    // moving the original stakeholder.id to be the stakeholderId property
    // of the suggestion
    const altered = {
      ...stakeholder,
      ...values,
      stakeholderId: stakeholder.id,
      id: null,
    };

    return suggestionService
      .post(altered)
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
            "Sorry, submitting your correction failed, please email us at the address on the About page.",
        });
      });
  },
})(SuggestionDialog);

SuggestionDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  stakeholder: PropTypes.object,
};

export default SuggestionForm;
