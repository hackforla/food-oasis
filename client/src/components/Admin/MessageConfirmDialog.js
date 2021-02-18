import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";

function MessageDialog(props) {
  const { onClose, open, message: initialMessage, ...other } = props;
  const [message, setMessage] = useState(initialMessage);

  const handleCancel = () => {
    onClose(false);
  };

  const handleSubmit = () => {
    onClose(message);
  };

  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      fullWidth
      maxWidth="md"
      aria-labelledby="confirmation-dialog-title"
      open={open}
      {...other}
    >
      <DialogTitle id="confirmation-dialog-title">Message:</DialogTitle>
      <DialogContent dividers>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          name="message"
          label="Verification Notes"
          type="text"
          size="small"
          multiline
          rows={4}
          rowsMax={12}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}

MessageDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default MessageDialog;
