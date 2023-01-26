import React from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { PrimaryButton, SecondaryButton } from "../../UI/StandardButton";

function ConfirmDialog(props) {
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
        <SecondaryButton type="button" autoFocus onClick={handleCancel}>
          Cancel
        </SecondaryButton>
        <PrimaryButton type="button" onClick={handleAssign}>
          Confirm Delete
        </PrimaryButton>
      </DialogActions>
    </Dialog>
  );
}

ConfirmDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default ConfirmDialog;
