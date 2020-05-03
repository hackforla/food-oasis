import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, IconButton } from "@material-ui/core";
import {
  Add,
  Delete,
  Check,
  Close,
  Save,
  Edit,
  Cancel,
  Search,
  Details,
  Remove,
} from "@material-ui/icons";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import ArrowDownward from "@material-ui/icons/ArrowDownward";

const useStyles = makeStyles((theme) => ({
  deleteButton: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.primary.main,
  },
}));

const AddButton = (props) => {
  return (
    <Button variant="contained" color="primary" {...props}>
      <Add />
      {props.label ? props.label : "Add"}
    </Button>
  );
};

// For saving changes
const CancelButton = (props) => {
  return (
    <Button variant="contained" {...props}>
      <Cancel />
      {props.label || props.label === "" ? props.label : "Cancel"}
    </Button>
  );
};

const CancelIconButton = (props) => {
  return (
    <IconButton
      variant="contained"
      color="default"
      aria-label="cancel"
      {...props}
    >
      <Cancel />
    </IconButton>
  );
};

// For closing a dialog, page or panel without saving changes, if any
const CloseButton = (props) => {
  return (
    <Button variant="contained" color="primary" {...props}>
      <Close />
      {props.label || props.label === "" ? props.label : "Close"}
    </Button>
  );
};

// For deleting something from the application entirely and committing the deletion
const DeleteButton = (props) => {
  const classes = useStyles();
  return (
    <Button variant="contained" className={classes.deleteButton} {...props}>
      <Delete />
      {props.label || props.label === "" ? props.label : "Delete"}
    </Button>
  );
};

const DeleteIconButton = (props) => {
  return (
    <IconButton
      variant="contained"
      color="default"
      aria-label="delete"
      {...props}
    >
      <Delete />
    </IconButton>
  );
};

// For accessing more detailed information
const DetailsButton = (props) => {
  return (
    <Button variant="contained" color="primary" {...props}>
      <Details />
      {props.label || props.label === "" ? props.label : "Details"}
    </Button>
  );
};

// To initiate editing of a object
const EditButton = (props) => {
  return (
    <Button variant="contained" color="primary" {...props}>
      <Edit />
      {props.label || props.label === "" ? props.label : "Edit"}
    </Button>
  );
};

// To remove a row from a table without committing the change to the database
const RemoveButton = (props) => {
  return (
    <Button variant="contained" color="primary" {...props}>
      <Remove />
      {props.label || props.label === "" ? props.label : "Remove"}
    </Button>
  );
};

// To remove a row from a table without committing the change to the database
// More subtle than a RemoveButton
const RemoveIconButton = (props) => {
  return (
    <IconButton
      variant="contained"
      color="default"
      aria-label="remove row"
      {...props}
    >
      <Remove />
    </IconButton>
  );
};

// To save a new or modified existing item to the database.
const SaveButton = (props) => {
  return (
    <Button variant="contained" color="primary" {...props}>
      <Save />
      {props.label || props.label === "" ? props.label : "Save"}
    </Button>
  );
};

// To initiate a search or open a search feature
const SearchButton = (props) => {
  return (
    <Button variant="contained" color="primary" {...props}>
      <Search />
      {props.label || props.label === "" ? props.label : "Search"}
    </Button>
  );
};

// To initiate an operation that marks an object's data as verified
// by the user.
const VerifyButton = (props) => {
  return (
    <Button variant="contained" color="primary" {...props}>
      <Check />
      {props.label || props.label === "" ? props.label : "Verify"}
    </Button>
  );
};

const MoveUpButton = (props) => {
  return (
    <Button variant="contained" color="primary" {...props}>
      <ArrowUpward />
      {props.label || props.label === "" ? props.label : "Move Up"}
    </Button>
  );
};

const MoveDownButton = (props) => {
  return (
    <Button variant="contained" color="primary" {...props}>
      <ArrowDownward />
      {props.label || props.label === "" ? props.label : "Move Down"}
    </Button>
  );
};

export {
  AddButton,
  CancelButton,
  CancelIconButton,
  CloseButton,
  DeleteButton,
  DeleteIconButton,
  DetailsButton,
  EditButton,
  RemoveButton,
  RemoveIconButton,
  SaveButton,
  SearchButton,
  VerifyButton,
  MoveUpButton,
  MoveDownButton,
};
