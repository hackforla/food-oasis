import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import {
  Container,
  CssBaseline,
  Grid,
  Typography,
  useMediaQuery,
} from "@mui/material";
import * as suggestionService from "services/suggestion-service";
import withStyles from '@mui/styles/withStyles';
import { Formik } from "formik";
import * as Yup from "yup";
import { TextField, Button } from "../../components/UI";
import { DEFAULT_STAKEHOLDER } from "../../constants/stakeholder";
import { useToasterContext } from "contexts/toasterContext";
import { useTheme } from "@mui/styles";

const styles = (theme) => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  header: {
    marginTop: theme.spacing(3),
    fontWeight: 500,
    textTransform: "uppercase",
    [theme.breakpoints.up("sm")]: {
      marginTop: theme.spacing(3),
    },
  },
  container: {
    padding: theme.spacing(1),
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
  subtitle: {
    padding: theme.spacing(3, 4, 2),
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(4, 0, 7),
      textAlign: "center",
    },
  },
  submit: {
    width: "100%",
    margin: theme.spacing(3, 0, 2),
    padding: ".5em",
    [theme.breakpoints.up("sm")]: {
      width: "40%",
    },
  },
});

// const phoneRegExp =
//   /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Please enter the Organization Name"),
  category: Yup.string(),
  address1: Yup.string(),
  address2: Yup.string(),
  city: Yup.string(),
  state: Yup.string().min(2),
  zip: Yup.string().min(5).max(10),
  phone: Yup.string(),
  email: Yup.string().email("Please enter a valid Email"),
  hours: Yup.string(),
  notes: Yup.string(),
  tipsterName: Yup.string(),
  tipsterPhone: Yup.string(),
  tipsterEmail: Yup.string().email("Please enter a valid Email"),
});

function Suggestion(props) {
  const { setToast } = useToasterContext();
  const { history, classes } = props;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'), {
    defaultMatches: true,
  });

  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <Typography
        component="h1"
        variant="h5"
        className={classes.header}
        align="center"
      >
        Suggest a New Listing
      </Typography>
      <Typography className={classes.subtitle}>
        Please enter as much information as you can about the organization to
        help our volunteers verify the entry efficiently. Thank you for your
        help!
      </Typography>
      <Formik
        initialValues={DEFAULT_STAKEHOLDER}
        validationSchema={validationSchema}
        onSubmit={async (value, formikBag) => {
          formikBag.setSubmitting(true);
          return suggestionService
            .post(value)
            .then(() => {
              formikBag.setSubmitting(false);
              setToast({
                message: "Thank you for your help!",
              });
              history.push("/");
            })
            .catch(() => {
              formikBag.setSubmitting(false);
              setToast({
                message:
                  "Sorry, submitting your correction failed, please email us at the address on the About page.",
              });
            });
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
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <Grid
              container
              justifyContent="center"
              alignItems={"center"}
              spacing={isMobile ? 2 : 4}
              className={classes.container}
            >
              <Container
                maxWidth={isMobile ? "lg" : "md"}
                disableGutters={true}
              >
                <Grid
                  container
                  justifyContent="center"
                  alignItems={"center"}
                  spacing={isMobile ? 0 : 4}
                  className={classes.container}
                >
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      type="text"
                      size="small"
                      label="Organization Name"
                      name="name"
                      margin="normal"
                      fullWidth
                      autoFocus
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.name ? errors.name : ""}
                      error={touched.name && Boolean(errors.name)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      type="text"
                      size="small"
                      label="Category (Food Pantry, Meal Program, etc.)"
                      name="category"
                      margin="normal"
                      fullWidth
                      value={values.category}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.category ? errors.category : ""}
                      error={touched.category && Boolean(errors.category)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      type="text"
                      size="small"
                      label="Address Line 1"
                      name="address1"
                      margin="normal"
                      fullWidth
                      value={values.address1}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.address1 ? errors.address1 : ""}
                      error={touched.address1 && Boolean(errors.address1)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      type="text"
                      size="small"
                      label="Address Line 2"
                      name="address2"
                      margin="normal"
                      fullWidth
                      value={values.address2}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.address2 ? errors.address2 : ""}
                      error={touched.address2 && Boolean(errors.address2)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      type="text"
                      size="small"
                      label="City"
                      name="city"
                      margin="normal"
                      fullWidth
                      value={values.city}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.city ? errors.city : ""}
                      error={touched.city && Boolean(errors.city)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      type="text"
                      size="small"
                      label="State"
                      name="state"
                      margin="normal"
                      fullWidth
                      value={values.state}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.state ? errors.state : ""}
                      error={touched.state && Boolean(errors.state)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      type="text"
                      size="small"
                      label="Zip Code"
                      name="zip"
                      margin="normal"
                      fullWidth
                      value={values.zip}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.zip ? errors.zip : ""}
                      error={touched.zip && Boolean(errors.zip)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      type="text"
                      size="small"
                      label="Phone"
                      name="phone"
                      margin="normal"
                      inputProps={{ minLength: 8, maxLength: 16 }}
                      fullWidth
                      value={values.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.phone ? errors.phone : ""}
                      error={touched.phone && Boolean(errors.phone)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      type="text"
                      size="small"
                      label="Email"
                      name="email"
                      margin="normal"
                      fullWidth
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.email ? errors.email : ""}
                      error={touched.email && Boolean(errors.email)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      type="text"
                      size="small"
                      multiline
                      label="Hours"
                      name="hours"
                      margin="normal"
                      fullWidth
                      value={values.hours}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.hours ? errors.hours : ""}
                      error={touched.hours && Boolean(errors.hours)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      type="text"
                      size="small"
                      multiline
                      label="Other Information"
                      name="notes"
                      margin="normal"
                      fullWidth
                      value={values.notes}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.notes ? errors.notes : ""}
                      error={touched.notes && Boolean(errors.notes)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      type="text"
                      size="small"
                      multiline
                      label="Your Name"
                      name="tipsterName"
                      margin="normal"
                      fullWidth
                      value={values.tipsterName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.tipsterName ? errors.tipsterName : ""}
                      error={touched.tipsterName && Boolean(errors.tipsterName)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      type="text"
                      size="small"
                      multiline
                      label="Your Phone"
                      name="tipsterPhone"
                      inputProps={{ minLength: 8, maxLength: 16 }}
                      margin="normal"
                      fullWidth
                      value={values.tipsterPhone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={
                        touched.tipsterPhone ? errors.tipsterPhone : ""
                      }
                      error={
                        touched.tipsterPhone && Boolean(errors.tipsterPhone)
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      type="text"
                      size="small"
                      multiline
                      label="Your Email"
                      name="tipsterEmail"
                      margin="normal"
                      fullWidth
                      value={values.tipsterEmail}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={
                        touched.tipsterEmail ? errors.tipsterEmail : ""
                      }
                      error={
                        touched.tipsterEmail && Boolean(errors.tipsterEmail)
                      }
                    />
                  </Grid>
                </Grid>
              </Container>
              <Button
                size={isMobile ? "small" : "large"}
                onClick={handleSubmit}
                className={classes.submit}
                disabled={isSubmitting}
              >
                Send Suggestions
              </Button>
            </Grid>
          </form>
        )}
      </Formik>
    </Container>
  );
}

Suggestion.propTypes = {
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
  value: PropTypes.object,
  setSubmitting: PropTypes.bool,
};

export default withStyles(styles)(withRouter(Suggestion));
