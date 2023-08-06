import React, { useEffect, useState } from "react";
import IconSpacerSVG from "./assets/IconSpacerSVG";
import {
  Typography,
  Box,
  CardMedia,
  List,
  ListItem,
  Modal,
  Button,
  TextField,
  Stack,
  IconButton,
} from "@mui/material";
import * as analytics from "../../services/analytics";
import Container from "@mui/material/Container";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Footer from "../Layout/Footer";
import typing from "./assets/3social-equity.png";

import { Formik } from "formik";
import * as Yup from "yup";
import Textarea from "components/Admin/ui/Textarea";
import { sendContactForm } from "services/contact-service";
import { Check, Close, Mail } from "@mui/icons-material";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address format")
    .required("Email is required"),
  title: Yup.string().required("Title is required"),
  message: Yup.string().required("Message is required"),
});

function createListItems() {
  const listTexts = [
    "Learn more about Food Oasis",
    "How can I sign up to volunteer?",
    "When can I become a volunteer?",
    "How do I set up an account to start my assignment?",
    "How can I donate?",
    "What will my donation go toward?",
    "How can I suggest a new listing?",
  ];

  return listTexts.map((value, i) => (
    <ListItem
      key={i}
      sx={{
        display: "list-item",
        padding: "0px",
      }}
    >
      {value}
    </ListItem>
  ));
}

const Contact = () => {
  useEffect(() => {
    analytics.postEvent("visitContactPage");
  }, []);

  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();

  return (
    <Container
      sx={{
        padding: { xs: "1.5rem 0", md: "1.5rem 2rem" },
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
          padding: "32px 0",
        }}
      >
        Contact Us
      </Typography>
      <CardMedia
        component="img"
        alt="contact"
        src={typing}
        style={{ width: "100%" }}
      ></CardMedia>
      <Box
        className="blue-box"
        sx={{
          padding: "50px 32px 50px",
          margin: "32px 0",
          borderRadius: "24px",
          background: "#369",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "center",
          flexWrap: "wrap",
          height: "545px",
        }}
      >
        <IconSpacerSVG />
        <Typography
          variant="subtitle1"
          sx={{
            textAlign: "center",
            color: "white",
            textTransform: "uppercase",
            maxWidth: "392px",
          }}
        >
          Get the information you're looking for right now
        </Typography>
        <List
          sx={{
            listStyleType: "disc",
            color: "white",
            alignItems: "left",
            width: "95%",
          }}
        >
          {createListItems()}
        </List>
        <Button
          variant="outlined"
          type="submit"
          component={RouterLink}
          to="/faqs"
          sx={{
            minHeight: "21.78px",
            maxWidth: "392px",
            alignSelf: "center",
          }}
        >
          SEE ALL FREQUENTLY ASKED QUESTIONS
        </Button>
      </Box>
      <Box
        className="bottom-box"
        sx={{
          margin: "32px 0",
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
              letterSpacing: "1px",
            }}
          >
            Can't find what you're looking for?
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{
              color: "#1B1B1B",
              maxWidth: "392px",
              fontWeight: "400",
              letterSpacing: "1px",
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
            sendContactForm(values);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            handleReset,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box
                sx={{
                  height: "560px",
                  "& > div": {
                    height: "61px",
                    marginTop: "12px",
                    marginBottom: "12px",
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
                <Stack direction={"row"} spacing={4}>
                  <TextField
                    helperText={touched.email ? errors.email : ""}
                    error={touched.email && Boolean(errors.email)}
                    type="email"
                    name="email"
                    placeholder="Email *"
                    sx={{ width: "604px" }}
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <TextField
                    type="phone"
                    name="phone"
                    placeholder="Phone Number (Optional)"
                    sx={{ width: "604px" }}
                    value={values.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Stack>
                <TextField
                  helperText={touched.title ? errors.title : ""}
                  error={touched.title && Boolean(errors.title)}
                  type="input"
                  name="title"
                  placeholder="Title *"
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Textarea
                  helperText={touched.message ? errors.message : ""}
                  error={touched.message && Boolean(errors.message)}
                  name="message"
                  placeholder="Message *"
                  rows={10}
                  placeholderStyle={{ fontStyle: "normal" }}
                  value={values.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                ></Textarea>
              </Box>
              <Stack direction="row" spacing={4} justifyContent="center">
                <Button onClick={handleOpen} disabled={isSubmitting}>
                  Submit
                </Button>
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
                    <IconButton
                      edge="end"
                      sx={{
                        position: "fixed",
                        top: "8px",
                        right: "25px",
                        border: "1px solid #19334D",
                        borderRadius: "2px",
                        padding: "2px",
                        height: "28px",
                        width: "28px",
                        color: "#19334D",
                      }}
                      onClick={handleClose}
                    >
                      <Close />
                    </IconButton>
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
                        {submitted ? (
                          <Check sx={{ color: "white" }} />
                        ) : (
                          <Mail sx={{ color: "white" }} />
                        )}
                      </div>
                      <div style={{ textAlign: "center" }}>
                        <Typography
                          id="modal-modal-title"
                          variant="h6"
                          component="h2"
                          textTransform="uppercase"
                        >
                          {submitted ? "Thank you" : "Submit your message?"}
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                          {submitted
                            ? "Your message has been received!"
                            : "Are you sure you want to submit this message?"}
                        </Typography>
                      </div>
                      <Stack
                        direction="row"
                        spacing={4}
                        justifyContent="center"
                      >
                        {submitted ? (
                          <Button onClick={() => navigate("/")}>
                            Back to home page
                          </Button>
                        ) : (
                          <>
                            <Button variant="outlined" onClick={handleClose}>
                              Cancel
                            </Button>
                            <Button type="submit" disabled={isSubmitting}>
                              Submit
                            </Button>
                          </>
                        )}
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
