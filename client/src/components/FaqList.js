import React from "react";
import { makeStyles } from "@material-ui/styles";

import FaqItem from "./FaqItem";

const useStyles = makeStyles({
  edit: {
    listStyle: "none",
    fontSize: "2rem"
  }
});

const FaqList = ({ faqs, message, reorder, reorderFaqs }) => {
  const classes = useStyles();

  return faqs[0] ? (
    <ul className={reorder ? classes.edit : ""}>
      {faqs.map(faq => (
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
