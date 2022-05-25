import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";
import { Button } from "../../../components/UI";

function NeedsVerificationDialog(props) {
  const {
    onClose,
    open,
    message: initialMessage,
    preserveConfirmations: initialPreserveConfirmations,
    ...other
  } = props;
  const [message, setMessage] = useState(initialMessage);
  const [preserveConfirmations, setPreserveConfirmations] = useState(
    initialPreserveConfirmations
  );

  const handleCancel = () => {
    onClose(false);
  };

  const handleConfirm = () => {
    onClose({ message, preserveConfirmations });
    setMessage(initialMessage);
    setPreserveConfirmations(initialPreserveConfirmations);
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
        <TextField
          margin="normal"
          fullWidth
          name="message"
          label="Reviewer Notes"
          type="text"
          size="small"
          variant="outlined"
          multiline
          minRows={4}
          maxRows={12}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={preserveConfirmations}
              onChange={(e) => setPreserveConfirmations(e.target.checked)}
            />
          }
          label="Preserve Confirmation Checkbox Statuses"
        />
      </DialogContent>
      <DialogActions>
        <Button type="button" autoFocus onClick={handleCancel}>
          Cancel
        </Button>
        <Button type="button" onClick={handleConfirm}>
          Confirm Status Change
        </Button>
      </DialogActions>
    </Dialog>
  );
}

NeedsVerificationDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default NeedsVerificationDialog;
