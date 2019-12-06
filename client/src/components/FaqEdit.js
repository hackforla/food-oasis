import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import * as faqService from "../services/faq-service";
import FaqEditForm from "./FaqEditForm";

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
      {currentFaq.map(faq => (
        <FaqEditForm faq={faq} />
      ))}
    </Container>
  );
};

export default withRouter(FaqEdit);
