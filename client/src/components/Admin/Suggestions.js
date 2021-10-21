import React from "react";
import { useSuggestions } from "hooks/useSuggestions";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Container from "@material-ui/core/Container";
import Modal from "@material-ui/core/Modal";
import Box from "@material-ui/core/Box";
import Button from "../UI/Button";
import Input from "../UI/Input";
import { Formik } from "formik";
import * as suggestionService from "../../services/suggestion-service";
import { Redirect, withRouter } from "react-router-dom";
import Chip from "@material-ui/core/Chip";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import CommentIcon from "@material-ui/icons/Comment";
import Divider from "@material-ui/core/Divider";
import AssessmentIcon from "@material-ui/icons/Assessment";
import PersonIcon from "@material-ui/icons/Person";
import EmailIcon from "@material-ui/icons/Email";
import PhoneIphoneIcon from "@material-ui/icons/PhoneIphone";
import HomeIcon from "@material-ui/icons/Home";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import PhoneIcon from "@material-ui/icons/Phone";
import { getIsMobile } from "../../hooks/utils";

const columns = [
  { id: "name", label: "Name", minWidth: 100 },
  { id: "notes", label: "Suggestion", minWidth: 10 },
  { id: "status", label: "Status", minWidth: 10 },
];

const FILTERS = ["Verified", "Closed", "Open"];

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
  const [suggestions, setSuggestions] = React.useState([]);
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [activeOrg, setActiveOrg] = React.useState(null);
  const [modalStyle] = React.useState(getModalStyle);
  const [error, setError] = React.useState("");
  const [filters, setFilters] = React.useState(["Verified", "Open", "Closed"]);
  let { data, status } = useSuggestions(filters);
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
  };

  const getStatusColor = (value) => {
    if (value === "Verified") {
      return "primary";
    } else if (value === "Open") {
      return "secondary";
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
            renderValue={(selected) => selected.join(", ")}
          >
            {FILTERS.map((filter) => (
              <MenuItem key={filter} value={filter}>
                <Checkbox checked={filters.indexOf(filter) > -1} />
                <ListItemText primary={filter} />
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
                                label={value}
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
                status: activeOrg.status || "",
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
                        id="status"
                        name="status"
                        value={values.status}
                        onChange={handleChange}
                      >
                        {FILTERS.map((status) => (
                          <MenuItem key={status} value={status}>
                            {status}
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
                    <Input
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
                      <Button
                        color="default"
                        onClick={() => setActiveOrg(null)}
                      >
                        Cancel
                      </Button>
                      <Button type="submit" disabled={isSubmitting}>
                        Save
                      </Button>
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
