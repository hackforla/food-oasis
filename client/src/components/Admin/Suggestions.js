import React from "react";
import { useSuggestions } from "hooks/useSuggestions";
import makeStyles from "@mui/styles/makeStyles";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Container from "@mui/material/Container";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { PrimaryButton, SecondaryButton } from "../UI/StandardButton";
import { Formik } from "formik";
import * as suggestionService from "../../services/suggestion-service";
import { Redirect, withRouter } from "react-router-dom";
import Chip from "@mui/material/Chip";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import CommentIcon from "@mui/icons-material/Comment";
import Divider from "@mui/material/Divider";
import AssessmentIcon from "@mui/icons-material/Assessment";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import HomeIcon from "@mui/icons-material/Home";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PhoneIcon from "@mui/icons-material/Phone";
import { getIsMobile } from "../../utils";
import { TextField } from "@mui/material";

const columns = [
  { id: "name", label: "Name", minWidth: 100 },
  { id: "notes", label: "Suggestion", minWidth: 10 },
  { id: "suggestionStatusId", label: "Status", minWidth: 10 },
];

const FILTERS = [
  { id: 1, name: "New" },
  { id: 2, name: "Pending" },
  { id: 3, name: "Incorrect" },
  { id: 4, name: "Confirmed" },
];

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    maxHeight: "80vh",
    // minWidth: "60vw",
    width: "90vw",
    overflow: "scroll",
  };
}

const useStyles = makeStyles((theme) => ({
  container: {
    maxHeight: "500px",
    cursor: "pointer",
  },
  heading: {
    marginBottom: theme.spacing(1),
    display: "flex",
    justifyContent: "space-between",
  },
  paper: {
    position: "absolute",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, getIsMobile() ? 1 : 4, 3),
  },
  error: {
    color: theme.palette.error.main,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 180,
  },
}));

