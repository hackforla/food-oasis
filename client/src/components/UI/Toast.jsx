import { Snackbar, Alert } from "@mui/material";
import { useToasterContext } from "../../contexts/toasterContext";
import { IconButton } from "./StandardButton";
import { success, error, secondary, linkText } from "../../theme/palette";

const Toast = () => {
  const { toast, setToast } = useToasterContext();

  const handleSnackbarClose = (_event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setToast(false);
  };
  const getToastColor = (type) => {
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

  return toast.message ? (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={!!toast}
      autoHideDuration={toast.duration || 4000}
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
  ) : null;
};

export default Toast;
