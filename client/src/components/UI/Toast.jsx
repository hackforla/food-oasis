import { Snackbar } from "@mui/material";
import { useToasterContext } from "../../contexts/toasterContext";
import { IconButton } from "./StandardButton";

const Toast = () => {
  const { toast, setToast } = useToasterContext();

  const handleSnackbarClose = (_event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setToast(false);
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
      ContentProps={{
        "aria-describedby": "message-id",
      }}
      message={<span id="message-id">{toast.message}</span>}
      action={[
        <IconButton
          key={toast.message}
          icon="close"
          onClick={handleSnackbarClose}
        />,
      ]}
    />
  ) : null;
};

export default Toast;
