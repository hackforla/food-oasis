import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  Stack,
} from "@mui/material";
import * as analytics from "../../services/analytics";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import Footer from "../Layout/Footer";

import { Formik } from "formik";
import * as Yup from "yup";
import Textarea from "components/Admin/ui/Textarea";
import { sendContactForm } from "services/contact-service";
import { Check } from "@mui/icons-material";
import useBreakpoints from "hooks/useBreakpoints";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Please enter your name"),
  email: Yup.string().email("Invalid email address format"),
  title: Yup.string(),
  message: Yup.string().required("Message is required"),
});

const EmailAndPhone = (props) => {
  return (
    <>
      <TextField
        helperText={props.touched.email ? props.errors.email : ""}
        error={props.touched.email && Boolean(props.errors.email)}
        type="email"
        name="email"
        placeholder="Email (Optional)"
        value={props.values.email}
        onChange={props.handleChange}
        onBlur={props.handleBlur}
      />
      <TextField
        type="phone"
        name="phone"
        placeholder="Phone Number (Optional)"
        value={props.values.phone}
        onChange={props.handleChange}
        onBlur={props.handleBlur}
      />
    </>
  );
};

const Contact = () => {
  useEffect(() => {
    analytics.postEvent("visitContactPage");
  }, []);

  const [open, setOpen] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { isMobile } = useBreakpoints();

  const navigate = useNavigate();

  return (
    <Container
      sx={{
        padding: { xs: "1.5rem 10px", md: "1.5rem 2rem" },
        margin: "0 auto",
        maxWidth: "1200px",
      }}
    >
      <Typography
        variant="h1"
        sx={{
          textTransform: "uppercase",
          textAlign: "center",
          margin: 0,
          padding: isMobile ? "20px 0 0 0" : "32px 0",
        }}
      >
        Contact Us
      </Typography>
      <Box
        className="bottom-box"
        sx={{
          margin: isMobile ? "15px 0 32px 0" : "32px 0",
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <Box
          className="words"
          sx={{
            margin: "5px",
            lineHeight: "26.55px",
          }}
          component="ul"
        >
          <Typography
            variant="subtitle1"
            sx={{
              color: "black",
              textTransform: "uppercase",
              maxWidth: "392px",
              fontWeight: "500",
            }}
          >
            How can we help?
          </Typography>
        </Box>
        <Formik
          initialValues={{
            name: "",
            email: "",
            phone: "",
            title: "",
            message: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            sendContactForm(values)
              .then(() => {
                setSubmitError("");
                handleOpen();
              })
              .catch(() => {
                setSubmitError(
                  "There was an error with your submission. Please try again."
                );
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
            isValid,
            dirty,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box
                sx={{
                  height: isMobile ? "520px" : "560px",
                  "& > div": {
                    height: "61px",
                    marginTop: isMobile ? "3px" : "12px",
                    marginBottom: isMobile ? "3px" : "12px",
                  },
                }}
              >
                <TextField
                  helperText={touched.name ? errors.name : ""}
                  error={touched.name && Boolean(errors.name)}
                  type="input"
                  name="name"
                  placeholder="Your Name *"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {isMobile ? (
                  <EmailAndPhone
                    touched={touched}
                    errors={errors}
                    values={values}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    isMobile={isMobile}
                  />
                ) : (
                  <Stack
                    direction={"row"}
                    spacing={4}
                    sx={{ "& > *": { width: "604px" } }}
                  >
                    <EmailAndPhone
                      touched={touched}
                      errors={errors}
                      values={values}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      isMobile={isMobile}
                    />
                  </Stack>
                )}
                <TextField
                  helperText={touched.title ? errors.title : ""}
                  error={touched.title && Boolean(errors.title)}
                  type="input"
                  name="title"
                  placeholder="Subject (Optional)"
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Textarea
                  helperText={touched.message ? errors.message : ""}
                  error={touched.message && Boolean(errors.message)}
                  name="message"
                  placeholder="Your Message *"
                  rows={isMobile ? 8 : 10}
                  placeholderStyle={{ fontStyle: "normal" }}
                  value={values.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                ></Textarea>
              </Box>
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
              >
                <Button
                  type="submit"
                  disabled={!dirty || !isValid || isSubmitting}
                >
                  Submit
                </Button>
                {submitError && (
                  <Typography variant="subtitle2" color="error">
                    {submitError}
                  </Typography>
                )}
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="parent-modal-title"
                  aria-describedby="parent-modal-description"
                >
                  <Box
                    sx={{
                      height: "454px",
                      width: "799px",
                      backgroundColor: "white",
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      borderRadius: "24px",
                      padding: "24px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Stack
                      direction="column"
                      justifyContent="center"
                      alignItems="center"
                      spacing={5}
                    >
                      <div
                        style={{
                          borderRadius: "100%",
                          height: "40px",
                          width: "40px",
                          backgroundColor: "#00C851",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Check sx={{ color: "white" }} />
                      </div>
                      <div style={{ textAlign: "center" }}>
                        <Typography
                          id="modal-modal-title"
                          variant="h6"
                          component="h2"
                          textTransform="uppercase"
                        >
                          Thank you
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                          Your message has been received!
                        </Typography>
                      </div>
                      <Stack
                        direction="row"
                        spacing={4}
                        justifyContent="center"
                      >
                        <Button onClick={() => navigate("/")}>
                          Back to home page
                        </Button>
                      </Stack>
                    </Stack>
                  </Box>
                </Modal>
              </Stack>
            </form>
          )}
        </Formik>
      </Box>
      <Footer />
    </Container>
  );
};

export default Contact;
