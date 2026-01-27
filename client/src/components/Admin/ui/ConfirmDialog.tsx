import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

interface ConfirmDialogProps {
  onClose: (value: boolean) => void;
  open: boolean;
  title?: string;
  message?: string;
  [key: string]: any;
}

function ConfirmDialog(props: ConfirmDialogProps) {
  const { onClose, open, ...other } = props;

  const handleCancel = () => {
    onClose(false);
  };

  const handleAssign = () => {
    onClose(true);
  };

  return (
    <Dialog
      disableEscapeKeyDown
      fullWidth
      maxWidth="sm"
      aria-labelledby="confirmation-dialog-title"
      open={open}
      {...other}
    >
      <DialogTitle id="confirmation-dialog-title">{props.title}</DialogTitle>
      <DialogContent dividers>
        <Typography>{props.message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          type="button"
          autoFocus
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button variant="contained" type="button" onClick={handleAssign}>
          Confirm Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDialog;
