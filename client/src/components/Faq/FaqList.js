import React from "react";
import { makeStyles } from "@mui/styles";

import FaqItem from "./FaqItem";

const useStyles = makeStyles({
  readOnly: {
    listStyle: "none",
    padding: "0",
    display: "flex",
    flexDirection: "column",
  },
  edit: {
    listStyle: "none",
    fontSize: "2rem",
    padding: "0",
    display: "flex",
    flexDirection: "column",
  },
});

const FaqList = ({ faqs, message, reorder, reorderFaqs }) => {
  const classes = useStyles();

  return faqs.length ? (
    <ul className={reorder ? classes.edit : classes.readOnly}>
      {faqs.map((faq) => (
        <FaqItem
          faq={faq}
          key={faq.question}
          reorder={reorder}
          reorderFaqs={reorderFaqs}
          faqLength={faqs.length}
        />
      ))}
    </ul>
  ) : (
    <div>{message}</div>
  );
};

export default FaqList;
