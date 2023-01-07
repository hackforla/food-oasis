import { Tooltip } from "@mui/material";

import withStyles from "@mui/styles/withStyles";

const BigTooltip = withStyles(() => ({
  tooltip: {
    fontSize: 16,
  },
}))(Tooltip);

export default BigTooltip;
