import { Tooltip, withStyles } from "@material-ui/core";

const BigTooltip = withStyles((theme) => ({
  tooltip: {
    fontSize: 16
  }
}))(Tooltip);

export default BigTooltip;
