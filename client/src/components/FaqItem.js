import React from "react";
import { makeStyles } from "@material-ui/styles";
import { UserContext } from "./user-context";
import { EditButton } from "./Buttons";

const useStyles = makeStyles({
  edit: {
    marginBottom: "10px",
    cursor: "pointer",
    border: "2px dashed #FAEBD7",
    "& h4, h6, div": {
      fontSize: "1rem",
      margin: "0.5rem"
    }
  }
});

const FaqItem = ({ faq, reorder }) => {
  const classes = useStyles();

  return (
    // <UserContext.Consumer>
    //   {user =>
    //     user && user.isAdmin ? (
    <li className={reorder ? classes.edit : ""}>
      <h4>{faq.question}</h4>
      <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
      <h6>Identifier: {faq.identifier}</h6>
      <EditButton label="Edit" href={`/faqs/${faq.identifier}`} />
    </li>
    //     ) : (
    //       <li>
    //         <h4>{faq.question}</h4>
    //         <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
    //       </li>
    //     )
    //   }
    // </UserContext.Consumer>
  );
};

export default FaqItem;
