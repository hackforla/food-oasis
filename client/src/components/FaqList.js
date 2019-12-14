import React from "react";
import { makeStyles } from "@material-ui/styles";

import FaqItem from "./FaqItem";
import Hamburger from "../images/hamburger.svg"

const useStyles = makeStyles({
  edit: {
    listStyle: "none",
    listStyleImage: `url(${Hamburger})`,
    fontSize: "2rem"
  }
});

const FaqList = ({ faqs, message, reorder }) => {
  const classes = useStyles();

  return faqs[0] ? (
    <ul className={reorder ? classes.edit : ""}>
      {faqs.map(faq => (
        <FaqItem faq={faq} key={faq.question} reorder={reorder} />
      ))}
    </ul>
  ) : (
    <div>{message}</div>
  );
};

export default FaqList;
