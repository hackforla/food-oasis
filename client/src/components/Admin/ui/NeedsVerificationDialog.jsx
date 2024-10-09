import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";
import Label from "./Label";
import Textarea from "./Textarea";

function NeedsVerificationDialog(props) {
  const { onClose, open, ...other } = props;

  const [message, setMessage] = useState("");
  const [preserveConfirmations, setPreserveConfirmations] = useState("");

  const handleCancel = () => {
    onClose(false);
    setMessage("");
    setPreserveConfirmations("");
  };

  const handleConfirm = () => {
    onClose({ message, preserveConfirmations });
    setMessage("");
    setPreserveConfirmations("");
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
        <div>
          <Label id="message" label="Reviewer Notes" />
          <Textarea
            id="message"
            margin="normal"
            fullWidth
            name="message"
            placeholder="Reviewer Notes"
            type="text"
            size="small"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <FormLabel id="confirmation-reset-options=label">
          Critical Field Confirmations
        </FormLabel>
        <RadioGroup
          aria-labelledby="confirmation-reset-options-label"
          name="confirmation-reset-options"
          value={preserveConfirmations}
          onChange={(e) => setPreserveConfirmations(e.target.value)}
        >
          <FormControlLabel
            value=""
            control={<Radio />}
            label="Uncheck all confirmation checkboxes"
          />
          <FormControlLabel
            value="true"
            control={<Radio />}
            label="Leave confirmation checkboxes unchanged"
          />
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" autoFocus onClick={handleCancel}>
          Cancel
        </Button>

        <Button variant="contained" type="button" onClick={handleConfirm}>
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
