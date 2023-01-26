import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import AccountAutocomplete from "./AccountAutocomplete";
import { PrimaryButton, SecondaryButton } from "..//UI/StandardButton";

function AssignDialog(props) {
  const { onClose, open, ...other } = props;
  const [accountId, setAccountId] = useState(null);

  const handleCancel = () => {
    onClose(false);
  };

  const handleAssign = () => {
    onClose(accountId);
  };

  return (
    <Dialog
      onClose={handleCancel}
      disableEscapeKeyDown
      fullWidth
      maxWidth="sm"
      aria-labelledby="confirmation-dialog-title"
      open={open}
      {...other}
    >
      <DialogTitle id="confirmation-dialog-title">Assign to:</DialogTitle>
      <DialogContent dividers>
        <AccountAutocomplete
          name="assignedLoginId"
          accountId={accountId}
          setAccountId={(assignedAccountId) => setAccountId(assignedAccountId)}
        />
      </DialogContent>
      <DialogActions>
        <SecondaryButton autoFocus onClick={handleCancel}>
          Cancel
        </SecondaryButton>
        <PrimaryButton onClick={handleAssign} disabled={!accountId}>
          Assign
        </PrimaryButton>
      </DialogActions>
    </Dialog>
  );
}

AssignDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default AssignDialog;
