import {
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Paper,
  Stack,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { useAnnouncements } from "../../hooks/useAnnouncements";
import * as announcementService from "../../services/announcements-service";
import EditIcon from "@mui/icons-material/Edit";

interface Announcement {
  announcementId: number;
  title: string;
  description: string;
  is_enabled: boolean;
  severity: "info" | "warning" | "error" | "success";
  created_at: string;
}

interface FormikValues {
  title: string;
  description: string;
  is_enabled: boolean;
  severity: "info" | "warning" | "error" | "success";
}

type SortField = "created_at" | "severity" | "title" | "announcementId";
type SortDirection = "asc" | "desc";

const Announcements: React.FC = () => {
  const [announcementModalOpen, setAnnouncementModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editAnnouncement, setEditAnnouncement] = useState<Announcement | null>(
    null
  );
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [sortBy, setSortBy] = useState<SortField>("created_at");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const {
    data: announcementsData,
    loading: announcementsLoading,
    refetch: announcementRefetch,
  } = useAnnouncements();

  const handleModalClose = () => {
    setAnnouncementModalOpen(false);
    announcementFormik.resetForm();
  };

  const handleIsEnabled = async (
    announcementId: number,
    isEnabled: boolean
  ) => {
    try {
      const announcement = (announcementsData || []).find(
        (row) => row.announcementId === announcementId
      );
      if (!announcement) throw new Error("Announcement not found");

      await announcementService.update(announcementId, {
        title: announcement.title,
        description: announcement.description,
        is_enabled: isEnabled,
        severity: announcement.severity,
      });
      await announcementRefetch();
    } catch (error) {
      console.error("Error updating announcement:", error);
    }
  };

  const announcementFormik = useFormik<FormikValues>({
    initialValues: {
      title: "",
      description: "",
      is_enabled: false,
      severity: "info",
    },
    validationSchema: Yup.object({
      title: Yup.string().trim().required("Title is required"),
      description: Yup.string().trim().required("Description is required"),
    }),
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      await announcementService.post(values);
      await announcementRefetch();
      resetForm();
      setSubmitting(false);
      handleModalClose();
    },
  });

  const editFormik = useFormik<FormikValues>({
    enableReinitialize: true,
    initialValues: {
      title: editAnnouncement?.title || "",
      description: editAnnouncement?.description || "",
      is_enabled: editAnnouncement?.is_enabled || false,
      severity: editAnnouncement?.severity || "info",
    },
    validationSchema: Yup.object({
      title: Yup.string().trim().required("Title is required"),
      description: Yup.string().trim().required("Description is required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      if (!editAnnouncement) return;
      await announcementService.update(editAnnouncement.announcementId, values);
      await announcementRefetch();
      setEditModalOpen(false);
      setEditAnnouncement(null);
      setSubmitting(false);
    },
  });

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const sortedAnnouncements = React.useMemo(() => {
    if (!announcementsData) return [];
    return [...announcementsData].sort((a, b) => {
      let aVal: any = a[sortBy];
      let bVal: any = b[sortBy];

      if (sortBy === "created_at") {
        aVal = new Date(aVal);
        bVal = new Date(bVal);
      } else if (sortBy === "severity") {
        const severityMap: Record<string, number> = {
          info: 0,
          warning: 1,
          error: 2,
          success: 3,
        };
        aVal = severityMap[aVal];
        bVal = severityMap[bVal];
      } else if (typeof aVal === "string") {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }

      if (sortDirection === "asc") {
        return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
      } else {
        return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
      }
    });
  }, [announcementsData, sortBy, sortDirection]);

  console.log("*******announcements **********:", announcementsData);
  if (announcementsLoading || !announcementsData) {
    return (
      <Stack
        style={{
          flexGrow: 1,
          width: "100%",
          margin: "100px auto",
          display: "flex",
          justifyContent: "space-around",
        }}
        aria-label="Loading spinner"
      >
        <CircularProgress />
      </Stack>
    );
  }

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          marginBottom: 1,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h2" style={{ margin: 0, fontWeight: "bold" }}>
          Announcements
        </Typography>
        <Box sx={{ display: "flex", gap: 2, marginTop: 1 }}>
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Sort By</InputLabel>
            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortField)}
              label="Sort By"
              data-testid="sort-by-select"
            >
              <MenuItem value="created_at">Created Date</MenuItem>
              <MenuItem value="severity">Severity</MenuItem>
              <MenuItem value="title">Title</MenuItem>
              <MenuItem value="announcementId">ID</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Order</InputLabel>
            <Select
              value={sortDirection}
              onChange={(e) =>
                setSortDirection(e.target.value as SortDirection)
              }
              label="Order"
            >
              <MenuItem value="asc">Ascending</MenuItem>
              <MenuItem value="desc">Descending</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            type="button"
            onClick={() => setAnnouncementModalOpen(true)}
          >
            Add New Announcement
          </Button>
        </Box>
      </Box>

      <TableContainer component={Paper} elevation={3}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell align="left">Announcement ID</TableCell>
              <TableCell align="left">Announcement Title</TableCell>
              <TableCell align="left">Announcement Description</TableCell>
              <TableCell align="left">Created Date</TableCell>
              <TableCell align="left">Severity</TableCell>
              <TableCell align="left">Enabled</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {(sortedAnnouncements || [])
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow
                  key={row.announcementId}
                  sx={{
                    "& > *": {
                      borderBottom: "unset",
                      cursor: "pointer",
                      backgroundColor: "#efefef",
                    },
                  }}
                  hover
                >
                  <TableCell>
                    <IconButton
                      aria-label="edit-announcement"
                      size="small"
                      onClick={() => {
                        setEditAnnouncement(row);
                        setEditModalOpen(true);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell align="left" component="th" scope="row">
                    {row.announcementId}
                  </TableCell>
                  <TableCell align="left" component="th" scope="row">
                    {row.title}
                  </TableCell>
                  <TableCell align="left" component="th" scope="row">
                    {row.description}
                  </TableCell>
                  <TableCell align="left" component="th" scope="row">
                    {new Date(row.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell align="left" component="th" scope="row">
                    {row.severity}
                  </TableCell>
                  <TableCell>
                    <FormControlLabel
                      control={
                        <Switch
                          color="success"
                          checked={row.is_enabled}
                          onChange={(e) =>
                            handleIsEnabled(
                              row.announcementId,
                              e.target.checked
                            )
                          }
                        />
                      }
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      color="error"
                      aria-label="delete-announcement"
                      onClick={async (e) => {
                        e.stopPropagation();
                        try {
                          await announcementService.remove(row.announcementId);
                          announcementRefetch();
                        } catch (error) {
                          console.error(
                            "Failed to remove announcement:",
                            error
                          );
                        }
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={announcementModalOpen}
        onClose={handleModalClose}
        aria-labelledby="add-announcement-dialog-title"
      >
        <Box sx={{ width: 400, p: 2 }}>
          <Typography
            id="add-announcement-dialog-title"
            variant="h6"
            component="h2"
            sx={{ py: 2 }}
          >
            Add a new announcement
          </Typography>
          <form onSubmit={announcementFormik.handleSubmit}>
            <Box>
              <TextField
                placeholder="Title"
                id="title"
                name="title"
                label="Title"
                onChange={announcementFormik.handleChange}
                value={announcementFormik.values.title}
                fullWidth
                autoFocus
                margin="normal"
              />
              {announcementFormik.errors.title && (
                <Typography sx={{ color: "error.main" }}>
                  {announcementFormik.errors.title}
                </Typography>
              )}
              <TextField
                placeholder="Description"
                id="description"
                name="description"
                label="Description"
                onChange={announcementFormik.handleChange}
                value={announcementFormik.values.description}
                fullWidth
                margin="normal"
              />
              {announcementFormik.errors.description && (
                <Typography sx={{ color: "error.main" }}>
                  {announcementFormik.errors.description}
                </Typography>
              )}
              <FormControl fullWidth margin="normal">
                <InputLabel>Severity</InputLabel>
                <Select
                  name="severity"
                  value={announcementFormik.values.severity}
                  onChange={announcementFormik.handleChange}
                  label="Severity"
                >
                  <MenuItem value="info">Info</MenuItem>
                  <MenuItem value="warning">Warning</MenuItem>
                  <MenuItem value="error">Error</MenuItem>
                  <MenuItem value="success">Success</MenuItem>
                </Select>
              </FormControl>

              <FormControlLabel
                control={
                  <Switch
                    id="is_enabled"
                    name="is_enabled"
                    color="success"
                    checked={announcementFormik.values.is_enabled}
                    onChange={announcementFormik.handleChange}
                  />
                }
                label="Enabled"
              />
            </Box>
            <Box mt={3} display="flex" justifyContent="space-between">
              <Button variant="outlined" onClick={handleModalClose}>
                Cancel
              </Button>
              <Button variant="contained" type="submit">
                Submit
              </Button>
            </Box>
          </form>
        </Box>
      </Dialog>

      <Dialog
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        aria-labelledby="edit-announcement-dialog-title"
      >
        <Box sx={{ width: 400, p: 2 }}>
          <Typography
            id="edit-announcement-dialog-title"
            variant="h6"
            component="h2"
            sx={{ py: 2 }}
          >
            Edit Announcement
          </Typography>
          <form onSubmit={editFormik.handleSubmit}>
            <Box>
              <TextField
                placeholder="Title"
                id="edit-title"
                name="title"
                onChange={editFormik.handleChange}
                value={editFormik.values.title}
                fullWidth
                autoFocus
                margin="normal"
              />
              {editFormik.errors.title && (
                <Typography sx={{ color: "error.main" }}>
                  {editFormik.errors.title}
                </Typography>
              )}
              <TextField
                placeholder="Description"
                id="edit-description"
                name="description"
                onChange={editFormik.handleChange}
                value={editFormik.values.description}
                fullWidth
                margin="normal"
              />
              {editFormik.errors.description && (
                <Typography sx={{ color: "error.main" }}>
                  {editFormik.errors.description}
                </Typography>
              )}
              <FormControl fullWidth margin="normal">
                <InputLabel>Severity</InputLabel>
                <Select
                  name="severity"
                  value={editFormik.values.severity}
                  onChange={editFormik.handleChange}
                  label="Severity"
                >
                  <MenuItem value="info">Info</MenuItem>
                  <MenuItem value="warning">Warning</MenuItem>
                  <MenuItem value="error">Error</MenuItem>
                  <MenuItem value="success">Success</MenuItem>
                </Select>
              </FormControl>
              <FormControlLabel
                control={
                  <Switch
                    id="edit-is_enabled"
                    name="is_enabled"
                    color="success"
                    checked={editFormik.values.is_enabled}
                    onChange={editFormik.handleChange}
                  />
                }
                label="Enabled"
              />
            </Box>
            <Box mt={3} display="flex" justifyContent="space-between">
              <Button
                variant="outlined"
                onClick={() => {
                  setEditModalOpen(false);
                  setEditAnnouncement(null);
                }}
              >
                Cancel
              </Button>
              <Button variant="contained" type="submit">
                Save
              </Button>
            </Box>
          </form>
        </Box>
      </Dialog>

      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={sortedAnnouncements.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(_event, newPage) => setPage(newPage)}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Container>
  );
};

export default Announcements;
