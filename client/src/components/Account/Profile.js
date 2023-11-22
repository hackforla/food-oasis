import {
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import SEO from "components/SEO";
import { IconButton } from "components/UI/StandardButton";
import { useToasterContext } from "contexts/toasterContext";
import { useFormik } from "formik";
import { useState } from "react";
import { updateProfile } from "services/account-service";
import { object, string } from "yup";
import { useUserContext } from "../../contexts/userContext";
import { bodyText, headingText } from "../../theme/palette";

export default function Profile() {
  const { user, onUpdate } = useUserContext();
  const { setToast } = useToasterContext();
  const [fields, setFields] = useState({
    firstName: false,
    lastName: false,
    emailID: false,
  });

  const setFieldDefualt = () => {
    setFields({ firstName: false, lastName: false, emailID: false });
  };

  const formik = useFormik({
    initialValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    },
    validationSchema: object({
      firstName: string()
        .required("First name can not be blank!")
        .min(3, "can not be less than 3 letters!")
        .max(12, "can not be more than 12 letters!"),
      lastName: string()
        .required("Last name can not be blank!")
        .min(3, "can not be less than 3 letters!")
        .max(12, "can not be more than 12 letters!"),
      email: string()
        .required("Email can not be blank!")
        .email("Please enter valid email!"),
    }),
    onSubmit: async (values) => {
      const res = await updateProfile(user.id, values);
      if (res) {
        await onUpdate(res.data.user);
        await setToast({ message: "User profile updated successfully!" });
        setFieldDefualt();
      } else {
        setToast({ message: "Sorry! your profile could not be updated" });
      }
    },
  });

  return (
    <>
      <SEO title="User Profile" />
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={{ sm: 1, md: 3 }} alignItems={"center"}>
            <Grid item xs={4} sm={3} md={2}>
              <Typography variant="h4" component="h4" color={headingText}>
                First Name
              </Typography>
            </Grid>
            <Grid item xs={8} sm={9} md={10}>
              {!fields.firstName ? (
                <Typography variant="h4" component="h4" color={bodyText}>
                  {user.firstName}
                  <IconButton
                    icon="edit"
                    aria-label="edit"
                    size="small"
                    onClick={() =>
                      setFields((prevValues) => ({
                        ...prevValues,
                        firstName: true,
                      }))
                    }
                  />
                </Typography>
              ) : (
                <TextField
                  id="firstName"
                  name="firstName"
                  size="small"
                  margin="dense"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={Boolean(
                    formik.touched.firstName && formik.errors.firstName
                  )}
                  helperText={
                    formik.touched.firstName && formik.errors.firstName
                      ? formik.errors.firstName
                      : null
                  }
                />
              )}
            </Grid>
          </Grid>
          <Grid container spacing={{ sm: 1, md: 3 }} alignItems={"center"}>
            <Grid item xs={4} sm={3} md={2}>
              <Typography variant="h4" component="h4" color={headingText}>
                Last Name
              </Typography>
            </Grid>
            <Grid item xs={8} sm={9} md={10}>
              {!fields.lastName ? (
                <Typography variant="h4" component="h4" color={bodyText}>
                  {user.lastName}
                  <IconButton
                    icon="edit"
                    aria-label="edit"
                    size="small"
                    onClick={() =>
                      setFields((prevValues) => ({
                        ...prevValues,
                        lastName: true,
                      }))
                    }
                  />
                </Typography>
              ) : (
                <TextField
                  id="lastName"
                  name="lastName"
                  size="small"
                  margin="dense"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={Boolean(
                    formik.touched.lastName && formik.errors.lastName
                  )}
                  helperText={
                    formik.touched.lastName && formik.errors.lastName
                      ? formik.errors.lastName
                      : null
                  }
                />
              )}
            </Grid>
          </Grid>
          <Grid container spacing={{ sm: 1, md: 3 }} alignItems={"center"}>
            <Grid item xs={4} sm={3} md={2}>
              <Typography variant="h4" component="h4" color={headingText}>
                Email
              </Typography>
            </Grid>
            <Grid item xs={8} sm={9} md={10}>
              {!fields.emailID ? (
                <Typography variant="h4" component="h4" color={bodyText}>
                  {user.email}
                  <IconButton
                    icon="edit"
                    aria-label="edit"
                    size="small"
                    onClick={() =>
                      setFields((prevValues) => ({
                        ...prevValues,
                        emailID: true,
                      }))
                    }
                  />
                </Typography>
              ) : (
                <TextField
                  id="email"
                  name="email"
                  size="small"
                  margin="dense"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={Boolean(formik.touched.email && formik.errors.email)}
                  helperText={
                    formik.touched.email && formik.errors.email
                      ? formik.errors.email
                      : null
                  }
                />
              )}
            </Grid>
          </Grid>
          {(fields.firstName || fields.lastName || fields.emailID) && (
            <Grid container spacing={3}>
              <Grid item>
                <Button
                  sx={{ width: "100%" }}
                  type="submit"
                  size="small"
                  aria-label="save button"
                  color="primary"
                >
                  Save
                </Button>
              </Grid>
              <Grid item>
                <Button
                  size="small"
                  aria-label="cancel button"
                  color="secondary"
                  onClick={() => setFieldDefualt()}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          )}
        </form>
      </Container>
    </>
  );
}
