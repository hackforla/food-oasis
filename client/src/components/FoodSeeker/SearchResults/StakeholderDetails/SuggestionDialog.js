import React from "react";
import { withFormik } from 'formik'
import PropTypes from "prop-types";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import * as suggestionService from "services/suggestion-service";
import { TextField, Button } from "../../../UI";
import { DEFAULT_STAKEHOLDER } from "../../../../constants/stakeholder";
import * as Yup from 'yup';

const useStyles = makeStyles((theme) => ({
  button: {
    borderColor: theme.palette.primary.translucent,
    "&:hover": {
      background: theme.palette.primary.main,
    },
  },
  correctionInput: {
    '& div': {
      '& textarea': {
        paddingRight: "2rem"
      }
    }
  },
  asterisk: {
    position: "absolute",
    top: "40px",
    right: "2rem",
    transform: "translateY(-8px)",
    color: "red",
    fontSize: "2rem"
  }
}));
function SuggestionDialog(props) {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit
  } = props;

  const { onClose, open, id } = props;
  const classes = useStyles();
  const handleCancel = () => onClose(false);

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
        <DialogTitle id="confirmation-dialog-title">Send Correction</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography>
                Please help us improve our data by letting us know when our
                information is incorrect. All fields are optional, but filling in
                as many as you can helps our volunteers to validate efficiently.
                Thanks!
              </Typography>
            </Grid>
            <Grid item xs={12} style={{ position: "relative" }}>
              <TextField
                type="text"
                className={classes.correctionInput}
                size="small"
                multiline
                minRows={2}
                maxRows={12}
                label="Corrections"
                name="notes"
                id="notes"
                margin="normal"
                fullWidth
                value={values.notes}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={touched.notes ? errors.notes : ""}
                error={touched.notes && Boolean(errors.notes)}
              />
              <div className={classes.asterisk}>*</div>
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="text"
                size="small"
                multiline
                minRows={2}
                maxRows={12}
                label="Your Name (optional)"
                name="tipsterName"
                margin="normal"
                fullWidth
                value={values.tipsterName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="text"
                size="small"
                multiline
                minRows={2}
                maxRows={12}
                label="Your Phone (optional)"
                name="tipsterPhone"
                margin="normal"
                fullWidth
                value={values.tipsterPhone}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="text"
                size="small"
                multiline
                minRows={2}
                maxRows={12}
                label="Your Email (optional)"
                name="tipsterEmail"
                margin="normal"
                fullWidth
                value={values.tipsterEmail}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            className={classes.button}
            autoFocus
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Send</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
const validationsForm = {
  notes: Yup.string()
    .min(3, "Corrections must be at least 3 characters")
    .required("Please enter corrections")
};

const SuggestionForm = withFormik({
  mapPropsToValues: ({ notes, tipsterName, tipsterPhone, tipsterEmail }) =>
  ({
    notes: notes || '',
    tipsterName: tipsterName || '',
    tipsterPhone: tipsterPhone || '',
    tipsterEmail: tipsterEmail || ''
  }),
  validationSchema: Yup.object(validationsForm),
  handleSubmit: (values, { props }) => {

    const stakeholder = {
      ...DEFAULT_STAKEHOLDER,
      ...props.stakeholder,
    }

    const altered = { ...stakeholder, ...values };

    return suggestionService
      .post(altered)
      .then(() => {
        props.setToast({
          message: "Thank you for your help!",
        });
        props.onClose(true);
      })
      .catch(() => {
        props.setToast({
          message:
            "Sorry, submitting your correction failed, please email us at the address on the About page.",
        });
      });
  }
})(SuggestionDialog);

SuggestionDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  stakeholder: PropTypes.object,
};

export default SuggestionForm;
