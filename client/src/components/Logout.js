import React from "react";
import { Button } from "@material-ui/core";
import * as accountService from "../services/account-service";

const Logout = props => {
  const logout = async () => {
    await accountService.logout();
    props.setUser({});
  };

  return <Button onClick={logout}>Logout</Button>;
};

export default Logout;
