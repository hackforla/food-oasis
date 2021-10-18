import React, { useState } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { Container, CssBaseline, Grid, Typography } from "@material-ui/core";
import * as suggestionService from "services/suggestion-service";
import { withStyles } from "@material-ui/core";
import { Input, Button } from "../../components/UI";
import { DEFAULT_STAKEHOLDER } from "../../constants/stakeholder";

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
  const [stakeholder, setStakeholder] = useState(DEFAULT_STAKEHOLDER);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setStakeholder({ ...stakeholder, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    return suggestionService
      .post(stakeholder)
      .then(() => {
        setIsSubmitting(false);
        setToast({
          message: "Thank you for your help!",
        });
        history.push("/");
      })
      .catch(() => {
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
          <Input
            type="text"
            size="small"
            label="Organization Name"
            name="name"
            margin="normal"
            fullWidth
            autoFocus
            value={stakeholder.name}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            type="text"
            size="small"
            label="Category (Food Pantry, Meal Program, etc.)"
            name="category"
            margin="normal"
            fullWidth
            autoFocus
            value={stakeholder.category}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            type="text"
            size="small"
            label="Address Line 1"
            name="address1"
            margin="normal"
            fullWidth
            autoFocus
            value={stakeholder.address1}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            type="text"
            size="small"
            label="Address Line 2"
            name="address2"
            margin="normal"
            fullWidth
            autoFocus
            value={stakeholder.address2}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            type="text"
            size="small"
            label="City"
            name="city"
            margin="normal"
            fullWidth
            autoFocus
            value={stakeholder.city}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            type="text"
            size="small"
            label="State"
            name="state"
            margin="normal"
            fullWidth
            autoFocus
            value={stakeholder.state}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            type="text"
            size="small"
            label="Zip Code"
            name="zip"
            margin="normal"
            fullWidth
            autoFocus
            value={stakeholder.zip}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            type="text"
            size="small"
            label="Phone"
            name="phone"
            margin="normal"
            fullWidth
            autoFocus
            value={stakeholder.phone}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            type="text"
            size="small"
            label="Email"
            name="email"
            margin="normal"
            fullWidth
            autoFocus
            value={stakeholder.email}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            type="text"
            size="small"
            multiline
            minRows={2}
            maxRows={12}
            label="Changes to Hours"
            name="hours"
            margin="normal"
            fullWidth
            autoFocus
            value={stakeholder.hours}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            type="text"
            size="small"
            multiline
            minRows={2}
            maxRows={12}
            label="Other Information"
            name="notes"
            margin="normal"
            fullWidth
            autoFocus
            value={stakeholder.notes}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            type="text"
            size="small"
            multiline
            minRows={2}
            maxRows={12}
            label="Your Name"
            name="tipsterName"
            margin="normal"
            fullWidth
            autoFocus
            value={stakeholder.tipsterName}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            type="text"
            size="small"
            multiline
            minRows={2}
            maxRows={12}
            label="Your Phone"
            name="tipsterPhone"
            margin="normal"
            fullWidth
            autoFocus
            value={stakeholder.tipsterPhone}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            type="text"
            size="small"
            multiline
            minRows={2}
            maxRows={12}
            label="Your Email"
            name="tipsterEmail"
            margin="normal"
            fullWidth
            autoFocus
            value={stakeholder.tipsterEmail}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
      <Button
        text="Send Suggestions"
        fullWidth
        onClick={handleSubmit}
        className={classes.submit}
        disabled={isSubmitting}
      />
    </Container>
  );
}

Suggestion.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  stakeholder: PropTypes.object,
};

export default withStyles(styles)(withRouter(Suggestion));
