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
  const [stakeholder] = useState(
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
          category: "",
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
          category: "",
        }
  );
  const [corrections, setCorrections] = useState(
    sh
      ? {
          id: sh.id,
          name: sh.name,
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
          category: "",
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
          category: "",
        }
  );

  const handleCancel = () => {
    onClose(false);
  };

  const handleChange = (e) => {
    setCorrections({ ...corrections, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    return suggestionService
      .post(corrections)
      .then((response) => {
        setToast({
          message: "Mahalo for your help!",
        });
        onClose(true);
      })
      .catch((err) => {
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
            {/* <Typography>
              Please help us improve our data by letting us know when our
              information is incorrect. All fields are optional, but filling in
              as many as you can helps our volunteers to validate efficiently.
              Thanks!
            </Typography> */}
            <Typography variant="h5">
              Organization: {stakeholder.name}
            </Typography>
            <Typography>
              Please help us improve our data by letting us know when our
              information is incorrect. Please fill corrections into any of the
              fields below. Mahalo!
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="text"
              size="small"
              label={`Current name: ${stakeholder.name}`}
              name="name"
              variant="outlined"
              margin="normal"
              fullWidth
              autoFocus
              value={corrections.name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="text"
              size="small"
              label={`Current address 1: ${stakeholder.address1}`}
              name="address1"
              variant="outlined"
              margin="normal"
              fullWidth
              autoFocus
              value={corrections.address1}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="text"
              size="small"
              label={`Current address 2: ${stakeholder.address2}`}
              name="address2"
              variant="outlined"
              margin="normal"
              fullWidth
              autoFocus
              value={corrections.address2}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="text"
              size="small"
              label={`Current city: ${stakeholder.city}`}
              name="city"
              variant="outlined"
              margin="normal"
              fullWidth
              autoFocus
              value={corrections.city}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="text"
              size="small"
              label={`Current state: ${stakeholder.state}`}
              name="state"
              variant="outlined"
              margin="normal"
              fullWidth
              autoFocus
              value={corrections.state}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="text"
              size="small"
              label={`Current zip code: ${stakeholder.zip}`}
              name="zip"
              variant="outlined"
              margin="normal"
              fullWidth
              autoFocus
              value={corrections.zip}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="text"
              size="small"
              label={`Current phone: ${stakeholder.phone}`}
              name="phone"
              variant="outlined"
              margin="normal"
              fullWidth
              autoFocus
              value={corrections.phone}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="text"
              size="small"
              label={`Current email: ${stakeholder.email}`}
              name="email"
              variant="outlined"
              margin="normal"
              fullWidth
              autoFocus
              value={corrections.email}
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
              value={corrections.hours}
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
              value={corrections.notes}
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
              value={corrections.tipsterName}
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
              value={corrections.tipsterPhone}
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
              value={corrections.tipsterEmail}
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
