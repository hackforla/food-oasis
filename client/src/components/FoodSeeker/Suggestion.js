import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { Button } from "@mui/material";
import {
  Container,
  CssBaseline,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import * as suggestionService from "services/suggestion-service";
import { Formik } from "formik";
import * as Yup from "yup";
import { DEFAULT_STAKEHOLDER } from "../../constants/stakeholder";
import { useToasterContext } from "contexts/toasterContext";
import { useTheme } from "@mui/styles";

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
  const { history } = props;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"), {
    defaultMatches: true,
  });

  return (
    <Container component="main" maxWidth="lg" spacing={{ xs: 1, sm: 4 }}>
      <CssBaseline />
      <Typography component="h1" variant="h4" align="center">
        SUGGEST A NEW LISTING
      </Typography>
      <Typography variant="body1" textAlign="center">
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
          isValid,
          dirty,
        }) => (
          <form onSubmit={handleSubmit}>
            <Container maxWidth={isMobile ? "lg" : "md"}>
              <Grid2
                container
                justifyContent="center"
                alignItems={"center"}
                spacing={{ xs: 0, sm: 3 }}
              >
                <Grid2 item xs={12} sm={6}>
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
                </Grid2>
                <Grid2 item xs={12} sm={6}>
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
                </Grid2>
                <Grid2 item xs={12} sm={6}>
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
                </Grid2>
                <Grid2 item xs={12} sm={6}>
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
                </Grid2>
                <Grid2 item xs={12} sm={6}>
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
                </Grid2>
                <Grid2 item xs={12} sm={6}>
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
                </Grid2>
                <Grid2 item xs={12} sm={6}>
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
                </Grid2>
                <Grid2 item xs={12} sm={6}>
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
                </Grid2>
                <Grid2 item xs={12} sm={6}>
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
                </Grid2>
                <Grid2 item xs={12} sm={6}>
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
                </Grid2>
                <Grid2 item xs={12} sm={6}>
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
                </Grid2>
                <Grid2 item xs={12} sm={6}>
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
                </Grid2>
                <Grid2 item xs={12} sm={6}>
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
                    helperText={touched.tipsterPhone ? errors.tipsterPhone : ""}
                    error={touched.tipsterPhone && Boolean(errors.tipsterPhone)}
                  />
                </Grid2>
                <Grid2 xs={12} sm={6}>
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
                    helperText={touched.tipsterEmail ? errors.tipsterEmail : ""}
                    error={touched.tipsterEmail && Boolean(errors.tipsterEmail)}
                  />
                </Grid2>
                <Grid2 xs={12} padding="1rem" textAlign="center">
                  <Button
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={isSubmitting || !(isValid && dirty)}
                  >
                    Send Suggestions
                  </Button>
                </Grid2>
              </Grid2>
            </Container>
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

export default withRouter(Suggestion);
