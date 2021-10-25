import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import * as faqService from "../../services/faq-service";
import { UserContext } from "../../contexts/user-context";
import { Button } from "../../components/UI";

import FaqList from "./FaqList";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  title: {
    margin: "2rem",
  },
  buttonsContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  link: {
    textDecoration: "none",
  },
}));

const Faq = () => {
  const classes = useStyles();
  const [faqs, setFaqs] = useState([]);
  const { t, i18n } = useTranslation("faq");
  const [message, setMessage] = useState("FAQs are loading...");
  const [reorder, setReorder] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("faqs")) {
      setFaqs(JSON.parse(sessionStorage.getItem("faqs")));
    }
  }, []);

  useEffect(() => {
    async function fetchFaqs() {
      try {
        let twoLetterLanguage = i18n.language.slice(0, 2);
        const fetchedFaqs = await faqService.getAllByLanguage({
          language: twoLetterLanguage,
        });
        if (fetchedFaqs.length > 0) {
          let sorted = fetchedFaqs;
          if (fetchedFaqs[0].identifier.includes(":")) {
            sorted = fetchedFaqs.sort(
              (a, b) =>
                a.identifier.slice(0, a.identifier.indexOf(":")) -
                b.identifier.slice(0, b.identifier.indexOf(":"))
            );
          }
          setFaqs(sorted);
          sessionStorage.setItem("faqs", JSON.stringify(fetchedFaqs));
        } else {
          setMessage("There are currently no FAQs.");
        }
      } catch (error) {
        setMessage("Cannot fetch FAQs...");
        throw new Error("Cannot fetch FAQs...");
      }
    }
    fetchFaqs();
  }, [i18n.language]);

  const onReorderClick = () => {
    setReorder((r) => !r);
  };

  // When someone has time, refactor this to be more readable...
  const reorderFaqs = (direction, order) => {
    let currentFaqs = [...faqs];
    let atFirstIndex;
    let atSecondIndex;
    let firstIdentifier;
    let secondIdentifier;
    // Assuming order starts at 1
    if (direction === "up" && order !== 1) {
      // Position of current Faq
      firstIdentifier = currentFaqs[order - 1].identifier;
      // Position of Faq we're swapping
      secondIdentifier = currentFaqs[order - 2].identifier;
      atFirstIndex = {
        ...currentFaqs[order - 1],
        identifier:
          Number(order) -
          1 +
          firstIdentifier.slice(
            firstIdentifier.indexOf(":"),
            firstIdentifier.length
          ),
      };
      atSecondIndex = {
        ...currentFaqs[order - 2],
        identifier:
          Number(order) +
          secondIdentifier.slice(
            secondIdentifier.indexOf(":"),
            secondIdentifier.length
          ),
      };
      currentFaqs[order - 1] = atSecondIndex;
      currentFaqs[order - 2] = atFirstIndex;
    } else {
      firstIdentifier = currentFaqs[order - 1].identifier;
      // Position of Faq we're swapping
      secondIdentifier = currentFaqs[order].identifier;
      atFirstIndex = {
        ...currentFaqs[order - 1],
        identifier:
          Number(order) +
          1 +
          firstIdentifier.slice(
            firstIdentifier.indexOf(":"),
            firstIdentifier.length
          ),
      };
      atSecondIndex = {
        ...currentFaqs[order],
        identifier:
          Number(order) +
          secondIdentifier.slice(
            secondIdentifier.indexOf(":"),
            secondIdentifier.length
          ),
      };
      currentFaqs[order - 1] = atSecondIndex;
      currentFaqs[order] = atFirstIndex;
    }

    faqService
      .update(atFirstIndex)
      .then(() => faqService.update(atSecondIndex));
    setFaqs(currentFaqs);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" className={classes.title}>
        {t("title")}
      </Typography>
      <UserContext.Consumer>
        {(user) =>
          user &&
          (user.isAdmin || user.isCoordinator) && (
            <div className={classes.buttonsContainer}>
              <Link className={classes.link} to="/faqs/add">
                <Button icon="add" iconPosition="start">
                  Add
                </Button>
                >
              </Link>
              <Button
                icon="edit"
                iconPosition="start"
                onClick={onReorderClick}
                color={reorder ? "secondary" : "primary"}
              >
                {reorder
                  ? "Click to Stop Reordering Faqs"
                  : "Click to Reorder Faqs"}
              </Button>
            </div>
          )
        }
      </UserContext.Consumer>
      <FaqList
        faqs={faqs}
        message={message}
        reorder={reorder}
        reorderFaqs={reorderFaqs}
      />
    </Container>
  );
};

export default Faq;
