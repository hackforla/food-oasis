import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import EditButton from "./EditButton";
import { UserContext } from "./user-context";

const useStyles = makeStyles({
  answer: {
    display: "hidden"
  }
});

const FaqItem = ({ faq }) => {
  const classes = useStyles();
  const [toggle, setToggle] = useState(false);
  return (
    <div>
      <h4 onClick={() => setToggle(t => !t)}>{faq.question}</h4>
      <div
        className={toggle ? classes.answer : null}
        dangerouslySetInnerHTML={{ __html: faq.answer }}
      />
      <UserContext.Consumer>
        {user =>
          user &&
          user.isAdmin && (
            <>
              <h6>Identifier: {faq.identifier}</h6>
              <EditButton label="Edit" href={`/faqs/${faq.identifier}`} />
            </>
          )
        }
      </UserContext.Consumer>
    </div>
  );
};

export default FaqItem;
