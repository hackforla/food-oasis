import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import { UserContext } from "../../contexts/user-context";
import { Typography } from "@material-ui/core";
import { Button } from "../../components/UI";

const useStyles = makeStyles({
  edit: {
    marginBottom: "2rem",
    border: "10px solid #FAEBD7",
    "& h4, h6, div": {
      fontSize: "1rem",
      margin: "0.5rem",
    },
  },
  readOnly: {
    marginBottom: "2rem",
  },
  editBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgb(241, 241, 241)",
  },
  hide: {
    display: "none",
  },
  link: {
    textDecoration: "none",
  },
  identifier: {
    height: "100%",
    marginLeft: "1rem",
  },
  faqText: {
    padding: "1rem",
  },
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
    <li className={reorder ? classes.edit : classes.readOnly}>
      <UserContext.Consumer>
        {(user) =>
          user &&
          (user.isAdmin || user.isCoordinator) && (
            <div className={classes.editBar}>
              <Typography className={classes.identifier} variant="h6">
                {identifier}
              </Typography>
              {reorder ? (
                <>
                  <Button
                    icon="arrowUp"
                    iconPosition="start"
                    className={Number(order) === 1 ? classes.hide : ""}
                    onClick={() => reorderFaqs("up", order)}
                  >
                    Up
                  </Button>
                  <Button
                    icon="arrowDown"
                    iconPosition="start"
                    className={Number(order) === faqLength ? classes.hide : ""}
                    onClick={() => reorderFaqs("down", order)}
                  >
                    Down
                  </Button>
                </>
              ) : (
                <Link className={classes.link} to={`/faqs/${faq.identifier}`}>
                  <Button icon="edit" iconPosition="start">
                    Edit
                  </Button>
                </Link>
              )}
            </div>
          )
        }
      </UserContext.Consumer>
      <section className={classes.faqText}>
        <Typography variant="h6">{faq.question}</Typography>
        <Typography
          component="p"
          dangerouslySetInnerHTML={{ __html: faq.answer }}
        />
      </section>
    </li>
  );
};

export default FaqItem;
