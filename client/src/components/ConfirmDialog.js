import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@material-ui/core";

function ConfirmDialog(props) {
  const { onClose, open, tite, message, ...other } = props;

  const handleCancel = () => {
    onClose(false);
  };

  const handleAssign = () => {
    onClose(true);
  };

  return (
    <Dialog
      disableBackdropClick
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
        <Button autoFocus onClick={handleCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={handleAssign} color="primary">
          Confirm Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ConfirmDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default ConfirmDialog;
