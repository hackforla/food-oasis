import React from "react";

const Footer = props => {
  return (
    <React.Fragment>
      {props.user && props.user.id ? (
        <div>{props.user.firstName + " " + props.user.lastName}</div>
      ) : (
        <div>Please log in</div>
      )}
    </React.Fragment>
  );
};

export default Footer;
