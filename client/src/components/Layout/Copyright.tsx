import { Link } from "@mui/material";
import React from "react";

const Copyright: React.FC = () => (
  <div
    style={{
      fontSize: "16px",
      textTransform: "uppercase",
      margin: ".4em 0 0 1.5em",
    }}
  >
    {`Copyright ©2020-${new Date().getFullYear()} -`}
    <Link style={{ color: "#1b1b1b" }} href="https://hackforla.org/">
      Hack for LA
    </Link>
  </div>
);

export default Copyright;
