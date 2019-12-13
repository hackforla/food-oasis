import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import * as faqService from "../services/faq-service";
import { UserContext } from "./user-context";

import FaqItem from "./FaqItem";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";

const Faq = () => {
  const [faqs, setFaqs] = useState([]);
  const { t, i18n } = useTranslation("faq");
  const [message, setMessage] = useState("FAQs are loading...");

  useEffect(() => {
    if (localStorage.getItem("faqs")) {
      setFaqs(JSON.parse(localStorage.getItem("faqs")));
    }
  }, []);

  useEffect(() => {
    async function fetchFaqs() {
      try {
        let twoLetterLanguage = i18n.language.slice(0, 2);
        const fetchedFaqs = await faqService.getAll({
          language: twoLetterLanguage
        });
        if (fetchedFaqs.length > 0) {
          setFaqs(fetchedFaqs);
          localStorage.setItem("faqs", JSON.stringify(fetchedFaqs));
        } else {
          setMessage("There are currently no FAQs.");
        }
      } catch {
        setMessage("Cannot fetch FAQs...");
        throw new Error("Cannot fetch FAQs...");
      }
    }
    fetchFaqs();
  }, [i18n.language]);

  return (
    <Container maxWidth="md">
      <h1>{t("title")}</h1>
      <UserContext.Consumer>
        {user =>
          user &&
          user.isAdmin && (
            <Button variant="outlined" label="Add New Faq" href="/faqs/add">
              Add New Faq
            </Button>
          )
        }
      </UserContext.Consumer>
      {faqs[0] ? (
        <ul>
          {faqs.map(faq => (
            <FaqItem faq={faq} key={faq.question} />
          ))}
        </ul>
      ) : (
        <div>{message}</div>
      )}
    </Container>
  );
};

export default Faq;
