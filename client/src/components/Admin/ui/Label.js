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
import { tooltipHover } from "theme/palette";

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
            >
              <IconButton
                sx={{ "&:hover": { backgroundColor: tooltipHover } }}
                onClick={() => handleToolTipToggle()}
              >
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
