import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

const PrimaryButton = styled(Button)(({ theme }) => ({
  variant: "contained",
  color: theme.palette.common.white,
  backgroundColor: theme.palette.primary.main,
  size: "small",
  minWidth: 0,
  minHeight: 0,
  "&:hover": {
    backgroundColor: theme.palette.primary.light,
  },
  "&:disabled": {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.common.disabled,
  },
}));

const SecondaryButton = styled(Button)(({ theme }) => ({
  variant: "outlined",
  backgroundColor: theme.palette.common.white,
  size: "small",
  minWidth: 0,
  minHeight: 0,
  "&:hover": {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.primary.main,
    opacity: "1",
  },
  "&:disabled": {
    color: "#A0A0A0",
  },
}));

export { PrimaryButton, SecondaryButton };
