import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { IconButton as MuiIconButton } from "@mui/material";
import PropTypes from "prop-types";
import { ICON_DICT } from "../UI/iconLookup.js";

const PrimaryButton = styled(Button)(({ theme }) => ({
  gridColumn: 1,
  gridRow: 1,
  variant: "contained",
  color: theme.palette.common.white,
  backgroundColor: theme.palette.primary.main,
  minWidth: "4rem",
  minHeight: "0",
  borderRadius: "4px",
  margin: "0rem",
  lineHeight: "1.1rem",
  padding: "4px 8px",
  border: "2px solid transparent",
  boxSizing: "border-box",
  "&:hover": {
    backgroundColor: "#2D5B88",
    border: "2px solid transparent",
  },

  "&:active": {
    backgroundColor: "#264A79",
  },
  "&:focus": {
    backgroundColor: theme.palette.primary.main,
    border: "2px solid #264A79",
    dropShadow: "10px 10px  12px",
  },
  "&:disabled": {
    backgroundColor: "#949494",
    border: "2px solid transparent",
    color: theme.palette.common.white,
  },
}));

const SecondaryButton = styled(Button)(({ theme }) => ({
  variant: "contained",
  gridColumn: 1,
  gridRow: 1,
  color: theme.palette.primary.main,
  backgroundColor: theme.palette.common.white,
  minWidth: "4rem",
  minHeight: 0,
  border: "1px solid #336699",
  borderRadius: "4px",
  margin: "0rem",
  lineHeight: "1.1rem",
  padding: "4px 8px",
  boxSizing: "border-box",
  "&:hover": {
    backgroundColor: "#E5F1F7",
    border: "1px solid #336699",
  },
  "&:active": {
    backgroundColor: "#CBE3F1",
  },
  "&:focus": {
    border: "2px solid #264A79",
    dropShadow: "0 0  12px #FFFFFF80",
  },
  "&:disabled": {
    border: "1px solid #949494",
    color: "#949494",
  },
}));

const IconButton = ({ icon, ...props }) => {
  const Icon = ICON_DICT[icon];
  return (
    <MuiIconButton
      variant={props.variant || "contained"}
      color={props.color || "primary"}
      fontSize={props.fontSize || "inherit"}
      aria-label={icon}
      {...props}
    >
      <Icon />
    </MuiIconButton>
  );
};

IconButton.propTypes = {
  icon: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export { PrimaryButton, SecondaryButton, IconButton };