function Suggestions(props) {
  const initialStatusIds = [1, 2, 3, 4];
  const [suggestions, setSuggestions] = React.useState([]);
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [activeOrg, setActiveOrg] = React.useState(null);
  const [modalStyle] = React.useState(getModalStyle);
  const [error, setError] = React.useState("");
  const [filters, setFilters] = React.useState(initialStatusIds);
  let { data, status, setStatusIds } = useSuggestions(initialStatusIds);
  const isMobile = getIsMobile();

  React.useEffect(() => {
    if (data) {
      setSuggestions(data);
    }
  }, [data]);

  React.useEffect(() => {
    if (status === 401) {
      return (
        <Redirect
          to={{ pathname: "/login", state: { from: props.location } }}
        />
      );
    }
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSave = async (data) => {
    try {
      await suggestionService.update({ ...data, id: activeOrg.id });

      setSuggestions((prev) => {
        return prev.map((suggestion) => {
          if (suggestion.id === activeOrg.id) {
            return { ...suggestion, ...data };
          }
          return suggestion;
        });
      });
    } catch (e) {
      setError(e.message);
      setTimeout(() => {
        setError("");
      }, 3000);
    }

    setActiveOrg(null);
  };

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilters(value);
    setStatusIds(value);
  };

  const getStatusColor = (value) => {
    if (value === 1) {
      return "primary";
    } else if (value === 2) {
      return "secondary";
    } else if (value === 3) {
      return "default";
    }
    return "default";
  };

  return (
    <Container>
      <div className={classes.heading}>
        <h2>Suggestions Administration</h2>
        <FormControl className={classes.formControl}>
          <InputLabel id="filters-checkbox-label">Filters</InputLabel>
          <Select
            labelId="filters-checkbox-label"
            id="filters-mutiple-checkbox"
            multiple
            value={filters}
            onChange={handleFilterChange}
            renderValue={(selected) =>
              selected
                .map((s) => (s = FILTERS.find((f) => f.id === Number(s)).name))
                .join(", ")
            }
          >
            {FILTERS.map((filter) => (
              <MenuItem key={filter.id} value={filter.id}>
                <Checkbox checked={filters.indexOf(filter.id) > -1} />
                <ListItemText primary={filter.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <Paper>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {suggestions
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((suggestion) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={suggestion.id}
                      selected={suggestion.id === activeOrg}
                    >
                      {columns.map((column) => {
                        const value = suggestion[column.id];
                        return (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            onClick={() => {
                              const org = suggestions.find(
                                (org) => suggestion.id === org.id
                              );
                              setActiveOrg(org);
                            }}
                          >
                            {column.label === "Status" ? (
                              <Chip
                                label={FILTERS.find((s) => s.id === value).name}
                                color={getStatusColor(value)}
                              />
                            ) : (
                              value
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={suggestions.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        {activeOrg && (
          <Modal
            open={!!activeOrg}
            onClose={() => setActiveOrg(null)}
            aria-labelledby="parent-org-modal"
            aria-describedby="parent-org-modal-description"
          >
            <Formik
              initialValues={{
                adminNotes: activeOrg.adminNotes || "",
                suggestionStatusId: activeOrg.suggestionStatusId || 1,
              }}
              onSubmit={(values) => handleSave(values)}
            >
              {({
                values,
                handleChange,
                handleSubmit,
                touched,
                errors,
                isSubmitting,
              }) => (
                <div style={modalStyle} className={classes.paper}>
                  <div
                    id="simple-modal-title"
                    style={{
                      display: "flex",
                      flexDirection: isMobile ? "column" : "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <h1
                      style={{
                        width: isMobile ? "90%" : "80%",
                      }}
                    >
                      {activeOrg.name}
                    </h1>
                    <FormControl className={classes.formControl}>
                      <InputLabel id="status-select">Status</InputLabel>
                      <Select
                        labelId="status-select"
                        id="suggestionStatusId"
                        name="suggestionStatusId"
                        value={values.suggestionStatusId}
                        onChange={handleChange}
                      >
                        {FILTERS.map((status) => (
                          <MenuItem key={status.id} value={status.id}>
                            {status.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSubmit(e);
                    }}
                  >
                    <List>
                      <DisplayText
                        label="Address 1"
                        value={activeOrg.address1}
                        icon={<HomeIcon />}
                      />
                      <Divider variant="inset" component="li" />
                      <DisplayText
                        label="Address 2"
                        value={activeOrg.address2}
                        icon={<HomeIcon />}
                      />
                      <Divider variant="inset" component="li" />
                      <DisplayText
                        label="City"
                        value={activeOrg.city}
                        icon={<LocationCityIcon />}
                      />
                      <Divider variant="inset" component="li" />
                      <DisplayText
                        label="Phone"
                        value={activeOrg.phone}
                        icon={<PhoneIcon />}
                      />
                    </List>
                    <Divider style={{ margin: "1em 0" }} />
                    <TextField
                      label="Admin Notes"
                      id="adminNotes"
                      value={values.adminNotes || ""}
                      onChange={handleChange}
                      helperText={touched.adminNotes ? errors.adminNotes : ""}
                      error={touched.adminNotes && Boolean(errors.adminNotes)}
                      fullWidth
                      autoFocus
                      multiline
                      minRows={4}
                    />
                    <List>
                      <DisplayText
                        label="Suggestion"
                        value={activeOrg.notes}
                        icon={<AssessmentIcon />}
                      />
                      <Divider variant="inset" component="li" />
                      <DisplayText
                        label="Tipster Name"
                        value={activeOrg.tipsterName}
                        icon={<PersonIcon />}
                      />
                      <Divider variant="inset" component="li" />
                      <DisplayText
                        label="Tipster Email"
                        value={activeOrg.tipsterEmail}
                        icon={<EmailIcon />}
                      />
                      <Divider variant="inset" component="li" />
                      <DisplayText
                        label="Tipster Phone"
                        value={activeOrg.tipsterPhone}
                        icon={<PhoneIphoneIcon />}
                      />
                    </List>

                    {error && (
                      <div className={classes.error}>Something went wrong.</div>
                    )}
                    <Box mt={3} display="flex" justifyContent="space-between">
                      <SecondaryButton onClick={() => setActiveOrg(null)}>
                        Cancel
                      </SecondaryButton>
                      <PrimaryButton type="submit" disabled={isSubmitting}>
                        Save
                      </PrimaryButton>
                    </Box>
                  </form>
                </div>
              )}
            </Formik>
          </Modal>
        )}
      </Paper>
    </Container>
  );
}

const DisplayText = ({ label, value, icon = <CommentIcon /> }) => {
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>{icon}</Avatar>
      </ListItemAvatar>
      <ListItemText primary={label} secondary={value ? value : "n/a"} />
    </ListItem>
  );
};

export default withRouter(Suggestions);
