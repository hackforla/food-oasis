import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import * as faqService from "../services/faq-service";

const FaqEdit = ({ match }) => {
  const [currentFaq, setCurrentFaq] = useState("");
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
    <>
      <Typography component="h1" variant="h5">
        Editing Frequently Asked Questions
      </Typography>
    </>
  );
};

export default withRouter(FaqEdit);
