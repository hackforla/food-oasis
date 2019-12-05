import React, { useState, useEffect, useRef } from "react";
import { withRouter } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import * as faqService from "../services/faq-service";
import { Formik } from "formik";
import * as Yup from "yup";

// check out CKEditor and React Quill for WYSIWYG Editor

const FaqEdit = ({ match }) => {
  const [currentFaq, setCurrentFaq] = useState([
    {
      question: "",
      answer: "",
      identifier: "",
      language: ""
    }
  ]);
  const faqIdentifier = match.params.identifier;

  useEffect(() => {
    async function fetchFaq() {
      try {
        const fetchedFaq = await faqService.getByIdentifier({
          identifier: faqIdentifier
        });
        setCurrentFaq(fetchedFaq);
      } catch {
        throw new Error("Cannot fetch FAQs...");
      }
    }
    fetchFaq();
  }, []);

  return (
    <Container maxWidth="md">
      <Typography component="h1" variant="h5">
        Editing Frequently Asked Questions
      </Typography>

      <Formik
        initialValues={currentFaq[0]}
        enableReinitialize={true}
        validationSchema={Yup.object().shape({
          question: Yup.string().required("Required")
        })}
      >
        {props => {
          const {
            values,
            touched,
            errors,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit
          } = props;
          console.log(values);
          return (
            <div>
              <form onSubmit={handleSubmit}>
                <label htmlFor="question">Question</label>
                <input
                  id="question"
                  placeholder="Enter your question..."
                  type="text"
                  value={values.question}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.question && touched.question && (
                  <div>{errors.question}</div>
                )}
                <button type="submit" disabled={isSubmitting}>
                  Update
                </button>
              </form>
            </div>
          );
        }}
      </Formik>
    </Container>
  );
};

export default withRouter(FaqEdit);
