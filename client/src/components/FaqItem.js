import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import { UserContext } from "./user-context";
import { EditButton, MoveUpButton, MoveDownButton } from "./Buttons";

const useStyles = makeStyles({
  edit: {
    marginBottom: "10px",
    border: "10px solid #FAEBD7",
    "& h4, h6, div": {
      fontSize: "1rem",
      margin: "0.5rem"
    }
  },
  editBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "rgb(249, 192, 88)",
    height: "2.5rem"
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
    <li className={reorder ? classes.edit : ""}>
      <UserContext.Consumer>
        {user =>
          user &&
          user.isAdmin && (
            <div className={classes.editBar}>
              <h4>Identifier: {identifier}</h4>
              {reorder ? (
                <>
                  <MoveUpButton
                    className={Number(order) === 1 ? classes.hide : ""}
                    onClick={() => reorderFaqs("up", order)}
                  />
                  <MoveDownButton
                    className={Number(order) === faqLength ? classes.hide : ""}
                    onClick={() => reorderFaqs("down", order)}
                  />
                </>
              ) : (
                <Link to={`/faqs/${faq.identifier}`}>
                  <EditButton label="Edit" />
                </Link>
              )}
            </div>
          )
        }
      </UserContext.Consumer>
      <h4>{faq.question}</h4>
      <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
    </li>
  );
};

export default FaqItem;
