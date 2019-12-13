import React from "react";
import { makeStyles } from "@material-ui/styles";
import EditButton from "./EditButton";
import { UserContext } from "./user-context";
import { ReactComponent as Hamburger } from "../images/hamburger.svg";

const useStyles = makeStyles({
  answer: {
    display: "hidden"
  }
});

const FaqItem = ({ faq }) => {
  const classes = useStyles();
  return (
    <UserContext.Consumer>
      {user =>
        user && user.isAdmin ? (
          <li>
            <h4>{faq.question}</h4>
            <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
            <h6>Identifier: {faq.identifier}</h6>
            <EditButton label="Edit" href={`/faqs/${faq.identifier}`} />
          </li>
        ) : (
          <li>
            <h4>{faq.question}</h4>
            <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
          </li>
        )
      }
    </UserContext.Consumer>
  );
};

export default FaqItem;
