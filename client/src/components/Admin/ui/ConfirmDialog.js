import React from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@material-ui/core";
import { Button } from "../../../components/UI";

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
        <Button type="button" autoFocus onClick={handleCancel}>
          Cancel
        </Button>
        <Button type="button" onClick={handleAssign}>
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
