import { Button, styled } from "@mui/material";
import PropTypes from "prop-types";

const DropdownIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="10"
    height="7"
    viewBox="0 0 10 7"
    fill="none"
  >
    <path
      d="M1 1.75L3.50518 4.56833C4.30076 5.46336 5.69924 5.46336 6.49482 4.56833L9 1.75"
      stroke="#1B1B1B"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);
const CustomButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "isSelected",
})(({ theme, isSelected }) => ({
  "&.MuiButton-contained": {
    fontSize: "0.875rem",
    borderRadius: "1.875rem",
    letterSpacing: "0.035rem",
    textTransform: "none",
    gap: "0.5rem",
    height: "2rem",
    boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.20)",
    border: isSelected
      ? theme.palette.filterButtons.border.selected
      : theme.palette.filterButtons.border.notSelected,
    color: theme.palette.filterButtons.bodyText,
    backgroundColor: isSelected
      ? theme.palette.filterButtons.backgroundColor
      : theme.palette.common.white,
    "&:hover": {
      backgroundColor: isSelected
        ? theme.palette.filterButtons.hoverSelectedColor
        : theme.palette.filterButtons.hoverColor,
    },
  },
}));

const AdvancedFilterButton = ({
  label,
  onClick,
  icon,
  hasDropdown,
  isSelected,
  disabled,
}) => {
  const Icon = icon;

  return (
    <CustomButton
      variant="contained"
      disabled={disabled}
      isSelected={isSelected}
      onClick={(event) => onClick(event)}
    >
      {icon && <Icon />}
      {label}
      {hasDropdown && <DropdownIcon />}
    </CustomButton>
  );
};

AdvancedFilterButton.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.any,
  hasDropdown: PropTypes.bool,
  isSelected: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default AdvancedFilterButton;
