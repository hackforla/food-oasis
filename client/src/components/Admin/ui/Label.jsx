import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import LaunchIcon from "@mui/icons-material/Launch";
import {
  ClickAwayListener,
  IconButton,
  InputLabel,
  Stack,
  Tooltip,
  Typography,
  Button,
  Link,
} from "@mui/material";
import { useState } from "react";
import { tooltipHover } from "theme/palette";

const Label = ({ id, label, tooltipTitle, href }) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const handleToolTipToggle = () => {
    setTooltipOpen((prevOpen) => !prevOpen);
  };

  return (
    <InputLabel htmlFor={id}>
      <Stack
        direction="row"
        alignItems="center"
        spacing={1}
        height="40px"
        justifyContent="space-between"
      >
        <Stack direction="row" alignItems="center">
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

        {href && (
          <Button
            variant="text"
            size="small"
            sx={{ textTransform: "none" }}
            rel="noopener"
            component={Link}
            href={href}
            target="_blank"
            startIcon={<LaunchIcon />}
          >
            Go To Link
          </Button>
        )}
      </Stack>
    </InputLabel>
  );
};

export default Label;
