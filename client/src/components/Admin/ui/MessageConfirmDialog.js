import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";
import { Button, TextField } from "../../../components/UI";

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
          variant="Outlined"
          onChange={(e) => setMessage(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button type="button" onClick={handleCancel}>
          Cancel
        </Button>
        <Button type="button" onClick={handleSubmit}>
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
