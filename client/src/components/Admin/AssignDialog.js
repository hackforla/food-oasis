import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";
import AccountAutocomplete from "./AccountAutocomplete";

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
        <Button variant="outlined" autoFocus onClick={handleCancel}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleAssign}
          disabled={!accountId}
        >
          Assign
        </Button>
      </DialogActions>
    </Dialog>
  );
}

AssignDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default AssignDialog;
