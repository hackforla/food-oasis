import AssessmentIcon from "@mui/icons-material/Assessment";
import CommentIcon from "@mui/icons-material/Comment";
import EmailIcon from "@mui/icons-material/Email";
import HomeIcon from "@mui/icons-material/Home";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Chip,
  Container,
  Divider,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  Modal,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { Formik } from "formik";
import { useSuggestions } from "hooks/useSuggestions";
import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import * as suggestionService from "../../services/suggestion-service";
import { getIsMobile } from "../../utils";
import Label from "./ui/Label";
import Textarea from "./ui/Textarea";

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
    width: "90vw",
    overflow: "scroll",
  };
}

function Suggestions() {
  const initialStatusIds = [1, 2, 3, 4];
  const [suggestions, setSuggestions] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [activeOrg, setActiveOrg] = useState(null);
  const [modalStyle] = useState(getModalStyle);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState(initialStatusIds);
  let { data, status, setStatusIds } = useSuggestions(initialStatusIds);
  const isMobile = getIsMobile();
  const location = useLocation();

  useEffect(() => {
    if (data) {
      setSuggestions(data);
    }
  }, [data]);

  useEffect(() => {
    if (status === 401) {
      return (
        <Navigate to={{ pathname: "/login", state: { from: location } }} />
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
      <Box
        sx={(theme) => ({
          marginBottom: theme.spacing(1),
          display: "flex",
          justifyContent: "space-between",
        })}
      >
        <h2>Suggestions Administration</h2>
        <FormControl
          sx={(theme) => ({
            margin: theme.spacing(1),
            minWidth: 180,
          })}
        >
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
      </Box>

      <Paper>
        <TableContainer sx={{ maxHeight: "500px", cursor: "pointer" }}>
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
                <Paper
                  style={modalStyle}
                  sx={(theme) => ({
                    position: "absolute",
                    backgroundColor: theme.palette.background.paper,
                    boxShadow: theme.shadows[5],
                    padding: theme.spacing(2, getIsMobile() ? 1 : 4, 3),
                  })}
                >
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
                    <FormControl
                      sx={(theme) => ({
                        margin: theme.spacing(1),
                        minWidth: 180,
                      })}
                    >
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
                    <div>
                      <Label id="adminNotes" label="Admin Notes" />
                      <Textarea
                        placeholder="Admin Notes"
                        id="adminNotes"
                        value={values.adminNotes || ""}
                        onChange={handleChange}
                        helperText={touched.adminNotes ? errors.adminNotes : ""}
                        error={touched.adminNotes && Boolean(errors.adminNotes)}
                        fullWidth
                        autoFocus
                      />
                    </div>
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
                      <Box
                        sx={(theme) => ({ color: theme.palette.error.main })}
                      >
                        Something went wrong.
                      </Box>
                    )}
                    <Box mt={3} display="flex" justifyContent="space-between">
                      <Button
                        variant="outlined"
                        onClick={() => setActiveOrg(null)}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="contained"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        Save
                      </Button>
                    </Box>
                  </form>
                </Paper>
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

export default Suggestions;
