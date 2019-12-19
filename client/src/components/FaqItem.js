import React from "react";
import { makeStyles } from "@material-ui/styles";
import { UserContext } from "./user-context";
import { EditButton, MoveUpButton, MoveDownButton } from "./Buttons";

const useStyles = makeStyles({
  edit: {
    marginBottom: "10px",
    border: "2px dashed #FAEBD7",
    "& h4, h6, div": {
      fontSize: "1rem",
      margin: "0.5rem"
    }
  },
  hide: {
    display: "none"
  }
});

const FaqItem = ({ faq, reorder, reorderFaqs, faqLength }) => {
  const classes = useStyles();
  // Identifier Table in DB follows `#:identifier` scheme, for both identifying and also ordering
  const identifier = faq.identifier.includes(":")
    ? faq.identifier.slice(
        faq.identifier.indexOf(":") + 1,
        faq.identifier.length
      )
    : faq.identifier;
  const order =
    faq.identifier.includes(":") &&
    faq.identifier.slice(0, faq.identifier.indexOf(":"));

  return (
    // <UserContext.Consumer>
    //   {user =>
    //     user && user.isAdmin ? (
    <li className={reorder ? classes.edit : ""}>
      <h4>{faq.question}</h4>
      <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
      <h6>Identifier: {identifier}</h6>
      {reorder ? (
        <>
          <MoveUpButton
            className={faq.order === 0 ? classes.hide : ""}
            onClick={() => reorderFaqs("up", order)}
          />
          <MoveDownButton
            className={faq.order === faqLength - 1 ? classes.hide : ""}
            onClick={() => reorderFaqs("down", order)}
          />
        </>
      ) : (
        <EditButton label="Edit" href={`/faqs/${faq.identifier}`} />
      )}
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
