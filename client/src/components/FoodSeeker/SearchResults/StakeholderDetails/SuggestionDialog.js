import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from "@material-ui/core";
import * as suggestionService from "services/suggestion-service";
import { TextField, Button } from "../../../UI";
import { DEFAULT_STAKEHOLDER } from "../../../../constants/stakeholder";
import { useToasterContext } from "../../../../contexts/toasterContext";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  button: {
    borderColor: theme.palette.primary.translucent,
    "&:hover": {
      background: theme.palette.primary.main,
    },
  },
}));

function SuggestionDialog(props) {
  const { setToast } = useToasterContext();
  const { onClose, open, stakeholder: sh, ...other } = props;

  const [stakeholder, setStakeholder] = useState({
    ...DEFAULT_STAKEHOLDER,
    ...sh,
  });

  const handleCancel = () => {
    onClose(false);
  };

  const handleChange = (e) => {
    setStakeholder({ ...stakeholder, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    return suggestionService
      .post(stakeholder)
      .then(() => {
        setToast({
          message: "Thank you for your help!",
        });
        onClose(true);
      })
      .catch(() => {
        setToast({
          message:
            "Sorry, submitting your correction failed, please email us at the address on the About page.",
        });
      });
  };

  const classes = useStyles();

  return (
    <Dialog
      disableEscapeKeyDown
      fullWidth
      maxWidth="sm"
      aria-labelledby="confirmation-dialog-title"
      open={open}
      {...other}
    >
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
          <Grid item xs={12}>
            <TextField
              type="text"
              size="small"
              multiline
              minRows={2}
              maxRows={12}
              label="Corrections"
              name="notes"
              margin="normal"
              fullWidth
              autoFocus
              value={stakeholder.notes}
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
              label="Your Name (optional)"
              name="tipsterName"
              margin="normal"
              fullWidth
              autoFocus
              value={stakeholder.tipsterName}
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
              autoFocus
              value={stakeholder.tipsterPhone}
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
              autoFocus
              value={stakeholder.tipsterEmail}
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
    </Dialog>
  );
}

SuggestionDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  stakeholder: PropTypes.object,
};

export default SuggestionDialog;
