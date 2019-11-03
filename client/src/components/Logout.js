import React from "react";
import { Button } from "@material-ui/core";
import * as accountService from "../services/account-service";
import { withRouter } from "react-router-dom";

const Logout = props => {
  const logout = () => {
    accountService
      .logout()
      .then(() => {
        props.setUser(null);
      })
      .then(props.history.push("/stakeholders"));
  };

  return <Button onClick={logout}>Logout</Button>;
};

export default withRouter(Logout);
