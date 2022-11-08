import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormLabel,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import { Button } from "../../../components/UI";
import makeStyles from '@mui/styles/makeStyles';
import { white } from "theme/colors";

const useStyles = makeStyles((theme) => ({
  button: {
    borderColor: theme.palette.primary.translucent,
    "&:hover": {
      background: theme.palette.primary.main,
      color: white,
    },
  },
}));

function NeedsVerificationDialog(props) {
  const { onClose, open, ...other } = props;
  const classes = useStyles();

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
          onChange={(e) => setMessage(!!e.target.value)}
        />
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
        <Button
          variant="outlined"
          className={classes.button}
          autoFocus
          onClick={handleCancel}
        >
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
