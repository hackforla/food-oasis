import AssessmentIcon from "@mui/icons-material/Assessment";
import CommentIcon from "@mui/icons-material/Comment";
import EmailIcon from "@mui/icons-material/Email";
import HomeIcon from "@mui/icons-material/Home";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CategoryIcon from "@mui/icons-material/Category";
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
  TableCellProps,
  TableContainer,
  TableHead,
  TablePagination,
  TablePaginationOwnProps,
  TableRow,
  Typography,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material/Select";
import { Formik } from "formik";
import { useSuggestions } from "hooks/useSuggestions";
import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import * as suggestionService from "../../services/suggestion-service";
import { getIsMobile } from "../../utils";
import Label from "./ui/Label";
import Textarea from "./ui/Textarea";

interface Filter {
  id: number;
  name: string;
}

interface AdminSuggestion {
  id: number;
  name?: string;
  notes?: string;
  suggestionStatusId?: number;
  formType?: string;
  adminNotes?: string;
  address1?: string;
  address2?: string;
  city?: string;
  email?: string;
  phone?: string;
  category?: string;
  hours?: string;
  tipsterName?: string;
  tipsterEmail?: string;
  tipsterPhone?: string;
}

interface SuggestionFormValues {
  adminNotes: string;
  suggestionStatusId: number;
}

interface Column {
  id: "name" | "notes" | "suggestionStatusId" | "formType";
  label: string;
  minWidth: number;
  align?: TableCellProps["align"];
}

const columns: Column[] = [
  { id: "name", label: "Name", minWidth: 100 },
  { id: "notes", label: "Notes", minWidth: 10 },
  { id: "suggestionStatusId", label: "Status", minWidth: 10 },
  { id: "formType", label: "Type", minWidth: 10 },
];

export const FILTERS: Filter[] = [
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
  const [suggestions, setSuggestions] = useState<AdminSuggestion[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [activeOrg, setActiveOrg] = useState<AdminSuggestion | null>(null);
  const [modalStyle] = useState<React.CSSProperties>(getModalStyle);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState<number[]>(initialStatusIds);
  const { data, status, setStatusIds } = useSuggestions(initialStatusIds) as {
    data: AdminSuggestion[];
    status?: number;
    setStatusIds: (ids: number[]) => void;
  };
  const isMobile = getIsMobile();
  const location = useLocation();

  useEffect(() => {
    if (data) {
      setSuggestions(data);
    }
  }, [data]);

  const handleChangePage: TablePaginationOwnProps["onPageChange"] = (
    _event,
    newPage
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage: TablePaginationOwnProps["onRowsPerPageChange"] =
    (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

  const handleSave = async (formData: SuggestionFormValues) => {
    if (!activeOrg) {
      return;
    }

    try {
      await suggestionService.update({ ...formData, id: activeOrg.id });

      setSuggestions((prev: AdminSuggestion[]) => {
        return prev.map((suggestion) => {
          if (suggestion.id === activeOrg.id) {
            return { ...suggestion, ...formData };
          }
          return suggestion;
        });
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
      setTimeout(() => {
        setError("");
      }, 3000);
    }

    setActiveOrg(null);
  };

  const handleFilterChange = (e: SelectChangeEvent<number[]>) => {
    const value =
      typeof e.target.value === "string"
        ? e.target.value.split(",").map(Number)
        : (e.target.value as number[]);
    setFilters(value);
    setStatusIds(value);
  };

  const getStatusColor = (value: number) => {
    if (value === 1) {
      return "primary";
    } else if (value === 2) {
      return "secondary";
    } else if (value === 3) {
      return "default";
    }
    return "default";
  };

  if (status === 401) {
    return <Navigate to="/admin/login" state={{ from: location }} />;
  }

  return (
    <Container>
      <Box
        sx={(theme) => ({
          marginBottom: theme.spacing(1),
          display: "flex",
          justifyContent: "space-between",
        })}
      >
        <Box>
          <Typography component="h1" variant="h4">
            Suggestions &amp; Corrections Administration
          </Typography>
          <Typography variant="subtitle1">
            Suggested new listings and Corrections to existing listings
          </Typography>
        </Box>
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
              (selected as number[])
                .map((s) => FILTERS.find((f) => f.id === Number(s))?.name || "")
                .filter(Boolean)
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
                      selected={suggestion.id === activeOrg?.id}
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
                              setActiveOrg(org || null);
                            }}
                          >
                            {column.label === "Status" ? (
                              <Chip
                                label={
                                  FILTERS.find((s) => s.id === Number(value))
                                    ?.name || "Unknown"
                                }
                                color={getStatusColor(Number(value))}
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
            <Box>
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
                        handleSubmit();
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
                          label="Email"
                          value={activeOrg.email}
                          icon={<EmailIcon />}
                        />
                        <Divider variant="inset" component="li" />
                        <DisplayText
                          label="Phone"
                          value={activeOrg.phone}
                          icon={<PhoneIcon />}
                        />
                        <Divider variant="inset" component="li" />
                        <DisplayText
                          label="Category"
                          value={activeOrg.category}
                          icon={<CategoryIcon />}
                        />
                        <Divider variant="inset" component="li" />
                        <DisplayText
                          label="Hours"
                          value={activeOrg.hours}
                          icon={<AccessTimeIcon />}
                        />
                      </List>
                      <Divider style={{ margin: "1em 0" }} />
                      <div>
                        <Label id="adminNotes" label="Admin Notes" />
                        <Textarea
                          placeholder="Admin Notes"
                          id="adminNotes"
                          name="adminNotes"
                          value={values.adminNotes || ""}
                          onChange={handleChange}
                          helperText={
                            touched.adminNotes ? errors.adminNotes : ""
                          }
                          error={
                            touched.adminNotes && Boolean(errors.adminNotes)
                          }
                          fullWidth
                        />
                      </div>
                      <List>
                        <DisplayText
                          label="Tipster Notes"
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
            </Box>
          </Modal>
        )}
      </Paper>
    </Container>
  );
}

interface DisplayTextProps {
  label: string;
  value?: string | number | null;
  icon?: React.ReactNode;
}

const DisplayText = ({
  label,
  value,
  icon = <CommentIcon />,
}: DisplayTextProps) => {
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
