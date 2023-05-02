import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import {
  ClickAwayListener,
  IconButton,
  InputLabel,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";

const Label = ({ id, label, tooltipTitle }) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const handleToolTipToggle = () => {
    setTooltipOpen((prevOpen) => !prevOpen);
  };

  return (
    <InputLabel htmlFor={id}>
      <Stack direction="row" alignItems="center" height="40px">
        <Typography fontWeight={600}>{label}</Typography>
        {tooltipTitle && (
          <ClickAwayListener onClickAway={() => setTooltipOpen(false)}>
            <Tooltip
              title={tooltipTitle}
              open={tooltipOpen}
              arrow
              placement="top-start"
              componentsProps={{
                tooltip: {
                  sx: {
                    backgroundColor: "#D9D9D9",
                    color: "black",
                    padding: "24px",
                    borderRadius: "8px",
                    maxWidth: "592px",
                  },
                },
                arrow: {
                  sx: {
                    color: "#D9D9D9",
                  },
                },
              }}
            >
              <IconButton onClick={() => handleToolTipToggle()}>
                <InfoOutlinedIcon />
              </IconButton>
            </Tooltip>
          </ClickAwayListener>
        )}
      </Stack>
    </InputLabel>
  );
};

export default Label;
