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

  const [corrections, setCorrections] = useState({
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
  });

  const handleCancel = () => {
    onClose(false);
  };

  const handleChange = (e) => {
    setCorrections({
      ...corrections,
      id: sh ? sh.id : 0,
      [e.target.name]: e.target.value,
    });
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
      disableEscapeKeyDown
      fullWidth
      maxWidth="sm"
      aria-labelledby="confirmation-dialog-title"
      open={open}
      onClose={handleCancel}
      {...other}
    >
      <DialogTitle id="confirmation-dialog-title">Send Correction</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant="h5">Organization: {sh.name}</Typography>
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
              label={`Current name: ${sh.name}`}
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
              label={`Current address 1: ${sh.address1}`}
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
              label={`Current address 2: ${sh.address2}`}
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
              label={`Current city: ${sh.city}`}
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
              label={`Current state: ${sh.state}`}
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
              label={`Current zip code: ${sh.zip}`}
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
              label={`Current phone: ${sh.phone}`}
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
              label={`Current email: ${sh.email}`}
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
