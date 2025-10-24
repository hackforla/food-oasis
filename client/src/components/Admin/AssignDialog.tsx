import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
} from "@mui/material";
import { useState } from "react";
import AccountAutocomplete from "./AccountAutocomplete";

interface AssignDialogProps extends Omit<DialogProps, "onClose"> {
  open: boolean;
  onClose: (value: string | number | false) => void;
}

function AssignDialog(props: AssignDialogProps) {
  const { onClose, open, ...other } = props;
  const [accountId, setAccountId] = useState< number | null>(null);

  const handleCancel = () => {
    onClose(false);
  };

  const handleAssign = () => {
    if (accountId !== null) {
      onClose(accountId);
    }
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
export default AssignDialog;
