import React from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
// import { Button } from "../../../components/UI";
import { PrimaryButton, SecondaryButton } from "../../UI/StandardButton";

const optionDescriptions = {
  replace:
    "Removes all current records and adds imported records. This will REMOVE ALL existing stakeholder data.",
  update:
    "Updates all records matching your provided IDs. If an ID field is blank, the record will be treated as a new entry.",
  add: "Imports records without changing any existing records. This is not destructive but can result in duplicate records.",
};

const useStyles = makeStyles((theme) => ({
  formControl: {
    padding: theme.spacing(3),
  },
  dialogContent: {
    minHeight: "3em",
  },
}));

function ImportDialog(props) {
  const {
    tenantName,
    handleImport,
    handleImportAction,
    importData,
    open,
    children,
    ...other
  } = props;
  const classes = useStyles();

  return (
    <Dialog
      disableEscapeKeyDown
      fullWidth
      maxWidth="sm"
      aria-labelledby="import-dialog-title"
      open={open}
      {...other}
    >
      <DialogTitle id="import-dialog-title">{props.title}</DialogTitle>
      <DialogContent dividers className={classes.dialogContent}>
        <Typography>{props.message}</Typography>
        <Typography>
          {optionDescriptions[importData.action] ||
            "Please select an option below."}
        </Typography>
      </DialogContent>
      <FormControl component="fieldset" className={classes.formControl}>
        <RadioGroup
          arial-label="import-options"
          name="import-options"
          onChange={handleImportAction}
        >
          <FormControlLabel
            value="replace"
            control={<Radio />}
            label="Replace"
          />
          <FormControlLabel value="update" control={<Radio />} label="Update" />
          <FormControlLabel value="add" control={<Radio />} label="Add" />
        </RadioGroup>
      </FormControl>
      <DialogActions>
        <SecondaryButton type="button" onClick={handleImportAction}>
          Cancel
        </SecondaryButton>
        <PrimaryButton
          type="button"
          autoFocus
          onClick={handleImport}
          disabled={!importData.action}
        >
          Submit
        </PrimaryButton>
      </DialogActions>
    </Dialog>
  );
}

ImportDialog.propTypes = {
  open: PropTypes.bool.isRequired,
};

export default ImportDialog;
