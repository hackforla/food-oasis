import {
  Box,
  Button,
  Container,
  Modal,
  Paper,
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
import { Formik } from "formik";
import { tenantId } from "helpers/Configuration";
import { useTags } from "hooks/useTags";
import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import * as tagService from "../../services/tag-service";
import { IconButton } from "../UI/StandardButton";
import Label from "./ui/Label";

const columns = [
  { id: "edit", label: "" },
  { id: "delete", label: "" },
  { id: "name", label: "Name", minWidth: 100 },
];

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

function TagAdmin(props) {
  let { data, status } = useTags();
  const [tags, setTags] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [activeTag, setActiveTag] = useState(false);
  const [modalStyle] = useState(getModalStyle);
  const [error, setError] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const location = useLocation();

  useEffect(() => {
    if (data) {
      setTags(data);
    }
  }, [data]);

  useEffect(() => {
    if (status === 401) {
      return (
        <Navigate
          to={{ pathname: "/admin/login", state: { from: location } }}
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
      if (activeTag.id) {
        await tagService.update({ ...data, id: activeTag.id });
      } else {
        const { id } = await tagService.post(data);
        setTags([...tags, { ...data, id }]);
      }
      setActiveTag(null);
    } catch (e) {
      setError(e.message);
    }
    setTimeout(() => {
      setError("");
    }, 3000);
  };

  const handleAddNew = () => {
    setActiveTag({
      name: "",
      tenantId,
    });
  };

  const handleDelete = async (id) => {
    try {
      await tagService.remove(id);
      const data = tags.filter((tag) => tag.id !== id);
      setTags(data);
    } catch (e) {
      setDeleteError(e.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginBottom: 1,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h2" style={{ margin: 0, fontWeight: "bold" }}>
          Tags
        </Typography>
        <Button variant="outlined" onClick={handleAddNew}>
          Add New
        </Button>
      </Box>

      {deleteError && (
        <Typography
          sx={{
            color: "error.main",
          }}
        >
          Something went wrong.
        </Typography>
      )}

      <Paper>
        <TableContainer
          sx={{
            maxHeight: "500px",
            cursor: "pointer",
          }}
        >
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
              {tags
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((tag) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={tag.id}
                      selected={tag.id === activeTag}
                    >
                      {columns.map((column) => {
                        const value = tag[column.id];
                        if (column.id === "edit") {
                          return (
                            <TableCell
                              style={{ maxWidth: "5px", padding: "5px" }}
                              key={column.id}
                              align={column.align}
                            >
                              <IconButton
                                icon="edit"
                                onClick={() => {
                                  const aTag = tags.find(
                                    (t) => t.id === tag.id
                                  );
                                  setActiveTag(aTag);
                                }}
                              />
                            </TableCell>
                          );
                        }
                        if (column.id === "delete") {
                          return (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              style={{ maxWidth: "5px", padding: "5px" }}
                            >
                              <IconButton
                                icon="delete"
                                color="error"
                                onClick={() => handleDelete(tag.id)}
                              />
                            </TableCell>
                          );
                        }
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
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
          count={tags.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <Modal
          open={!!activeTag}
          onClose={() => setActiveTag(null)}
          aria-labelledby="tag-modal"
          aria-describedby="tag-modal-description"
        >
          <Box
            style={modalStyle}
            sx={{
              position: "absolute",
              width: 400,
              backgroundColor: "background.paper",
              boxShadow: 5,
              padding: (2, 4, 3),
            }}
          >
            <Typography
              variant="h2"
              id="simple-modal-title"
              sx={{
                fontWeight: "bold",
              }}
            >
              Edit Tag
            </Typography>

            <Formik
              initialValues={{
                name: (activeTag && activeTag.name) || "",
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
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit(e);
                  }}
                >
                  <Box>
                    <Label id="name" label="Name" />
                    <TextField
                      placeholder="Name"
                      id="name"
                      value={values.name}
                      onChange={handleChange}
                      helperText={touched.name ? errors.name : ""}
                      error={touched.name && Boolean(errors.name)}
                      fullWidth
                      autoFocus
                    />
                  </Box>

                  {error && (
                    <Typography
                      sx={{
                        color: "error.main",
                      }}
                    >
                      Something went wrong.
                    </Typography>
                  )}
                  <Box mt={3} display="flex" justifyContent="space-between">
                    <Button
                      variant="outlined"
                      onClick={() => setActiveTag(null)}
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
              )}
            </Formik>
          </Box>
        </Modal>
      </Paper>
    </Container>
  );
}

export default TagAdmin;
