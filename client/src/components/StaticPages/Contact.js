import React, { useEffect } from "react";
import faqbg from "./assets/faq-bg.webp";
import iconSpacerWhite from "./assets/icon-spacer.svg";
import { Link, Typography } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import * as analytics from "../../services/analytics";
import Container from "@mui/material/Container";
import { Link as RouterLink } from "react-router-dom";
import Footer from "../Layout/Footer";
import typing from "./assets/3social-equity.png";

import { Formik, Form, Field, ErrorMessage, yupToFormErrors } from 'formik';
import * as Yup from "yup";


const useStyles = makeStyles(() => ({
  outer: {
    background: "#fff",
  },
  main: {
    padding: "1.5rem 0",
    maxWidth: "1200px",
    margin: "0 auto",
    "& $ul": {
      paddingLeft: "26px",
      margin: "5px",
      fontSize: "16px",
      lineHeight: "26.55px",
    },
    "@media only screen and (min-width: 75em)": {
      padding: "1.5rem 2rem",
    },
  },
  title: {
    textTransform: "uppercase",
    fontWeight: 500,
    textAlign: "center",
    background: "#FFF",
    margin: 0,
    padding: "32px 0",
    "& $span": {
      "& $span": {
        textTransform: "none",
      },
    },
  },
  icon: {
    margin: "auto",
    marginBottom: "20px",
  },
  glossary: {
    padding: "50px 32px 50px",
    margin: "32px 0",
    borderRadius: "24px",
    background: "#369",
    display: "flex",
    flexWrap: "wrap",
    "& $h2": {
      flexBasis: "100%",
      textAlign: "center",
      fontWeight: "500",
      fontSize: "32px",
      marginTop: "10px",
      marginBottom: "20px",
    },
  },
  forVolunteers: {
    padding: "50px 32px 50px",
    margin: "32px 0",
    borderRadius: "24px",
    background: "#B6D8FB",
    display: "flex",
    flexDirection: "column",
    "& $h2": {
      flexBasis: "100%",
      textAlign: "center",
      fontWeight: "500",
      fontSize: "32px",
      marginTop: "10px",
      marginBottom: "20px",
    },
  },
  dl: {
    marginTop: "10px",
    marginBottom: "0",
    "& $dt": {
      fontWeight: "600",
      fontSize: "20px",
    },
    "& $dd": {
      marginLeft: "0",
      marginBottom: "32px",
    },
    "& $dd:last-child": {
      marginBottom: "0",
    },
  },
}));

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email address format")
    .required("Email is required"),
  title: Yup.string()
    .required("Title is required"),
  message: Yup.string()
    .required("Message is required")
});


const Contact = () => {
  const classes = useStyles();

  useEffect(() => {
    analytics.postEvent("visitContactPage");
  }, []);

  return (
    <div className={classes.outer}>
      <div className={classes.main}>
        <figure className={classes.figure}>
          <img alt="FAQ" src={typing} style={{ width: "100%" }} />
        </figure>
        <Typography variant="h1" className={classes.title}>
          Contact Us
        </Typography>
        <section className={classes.glossary}>
          <img
              alt="Glossary"
              src={iconSpacerWhite}
              className={classes.icon}
              height="40"
            />
          <Container maxWidth="sm">
            <Typography variant="body1">
              Get the information you're looking for right now
            </Typography>
          </Container>
        </section>
        <Formik
          initialValues={{ name: '', email: '', phone: '', title: '', message: '' }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
       {({ isSubmitting }) => (
         <Form>
          <label htmlFor="name">Name</label>
          <Field type="input" name="name" />
          <ErrorMessage name="name" component="div" />
          <label htmlFor="email">Email</label>
          <Field type="email" name="email" />
          <ErrorMessage name="email" component="div" />
          <label htmlFor="phone">Phone</label>
          <Field type="phone" name="phone" />
          <label htmlFor="title">Title</label>
          <Field type="input" name="title" />
          <ErrorMessage name="title" component="div" />
          <label htmlFor="message">Message</label>
          <Field name="message" as="textarea" />
          <ErrorMessage name="message" component="div" />
           <button type="submit" disabled={isSubmitting}>
             Submit
           </button>
         </Form>
       )}
     </Formik>
      </div>
    </div>
  );
};

export default Contact;
