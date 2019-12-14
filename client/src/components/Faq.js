import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import * as faqService from "../services/faq-service";
import { UserContext } from "./user-context";
import { AddButton, EditButton } from "./Buttons";

import FaqList from "./FaqList";
import Container from "@material-ui/core/Container";

const Faq = () => {
  const [faqs, setFaqs] = useState([]);
  const { t, i18n } = useTranslation("faq");
  const [message, setMessage] = useState("FAQs are loading...");
  const [reorder, setReorder] = useState(false);

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

  const onReorderClick = () => {
    setReorder(r => !r);
  };

  return (
    <Container maxWidth="md">
      <h1>{t("title")}</h1>
      {/* <UserContext.Consumer>
        {user =>
          user && user.isAdmin ? ( */}
            <>
              <AddButton label="Add New Faq" href="/faqs/add" />
              <EditButton
                label={
                  reorder
                    ? "Click to Stop Reordering Faqs"
                    : "Click to Reorder Faqs"
                }
                onClick={onReorderClick}
                color={reorder ? "secondary" : "primary"}
              />
              <FaqList faqs={faqs} message={message} reorder={reorder} />
            </>
          {/* ) : (
            <FaqList faqs={faqs} message={message} reorder={reorder} />
          )
        }
      </UserContext.Consumer> */}
    </Container>
  );
};

export default Faq;
