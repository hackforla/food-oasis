import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import { Input, Button } from "../../../components/UI";

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
        <Input
          margin="normal"
          fullWidth
          name="message"
          label="Verification Notes"
          type="text"
          size="small"
          multiline
          minRows={4}
          maxRows={12}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button type="button" text="Cancel" onClick={handleCancel} />
        <Button type="button" text="OK" onClick={handleSubmit} />
      </DialogActions>
    </Dialog>
  );
}

MessageDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default MessageDialog;
