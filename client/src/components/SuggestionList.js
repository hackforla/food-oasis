import React, { useState } from "react";
import { withRouter, Link, useLocation, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Backdrop,
  Button,
  IconButton,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import * as suggestionService from "../services/suggestion-service";

import StakeholderEditModal from "./StakeholderEditModal";

const SUGGESTION_FIELDS = [
  "name",
  "address1",
  "address2",
  "city",
  "state",
  "zip",
  "phone",
  "email",
  "website",
  "hours",
  "notes",
];

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "2rem 0rem",
    padding: "2rem",
    display: "flex",
    flexDirection: "column",
    borderRadius: "8px",
    boxShadow: "-.25rem 0 2rem #C7CCD1",
    overflow: "scroll",
  },
  modalContent: {
    position: "fixed",
    top: "30%",
    left: "30%",
    right: "30%",
    textAlign: "center",
    padding: "1rem",
    backgroundColor: theme.palette.background.default,
    "& button": {
      margin: ".25rem",
    },
  },
}));

const SuggestionList = ({ user, suggestions, setSuggestions }) => {
  const [openModal, setOpenModal] = useState(false);
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();

  const searchParams = new URLSearchParams(location.search);

  const handleRemoveItem = async () => {
    if (!openModal) return;
    await suggestionService.remove(openModal);
    setSuggestions((prevState) =>
      prevState.filter((stakeholder) => stakeholder.id !== openModal)
    );
    setOpenModal(false);
  };

  const handleModal = (id) => {
    if (!openModal) {
      setOpenModal(id);
    } else {
      setOpenModal(false);
    }
  };

  return (
    <main className={classes.root}>
      <Typography variant="h4">Submitted suggestions</Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Suggested changes</TableCell>
              <TableCell>Referrer name</TableCell>
              <TableCell>Referrer phone</TableCell>
              <TableCell>Referrer email</TableCell>
              <TableCell>Assigned user</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {suggestions &&
              suggestions.map((sugg) => (
                <TableRow key={sugg.id}>
                  <TableCell>
                    <Link
                      to={`${location.pathname}?orgedit=${sugg.stakeholder_id}`}
                    >
                      {sugg.stakeholder_id}
                    </Link>
                  </TableCell>
                  <TableCell>{sugg.name}</TableCell>
                  <TableCell>
                    <ul>
                      {SUGGESTION_FIELDS.map(
                        (field) =>
                          sugg[field] && (
                            <li key={field}>{`${field.replace(/^\w/, (c) =>
                              c.toUpperCase()
                            )}: ${sugg[field]}`}</li>
                          )
                      )}
                    </ul>
                  </TableCell>
                  <TableCell>{sugg.tipstername}</TableCell>
                  <TableCell>{sugg.tipsterphone}</TableCell>
                  <TableCell>{sugg.tipsteremail}</TableCell>
                  <TableCell>
                    {sugg.assigned_login_id
                      ? sugg.assigned_login_id
                      : "No assigned user"}
                  </TableCell>
                  <TableCell>In queue</TableCell>
                  <TableCell>
                    {user.isAdmin && (
                      <IconButton onClick={() => handleModal(sugg.id)}>
                        <DeleteIcon />
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        open={Boolean(openModal)}
        onClose={handleModal}
        BackdropComponent={Backdrop}
      >
        <div className={classes.modalContent}>
          <p>Are you sure you want to remove this suggestion?</p>
          <Button variant="contained" onClick={handleRemoveItem}>
            Yes
          </Button>
          <Button variant="contained" onClick={handleModal}>
            No
          </Button>
        </div>
      </Modal>
      <StakeholderEditModal
        location={location}
        stakeholderId={searchParams.get("orgedit")}
        user={user}
        open={Boolean(searchParams.get("orgedit"))}
        handleClose={history.goBack}
      />
    </main>
  );
};

export default withRouter(SuggestionList);

SuggestionList.propTypes = {
  suggestions: PropTypes.arrayOf(PropTypes.object),
  setSuggestions: PropTypes.func,
};
