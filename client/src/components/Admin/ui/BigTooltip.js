import { Tooltip, withStyles } from "@material-ui/core";

const BigTooltip = withStyles(() => ({
  tooltip: {
    fontSize: 16,
  },
}))(Tooltip);

export default BigTooltip;
