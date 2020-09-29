import React, { useState } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import {
  Container,
  CssBaseline,
  Button,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import * as suggestionService from "../services/suggestion-service";
import { withStyles } from "@material-ui/core";

const styles = (theme) => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

function Suggestion(props) {
  const { setToast, history, classes } = props;
  const [stakeholder, setStakeholder] = useState({
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
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setStakeholder({ ...stakeholder, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    return suggestionService
      .post(stakeholder)
      .then((response) => {
        setIsSubmitting(false);
        setToast({
          message: "Thank you for your help!",
        });
        history.push("/");
      })
      .catch((err) => {
        setIsSubmitting(false);
        setToast({
          message:
            "Sorry, submitting your correction failed, please email us at the address on the About page.",
        });
      });
  };

  return (
    <Container component="main" maxWidth="xs" className="classes.container">
      <CssBaseline />
      <Typography component="h1" variant="h5">
        Suggest a New Listing
      </Typography>
      <Grid container item spacing={1}>
        <Grid item xs={12}>
          <Typography>
            Please enter as much information as you can about the organization
            to help our volunteers verify the entry efficiently. Thank you for
            your help!
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
            label="Other Information"
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
      <Button
        type="button"
        fullWidth
        onClick={handleSubmit}
        variant="contained"
        color="primary"
        className={classes.submit}
        disabled={isSubmitting}
      >
        Send Suggestion
      </Button>
    </Container>
  );
}

Suggestion.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  stakeholder: PropTypes.object,
};

export default withStyles(styles)(withRouter(Suggestion));
