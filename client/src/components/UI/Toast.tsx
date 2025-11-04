import { Alert, Snackbar } from "@mui/material";
import type { SnackbarCloseReason } from "@mui/material/Snackbar";
import { SyntheticEvent } from "react";
import { useToasterContext } from "../../contexts/toasterContext";
import { error, linkText, secondary, success } from "../../theme/palette";

type ToastType = "info" | "warning" | "success" | "error" | undefined;

const Toast = () => {
  const { toast, setToast } = useToasterContext();

  const handleSnackbarClose = (
    _event: SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setToast({ message: "" });
  };

  const getToastColor = (type: ToastType) => {
    switch (type) {
      case "warning":
        return secondary;
      case "info":
        return linkText;
      case "error":
        return error;
      case "success":
        return success;
      default:
        return linkText;
    }
  };

  if (!toast || !toast.message) {
    return null;
  }

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={Boolean(toast)}
      autoHideDuration={4000}
      onClose={handleSnackbarClose}
    >
      <Alert
        severity={toast.type || "info"}
        onClose={handleSnackbarClose}
        sx={{
          backgroundColor: getToastColor(toast.type),
          color: "white",
        }}
      >
        {toast.message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
