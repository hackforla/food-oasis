import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { Button, Grid } from "@mui/material";
import { Container, TextField, Typography, useMediaQuery } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import * as suggestionService from "services/suggestion-service";
import { Formik } from "formik";
import * as Yup from "yup";
import { DEFAULT_STAKEHOLDER } from "../../constants/stakeholder";
import { useToasterContext } from "contexts/toasterContext";
import { useTheme } from "@mui/styles";
import Footer from "components/Layout/Footer";
import Label from "components/Admin/ui/Label";
import Textarea from "components/Admin/ui/Textarea";

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
      <Grid container spacing={3} justifyContent="center">
        <Grid item>
          <Typography component="h1" variant="h4" align="center">
            SUGGEST A NEW LISTING
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body1" textAlign="center">
            Please enter as much information as you can about the organization
            to help our volunteers verify the entry efficiently. Thank you for
            your help!
          </Typography>
        </Grid>
        <Grid item>
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
                    alignItems={"flex-start"}
                    spacing={{ xs: 0, sm: 3 }}
                  >
                    <Grid2 item xs={12} sm={6}>
                      <div>
                        <Label id="name" label="Organization Name" />
                        <TextField
                          id="name"
                          required
                          type="text"
                          size="small"
                          placeholder="Organization Name"
                          name="name"
                          fullWidth
                          autoFocus
                          value={values.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          helperText={touched.name ? errors.name : ""}
                          error={touched.name && Boolean(errors.name)}
                        />
                      </div>
                    </Grid2>
                    <Grid2 item xs={12} sm={6}>
                      <div>
                        <Label
                          id="category"
                          label="Category (Food Pantry, Meal Program, etc.)"
                        />
                        <TextField
                          id="category"
                          type="text"
                          size="small"
                          placeholder="Category (Food Pantry, Meal Program, etc.)"
                          name="category"
                          fullWidth
                          value={values.category}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          helperText={touched.category ? errors.category : ""}
                          error={touched.category && Boolean(errors.category)}
                        />
                      </div>
                    </Grid2>
                    <Grid2 item xs={12} sm={6}>
                      <div>
                        <Label id="address1" label="Address Line 1" />
                        <TextField
                          id="address1"
                          type="text"
                          size="small"
                          placeholder="Address Line 1"
                          name="address1"
                          fullWidth
                          value={values.address1}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          helperText={touched.address1 ? errors.address1 : ""}
                          error={touched.address1 && Boolean(errors.address1)}
                        />
                      </div>
                    </Grid2>
                    <Grid2 item xs={12} sm={6}>
                      <div>
                        <Label id="address2" label="Address Line 2" />
                        <TextField
                          id="address2"
                          type="text"
                          size="small"
                          placeholder="Address Line 2"
                          name="address2"
                          fullWidth
                          value={values.address2}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          helperText={touched.address2 ? errors.address2 : ""}
                          error={touched.address2 && Boolean(errors.address2)}
                        />
                      </div>
                    </Grid2>
                    <Grid2 item xs={12} sm={6}>
                      <div>
                        <Label id="city" label="City" />
                        <TextField
                          id="city"
                          type="text"
                          size="small"
                          placeholder="City"
                          name="city"
                          fullWidth
                          value={values.city}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          helperText={touched.city ? errors.city : ""}
                          error={touched.city && Boolean(errors.city)}
                        />
                      </div>
                    </Grid2>
                    <Grid2 item xs={12} sm={6}>
                      <div>
                        <Label id="state" label="State" />
                        <TextField
                          id="state"
                          type="text"
                          size="small"
                          placeholder="State"
                          name="state"
                          fullWidth
                          value={values.state}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          helperText={touched.state ? errors.state : ""}
                          error={touched.state && Boolean(errors.state)}
                        />
                      </div>
                    </Grid2>
                    <Grid2 item xs={12} sm={6}>
                      <div>
                        <Label id="zip" label="Zip Code" />
                        <TextField
                          id="zip"
                          type="text"
                          size="small"
                          placeholder="Zip Code"
                          name="zip"
                          fullWidth
                          value={values.zip}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          helperText={touched.zip ? errors.zip : ""}
                          error={touched.zip && Boolean(errors.zip)}
                        />
                      </div>
                    </Grid2>
                    <Grid2 item xs={12} sm={6}>
                      <div>
                        <Label id="phone" label="Phone" />
                        <TextField
                          id="phone"
                          type="text"
                          size="small"
                          placeholder="Phone"
                          name="phone"
                          inputProps={{ minLength: 8, maxLength: 16 }}
                          fullWidth
                          value={values.phone}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          helperText={touched.phone ? errors.phone : ""}
                          error={touched.phone && Boolean(errors.phone)}
                        />
                      </div>
                    </Grid2>
                    <Grid2 item xs={12} sm={6}>
                      <div>
                        <Label id="email" label="Email" />
                        <TextField
                          id="email"
                          type="text"
                          size="small"
                          placeholder="Email"
                          name="email"
                          fullWidth
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          helperText={touched.email ? errors.email : ""}
                          error={touched.email && Boolean(errors.email)}
                        />
                      </div>
                    </Grid2>
                    <Grid2 item xs={12} sm={6}>
                      <div>
                        <Label id="hours" label="Hours" />
                        <Textarea
                          id="hours"
                          type="text"
                          size="small"
                          placeholder="Hours"
                          name="hours"
                          fullWidth
                          value={values.hours}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          helperText={touched.hours ? errors.hours : ""}
                          error={touched.hours && Boolean(errors.hours)}
                        />
                      </div>
                    </Grid2>
                    <Grid2 item xs={12} sm={6}>
                      <div>
                        <Label id="notes" label="Other Information" />
                        <Textarea
                          id="notes"
                          type="text"
                          size="small"
                          placeholder="Other Information"
                          name="notes"
                          fullWidth
                          value={values.notes}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          helperText={touched.notes ? errors.notes : ""}
                          error={touched.notes && Boolean(errors.notes)}
                        />
                      </div>
                    </Grid2>
                    <Grid2 item xs={12} sm={6}>
                      <div>
                        <Label id="tipsterName" label="Your Name" />
                        <TextField
                          id="tipsterName"
                          type="text"
                          size="small"
                          placeholder="Your Name"
                          name="tipsterName"
                          fullWidth
                          value={values.tipsterName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          helperText={
                            touched.tipsterName ? errors.tipsterName : ""
                          }
                          error={
                            touched.tipsterName && Boolean(errors.tipsterName)
                          }
                        />
                      </div>
                    </Grid2>
                    <Grid2 item xs={12} sm={6}>
                      <div>
                        <Label id="tipsterPhone" label="Your Phone" />
                        <TextField
                          id="tipsterPhone"
                          type="text"
                          size="small"
                          placeholder="Your Phone"
                          name="tipsterPhone"
                          inputProps={{ minLength: 8, maxLength: 16 }}
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
                      </div>
                    </Grid2>
                    <Grid2 xs={12} sm={6}>
                      <div>
                        <Label id="tipsterEmail" label="Your Email" />
                        <TextField
                          id="tipsterEmail"
                          type="text"
                          size="small"
                          placeholder="Your Email"
                          name="tipsterEmail"
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
                      </div>
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
        </Grid>
        <Grid item width="100%">
          <Footer />
        </Grid>
      </Grid>
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
