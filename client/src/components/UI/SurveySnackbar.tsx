import { useState, SyntheticEvent } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";
import { Button, Link, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import type { SnackbarCloseReason } from "@mui/material/Snackbar";
import type { Theme } from "@mui/material/styles";
import useBreakpoints from "hooks/useBreakpoints";
import { IconButton } from "./StandardButton";

type CloseEvent = Event | SyntheticEvent<unknown>;

type CloseHandler = (event: CloseEvent, reason?: SnackbarCloseReason) => void;

const SurveySnackbar = () => {
  const [open, setOpen] = useState<boolean>(() => {
    const hasBeenDismissed = localStorage.getItem("surveySnackbarClosed");
    if (hasBeenDismissed === "true") {
      return false;
    }

    let lastClosed = localStorage.getItem("surveySnackbarClosedTimeStamp");
    if (!lastClosed || isNaN(Number(lastClosed))) {
      return true;
    }

    const hoursSinceClosed =
      (Date.now() - Number(lastClosed)) / (1000 * 60 * 60);

    if (hoursSinceClosed >= 24) {
      return true;
    }
    return false;
  });
  const { isMobile } = useBreakpoints();

  const handleClose: CloseHandler = (_event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    localStorage.setItem("surveySnackbarClosed", "true");
  };

  const handleCloseButton: CloseHandler = (_event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    localStorage.setItem(
      "surveySnackbarClosedTimeStamp",
      new Date().getTime().toString()
    );
  };

  const action = (
    <Stack
      direction="column"
      sx={{
        alignItems: "end",
        justifyContent: "end",
        width: { xs: "100%" },
        gap: 3,
      }}
    >
      <Stack direction="row" gap="10px">
        <Box>
          <Typography variant="body1" component="p" sx={{ fontWeight: "700" }}>
            Help us improve!{" "}
          </Typography>
          <Typography variant="body1">
            Have a minute to take a quick survey?
          </Typography>
        </Box>
        <Box>
          <IconButton
            icon="close"
            sx={(theme: Theme) => ({
              color: theme.palette.bodyText.main,
              display: "flex",
              transform: "translate(10px, -10px)",
            })}
            onClick={handleCloseButton}
          />
        </Box>
      </Stack>
      <Stack
        direction="row"
        sx={{
          alignItems: "center",
        }}
      >
        <Link
          variant={"" as never}
          sx={{
            marginRight: 2,
            fontWeight: "500",
            textDecoration: "none",
            cursor: "pointer",
            textWrap: "nowrap",
          }}
          onClick={(event: ReactMouseEvent<HTMLAnchorElement>) =>
            handleClose(event)
          }
        >
          No thanks
        </Link>

        <Button
          component="a"
          href="https://docs.google.com/forms/d/e/1FAIpQLSdAhi_nMKQfWVHjfpl1ZkmymBTt8BW7YNqVIOJ4JKYgSL4O3g/viewform"
          target="_blank"
          onClick={(event: ReactMouseEvent<HTMLAnchorElement>) =>
            handleClose(event)
          }
        >
          Yes{" "}
        </Button>
      </Stack>
    </Stack>
  );

  return (
    <Stack spacing={2}>
      <Snackbar
        open={open}
        onClose={handleClose}
        action={action}
        anchorOrigin={
          isMobile
            ? { vertical: "bottom", horizontal: "center" }
            : { vertical: "bottom", horizontal: "right" }
        }
        style={{
          margin: isMobile ? "24px 16px" : "8px 0px",
          maxWidth: "350px",
        }}
      >
        <Box
          sx={(theme: Theme) => ({
            backgroundColor: (theme.palette.primary as any).extralight,
            padding: 3,
            borderRadius: 2.5,
            filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.2))",
          })}
        >
          <Box>{action}</Box>
        </Box>
      </Snackbar>
    </Stack>
  );
};

export default SurveySnackbar;
