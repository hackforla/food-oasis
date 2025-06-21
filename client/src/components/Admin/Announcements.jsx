import {
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
  FormControlLabel,
  Switch,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
} from "@mui/icons-material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useAnnouncements } from "../../hooks/useAnnouncements";
import * as announcementService from "../../services/announcements-service";

const Announcements = () => {
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [rows, setRows] = useState([]);
  const [selectedAnnouncementTitle, setSelectedAnnouncementTitle] = useState("");
  const [selectedAnnouncementId, setSelectedAnnouncementId] = useState("");
  const [announcementModalOpen, setAnnouncementModalOpen] = useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const {
    data: announcementsData,
    loading: announcementsLoading,
    refetch: announcementRefetch,
  } = useAnnouncements();

  useEffect(() => {
    if (announcementsData) {
      const newRows = announcementsData.map((announcement) => ({
        announcementId: announcement.id,
        title: announcement.title,
        description: announcement.description, // Add description
        is_enabled: announcement.is_enabled,
      }));
      setRows(newRows);
    }
  }, [announcementsData]);

  const handleModalClose = () => {
    setAnnouncementModalOpen(false);
    announcementFormik.resetForm();
  };

  const handleRowClick = (rowTitle) => {
    if (selectedRowId === rowTitle) {
      setSelectedRowId(null);
    } else {
      setSelectedRowId(rowTitle);
    }
  };

  const handleIsEnabled = async (announcementId, isEnabled) => {
    try {
      await announcementService.update(announcementId, { is_enabled: isEnabled });
      setRows((prevRows) =>
        prevRows.map((row) =>
          row.announcementId === announcementId ? { ...row, is_enabled: isEnabled } : row
        )
      );
    } catch (error) {
      console.error("Error updating announcement:", error);
    }
  };

  const announcementFormik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().trim().required("Title is required"),
    }),
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      await announcementService.post(values);
      await announcementRefetch();
      resetForm();
      setSubmitting(false);
      handleModalClose();
    },
  });

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

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
        <Button
          variant="contained"
          type="button"
          onClick={() => setAnnouncementModalOpen(true)}
        >
          Add New Announcement
        </Button>
      </Box>

      <TableContainer component={Paper} elevation={3}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell align="left"> Announcement ID </TableCell>
              <TableCell align="left">Announcement Title</TableCell>
              <TableCell align="left">Announcement Description</TableCell>
              <TableCell align="left">Is Enabled?</TableCell>
              <TableCell /> {/* <-- New column for delete icon, no title */}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <React.Fragment key={index}>
                  <TableRow
                    onClick={() => handleRowClick(row.title)}
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
                        aria-label="expand row"
                        size="small"
                        onClick={() => handleRowClick(row.title)}
                      >
                        {selectedRowId === row.title ? (
                          <KeyboardArrowUpIcon />
                        ) : (
                          <KeyboardArrowDownIcon />
                        )}
                      </IconButton>
                    </TableCell>

                    <TableCell
                      align="left"
                      component="th"
                      scope="row"
                      sx={{ justifyContent: "space-between" }}
                    >
                      {row.announcementId}
                    </TableCell>
                    <TableCell
                      align="left"
                      component="th"
                      scope="row"
                      sx={{ justifyContent: "space-between" }}
                    >
                      {row.title}
                    </TableCell>
                    <TableCell
                      align="left"
                      component="th"
                      scope="row"
                      sx={{ justifyContent: "space-between" }}
                    >
                      {row.description}
                    </TableCell>
                    <TableCell>
                      <FormControlLabel
                        control={
                          <Switch
                            color="success"
                            checked={row.is_enabled}
                            onChange={(e) =>
                              handleIsEnabled(row.announcementId, e.target.checked)
                            }
                          />
                        }
                        label={
                          <Typography variant="body2" sx={{ fontSize: "14px" }}>
                            {/* No label, just toggle */}
                          </Typography>
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
                </React.Fragment>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={announcementModalOpen} onClose={handleModalClose}>
        <Box sx={{ width: 400, p: 2 }}>
          <Typography variant="h6" component="h2" sx={{ py: 2 }}>
            Add a new announcement
          </Typography>
          <Typography variant="caption">
            Announcement titles should be descriptive
          </Typography>
          <form onSubmit={announcementFormik.handleSubmit}>
            <Box>
              <TextField
                placeholder="Title"
                id="title"
                onChange={announcementFormik.handleChange}
                value={announcementFormik.values.title}
                fullWidth
                autoFocus
              />
              {announcementFormik.errors.title && (
                <Typography
                  sx={{
                    color: "error.main",
                  }}
                >
                  {announcementFormik.errors.title}
                </Typography>
              )}
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
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(event, newPage) => setPage(newPage)}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Container>
  );
};
export default Announcements;