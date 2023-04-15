import React from "react";
import Link from "@mui/material/Link";

const Copyright = () => (
  <div>
    {`Copyright ©${new Date().getFullYear()} -`}
    <Link color="inherit" href="https://hackforla.org/">
      Hack for LA
    </Link>
  </div>
);

export default Copyright;
