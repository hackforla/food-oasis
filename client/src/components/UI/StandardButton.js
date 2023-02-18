import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { IconButton as MuiIconButton } from "@mui/material";
import PropTypes from "prop-types";
import { ICON_DICT } from "../UI/iconLookup.js";

const InnerPrimaryButton = styled(Button)(({ theme }) => ({
  gridColumn: 1,
  gridRow: 1,
  variant: "contained",
  color: theme.palette.common.white,
  backgroundColor: theme.palette.primary.main,
  minWidth: "4rem",
  minHeight: "0",
  border: "2px solid transparent",
  borderRadius: "0.9rem",
  margin: "0rem",
  lineHeight: "1.1rem",
  padding: "8px 16px",
  "&:hover": {
    backgroundColor: "#2D5B88",
    border: "2px solid transparent",
  },
  "&:focus": {
    backgroundColor: theme.palette.primary.main,
  },
  "&:active": {
    backgroundColor: "#264A79",
  },
  "&:disabled": {
    backgroundColor: "#949494",
    border: "2px solid #6C6C6C",
    color: theme.palette.common.white,
  },
}));

const PrimaryBorderBox = styled(Box)(({ theme }) => ({
  border: "2px solid transparent",
  margin: "0",
  borderRadius: "1.2rem",
  padding: 0,
  "&:focus-within": {
    border: "2px solid #336699",
  },
  display: "grid",
  gridTemplateColumns: "2px  1fr 2px",
  gridTemplateRows: "2px 1fr 2px",
}));

const PrimaryButton = (props) => {
  return (
    <PrimaryBorderBox {...props}>
      <Box
        sx={{
          gridColumn: 2,
          gridRow: 2,
          border: "2px solid transparent",
          margin: 0,
          padding: 0,
          borderRadius: "1rem",
          display: "grid",
          gridTemplateColumn: "16px 1fr 16px",
          gridTemplateRow: "8px 1fr 8px",
          justifyItems: "stretch",
          alignItems: "stretch",
        }}
      >
        <InnerPrimaryButton children={props.children} />
      </Box>
    </PrimaryBorderBox>
  );
};

const InnerSecondaryButton = styled(Button)(({ theme }) => ({
  variant: "contained",
  gridColumn: 1,
  gridRow: 1,
  color: theme.palette.primary.main,
  backgroundColor: theme.palette.common.white,
  minWidth: "4rem",
  minHeight: 0,
  border: "2px solid #336699",
  borderRadius: "0.9rem",
  margin: "0rem",
  lineHeight: "1.1rem",
  padding: "8px 16px",
  "&:hover": {
    backgroundColor: "#E5F1F7",
    border: "2px solid #336699",
  },
  "&:active": {
    backgroundColor: "#CBE3F1",
  },
  "&:disabled": {
    border: "2px solid #6C6C6C",
    color: "#949494",
  },
}));

const SecondaryBorderBox = styled(Box)(({ theme }) => ({
  border: "2px solid transparent",
  margin: "0px",
  borderRadius: "1.2rem",
  padding: 0,
  "&:focus-within": {
    border: "2px solid #336699",
  },
  display: "grid",
  gridTemplateColumns: "2px  1fr 2px",
  gridTemplateRows: "2px 1fr 2px",
}));

const SecondaryButton = (props) => {
  return (
    <SecondaryBorderBox {...props}>
      <Box
        sx={{
          gridColumn: 2,
          gridRow: 2,
          border: "2px solid transparent",
          margin: "0",
          padding: "0",
          borderRadius: "1rem",
          display: "grid",
          gridTemplateColumn: "16px 1fr 16px",
          gridTemplateRow: "8px 1fr 8px",
          justifyItems: "stretch",
          alignItems: "stretch",
        }}
      >
        <InnerSecondaryButton children={props.children} />
      </Box>
    </SecondaryBorderBox>
  );
};

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
