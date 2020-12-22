import React, { useState } from "react";
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
} from "@material-ui/core";
import * as suggestionService from "../services/suggestion-service";

function SuggestionDialog(props) {
  const { onClose, open, setToast, stakeholder: sh, ...other } = props;
  const [stakeholder, setStakeholder] = useState(
    sh
      ? {
          id: sh.id,
          name: sh.name,
          address1: sh.address1,
          address2: sh.address2,
          city: sh.city,
          state: sh.state,
          zip: sh.zip,
          phone: sh.phone,
          email: sh.email,
          notes: "",
          hours: "",
          tipsterName: "",
          tipsterPhone: "",
          tipsterEmail: "",
        }
      : {
          id: 0,
          name: "",
          address1: "",
          address2: "",
          city: "",
          state: "",
          zip: "",
          phone: "",
          email: "",
          notes: "",
          hours: "",
          tipsterName: "",
          tipsterPhone: "",
          tipsterEmail: "",
        }
  );

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

  return (
    <Dialog
      disableBackdropClick
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
              label="Organization Name"
              name="name"
              variant="outlined"
              margin="normal"
              fullWidth
              autoFocus
              value={stakeholder.name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="text"
              size="small"
              label="Address Line 1"
              name="address1"
              variant="outlined"
              margin="normal"
              fullWidth
              autoFocus
              value={stakeholder.address1}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="text"
              size="small"
              label="Address Line 2"
              name="address2"
              variant="outlined"
              margin="normal"
              fullWidth
              autoFocus
              value={stakeholder.address2}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="text"
              size="small"
              label="City"
              name="city"
              variant="outlined"
              margin="normal"
              fullWidth
              autoFocus
              value={stakeholder.city}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="text"
              size="small"
              label="State"
              name="state"
              variant="outlined"
              margin="normal"
              fullWidth
              autoFocus
              value={stakeholder.state}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="text"
              size="small"
              label="Zip Code"
              name="zip"
              variant="outlined"
              margin="normal"
              fullWidth
              autoFocus
              value={stakeholder.zip}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="text"
              size="small"
              label="Phone"
              name="phone"
              variant="outlined"
              margin="normal"
              fullWidth
              autoFocus
              value={stakeholder.phone}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="text"
              size="small"
              label="Email"
              name="email"
              variant="outlined"
              margin="normal"
              fullWidth
              autoFocus
              value={stakeholder.email}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="text"
              size="small"
              multiline
              rows={2}
              rowsMax={12}
              label="Changes to Hours"
              name="hours"
              variant="outlined"
              margin="normal"
              fullWidth
              autoFocus
              value={stakeholder.hours}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="text"
              size="small"
              multiline
              rows={2}
              rowsMax={12}
              label="Other corrections / information"
              name="notes"
              variant="outlined"
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
              rows={2}
              rowsMax={12}
              label="Your Name"
              name="tipsterName"
              variant="outlined"
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
              rows={2}
              rowsMax={12}
              label="Your Phone"
              name="tipsterPhone"
              variant="outlined"
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
              rows={2}
              rowsMax={12}
              label="Your Email"
              name="tipsterEmail"
              variant="outlined"
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
        <Button autoFocus onClick={handleCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Send
        </Button>
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
