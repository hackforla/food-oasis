import { Button, Typography, styled } from "@mui/material";
import { FC } from "react";

interface SwitchViewsButtonProps {
  isListView: boolean;
  onClick: () => void;
}

// Override standard button to keep the background color as white for hover, active, focus states
const SwitchButton = styled(Button)(({ theme }) => ({
  color: theme.palette.common.black,
  backgroundColor: theme.palette.common.white,
  border: "#D5D5D6 solid 1px",
  borderRadius: "10px",
  boxShadow: "none",
  width: "48px",
  height: "40px",
  minWidth: "0px",
  maxWidth: "48px",
  "&:hover": {
    backgroundColor: theme.palette.common.white,
  },
  "&:active": {
    backgroundColor: theme.palette.common.white,
  },
  "&:focus": {
    backgroundColor: theme.palette.common.white,
  },
}));

const SwitchViewsButton: FC<SwitchViewsButtonProps> = ({ isListView, onClick }) => {
  return (
    <SwitchButton onClick={onClick}>
      <Typography
        sx={{
          fontSize: "16px",
          textTransform: "capitalize",
          fontWeight: "500",
        }}
        color="inherit"
      >
        {isListView ? "Map" : "List"}
      </Typography>
    </SwitchButton>
  );
};

export default SwitchViewsButton;
